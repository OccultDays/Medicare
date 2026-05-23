# Guia de Uso - API REST MediCare
  
**Base URL:** `http://localhost:3000/api` (desenvolvimento)  
**Autenticação:** JWT Bearer Token

---

## Índice

1. [Autenticação](#autenticação)
2. [Pacientes](#pacientes)
3. [Médicos](#médicos)
4. [Consultas](#consultas)
5. [Prontuários](#prontuários)
6. [Tratamento de Erros](#tratamento-de-erros)
7. [Exemplos cURL](#exemplos-curl)

---

## Autenticação

### Login

Obtém access token e refresh token para autenticação.

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@medicare.com",
  "password": "admin123"
}
```

**Response (200 OK):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "admin@medicare.com",
    "name": "Administrador",
    "role": "admin"
  }
}
```

### Refresh Token

Renova o access token usando o refresh token.

```http
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (200 OK):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Logout

Invalida a sessão do usuário.

```http
POST /api/auth/logout
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200 OK):**
```json
{
  "message": "Logout realizado com sucesso"
}
```

### Obter Dados do Usuário

Retorna os dados do usuário autenticado.

```http
GET /api/auth/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200 OK):**
```json
{
  "id": 1,
  "email": "admin@medicare.com",
  "name": "Administrador",
  "role": "admin",
  "createdAt": "2026-05-18T10:00:00.000Z",
  "lastSignedIn": "2026-05-18T14:30:00.000Z"
}
```

### Registrar Novo Usuário

Cria uma nova conta de usuário (apenas admin).

```http
POST /api/auth/register
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "email": "novo@medicare.com",
  "password": "senha123",
  "name": "Novo Usuário",
  "role": "medico"
}
```

**Response (201 Created):**
```json
{
  "id": 2,
  "email": "novo@medicare.com",
  "name": "Novo Usuário",
  "role": "medico"
}
```

---

## Pacientes

### Listar Pacientes

Retorna lista paginada de pacientes.

```http
GET /api/pacientes?page=1&limit=10&status=ativo&search=João
Authorization: Bearer <token>
```

**Query Parameters:**

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `page` | integer | Número da página (padrão: 1) |
| `limit` | integer | Itens por página (padrão: 10) |
| `status` | string | Filtrar por status (ativo, internado, alta, óbito) |
| `search` | string | Buscar por nome ou CPF |

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": 1,
      "nome": "João Silva",
      "cpf": "12345678901",
      "dataNascimento": "1990-05-15",
      "genero": "M",
      "telefone": "(11) 98765-4321",
      "email": "joao@example.com",
      "endereco": "Rua A, 123",
      "cidade": "São Paulo",
      "estado": "SP",
      "cep": "01310100",
      "status": "ativo",
      "leito": null,
      "observacoes": null,
      "createdAt": "2026-05-18T10:00:00.000Z",
      "updatedAt": "2026-05-18T10:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 15,
    "pages": 2
  }
}
```

### Obter Paciente por ID

```http
GET /api/pacientes/1
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "id": 1,
  "nome": "João Silva",
  "cpf": "12345678901",
  "dataNascimento": "1990-05-15",
  "genero": "M",
  "telefone": "(11) 98765-4321",
  "email": "joao@example.com",
  "endereco": "Rua A, 123",
  "cidade": "São Paulo",
  "estado": "SP",
  "cep": "01310100",
  "status": "ativo",
  "leito": null,
  "observacoes": "Paciente com histórico de diabetes",
  "createdAt": "2026-05-18T10:00:00.000Z",
  "updatedAt": "2026-05-18T10:00:00.000Z"
}
```

### Criar Paciente

```http
POST /api/pacientes
Authorization: Bearer <token>
Content-Type: application/json

{
  "nome": "Maria Santos",
  "cpf": "98765432101",
  "dataNascimento": "1985-03-20",
  "genero": "F",
  "telefone": "(11) 91234-5678",
  "email": "maria@example.com",
  "endereco": "Rua B, 456",
  "cidade": "São Paulo",
  "estado": "SP",
  "cep": "02310200",
  "status": "ativo"
}
```

**Response (201 Created):**
```json
{
  "id": 2,
  "nome": "Maria Santos",
  "cpf": "98765432101",
  "dataNascimento": "1985-03-20",
  "genero": "F",
  "telefone": "(11) 91234-5678",
  "email": "maria@example.com",
  "endereco": "Rua B, 456",
  "cidade": "São Paulo",
  "estado": "SP",
  "cep": "02310200",
  "status": "ativo",
  "leito": null,
  "observacoes": null,
  "createdAt": "2026-05-18T14:35:00.000Z",
  "updatedAt": "2026-05-18T14:35:00.000Z"
}
```

### Atualizar Paciente

```http
PUT /api/pacientes/1
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "internado",
  "leito": "301",
  "observacoes": "Internado para cirurgia eletiva"
}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "nome": "João Silva",
  "cpf": "12345678901",
  "status": "internado",
  "leito": "301",
  "observacoes": "Internado para cirurgia eletiva",
  "updatedAt": "2026-05-18T14:40:00.000Z"
}
```

### Deletar Paciente

```http
DELETE /api/pacientes/1
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "message": "Paciente deletado com sucesso"
}
```

---

## Médicos

### Listar Médicos

```http
GET /api/medicos?page=1&limit=10&especialidade=Cardiologia&disponibilidade=disponivel
Authorization: Bearer <token>
```

**Query Parameters:**

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `page` | integer | Número da página (padrão: 1) |
| `limit` | integer | Itens por página (padrão: 10) |
| `especialidade` | string | Filtrar por especialidade |
| `disponibilidade` | string | Filtrar por disponibilidade |
| `search` | string | Buscar por nome ou CRM |

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": 1,
      "nome": "Dr. Carlos Silva",
      "crm": "123456",
      "especialidade": "Cardiologia",
      "telefone": "(11) 99999-8888",
      "email": "carlos@medicare.com",
      "disponibilidade": "disponivel",
      "consultorioNumero": "201",
      "observacoes": null,
      "createdAt": "2026-05-18T10:00:00.000Z",
      "updatedAt": "2026-05-18T10:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 8,
    "pages": 1
  }
}
```

### Criar Médico

```http
POST /api/medicos
Authorization: Bearer <token>
Content-Type: application/json

{
  "nome": "Dra. Ana Costa",
  "crm": "654321",
  "especialidade": "Neurologia",
  "telefone": "(11) 98888-7777",
  "email": "ana@medicare.com",
  "disponibilidade": "disponivel",
  "consultorioNumero": "305"
}
```

**Response (201 Created):**
```json
{
  "id": 2,
  "nome": "Dra. Ana Costa",
  "crm": "654321",
  "especialidade": "Neurologia",
  "telefone": "(11) 98888-7777",
  "email": "ana@medicare.com",
  "disponibilidade": "disponivel",
  "consultorioNumero": "305",
  "createdAt": "2026-05-18T14:45:00.000Z",
  "updatedAt": "2026-05-18T14:45:00.000Z"
}
```

### Atualizar Médico

```http
PUT /api/medicos/1
Authorization: Bearer <token>
Content-Type: application/json

{
  "disponibilidade": "ocupado"
}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "nome": "Dr. Carlos Silva",
  "disponibilidade": "ocupado",
  "updatedAt": "2026-05-18T14:50:00.000Z"
}
```

### Deletar Médico

```http
DELETE /api/medicos/1
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "message": "Médico deletado com sucesso"
}
```

---

## Consultas

### Listar Consultas

```http
GET /api/consultas?page=1&limit=10&status=agendada&tipo=presencial&pacienteId=1&medicoId=2
Authorization: Bearer <token>
```

**Query Parameters:**

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `page` | integer | Número da página (padrão: 1) |
| `limit` | integer | Itens por página (padrão: 10) |
| `status` | string | Filtrar por status (agendada, realizada, cancelada, ausente) |
| `tipo` | string | Filtrar por tipo (presencial, teleconsulta, retorno) |
| `pacienteId` | integer | Filtrar por paciente |
| `medicoId` | integer | Filtrar por médico |

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": 1,
      "pacienteId": 1,
      "medicoId": 1,
      "dataHora": "2026-05-25T14:00:00.000Z",
      "tipo": "presencial",
      "motivo": "Consulta de rotina",
      "status": "agendada",
      "anotacoes": null,
      "prescricao": null,
      "createdAt": "2026-05-18T10:00:00.000Z",
      "updatedAt": "2026-05-18T10:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 5,
    "pages": 1
  }
}
```

