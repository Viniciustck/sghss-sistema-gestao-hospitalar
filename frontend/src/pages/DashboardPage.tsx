import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API, authHeaders, useAuth } from '../state/AuthContext'
import Header from '../components/Header'

type Patient = { id: string, documentId?: string | null }
type Professional = { id: string, specialty: string }
type Appointment = { id: string, scheduledAt: string, type: string, status: string }
type Prescription = { id: string, content: string }

export default function DashboardPage() {
  const nav = useNavigate()
  const { token, logout } = useAuth()
  const headers = useMemo(() => ({ 'Content-Type': 'application/json', ...authHeaders(token) }), [token])

  const [patients, setPatients] = useState<Patient[]>([])
  const [professionals, setProfessionals] = useState<Professional[]>([])
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!token) { nav('/'); return }
    ;(async () => {
      try {
        const [pats, pros, appts, rx] = await Promise.all([
          fetch(`${API.API_URL}/patients`, { headers }).then(r => r.ok ? r.json() : []),
          fetch(`${API.API_URL}/professionals`, { headers }).then(r => r.ok ? r.json() : []),
          fetch(`${API.API_URL}/appointments`, { headers }).then(r => r.ok ? r.json() : []),
          fetch(`${API.API_URL}/prescriptions`, { headers }).then(r => r.ok ? r.json() : []),
        ])
        setPatients(pats)
        setProfessionals(pros)
        setAppointments(appts)
        setPrescriptions(rx)
      } catch {
        setError('Erro ao carregar dados')
      }
    })()
  }, [token, headers, nav])

  return (
    <div style={{ padding: 20, display: 'grid', gap: 16 }}>
      <Header />
      <div style={{ display:'flex', justifyContent:'flex-end' }}>
        <button onClick={() => logout()}>Sair</button>
      </div>
      {error && <div style={{ color: 'crimson' }}>{error}</div>}
      <section>
        <h3>Pacientes</h3>
        <ul>
          {patients.map(p => <li key={p.id}>{p.id} {p.documentId ?? ''}</li>)}
        </ul>
      </section>
      <section>
        <h3>Profissionais</h3>
        <ul>
          {professionals.map(p => <li key={p.id}>{p.id} - {p.specialty}</li>)}
        </ul>
      </section>
      <section>
        <h3>Consultas</h3>
        <ul>
          {appointments.map(a => <li key={a.id}>{a.id} - {a.type} - {a.status} - {new Date(a.scheduledAt).toLocaleString()}</li>)}
        </ul>
      </section>
      <section>
        <h3>Prescrições</h3>
        <ul>
          {prescriptions.map(r => <li key={r.id}>{r.id} - {r.content}</li>)}
        </ul>
      </section>
    </div>
  )
}


