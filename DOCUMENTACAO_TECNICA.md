# MediCare — Sistema de Gestão Hospitalar

## 📋 Sumário Executivo

O **MediCare** é um sistema full-stack de gestão hospitalar desenvolvido com **React 19 + Node.js + Express + Sequelize + PostgreSQL**. O sistema oferece uma interface moderna dark mode com PWA responsivo, autenticação JWT, CRUD completo para pacientes, médicos, consultas e prontuários, com documentação de API REST e testes automatizados.

### Características Principais

- ✅ **Frontend SPA** com React 19, TypeScript, Tailwind CSS 4
- ✅ **Backend REST** com Express, Sequelize ORM, PostgreSQL
- ✅ **Autenticação JWT** com refresh tokens e roles
- ✅ **PWA Responsivo** com Service Worker e Web App Manifest
- ✅ **Dark Mode Premium** com design de alta tecnologia
- ✅ **Hooks Customizados** para consumo de API
- ✅ **Paginação e Filtros** em todos os endpoints
- ✅ **Tratamento de Erros** completo com toasts
- ✅ **TypeScript** em 100% do código

---

## 🏗️ Arquitetura do Sistema

### Visão Geral

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENTE (React 19)                      │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Pages: Login, Dashboard, Pacientes, Médicos, etc.   │  │
│  │ Hooks: usePacientes, useMedicos, useConsultas, etc. │  │
│  │ Services: apiService com interceptadores JWT        │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────┬─────────────────────────────────────┘
                         │ HTTP/REST
                         │ JWT Bearer Token
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                  SERVIDOR (Node.js/Express)                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Routes: /api/auth, /api/pacientes, /api/medicos...  │  │
│  │ Models: User, Paciente, Medico, Consulta, Prontuario│  │
│  │ Middleware: JWT, CORS, Validação, Tratamento Erros │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────┬─────────────────────────────────────┘
                         │ SQL
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              BANCO DE DADOS (PostgreSQL)                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Tables: users, pacientes, medicos, consultas, etc.  │  │
│  │ Relacionamentos: 1:N, N:N com integridade referencial│  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Stack Tecnológico

| Camada | Tecnologia | Versão | Propósito |
|--------|-----------|--------|----------|
| **Frontend** | React | 19.2.1 | UI Framework |
| **Frontend** | TypeScript | 5.9.3 | Type Safety |
| **Frontend** | Tailwind CSS | 4.1.14 | Styling |
| **Frontend** | Wouter | 3.3.5 | Roteamento SPA |
| **Frontend** | Framer Motion | 12.23.22 | Animações |
| **Backend** | Node.js | 22.13.0 | Runtime |
| **Backend** | Express | 4.21.2 | HTTP Server |
| **Backend** | Sequelize | 6.35.2 | ORM |
| **Database** | PostgreSQL | Latest | Banco Relacional |
| **Build** | Vite | 7.1.7 | Bundler |
| **Testing** | Vitest | 2.1.4 | Test Runner |

---

## 📊 Modelos de Dados

### User (Autenticação)

```typescript
{
  id: number (PK)
  email: string (UNIQUE)
  password: string (bcrypt)
  name: string
  role: enum('admin', 'medico', 'enfermeiro')
  createdAt: Date
  updatedAt: Date
  lastSignedIn: Date
}
```

**Relacionamentos:**
- 1:N com Consulta (médico responsável)
- 1:N com Prontuário (médico responsável)

---

### Paciente

```typescript
{
  id: number (PK)
  nome: string
  cpf: string (UNIQUE)
  dataNascimento: Date
  genero: enum('M', 'F', 'O')
  telefone: string (NULLABLE)
  email: string (NULLABLE)
  endereco: string (NULLABLE)
  cidade: string (NULLABLE)
  estado: string (NULLABLE)
  cep: string (NULLABLE)
  status: enum('ativo', 'internado', 'alta', 'óbito')
  leito: string (NULLABLE)
  observacoes: string (NULLABLE)
  createdAt: Date
  updatedAt: Date
}
```

