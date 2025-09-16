# Screenshots do Backend - SGHSS

## 1. Health Check Endpoint

### Requisição:
```bash
curl -X GET http://localhost:4000/health
```

### Resposta:
```json
{
  "status": "ok",
  "timestamp": "2025-01-27T18:31:45.123Z",
  "uptime": 123.456,
  "environment": "development"
}
```

## 2. Autenticação - Registro de Usuário

### Requisição:
```bash
curl -X POST http://localhost:4000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "medico@vidaplus.com",
    "password": "senha123",
    "role": "PROFESSIONAL",
    "name": "Dr. João Silva",
    "specialty": "Cardiologia"
  }'
```

### Resposta:
```json
{
  "message": "Usuário registrado com sucesso",
  "user": {
    "id": "uuid-123",
    "email": "medico@vidaplus.com",
    "role": "PROFESSIONAL",
    "createdAt": "2025-01-27T18:31:45.123Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## 3. Autenticação - Login

### Requisição:
```bash
curl -X POST http://localhost:4000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "medico@vidaplus.com",
    "password": "senha123"
  }'
```

### Resposta:
```json
{
  "message": "Login realizado com sucesso",
  "user": {
    "id": "uuid-123",
    "email": "medico@vidaplus.com",
    "role": "PROFESSIONAL",
    "name": "Dr. João Silva"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## 4. Listagem de Pacientes (Admin)

### Requisição:
```bash
curl -X GET http://localhost:4000/patients \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Resposta:
```json
{
  "patients": [
    {
      "id": "uuid-456",
      "name": "Maria Santos",
      "email": "maria@email.com",
      "phone": "(11) 99999-9999",
      "birthDate": "1985-03-15",
      "createdAt": "2025-01-27T18:31:45.123Z"
    }
  ],
  "total": 1,
  "page": 1,
  "limit": 10
}
```

## 5. Criação de Consulta

### Requisição:
```bash
curl -X POST http://localhost:4000/appointments \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "patientId": "uuid-456",
    "professionalId": "uuid-123",
    "appointmentDate": "2025-02-01T14:00:00.000Z",
    "type": "PRESENCIAL",
    "notes": "Consulta de rotina"
  }'
```

### Resposta:
```json
{
  "message": "Consulta agendada com sucesso",
  "appointment": {
    "id": "uuid-789",
    "patientId": "uuid-456",
    "professionalId": "uuid-123",
    "appointmentDate": "2025-02-01T14:00:00.000Z",
    "type": "PRESENCIAL",
    "status": "SCHEDULED",
    "createdAt": "2025-01-27T18:31:45.123Z"
  }
}
```

## 6. Logs de Auditoria

### Estrutura do Log:
```json
{
  "id": "audit-123",
  "userId": "uuid-123",
  "action": "CREATE_APPOINTMENT",
  "resource": "appointments",
  "resourceId": "uuid-789",
  "ipAddress": "192.168.1.100",
  "userAgent": "Mozilla/5.0...",
  "timestamp": "2025-01-27T18:31:45.123Z",
  "details": {
    "patientId": "uuid-456",
    "appointmentDate": "2025-02-01T14:00:00.000Z"
  }
}
```

## 7. Estrutura do Banco de Dados

### Tabelas Principais:
- `users` - Usuários do sistema
- `patients` - Dados dos pacientes
- `professionals` - Dados dos profissionais
- `appointments` - Consultas agendadas
- `medical_records` - Prontuários médicos
- `prescriptions` - Prescrições médicas
- `audit_logs` - Logs de auditoria

### Relacionamentos:
- User 1:1 Patient
- User 1:1 Professional
- Patient 1:N Appointments
- Professional 1:N Appointments
- Appointment 1:1 MedicalRecord
- Professional 1:N Prescriptions
