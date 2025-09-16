import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../state/AuthContext'

export default function LoginPage() {
  const nav = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('admin@sghss.local')
  const [password, setPassword] = useState('admin123')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await login(email, password)
      nav('/dashboard')
    } catch (err) {
      setError('Credenciais inválidas ou servidor indisponível')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'grid', placeItems: 'center', minHeight: '100dvh' }}>
      <form onSubmit={onSubmit} style={{ width: 360, display: 'grid', gap: 12 }}>
        <h1>SGHSS - Login</h1>
        <label>Email<input value={email} onChange={e => setEmail(e.target.value)} type="email" required /></label>
        <label>Senha<input value={password} onChange={e => setPassword(e.target.value)} type="password" required /></label>
        {error && <div style={{ color: 'crimson' }}>{error}</div>}
        <button disabled={loading}>{loading ? 'Entrando...' : 'Entrar'}</button>
        <p style={{ fontSize: 12, opacity: 0.7 }}>Dica: admin@sghss.local / admin123</p>
      </form>
    </div>
  )
}


