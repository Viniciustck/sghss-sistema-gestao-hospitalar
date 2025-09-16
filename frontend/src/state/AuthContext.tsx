import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

type AuthState = {
  token: string | null
  role: 'PATIENT' | 'PROFESSIONAL' | 'ADMIN' | null
}

type AuthContextValue = AuthState & {
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'))
  const [role, setRole] = useState<AuthState['role']>(() => (localStorage.getItem('role') as any) ?? null)

  useEffect(() => {
    if (token) localStorage.setItem('token', token)
    else localStorage.removeItem('token')
  }, [token])
  useEffect(() => {
    if (role) localStorage.setItem('role', role)
    else localStorage.removeItem('role')
  }, [role])

  const value = useMemo<AuthContextValue>(() => ({
    token,
    role,
    login: async (email: string, password: string) => {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      if (!res.ok) {
        const text = await res.text()
        throw new Error(`Login falhou (${res.status}) ${text}`)
      }
      const data = await res.json()
      setToken(data.token)
      // role está dentro do token; para demo vamos buscar /patients como admin para validar
      // Em produção, decodifique JWT ou possua endpoint /me
      // aqui mantemos null até o dashboard inferir
      setRole(null)
    },
    logout: () => {
      setToken(null)
      setRole(null)
    },
  }), [token, role])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider')
  return ctx
}

export function authHeaders(token: string | null) {
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export const API = { API_URL }