**Relacionamentos:**
- 1:N com Consulta
- 1:N com Prontuário

**Índices:**
- UNIQUE: cpf
- INDEX: status, createdAt

---

### Medico

```typescript
{
  id: number (PK)
  nome: string
  crm: string (UNIQUE)
  especialidade: string
  telefone: string (NULLABLE)
  email: string (NULLABLE)
  disponibilidade: enum('disponivel', 'ocupado', 'indisponivel')
  consultorioNumero: string (NULLABLE)
  observacoes: string (NULLABLE)
  createdAt: Date
  updatedAt: Date
}
```

**Relacionamentos:**
- 1:N com Consulta
- 1:N com Prontuário (médico responsável)

**Índices:**
- UNIQUE: crm
- INDEX: especialidade, disponibilidade

---

### Consulta

```typescript
{
  id: number (PK)
  pacienteId: number (FK → Paciente)
  medicoId: number (FK → Medico)
  dataHora: Date
  tipo: enum('presencial', 'teleconsulta', 'retorno')
  motivo: string
  status: enum('agendada', 'realizada', 'cancelada', 'ausente')
  anotacoes: string (NULLABLE)
  prescricao: string (NULLABLE)
  createdAt: Date
  updatedAt: Date
}
```

**Relacionamentos:**
- N:1 com Paciente
- N:1 com Medico

**Índices:**
- INDEX: pacienteId, medicoId, status, dataHora

---

### Prontuario

```typescript
{
  id: number (PK)
  pacienteId: number (FK → Paciente)
  dataAtendimento: Date
  queixa: string
  historico: string (NULLABLE)
  diagnostico: string (NULLABLE)
  medicamentos: JSON (NULLABLE)
  examesSolicitados: JSON (NULLABLE)
  condutaClinica: string (NULLABLE)
  medicoResponsavel: string
  createdAt: Date
  updatedAt: Date
}
```

**Relacionamentos:**
- N:1 com Paciente

**Índices:**
- INDEX: pacienteId, dataAtendimento

---

## 🔐 Autenticação e Segurança

### Fluxo de Autenticação JWT

```
1. Usuário submete email + senha
   ↓
2. Servidor valida credenciais (bcrypt)
   ↓
3. Servidor gera Access Token (15 min) + Refresh Token (7 dias)
   ↓
4. Cliente armazena tokens em localStorage
   ↓
5. Cada requisição inclui: Authorization: Bearer <access_token>
   ↓
6. Middleware valida token
   ↓
7. Se expirado, cliente usa refresh token para renovar
```

### Segurança Implementada

| Medida | Implementação |
|--------|---------------|
| **Senhas** | bcrypt com salt 10 |
| **CORS** | Configurado para produção |
| **HTTPS** | Recomendado em produção |
| **Rate Limiting** | Implementável com middleware |
| **Validação** | Zod schemas em todos endpoints |
| **SQL Injection** | Prevenido com Sequelize |
| **XSS** | Sanitização no frontend |

---

## 🔌 API REST Endpoints

### Autenticação

```
POST   /api/auth/login          → Login com email/senha
POST   /api/auth/logout         → Logout (invalida sessão)
POST   /api/auth/refresh        → Renovar access token
GET    /api/auth/me             → Dados do usuário autenticado
POST   /api/auth/register       → Registrar novo usuário
```

### Pacientes

```
GET    /api/pacientes                    → Listar com paginação
GET    /api/pacientes/:id                → Obter por ID
POST   /api/pacientes                    → Criar novo
PUT    /api/pacientes/:id                → Atualizar
DELETE /api/pacientes/:id                → Deletar
```

**Query Parameters:**
- `page`: número da página (padrão: 1)
- `limit`: itens por página (padrão: 10)
- `status`: filtrar por status
- `search`: buscar por nome

