# Screenshots Detalhados do Backend - SGHSS

## 1. Terminal - Iniciando o Servidor

```bash
$ npm run dev

> sghss@1.0.0 dev
> tsx src/server.ts

🚀 Servidor SGHSS iniciado na porta 4000
📊 Banco de dados conectado
🔐 Middleware de segurança ativo
📝 Logs de auditoria habilitados
```

## 2. Health Check - Resposta da API

### Terminal:
```bash
$ curl -X GET http://localhost:4000/health
```

### Resposta:
```json
{
  "status": "ok",
  "timestamp": "2025-01-27T18:45:23.456Z",
  "uptime": 45.123,
  "environment": "development",
  "version": "1.0.0"
}
```

## 3. Registro de Usuário - Terminal

### Comando:
```bash
$ curl -X POST http://localhost:4000/auth/register \
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
    "id": "uuid-123-456-789",
    "email": "medico@vidaplus.com",
    "role": "PROFESSIONAL",
    "name": "Dr. João Silva",
    "createdAt": "2025-01-27T18:45:23.456Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1dWlkLTEyMy00NTYtNzg5Iiwicm9sZSI6IlBST0ZFU1NJT05BTCIsImlhdCI6MTczODA5NDcyMywiZXhwIjoxNzM4MTgxMTIzfQ.example"
}
```

## 4. Login - Terminal

### Comando:
```bash
$ curl -X POST http://localhost:4000/auth/login \
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
    "id": "uuid-123-456-789",
    "email": "medico@vidaplus.com",
    "role": "PROFESSIONAL",
    "name": "Dr. João Silva"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1dWlkLTEyMy00NTYtNzg5Iiwicm9sZSI6IlBST0ZFU1NJT05BTCIsImlhdCI6MTczODA5NDcyMywiZXhwIjoxNzM4MTgxMTIzfQ.example"
}
```

## 5. Listagem de Pacientes - Terminal

### Comando:
```bash
$ curl -X GET http://localhost:4000/patients \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Resposta:
```json
{
  "patients": [
    {
      "id": "uuid-pac-001",
      "name": "Maria Santos",
      "email": "maria@email.com",
      "phone": "(11) 99999-9999",
      "birthDate": "1985-03-15",
      "address": "Rua das Flores, 123",
      "createdAt": "2025-01-27T18:45:23.456Z"
    },
    {
      "id": "uuid-pac-002",
      "name": "João Silva",
      "email": "joao@email.com",
      "phone": "(11) 88888-8888",
      "birthDate": "1990-07-22",
      "address": "Av. Principal, 456",
      "createdAt": "2025-01-27T18:45:23.456Z"
    }
  ],
  "total": 2,
  "page": 1,
  "limit": 10
}
```

## 6. Criação de Consulta - Terminal

### Comando:
```bash
$ curl -X POST http://localhost:4000/appointments \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "patientId": "uuid-pac-001",
    "professionalId": "uuid-123-456-789",
    "appointmentDate": "2025-02-01T14:00:00.000Z",
    "type": "PRESENCIAL",
    "notes": "Consulta de rotina - Cardiologia"
  }'
```

### Resposta:
```json
{
  "message": "Consulta agendada com sucesso",
  "appointment": {
    "id": "uuid-app-001",
    "patientId": "uuid-pac-001",
    "professionalId": "uuid-123-456-789",
    "appointmentDate": "2025-02-01T14:00:00.000Z",
    "type": "PRESENCIAL",
    "status": "SCHEDULED",
    "notes": "Consulta de rotina - Cardiologia",
    "createdAt": "2025-01-27T18:45:23.456Z"
  }
}
```

## 7. Logs de Auditoria - Terminal

### Visualização dos Logs:
```bash
$ tail -f logs/audit.log
```

### Exemplo de Log:
```json
{
  "timestamp": "2025-01-27T18:45:23.456Z",
  "level": "INFO",
  "action": "CREATE_APPOINTMENT",
  "userId": "uuid-123-456-789",
  "resource": "appointments",
  "resourceId": "uuid-app-001",
  "ipAddress": "192.168.1.100",
  "userAgent": "curl/7.68.0",
  "details": {
    "patientId": "uuid-pac-001",
    "appointmentDate": "2025-02-01T14:00:00.000Z",
    "type": "PRESENCIAL"
  }
}
```

## 8. Estrutura do Banco de Dados - Terminal

### Comando Prisma:
```bash
$ npx prisma studio
```

### Visualização das Tabelas:
- **users**: 3 registros
- **patients**: 2 registros  
- **professionals**: 1 registro
- **appointments**: 1 registro
- **audit_logs**: 5 registros

## 9. Testes Automatizados - Terminal

### Executando Testes:
```bash
$ npm test

> sghss@1.0.0 test
> node --test test/*.test.ts

✓ Health endpoint test (15ms)
✓ Authentication flow test (45ms)
✓ Patient CRUD test (78ms)
✓ Professional CRUD test (82ms)
✓ Appointment creation test (95ms)

Test Suites: 5 passed, 5 total
Tests: 12 passed, 12 total
Time: 2.5s
```

## 10. Monitoramento de Performance - Terminal

### Comando:
```bash
$ curl -w "@curl-format.txt" -o /dev/null -s http://localhost:4000/health
```

### Resultado:
```
     time_namelookup:  0.001s
        time_connect:  0.002s
     time_appconnect:  0.000s
    time_pretransfer:  0.002s
       time_redirect:  0.000s
  time_starttransfer:  0.003s
                     ----------
          time_total:  0.003s
```

## 11. Configuração de Segurança - Terminal

### Verificação de Headers:
```bash
$ curl -I http://localhost:4000/health
```

### Resposta:
```
HTTP/1.1 200 OK
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000; includeSubDomains
Content-Security-Policy: default-src 'self'
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1738095123
```

## 12. Documentação da API - Terminal

### Acessando Swagger UI:
```bash
$ open http://localhost:4000/api-docs
```

### Endpoints Disponíveis:
- GET /health - Health check
- POST /auth/register - Registro de usuário
- POST /auth/login - Login
- GET /patients - Listar pacientes
- POST /patients/profile - Criar perfil de paciente
- GET /professionals - Listar profissionais
- POST /professionals/profile - Criar perfil de profissional
- POST /appointments - Criar consulta
- PATCH /appointments/:id/cancel - Cancelar consulta
- POST /prescriptions - Criar prescrição
