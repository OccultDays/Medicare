# MediCare — Sistema de Gestão Hospitalar

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-22.13.0-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19.2.1-blue.svg)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue.svg)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-336791.svg)](https://www.postgresql.org/)
[![Express](https://img.shields.io/badge/Express-4.21.2-000000.svg)](https://expressjs.com/)

Um **sistema full-stack profissional de gestão hospitalar** desenvolvido com React 19, Node.js/Express, Sequelize ORM e PostgreSQL. Inclui autenticação JWT, PWA responsivo, dark mode premium e documentação técnica completa.

---

## Características Principais

### Frontend

- **React 19** com TypeScript para type safety
- **Wouter** para roteamento SPA declarativo
- **Tailwind CSS 4** com design dark mode premium
- **PWA responsivo** com Service Worker e Web App Manifest
- **Framer Motion** para animações fluidas
- **shadcn/ui** para componentes reutilizáveis
- **Hooks customizados** para consumo de API
- **AuthContext** para gerenciamento de autenticação

### Backend

- **Express.js** com roteamento RESTful
- **Sequelize ORM** para abstração de dados
- **PostgreSQL** como banco relacional
- **JWT** com access token + refresh token
- **Bcrypt** para criptografia de senhas
- **CORS** configurado para segurança
- **Validação** com Zod schemas
- **Tratamento de erros** centralizado

### Funcionalidades

- **Autenticação** com login/logout/refresh
- **Gestão de Pacientes** (CRUD completo)
- **Gestão de Médicos** (CRUD completo)
- **Agendamento de Consultas** (CRUD completo)
- **Prontuários Eletrônicos** (CRUD completo)
- **Dashboard** com estatísticas em tempo real
- **Paginação** em todos os endpoints
- **Filtros avançados** por status, especialidade, etc.

---

## Quick Start

### Pré-requisitos

- Node.js 22+
- PostgreSQL 12+
- npm ou pnpm

### Instalação

```bash
# 1. Clonar repositório
git clone https://github.com/seu-usuario/medicare-hospital-system.git
cd medicare-hospital-system

# 2. Instalar dependências
pnpm install

# 3. Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com suas credenciais PostgreSQL

# 4. Executar migrações
pnpm db:push

# 5. Popular banco com dados de teste
pnpm seed

# 6. Iniciar em desenvolvimento
pnpm dev
```

Acesse `http://localhost:5173` no navegador.

### Credenciais de Teste

| Email | Senha | Papel |
|-------|-------|-------|
| `admin@medicare.com` | `admin123` | Admin |
| `medico@medicare.com` | `medico123` | Médico |
| `enfermeiro@medicare.com` | `enf123` | Enfermeiro |

---

## Estrutura do Projeto

```
medicare-hospital-system/
├── client/                          # Frontend React
│   ├── public/
│   │   ├── manifest.json           # PWA Manifest
│   │   ├── sw.js                   # Service Worker
│   │   └── icons/                  # Ícones PWA
│   ├── src/
│   │   ├── pages/                  # Páginas (Login, Dashboard, etc.)
│   │   ├── components/             # Componentes reutilizáveis
│   │   ├── hooks/                  # Hooks customizados
│   │   │   ├── usePacientes.ts
│   │   │   ├── useMedicos.ts
│   │   │   ├── useConsultas.ts
│   │   │   └── useProntuarios.ts
│   │   ├── services/
│   │   │   └── api.ts              # API Service com JWT
│   │   ├── contexts/
│   │   │   └── AuthContext.tsx     # Contexto de autenticação
│   │   ├── App.tsx                 # Roteamento principal
│   │   └── index.css               # Estilos globais
│   └── index.html
│
├── server/                          # Backend Node.js
│   ├── models/                     # Modelos Sequelize
│   │   ├── User.ts
│   │   ├── Paciente.ts
│   │   ├── Medico.ts
│   │   ├── Consulta.ts
│   │   └── Prontuario.ts
│   ├── routes/                     # Rotas Express
│   │   ├── auth.ts
│   │   ├── pacientes.ts
│   │   ├── medicos.ts
│   │   ├── consultas.ts
│   │   └── prontuarios.ts
│   ├── utils/
│   │   └── auth.ts                 # JWT utilities
│   ├── config/
│   │   └── database.ts             # Configuração Sequelize
│   ├── seed.ts                     # Script de seed
│   └── index.ts                    # Servidor principal
│
├── DOCUMENTACAO_TECNICA.md         # Documentação técnica completa
├── DIAGRAMA_UML.md                 # Diagramas UML em Mermaid
├── DIAGRAMA_UML.png                # Diagrama UML renderizado
├── GUIA_API.md                     # Guia prático de uso da API
├── API_DOCUMENTATION.md            # Documentação Swagger/OpenAPI
├── .env.example                    # Variáveis de ambiente
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## API REST Endpoints

### Autenticação
```
POST   /api/auth/login              → Login com email/senha
POST   /api/auth/logout             → Logout
POST   /api/auth/refresh            → Renovar access token
GET    /api/auth/me                 → Dados do usuário autenticado
POST   /api/auth/register           → Registrar novo usuário (admin)
```

### Pacientes
```
GET    /api/pacientes               → Listar com paginação
GET    /api/pacientes/:id           → Obter por ID
POST   /api/pacientes               → Criar novo
PUT    /api/pacientes/:id           → Atualizar
DELETE /api/pacientes/:id           → Deletar
```

### Médicos
```
GET    /api/medicos                 → Listar com paginação
GET    /api/medicos/:id             → Obter por ID
POST   /api/medicos                 → Criar novo
PUT    /api/medicos/:id             → Atualizar
DELETE /api/medicos/:id             → Deletar
```

### Consultas
```
GET    /api/consultas               → Listar com paginação
GET    /api/consultas/:id           → Obter por ID
POST   /api/consultas               → Agendar nova
PUT    /api/consultas/:id           → Atualizar
DELETE /api/consultas/:id           → Cancelar/Deletar
```

### Prontuários
```
GET    /api/prontuarios             → Listar com paginação
GET    /api/prontuarios/:id         → Obter por ID
GET    /api/prontuarios/paciente/:id → Listar por paciente
POST   /api/prontuarios             → Criar novo
PUT    /api/prontuarios/:id         → Atualizar
DELETE /api/prontuarios/:id         → Deletar
```

Para detalhes completos, consulte [GUIA_API.md](./GUIA_API.md).

---

## Modelos de Dados

### User
```typescript
{
  id: number
  email: string (UNIQUE)
  password: string (bcrypt)
  name: string
  role: 'admin' | 'medico' | 'enfermeiro'
  createdAt: Date
  updatedAt: Date
  lastSignedIn: Date
}
```

### Paciente
```typescript
{
  id: number
  nome: string
  cpf: string (UNIQUE)
  dataNascimento: Date
  genero: 'M' | 'F' | 'O'
  telefone: string
  email: string
  endereco: string
  cidade: string
  estado: string
  cep: string
  status: 'ativo' | 'internado' | 'alta' | 'óbito'
  leito: string
  observacoes: string
  createdAt: Date
  updatedAt: Date
}
```

### Medico
```typescript
{
  id: number
  nome: string
  crm: string (UNIQUE)
  especialidade: string
  telefone: string
  email: string
  disponibilidade: 'disponivel' | 'ocupado' | 'indisponivel'
  consultorioNumero: string
  observacoes: string
  createdAt: Date
  updatedAt: Date
}
```

### Consulta
```typescript
{
  id: number
  pacienteId: number (FK)
  medicoId: number (FK)
  dataHora: Date
  tipo: 'presencial' | 'teleconsulta' | 'retorno'
  motivo: string
  status: 'agendada' | 'realizada' | 'cancelada' | 'ausente'
  anotacoes: string
  prescricao: string
  createdAt: Date
  updatedAt: Date
}
```

### Prontuario
```typescript
{
  id: number
  pacienteId: number (FK)
  dataAtendimento: Date
  queixa: string
  historico: string
  diagnostico: string
  medicamentos: JSON
  examesSolicitados: JSON
  condutaClinica: string
  medicoResponsavel: string
  createdAt: Date
  updatedAt: Date
}
```

---

## Autenticação e Segurança

### Fluxo JWT

1. Usuário faz login com email/senha
2. Servidor valida credenciais (bcrypt)
3. Servidor gera **Access Token** (15 min) + **Refresh Token** (7 dias)
4. Cliente armazena tokens em localStorage
5. Cada requisição inclui: `Authorization: Bearer <access_token>`
6. Middleware valida token
7. Se expirado, cliente usa refresh token para renovar

### Medidas de Segurança

- Senhas com bcrypt (salt 10)
- CORS configurado
- Validação de entrada com Zod
- Proteção contra SQL Injection (Sequelize)
- Proteção contra XSS (sanitização frontend)
- Rate limiting (implementável)

---

## Testes

```bash
# Executar testes
pnpm test

# Testes com cobertura
pnpm test:coverage

# Testes em modo watch
pnpm test:watch
```

---

## PWA (Progressive Web App)

O sistema é totalmente funcional como PWA:

- Instalação em home screen
- Funciona offline com Service Worker
- Responsivo mobile-first
- Ícones em múltiplas resoluções
- Modo dark nativo

**Para instalar:**
1. Abrir site no navegador
2. Clicar em "Instalar" (Chrome/Edge) ou "Adicionar à Home" (Safari)
3. Usar como aplicativo nativo

---

## Design System

### Cores (Dark Mode Premium)

- **Background:** `#0D1117` (Preto profundo)
- **Foreground:** `#FFFFFF` (Branco)
- **Primary:** `#00D9FF` (Ciano)
- **Accent:** `#1E3A5F` (Azul escuro)
- **Muted:** `#6B7280` (Cinza)

### Tipografia

- **Headlines:** Space Grotesk 32px bold
- **Subtitles:** DM Sans 20px medium
- **Body:** DM Sans 16px regular

---

## Documentação

| Documento | Descrição |
|-----------|-----------|
| [DOCUMENTACAO_TECNICA.md](./DOCUMENTACAO_TECNICA.md) | Documentação técnica completa com arquitetura, stack, modelos, segurança e deployment |
| [DIAGRAMA_UML.md](./DIAGRAMA_UML.md) | Diagramas UML em Mermaid (classes, ER, fluxos, componentes) |
| [GUIA_API.md](./GUIA_API.md) | Guia prático de uso da API com exemplos cURL |
| [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) | Documentação Swagger/OpenAPI dos endpoints |

---

## Deployment

### Build para Produção

```bash
# Build do frontend
pnpm build

# Build do servidor
pnpm build

# Iniciar em produção
NODE_ENV=production pnpm start
```

### Variáveis de Ambiente

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/medicare

# JWT
JWT_SECRET=sua-chave-secreta-muito-segura

# Server
NODE_ENV=production
PORT=3000

# Frontend API
VITE_API_URL=https://seu-dominio.com/api
```