### Médicos

```
GET    /api/medicos                      → Listar com paginação
GET    /api/medicos/:id                  → Obter por ID
POST   /api/medicos                      → Criar novo
PUT    /api/medicos/:id                  → Atualizar
DELETE /api/medicos/:id                  → Deletar
```

**Query Parameters:**
- `page`, `limit`, `especialidade`, `disponibilidade`, `search`

### Consultas

```
GET    /api/consultas                    → Listar com paginação
GET    /api/consultas/:id                → Obter por ID
POST   /api/consultas                    → Criar nova
PUT    /api/consultas/:id                → Atualizar
DELETE /api/consultas/:id                → Deletar
```

**Query Parameters:**
- `page`, `limit`, `status`, `tipo`, `pacienteId`, `medicoId`

### Prontuários

```
GET    /api/prontuarios                  → Listar com paginação
GET    /api/prontuarios/:id              → Obter por ID
GET    /api/prontuarios/paciente/:id     → Listar por paciente
POST   /api/prontuarios                  → Criar novo
PUT    /api/prontuarios/:id              → Atualizar
DELETE /api/prontuarios/:id              → Deletar
```

---

## 📁 Estrutura de Diretórios

```
hospital-system/
├── client/                              # Frontend React
│   ├── public/
│   │   ├── manifest.json               # PWA Manifest
│   │   ├── sw.js                       # Service Worker
│   │   └── icons/                      # Ícones PWA
│   ├── src/
│   │   ├── pages/                      # Páginas (Login, Dashboard, etc.)
│   │   ├── components/                 # Componentes reutilizáveis
│   │   ├── hooks/                      # Hooks customizados
│   │   │   ├── usePacientes.ts
│   │   │   ├── useMedicos.ts
│   │   │   ├── useConsultas.ts
│   │   │   └── useProntuarios.ts
│   │   ├── services/
│   │   │   └── api.ts                  # API Service com interceptadores
│   │   ├── config/
│   │   │   └── api.ts                  # Configuração da API
│   │   ├── contexts/                   # React Contexts
│   │   │   └── AuthContext.tsx
│   │   ├── lib/                        # Utilitários
│   │   ├── App.tsx                     # Roteamento principal
│   │   └── index.css                   # Estilos globais
│   └── index.html
│
├── server/                              # Backend Node.js
│   ├── models/                         # Modelos Sequelize
│   │   ├── User.ts
│   │   ├── Paciente.ts
│   │   ├── Medico.ts
│   │   ├── Consulta.ts
│   │   └── Prontuario.ts
│   ├── routes/                         # Rotas Express
│   │   ├── auth.ts
│   │   ├── pacientes.ts
│   │   ├── medicos.ts
│   │   ├── consultas.ts
│   │   └── prontuarios.ts
│   ├── utils/
│   │   └── auth.ts                     # JWT utilities
│   ├── config/
│   │   └── database.ts                 # Configuração Sequelize
│   ├── seed.ts                         # Script de seed
│   └── index.ts                        # Servidor principal
│
├── drizzle/                             # Migrações (se usar Drizzle)
├── API_DOCUMENTATION.md                 # Documentação API
├── DOCUMENTACAO_TECNICA.md              # Este arquivo
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 Instruções de Deployment

### Pré-requisitos

- Node.js 22+
- PostgreSQL 12+
- npm ou pnpm

### Instalação Local

```bash
# 1. Clonar repositório
git clone <repo-url>
cd hospital-system

# 2. Instalar dependências
pnpm install

# 3. Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com suas credenciais

# 4. Executar migrações
pnpm db:push

# 5. Popular banco com dados de teste
pnpm seed

# 6. Iniciar em desenvolvimento
pnpm dev
```

### Build para Produção

```bash
# 1. Build do frontend
pnpm build

# 2. Build do servidor
pnpm build

