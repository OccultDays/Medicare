# MediCare API REST - Documentação

## Visão Geral

A **MediCare API REST** é uma API completa para gerenciamento de um sistema hospitalar, desenvolvida com **Node.js + Express + Sequelize + PostgreSQL**.

**Base URL:** `http://localhost:3000/api`

**Autenticação:** JWT (Bearer Token)

---

## 🔐 Autenticação

Todos os endpoints (exceto `/auth/login` e `/auth/refresh`) requerem autenticação via JWT.

### Headers Obrigatórios

```
Authorization: Bearer <access_token>
Content-Type: application/json
```

### Tokens

- **Access Token**: Válido por 15 minutos
- **Refresh Token**: Válido por 7 dias

---

## 📋 Endpoints

### 1. AUTENTICAÇÃO

#### Login
```
POST /api/auth/login
```

**Request:**
```json
{
  "email": "admin@medicare.com",
  "password": "admin123"
}
```

**Response (200):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "email": "admin@medicare.com",
    "name": "Administrador Sistema",
    "role": "admin"
  }
}
```

---

#### Refresh Token
```
POST /api/auth/refresh
```

**Request:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Response (200):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

#### Get Current User
```
GET /api/auth/me
```

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "id": 1,
  "email": "admin@medicare.com",
  "name": "Administrador Sistema",
  "role": "admin",
  "createdAt": "2026-05-18T10:00:00.000Z",
  "updatedAt": "2026-05-18T10:00:00.000Z"
}
```

---