### Agendar Consulta

```http
POST /api/consultas
Authorization: Bearer <token>
Content-Type: application/json

{
  "pacienteId": 1,
  "medicoId": 1,
  "dataHora": "2026-05-25T14:00:00.000Z",
  "tipo": "presencial",
  "motivo": "Consulta de rotina"
}
```

**Response (201 Created):**
```json
{
  "id": 2,
  "pacienteId": 1,
  "medicoId": 1,
  "dataHora": "2026-05-25T14:00:00.000Z",
  "tipo": "presencial",
  "motivo": "Consulta de rotina",
  "status": "agendada",
  "createdAt": "2026-05-18T14:55:00.000Z",
  "updatedAt": "2026-05-18T14:55:00.000Z"
}
```

### Atualizar Consulta

```http
PUT /api/consultas/1
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "realizada",
  "anotacoes": "Paciente apresenta melhora",
  "prescricao": "Dipirona 500mg a cada 6 horas"
}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "status": "realizada",
  "anotacoes": "Paciente apresenta melhora",
  "prescricao": "Dipirona 500mg a cada 6 horas",
  "updatedAt": "2026-05-18T15:00:00.000Z"
}
```

### Cancelar Consulta

```http
PUT /api/consultas/1
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "cancelada"
}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "status": "cancelada",
  "updatedAt": "2026-05-18T15:05:00.000Z"
}
```

### Deletar Consulta