# 3. Iniciar em produção
NODE_ENV=production pnpm start
```

### Variáveis de Ambiente

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/medicare

# JWT
JWT_SECRET=sua-chave-secreta-muito-segura

# Server
NODE_ENV=development
PORT=3000

# Frontend API
VITE_API_URL=http://localhost:3000/api
```

---

## 🧪 Testes

### Executar Testes

```bash
# Testes unitários
pnpm test

# Testes com cobertura
pnpm test:coverage

# Testes em modo watch
pnpm test:watch
```

### Exemplo de Teste

```typescript
import { describe, it, expect } from 'vitest';
import { usePacientes } from '@/hooks/usePacientes';

describe('usePacientes', () => {
  it('deve carregar lista de pacientes', async () => {
    const { fetchPacientes, pacientes } = usePacientes();
    await fetchPacientes(1, 10);
    expect(pacientes.length).toBeGreaterThan(0);
  });
});
```

---

## 📱 PWA (Progressive Web App)

### Recursos Implementados

- ✅ **Manifest.json** com metadados da aplicação
- ✅ **Service Worker** para cache offline
- ✅ **Ícones** em múltiplas resoluções
- ✅ **Instalação** em home screen
- ✅ **Modo offline** com fallback
- ✅ **Responsivo** mobile-first

### Instalação do PWA

1. Abrir site no navegador
2. Clicar em "Instalar" (Chrome/Edge) ou "Adicionar à Home" (Safari)
3. Usar como aplicativo nativo

---

## 🎨 Design System

### Cores (Dark Mode Premium)

| Elemento | Cor | Código |
|----------|-----|--------|
| Background | Preto profundo | `#0D1117` |
| Foreground | Branco | `#FFFFFF` |
| Primary | Ciano | `#00D9FF` |
| Accent | Azul escuro | `#1E3A5F` |
| Muted | Cinza | `#6B7280` |

### Tipografia

- **Headline:** Space Grotesk 32px bold
- **Subtitle:** DM Sans 20px medium
- **Body:** DM Sans 16px regular

### Componentes

Todos os componentes usam **shadcn/ui** com customizações Tailwind:

- Button, Input, Dialog, Card
- Table, Select, Checkbox
- Toast (Sonner), Tooltip

---

## 📊 Performance

### Otimizações Implementadas

| Otimização | Implementação |
|-----------|----------------|
| **Code Splitting** | Lazy loading de rotas com Wouter |
| **Caching** | Service Worker com cache-first |
| **Compressão** | Gzip no servidor |
| **Minificação** | Vite build otimizado |
| **Lazy Images** | loading="lazy" em imagens |
| **Paginação** | Limita dados por página |

### Métricas Esperadas

- **FCP:** < 1.5s
- **LCP:** < 2.5s
- **CLS:** < 0.1
- **TTI:** < 3.5s

---

## 🔄 Fluxo de Desenvolvimento

### 1. Adicionar Nova Feature

```bash
# 1. Criar branch
git checkout -b feature/nova-funcionalidade

# 2. Implementar no backend (models + routes)
# 3. Criar hook customizado no frontend
# 4. Implementar página/componente
# 5. Adicionar testes

# 6. Commit e push
git add .
git commit -m "feat: adicionar nova funcionalidade"
git push origin feature/nova-funcionalidade
```

### 2. Deploy

```bash
# 1. Criar checkpoint
pnpm checkpoint

# 2. Build
pnpm build

# 3. Deploy (via Manus UI)
# Clicar em "Publish"
```

---

## 🐛 Troubleshooting

### Erro: "Database connection failed"

**Solução:** Verificar `DATABASE_URL` em `.env` e se PostgreSQL está rodando

### Erro: "JWT token expired"

**Solução:** Usar refresh token para renovar access token automaticamente

### Erro: "CORS error"

**Solução:** Verificar `CORS_ORIGIN` no servidor e origem da requisição