#### Logout
```
POST /api/auth/logout
```

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "message": "Logout realizado com sucesso"
}
```

---

### 2. PACIENTES

#### Listar Pacientes
```
GET /api/pacientes?page=1&limit=10&status=ativo&search=João
```

**Query Parameters:**
- `page` (int): Página (padrão: 1)
- `limit` (int): Itens por página (padrão: 10)
- `status` (string): Filtrar por status (ativo, internado, alta, óbito)
- `search` (string): Buscar por nome

**Response (200):**
```json
{
  "total": 50,
  "page": 1,
  "limit": 10,
  "pages": 5,
  "data": [
    {
      "id": 1,
      "nome": "João Silva Santos",
      "cpf": "12345678901",
      "dataNascimento": "1980-05-15T00:00:00.000Z",
      "genero": "M",
      "telefone": "(11) 98765-4321",
      "email": "joao@email.com",
      "endereco": "Rua A, 123",
      "cidade": "São Paulo",
      "estado": "SP",
      "cep": "01310100",
      "status": "internado",
      "leito": "301",
      "observacoes": null,
      "createdAt": "2026-05-18T10:00:00.000Z",
      "updatedAt": "2026-05-18T10:00:00.000Z"
    }
  ]
}
```

---

#### Obter Paciente por ID
```
GET /api/pacientes/:id
```

**Response (200):**
```json
{
  "id": 1,
  "nome": "João Silva Santos",
  "cpf": "12345678901",
  "dataNascimento": "1980-05-15T00:00:00.000Z",
  "genero": "M",
  "telefone": "(11) 98765-4321",
  "email": "joao@email.com",
  "endereco": "Rua A, 123",
  "cidade": "São Paulo",
  "estado": "SP",
  "cep": "01310100",
  "status": "internado",
  "leito": "301",
  "observacoes": null,
  "createdAt": "2026-05-18T10:00:00.000Z",
  "updatedAt": "2026-05-18T10:00:00.000Z"
}
```

---

#### Criar Paciente
```
POST /api/pacientes
```

**Request:**
```json
{
  "nome": "Maria Silva",
  "cpf": "98765432109",
  "dataNascimento": "1975-03-22",
  "genero": "F",
  "telefone": "(11) 99876-5432",
  "email": "maria@email.com",
  "endereco": "Avenida B, 456",
  "cidade": "São Paulo",
  "estado": "SP",
  "cep": "02154000"
}
```

**Response (201):**
```json
{
  "id": 2,
  "nome": "Maria Silva",
  "cpf": "98765432109",
  "dataNascimento": "1975-03-22T00:00:00.000Z",
  "genero": "F",
  "telefone": "(11) 99876-5432",
  "email": "maria@email.com",
  "endereco": "Avenida B, 456",
  "cidade": "São Paulo",
  "estado": "SP",
  "cep": "02154000",
  "status": "ativo",
  "leito": null,
  "observacoes": null,
  "createdAt": "2026-05-18T10:00:00.000Z",
  "updatedAt": "2026-05-18T10:00:00.000Z"
}
```

---

#### Atualizar Paciente
```
PUT /api/pacientes/:id
```

**Request:**
```json
{
  "status": "internado",
  "leito": "205",
  "observacoes": "Paciente em boa recuperação"
}
```

**Response (200):**
```json
{
  "id": 2,
  "nome": "Maria Silva",
  "cpf": "98765432109",
  "dataNascimento": "1975-03-22T00:00:00.000Z",
  "genero": "F",
  "telefone": "(11) 99876-5432",
  "email": "maria@email.com",
  "endereco": "Avenida B, 456",
  "cidade": "São Paulo",
  "estado": "SP",
  "cep": "02154000",
  "status": "internado",
  "leito": "205",
  "observacoes": "Paciente em boa recuperação",
  "createdAt": "2026-05-18T10:00:00.000Z",
  "updatedAt": "2026-05-18T10:00:00.000Z"
}
```

---

#### Deletar Paciente
```
DELETE /api/pacientes/:id
```

**Response (200):**
```json
{
  "message": "Paciente deletado com sucesso"
}
```

---

### 3. MÉDICOS

#### Listar Médicos
```
GET /api/medicos?page=1&limit=10&especialidade=Cardiologia&disponibilidade=disponivel
```

**Query Parameters:**
- `page` (int): Página (padrão: 1)
- `limit` (int): Itens por página (padrão: 10)
- `especialidade` (string): Filtrar por especialidade
- `disponibilidade` (string): disponivel, ocupado, indisponivel
- `search` (string): Buscar por nome

**Response (200):**
```json
{
  "total": 10,
  "page": 1,
  "limit": 10,
  "pages": 1,
  "data": [
    {
      "id": 1,
      "nome": "Dr. Carlos Mendes",
      "crm": "123456/SP",
      "especialidade": "Cardiologia",
      "telefone": "(11) 98765-1234",
      "email": "carlos.mendes@hospital.com",
      "disponibilidade": "disponivel",
      "consultorioNumero": "301",
      "observacoes": null,
      "createdAt": "2026-05-18T10:00:00.000Z",
      "updatedAt": "2026-05-18T10:00:00.000Z"
    }
  ]
}
```

---

#### Criar Médico
```
POST /api/medicos
```

**Request:**
```json
{
  "nome": "Dr. Roberto Santos",
  "crm": "789012/SP",
  "especialidade": "Ortopedia",
  "telefone": "(11) 97654-3210",
  "email": "roberto.santos@hospital.com",
  "consultorioNumero": "303"
}
```

**Response (201):**
```json
{
  "id": 3,
  "nome": "Dr. Roberto Santos",
  "crm": "789012/SP",
  "especialidade": "Ortopedia",
  "telefone": "(11) 97654-3210",
  "email": "roberto.santos@hospital.com",
  "disponibilidade": "disponivel",
  "consultorioNumero": "303",
  "observacoes": null,
  "createdAt": "2026-05-18T10:00:00.000Z",
  "updatedAt": "2026-05-18T10:00:00.000Z"
}
```

---

### 4. CONSULTAS

#### Listar Consultas
```
GET /api/consultas?page=1&limit=10&status=agendada&pacienteId=1&medicoId=1
```

**Query Parameters:**
- `page` (int): Página (padrão: 1)
- `limit` (int): Itens por página (padrão: 10)
- `status` (string): agendada, realizada, cancelada, ausente
- `tipo` (string): presencial, teleconsulta, retorno
- `pacienteId` (int): Filtrar por paciente
- `medicoId` (int): Filtrar por médico

**Response (200):**
```json
{
  "total": 5,
  "page": 1,
  "limit": 10,
  "pages": 1,
  "data": [
    {
      "id": 1,
      "pacienteId": 1,
      "medicoId": 1,
      "dataHora": "2026-05-20T10:00:00.000Z",
      "tipo": "presencial",
      "motivo": "Avaliação cardiológica",
      "status": "agendada",
      "anotacoes": null,
      "prescricao": null,
      "createdAt": "2026-05-18T10:00:00.000Z",
      "updatedAt": "2026-05-18T10:00:00.000Z",
      "paciente": {
        "id": 1,
        "nome": "João Silva Santos",
        "cpf": "12345678901"
      },
      "medico": {
        "id": 1,
        "nome": "Dr. Carlos Mendes",
        "especialidade": "Cardiologia"
      }
    }
  ]
}
```

---

#### Criar Consulta
```
POST /api/consultas
```

**Request:**
```json
{
  "pacienteId": 1,
  "medicoId": 1,
  "dataHora": "2026-05-25T14:00:00",
  "tipo": "presencial",
  "motivo": "Avaliação de rotina"
}
```

**Response (201):**
```json
{
  "id": 4,
  "pacienteId": 1,
  "medicoId": 1,
  "dataHora": "2026-05-25T14:00:00.000Z",
  "tipo": "presencial",
  "motivo": "Avaliação de rotina",
  "status": "agendada",
  "anotacoes": null,
  "prescricao": null,
  "createdAt": "2026-05-18T10:00:00.000Z",
  "updatedAt": "2026-05-18T10:00:00.000Z",
  "paciente": { ... },
  "medico": { ... }
}
```

---

#### Atualizar Consulta
```
PUT /api/consultas/:id
```

**Request:**
```json
{
  "status": "realizada",
  "anotacoes": "Paciente apresenta melhora significativa",
  "prescricao": "Continuar com medicação atual"
}
```

**Response (200):**
```json
{
  "id": 1,
  "pacienteId": 1,
  "medicoId": 1,
  "dataHora": "2026-05-20T10:00:00.000Z",
  "tipo": "presencial",
  "motivo": "Avaliação cardiológica",
  "status": "realizada",
  "anotacoes": "Paciente apresenta melhora significativa",
  "prescricao": "Continuar com medicação atual",
  "createdAt": "2026-05-18T10:00:00.000Z",
  "updatedAt": "2026-05-18T10:00:00.000Z",
  "paciente": { ... },
  "medico": { ... }
}
```

---

### 5. PRONTUÁRIOS

#### Listar Prontuários
```
GET /api/prontuarios?page=1&limit=10&pacienteId=1
```

**Query Parameters:**
- `page` (int): Página (padrão: 1)
- `limit` (int): Itens por página (padrão: 10)
- `pacienteId` (int): Filtrar por paciente

**Response (200):**
```json
{
  "total": 2,
  "page": 1,
  "limit": 10,
  "pages": 1,
  "data": [
    {
      "id": 1,
      "pacienteId": 1,
      "dataAtendimento": "2026-05-18T10:00:00.000Z",
      "queixa": "Dor no peito e falta de ar",
      "historico": "Paciente com histórico de hipertensão",
      "diagnostico": "Insuficiência cardíaca leve",
      "medicamentos": "[{\"nome\":\"Enalapril\",\"dosagem\":\"10mg\",\"frequencia\":\"2x ao dia\"}]",
      "examesSolicitados": "[\"ECG\",\"Ecocardiograma\",\"Hemograma\"]",
      "condutaClinica": "Internação para monitoramento",
      "medicoResponsavel": "Dr. Carlos Mendes",
      "createdAt": "2026-05-18T10:00:00.000Z",
      "updatedAt": "2026-05-18T10:00:00.000Z",
      "paciente": {
        "id": 1,
        "nome": "João Silva Santos",
        "cpf": "12345678901"
      }
    }
  ]
}
```

---

#### Obter Prontuários de um Paciente
```
GET /api/prontuarios/paciente/:pacienteId
```

**Response (200):**
```json
[
  {
    "id": 1,
    "pacienteId": 1,
    "dataAtendimento": "2026-05-18T10:00:00.000Z",
    "queixa": "Dor no peito e falta de ar",
    "historico": "Paciente com histórico de hipertensão",
    "diagnostico": "Insuficiência cardíaca leve",
    "medicamentos": "[...]",
    "examesSolicitados": "[...]",
    "condutaClinica": "Internação para monitoramento",
    "medicoResponsavel": "Dr. Carlos Mendes",
    "createdAt": "2026-05-18T10:00:00.000Z",
    "updatedAt": "2026-05-18T10:00:00.000Z",
    "paciente": { ... }
  }
]
```

---

#### Criar Prontuário
```
POST /api/prontuarios
```

**Request:**
```json
{
  "pacienteId": 1,
  "queixa": "Dor no peito",
  "historico": "Paciente com histórico de hipertensão",
  "diagnostico": "Angina pectoris",
  "medicamentos": [
    { "nome": "Enalapril", "dosagem": "10mg", "frequencia": "2x ao dia" }
  ],
  "examesSolicitados": ["ECG", "Ecocardiograma"],
  "condutaClinica": "Internação para monitoramento",
  "medicoResponsavel": "Dr. Carlos Mendes"
}
```

**Response (201):**
```json
{
  "id": 3,
  "pacienteId": 1,
  "dataAtendimento": "2026-05-18T10:00:00.000Z",
  "queixa": "Dor no peito",
  "historico": "Paciente com histórico de hipertensão",
  "diagnostico": "Angina pectoris",
  "medicamentos": "[...]",
  "examesSolicitados": "[...]",
  "condutaClinica": "Internação para monitoramento",
  "medicoResponsavel": "Dr. Carlos Mendes",
  "createdAt": "2026-05-18T10:00:00.000Z",
  "updatedAt": "2026-05-18T10:00:00.000Z",
  "paciente": { ... }
}
```

---

#### Atualizar Prontuário
```
PUT /api/prontuarios/:id
```

**Request:**
```json
{
  "diagnostico": "Angina pectoris estável",
  "condutaClinica": "Acompanhamento ambulatorial"
}
```

**Response (200):**
```json
{
  "id": 3,
  "pacienteId": 1,
  "dataAtendimento": "2026-05-18T10:00:00.000Z",
  "queixa": "Dor no peito",
  "historico": "Paciente com histórico de hipertensão",
  "diagnostico": "Angina pectoris estável",
  "medicamentos": "[...]",
  "examesSolicitados": "[...]",
  "condutaClinica": "Acompanhamento ambulatorial",
  "medicoResponsavel": "Dr. Carlos Mendes",
  "createdAt": "2026-05-18T10:00:00.000Z",
  "updatedAt": "2026-05-18T10:00:00.000Z",
  "paciente": { ... }
}
```

---

## 🔄 Modelos de Dados

### User
```typescript
{
  id: number
  email: string (unique)
  password: string (bcrypt)
  name: string
  role: 'admin' | 'medico' | 'enfermeiro'
  createdAt: Date
  updatedAt: Date
}
```

### Paciente
```typescript
{
  id: number
  nome: string
  cpf: string (unique)
  dataNascimento: Date
  genero: 'M' | 'F' | 'O'
  telefone?: string
  email?: string
  endereco?: string
  cidade?: string
  estado?: string
  cep?: string
  status: 'ativo' | 'internado' | 'alta' | 'óbito'
  leito?: string
  observacoes?: string
  createdAt: Date
  updatedAt: Date
}
```

### Medico
```typescript
{
  id: number
  nome: string
  crm: string (unique)
  especialidade: string
  telefone?: string
  email?: string
  disponibilidade: 'disponivel' | 'ocupado' | 'indisponivel'
  consultorioNumero?: string
  observacoes?: string
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
  anotacoes?: string
  prescricao?: string
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
  historico?: string
  diagnostico?: string
  medicamentos?: string (JSON)
  examesSolicitados?: string (JSON)
  condutaClinica?: string
  medicoResponsavel: string
  createdAt: Date
  updatedAt: Date
}
```

---

## 🔍 Códigos de Erro

| Código | Mensagem | Descrição |
|--------|----------|-----------|
| 200 | OK | Requisição bem-sucedida |
| 201 | Created | Recurso criado com sucesso |
| 400 | Bad Request | Dados inválidos ou incompletos |
| 401 | Unauthorized | Token inválido ou expirado |
| 403 | Forbidden | Acesso negado (permissões insuficientes) |
| 404 | Not Found | Recurso não encontrado |
| 500 | Internal Server Error | Erro no servidor |

---

## 🚀 Exemplos de Uso

### cURL

```bash
# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@medicare.com",
    "password": "admin123"
  }'

# Listar pacientes
curl -X GET "http://localhost:3000/api/pacientes?page=1&limit=10" \
  -H "Authorization: Bearer <access_token>"

# Criar paciente
curl -X POST http://localhost:3000/api/pacientes \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "cpf": "12345678901",
    "dataNascimento": "1980-05-15",
    "genero": "M"
  }'
```

---

## 📝 Notas

- Todos os timestamps estão em UTC (ISO 8601)
- Senhas são armazenadas com hash bcrypt
- Tokens JWT expiram automaticamente
- Paginação começa em página 1
- Campos opcionais podem ser `null`

---