```http
DELETE /api/consultas/1
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "message": "Consulta deletada com sucesso"
}
```

---

## Prontuários

### Listar Prontuários

```http
GET /api/prontuarios?page=1&limit=10&pacienteId=1
Authorization: Bearer <token>
```

**Query Parameters:**

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `page` | integer | Número da página (padrão: 1) |
| `limit` | integer | Itens por página (padrão: 10) |
| `pacienteId` | integer | Filtrar por paciente |

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": 1,
      "pacienteId": 1,
      "dataAtendimento": "2026-05-18T14:00:00.000Z",
      "queixa": "Dor de cabeça",
      "historico": "Paciente relata dor há 3 dias",
      "diagnostico": "Enxaqueca",
      "medicamentos": [
        {
          "nome": "Dipirona",
          "dosagem": "500mg",
          "frequencia": "A cada 6 horas"
        }
      ],
      "examesSolicitados": [
        {
          "tipo": "Ressonância Magnética",
          "urgencia": "Não"
        }
      ],
      "condutaClinica": "Repouso e medicação",
      "medicoResponsavel": "Dr. Carlos Silva",
      "createdAt": "2026-05-18T14:00:00.000Z",
      "updatedAt": "2026-05-18T14:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 3,
    "pages": 1
  }
}
```

### Obter Prontuários por Paciente

```http
GET /api/prontuarios/paciente/1
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": 1,
      "pacienteId": 1,
      "dataAtendimento": "2026-05-18T14:00:00.000Z",
      "queixa": "Dor de cabeça",
      "diagnostico": "Enxaqueca",
      "medicoResponsavel": "Dr. Carlos Silva",
      "createdAt": "2026-05-18T14:00:00.000Z"
    }
  ]
}
```

### Criar Prontuário

```http
POST /api/prontuarios
Authorization: Bearer <token>
Content-Type: application/json

{
  "pacienteId": 1,
  "dataAtendimento": "2026-05-18T14:00:00.000Z",
  "queixa": "Dor no peito",
  "historico": "Paciente relata dor há 2 horas",
  "diagnostico": "Angina pectoris",
  "medicamentos": [
    {
      "nome": "Nitroglicerina",
      "dosagem": "0.5mg",
      "frequencia": "Conforme necessário"
    }
  ],
  "examesSolicitados": [
    {
      "tipo": "Eletrocardiograma",
      "urgencia": "Sim"
    }
  ],
  "condutaClinica": "Internação para monitoramento",
  "medicoResponsavel": "Dr. Carlos Silva"
}
```

**Response (201 Created):**
```json
{
  "id": 2,
  "pacienteId": 1,
  "dataAtendimento": "2026-05-18T14:00:00.000Z",
  "queixa": "Dor no peito",
  "diagnostico": "Angina pectoris",
  "medicoResponsavel": "Dr. Carlos Silva",
  "createdAt": "2026-05-18T15:10:00.000Z",
  "updatedAt": "2026-05-18T15:10:00.000Z"
}
```

### Atualizar Prontuário

```http
PUT /api/prontuarios/1
Authorization: Bearer <token>
Content-Type: application/json

{
  "diagnostico": "Enxaqueca crônica",
  "condutaClinica": "Manter medicação e acompanhamento"
}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "diagnostico": "Enxaqueca crônica",
  "condutaClinica": "Manter medicação e acompanhamento",
  "updatedAt": "2026-05-18T15:15:00.000Z"
}
```

### Deletar Prontuário

```http
DELETE /api/prontuarios/1
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "message": "Prontuário deletado com sucesso"
}
```

---

## Tratamento de Erros

### Erro 400 - Bad Request

```json
{
  "error": "Validação falhou",
  "details": {
    "nome": "Campo obrigatório",
    "cpf": "CPF inválido"
  }
}
```

### Erro 401 - Unauthorized

```json
{
  "error": "Token inválido ou expirado"
}
```

### Erro 403 - Forbidden

```json
{
  "error": "Você não tem permissão para acessar este recurso"
}
```

### Erro 404 - Not Found

```json
{
  "error": "Recurso não encontrado"
}
```

### Erro 409 - Conflict

```json
{
  "error": "CPF já cadastrado no sistema"
}
```

### Erro 500 - Internal Server Error

```json
{
  "error": "Erro interno do servidor"
}
```

---

## Exemplos cURL

### Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@medicare.com",
    "password": "admin123"
  }'
```

### Listar Pacientes

```bash
curl -X GET "http://localhost:3000/api/pacientes?page=1&limit=10" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Criar Paciente

```bash
curl -X POST http://localhost:3000/api/pacientes \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "cpf": "12345678901",
    "dataNascimento": "1990-05-15",
    "genero": "M",
    "status": "ativo"
  }'
```

### Agendar Consulta

```bash
curl -X POST http://localhost:3000/api/consultas \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "pacienteId": 1,
    "medicoId": 1,
    "dataHora": "2026-05-25T14:00:00.000Z",
    "tipo": "presencial",
    "motivo": "Consulta de rotina"
  }'
```
