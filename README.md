# 🏥 SGHSS - Sistema de Gestão Hospitalar e de Serviços de Saúde

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue.svg)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5+-purple.svg)](https://www.prisma.io/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## 📋 Sobre o Projeto

O **SGHSS** é um sistema completo de gestão hospitalar desenvolvido para a instituição **VidaPlus**, que administra hospitais, clínicas de bairro, laboratórios e equipes de home care. O sistema centraliza todos os processos hospitalares e de saúde, garantindo eficiência operacional e conformidade com a LGPD.

### 🎯 Objetivos

- **Centralização de Dados**: Unificar informações de pacientes, profissionais e procedimentos
- **Segurança e Compliance**: Implementar controles rigorosos de acesso e auditoria conforme LGPD
- **Escalabilidade**: Suportar múltiplas unidades hospitalares
- **Usabilidade**: Interface intuitiva e responsiva para diferentes perfis de usuário

## 🚀 Tecnologias Utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **TypeScript** - Linguagem tipada
- **Prisma** - ORM para banco de dados
- **SQLite** - Banco de dados (desenvolvimento)
- **JWT** - Autenticação
- **bcrypt** - Criptografia de senhas
- **Helmet** - Segurança HTTP
- **CORS** - Cross-Origin Resource Sharing

### Frontend
- **React** - Biblioteca de interface
- **TypeScript** - Linguagem tipada
- **Vite** - Build tool
- **React Router** - Roteamento
- **Context API** - Gerenciamento de estado

### Ferramentas
- **Git** - Controle de versão
- **ESLint** - Linting
- **Mermaid** - Diagramas UML
- **OpenAPI** - Documentação da API

## 📁 Estrutura do Projeto

```
sghss-sistema-gestao-hospitalar/
├── src/                          # Backend (Node.js + Express)
│   ├── config/                   # Configurações
│   ├── middlewares/              # Middlewares (auth, error, audit)
│   ├── modules/                  # Módulos da aplicação
│   │   ├── auth/                 # Autenticação
│   │   ├── patients/             # Gestão de pacientes
│   │   ├── professionals/        # Gestão de profissionais
│   │   ├── appointments/         # Agendamentos
│   │   ├── prescriptions/        # Prescrições
│   │   └── telemedicine/         # Telemedicina
│   └── server.ts                 # Servidor principal
├── frontend/                     # Frontend (React)
│   ├── src/
│   │   ├── components/           # Componentes React
│   │   ├── pages/                # Páginas da aplicação
│   │   ├── state/                # Context API
│   │   └── main.tsx              # Entry point
│   └── package.json
├── prisma/                       # Schema do banco de dados
├── docs/                         # Documentação e screenshots
├── test/                         # Testes automatizados
├── DOCUMENTACAO.md               # Documentação acadêmica
├── OPENAPI.yaml                  # Especificação da API
└── README.md                     # Este arquivo
```

## 🛠️ Instalação e Execução

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- Git

### 1. Clone o repositório
```bash
git clone https://github.com/Viniciustck/sghss-sistema-gestao-hospitalar.git
cd sghss-sistema-gestao-hospitalar
```

### 2. Instale as dependências
```bash
# Backend
npm install

# Frontend
cd frontend
npm install
cd ..
```

### 3. Configure o banco de dados
```bash
npx prisma migrate dev
npx prisma generate
```

### 4. Execute o projeto
```bash
# Terminal 1 - Backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### 5. Acesse a aplicação
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:4000
- **Health Check**: http://localhost:4000/health

## 📚 Documentação da API

A documentação completa da API está disponível em:
- **OpenAPI**: `OPENAPI.yaml`
- **Endpoints principais**:
  - `GET /health` - Health check
  - `POST /auth/register` - Registro de usuário
  - `POST /auth/login` - Login
  - `GET /patients` - Listar pacientes
  - `POST /appointments` - Criar consulta
  - `POST /prescriptions` - Criar prescrição

## 🧪 Testes

```bash
# Executar testes
npm test

# Testes específicos
npm test -- --grep "health"
```

## 👥 Perfis de Usuário

### 🔐 Autenticação e Autorização
- **ADMIN**: Acesso total ao sistema
- **PROFESSIONAL**: Médicos, enfermeiros, técnicos
- **PATIENT**: Pacientes do sistema

### 📋 Funcionalidades por Perfil

#### Pacientes
- Cadastro de dados pessoais
- Visualização do histórico clínico
- Agendamento de consultas
- Acesso a teleconsultas

#### Profissionais de Saúde
- Gerenciamento de agendas
- Atualização de prontuários
- Emissão de receitas digitais
- Acompanhamento de pacientes

#### Administradores
- Gestão de usuários
- Relatórios gerenciais
- Controle de fluxo de internações
- Auditoria do sistema

## 🔒 Segurança

- **Autenticação JWT** com refresh tokens
- **RBAC** (Role-Based Access Control)
- **Criptografia** de senhas com bcrypt
- **Headers de segurança** com Helmet
- **Rate limiting** para prevenir ataques
- **Logs de auditoria** completos
- **Conformidade com LGPD**

## 📊 Screenshots

### Frontend
- **Login**: Interface de autenticação
- **Dashboard**: Painel principal com dados

### Backend
- **API Logs**: Logs do servidor em execução
- **Health Check**: Verificação de saúde da API
- **Autenticação**: Registro e login de usuários
- **Testes**: Execução de testes automatizados

## 📈 Próximas Funcionalidades

- [ ] Sistema de notificações em tempo real
- [ ] Relatórios avançados
- [ ] Integração com sistemas legados
- [ ] App mobile
- [ ] Telemedicina com videochamadas
- [ ] Integração com laboratórios

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Vinicius Borges Pires**
- **RU**: 4327307
- **Email**: zeendeesk@gmail.com
- **GitHub**: [@Viniciustck](https://github.com/Viniciustck)

## 📚 Projeto Acadêmico

Este projeto foi desenvolvido como parte da disciplina **Projeto Multidisciplinar** do curso de **Análise e Desenvolvimento de Sistemas** da **Universidade Uninter**.

### 📋 Estrutura Acadêmica
- **Professor**: Winston Sen Lun Fung, Me.
- **Ano**: 2025
- **Documentação**: `DOCUMENTACAO.md`
- **Diagramas UML**: `docs/`

## 🏆 Destaques do Projeto

- ✅ **100% Funcional** - Backend e Frontend integrados
- ✅ **Documentação Completa** - Acadêmica e técnica
- ✅ **Screenshots Reais** - Demonstrações visuais
- ✅ **Testes Automatizados** - Qualidade garantida
- ✅ **Conformidade LGPD** - Segurança de dados
- ✅ **Arquitetura Escalável** - Pronto para crescimento
- ✅ **Código Limpo** - Boas práticas de desenvolvimento

---

⭐ **Se este projeto foi útil, considere dar uma estrela!**
