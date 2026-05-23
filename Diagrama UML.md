# Diagrama UML - MediCare Sistema Hospitalar

## Diagrama de Classes

```mermaid
classDiagram
    class User {
        -int id
        -string email
        -string password
        -string name
        -enum role
        -Date createdAt
        -Date updatedAt
        -Date lastSignedIn
        +login()
        +logout()
        +refreshToken()
        +updateProfile()
    }

    class Paciente {
        -int id
        -string nome
        -string cpf
        -Date dataNascimento
        -enum genero
        -string telefone
        -string email
        -string endereco
        -string cidade
        -string estado
        -string cep
        -enum status
        -string leito
        -string observacoes
        -Date createdAt
        -Date updatedAt
        +criar()
        +atualizar()
        +deletar()
        +obterConsultas()
        +obterProntuarios()
    }

    class Medico {
        -int id
        -string nome
        -string crm
        -string especialidade
        -string telefone
        -string email
        -enum disponibilidade
        -string consultorioNumero
        -string observacoes
        -Date createdAt
        -Date updatedAt
        +criar()
        +atualizar()
        +deletar()
        +agendar Consulta()
        +obterConsultas()
    }

    class Consulta {
        -int id
        -int pacienteId
        -int medicoId
        -Date dataHora
        -enum tipo
        -string motivo
        -enum status
        -string anotacoes
        -string prescricao
        -Date createdAt
        -Date updatedAt
        +agendar()
        +realizarConsulta()
        +cancelar()
        +adicionarPrescricao()
    }

    class Prontuario {
        -int id
        -int pacienteId
        -Date dataAtendimento
        -string queixa
        -string historico
        -string diagnostico
        -JSON medicamentos
        -JSON examesSolicitados
        -string condutaClinica
        -string medicoResponsavel
        -Date createdAt
        -Date updatedAt
        +criar()
        +atualizar()
        +adicionarMedicamento()
        +solicitarExame()
    }

    class APIService {
        -string baseURL
        -string token
        +login()
        +logout()
        +refreshToken()
        +get()
        +post()
        +put()
        +delete()
    }

    class AuthContext {
        -User user
        -string token
        -boolean isAuthenticated
        +login()
        +logout()
        +refreshToken()
        +updateUser()
    }

    class Dashboard {
        -int totalPacientes
        -int pacientesInternados
        -int consultasAgendadas
        +carregarEstatisticas()
        +renderizarGraficos()
    }

    class PaginaPacientes {
        -List~Paciente~ pacientes
        -int page
        -int limit
        +listar()
        +criar()
        +editar()
        +deletar()
        +buscar()
    }

    class PaginaMedicos {
        -List~Medico~ medicos
        -int page
        -int limit
        +listar()
        +criar()
        +editar()
        +deletar()
        +buscar()
    }

    class PaginaConsultas {
        -List~Consulta~ consultas
        -int page
        -int limit
        +listar()
        +agendar()
        +editar()
        +cancelar()
        +buscar()
    }

    class PaginaProntuarios {
        -List~Prontuario~ prontuarios
        -int page
        -int limit
        +listar()
        +criar()
        +editar()
        +deletar()
        +buscar()
    }

    %% Relacionamentos
    Paciente "1" --> "*" Consulta : realiza
    Medico "1" --> "*" Consulta : realiza
    Paciente "1" --> "*" Prontuario : possui
    Medico "1" --> "*" Prontuario : responsável
    
    APIService --> AuthContext : autentica
    AuthContext --> User : gerencia
    
    Dashboard --> APIService : consome
    PaginaPacientes --> APIService : consome
    PaginaMedicos --> APIService : consome
    PaginaConsultas --> APIService : consome
    PaginaProntuarios --> APIService : consome
    
    PaginaPacientes --> Paciente : manipula
    PaginaMedicos --> Medico : manipula
    PaginaConsultas --> Consulta : manipula
    PaginaProntuarios --> Prontuario : manipula
```

---

## Diagrama de Entidade-Relacionamento (ER)

```mermaid
erDiagram
    USERS ||--o{ CONSULTAS : realiza
    USERS ||--o{ PRONTUARIOS : responsavel
    PACIENTES ||--o{ CONSULTAS : tem
    MEDICOS ||--o{ CONSULTAS : realiza
    PACIENTES ||--o{ PRONTUARIOS : tem

    USERS {
        int id PK
        string email UK
        string password
        string name
        enum role
        timestamp createdAt
        timestamp updatedAt
        timestamp lastSignedIn
    }

    PACIENTES {
        int id PK
        string nome
        string cpf UK
        date dataNascimento
        enum genero
        string telefone
        string email
        string endereco
        string cidade
        string estado
        string cep
        enum status
        string leito
        text observacoes
        timestamp createdAt
        timestamp updatedAt
    }

    MEDICOS {
        int id PK
        string nome
        string crm UK
        string especialidade
        string telefone
        string email
        enum disponibilidade
        string consultorioNumero
        text observacoes
        timestamp createdAt
        timestamp updatedAt
    }

    CONSULTAS {
        int id PK
        int pacienteId FK
        int medicoId FK
        timestamp dataHora
        enum tipo
        string motivo
        enum status
        text anotacoes
        text prescricao
        timestamp createdAt
        timestamp updatedAt
    }

    PRONTUARIOS {
        int id PK
        int pacienteId FK
        timestamp dataAtendimento
        string queixa
        text historico
        text diagnostico
        json medicamentos
        json examesSolicitados
        text condutaClinica
        string medicoResponsavel
        timestamp createdAt
        timestamp updatedAt
    }
```

---

## Diagrama de Fluxo de Autenticação

```mermaid
sequenceDiagram
    participant User as Usuário
    participant Frontend as Frontend (React)
    participant Backend as Backend (Express)
    participant DB as PostgreSQL

    User->>Frontend: Insere email/senha
    Frontend->>Backend: POST /api/auth/login
    Backend->>DB: SELECT * FROM users WHERE email=?
    DB-->>Backend: User encontrado
    Backend->>Backend: Valida senha (bcrypt)
    Backend->>Backend: Gera JWT tokens
    Backend-->>Frontend: { accessToken, refreshToken }
    Frontend->>Frontend: Armazena tokens (localStorage)
    Frontend-->>User: Redireciona para Dashboard

    Note over Frontend,Backend: Requisição subsequente
    Frontend->>Backend: GET /api/pacientes (com JWT)
    Backend->>Backend: Valida JWT
    Backend->>DB: SELECT * FROM pacientes
    DB-->>Backend: Dados retornados
    Backend-->>Frontend: JSON response
    Frontend-->>User: Exibe dados
```

---

## Diagrama de Fluxo CRUD - Pacientes

```mermaid
flowchart TD
    A[Usuário acessa Pacientes] --> B{Ação}
    
    B -->|Listar| C[GET /api/pacientes]
    C --> D[Exibir tabela com paginação]
    
    B -->|Criar| E[Abre modal de formulário]
    E --> F[Preenche dados]
    F --> G[POST /api/pacientes]
    G --> H{Sucesso?}
    H -->|Sim| I[Adiciona à lista]
    H -->|Não| J[Exibe erro]
    
    B -->|Editar| K[Seleciona paciente]
    K --> L[Abre modal com dados]
    L --> M[Modifica dados]
    M --> N[PUT /api/pacientes/:id]
    N --> O{Sucesso?}
    O -->|Sim| P[Atualiza na lista]
    O -->|Não| Q[Exibe erro]
    
    B -->|Deletar| R[Confirma exclusão]
    R --> S[DELETE /api/pacientes/:id]
    S --> T{Sucesso?}
    T -->|Sim| U[Remove da lista]
    T -->|Não| V[Exibe erro]
    
    I --> W[Exibe sucesso]
    P --> W
    U --> W
    W --> X[Recarrega dados]
```

---

## Diagrama de Arquitetura em Camadas

```mermaid
graph TB
    subgraph Presentation["Camada de Apresentação"]
        A["Login Page"]
        B["Dashboard"]
        C["Pacientes Page"]
        D["Médicos Page"]
        E["Consultas Page"]
        F["Prontuários Page"]
    end

    subgraph Business["Camada de Negócio"]
        G["usePacientes Hook"]
        H["useMedicos Hook"]
        I["useConsultas Hook"]
        J["useProntuarios Hook"]
        K["AuthContext"]
    end

    subgraph API["Camada de API"]
        L["apiService"]
        M["Interceptadores JWT"]
    end

    subgraph Server["Camada de Servidor"]
        N["Express Routes"]
        O["Middleware"]
        P["Controllers"]
        Q["Validação"]
    end

    subgraph Data["Camada de Dados"]
        R["Sequelize Models"]
        S["PostgreSQL DB"]
    end

    A --> K
    B --> G
    C --> G
    D --> H
    E --> I
    F --> J
    
    G --> L
    H --> L
    I --> L
    J --> L
    K --> L
    
    L --> M
    M --> N
    
    N --> O
    O --> P
    P --> Q
    
    Q --> R
    R --> S

    style Presentation fill:#e1f5ff
    style Business fill:#f3e5f5
    style API fill:#fff3e0
    style Server fill:#f1f8e9
    style Data fill:#fce4ec
```

---

## Diagrama de Estados - Paciente

```mermaid
stateDiagram-v2
    [*] --> Ativo: Cadastro
    
    Ativo --> Internado: Admissão
    Ativo --> [*]: Sem alterações
    
    Internado --> Ativo: Alta médica
    Internado --> Óbito: Óbito
    Internado --> Internado: Continuidade
    
    Ativo --> Óbito: Óbito
    
    Óbito --> [*]: Fim
```

---

## Diagrama de Estados - Consulta

```mermaid
stateDiagram-v2
    [*] --> Agendada: Agendamento
    
    Agendada --> Realizada: Comparecimento
    Agendada --> Cancelada: Cancelamento
    Agendada --> Ausente: Não comparecimento
    
    Realizada --> [*]: Fim
    Cancelada --> [*]: Fim
    Ausente --> [*]: Fim
```

---

## Diagrama de Componentes Frontend

```mermaid
graph LR
    subgraph Pages["Pages"]
        P1["Login"]
        P2["Dashboard"]
        P3["Pacientes"]
        P4["Médicos"]
        P5["Consultas"]
        P6["Prontuários"]
    end

    subgraph Components["Components"]
        C1["Layout"]
        C2["Sidebar"]
        C3["Header"]
        C4["Table"]
        C5["Form"]
        C6["Modal"]
        C7["Card"]
        C8["Button"]
    end

    subgraph Hooks["Hooks"]
        H1["usePacientes"]
        H2["useMedicos"]
        H3["useConsultas"]
        H4["useProntuarios"]
        H5["useAuth"]
    end

    subgraph Services["Services"]
        S1["apiService"]
        S2["AuthContext"]
    end

    P1 --> C1
    P2 --> C1
    P3 --> C1
    P4 --> C1
    P5 --> C1
    P6 --> C1
    
    C1 --> C2
    C1 --> C3
    C1 --> C4
    C1 --> C5
    C1 --> C6
    
    P3 --> H1
    P4 --> H2
    P5 --> H3
    P6 --> H4
    P1 --> H5
    
    H1 --> S1
    H2 --> S1
    H3 --> S1
    H4 --> S1
    H5 --> S2
    
    S1 --> S2
```

---

## Diagrama de Endpoints REST

```mermaid
graph TB
    API["API REST - MediCare"]
    
    AUTH["🔐 Auth"]
    PACIENTES["👥 Pacientes"]
    MEDICOS["👨‍⚕️ Médicos"]
    CONSULTAS["📅 Consultas"]
    PRONTUARIOS["📋 Prontuários"]
    
    API --> AUTH
    API --> PACIENTES
    API --> MEDICOS
    API --> CONSULTAS
    API --> PRONTUARIOS
    
    AUTH --> A1["POST /login"]
    AUTH --> A2["POST /logout"]
    AUTH --> A3["POST /refresh"]
    AUTH --> A4["GET /me"]
    
    PACIENTES --> P1["GET /"]
    PACIENTES --> P2["GET /:id"]
    PACIENTES --> P3["POST /"]
    PACIENTES --> P4["PUT /:id"]
    PACIENTES --> P5["DELETE /:id"]
    
    MEDICOS --> M1["GET /"]
    MEDICOS --> M2["GET /:id"]
    MEDICOS --> M3["POST /"]
    MEDICOS --> M4["PUT /:id"]
    MEDICOS --> M5["DELETE /:id"]
    
    CONSULTAS --> C1["GET /"]
    CONSULTAS --> C2["GET /:id"]
    CONSULTAS --> C3["POST /"]
    CONSULTAS --> C4["PUT /:id"]
    CONSULTAS --> C5["DELETE /:id"]
    
    PRONTUARIOS --> PR1["GET /"]
    PRONTUARIOS --> PR2["GET /:id"]
    PRONTUARIOS --> PR3["GET /paciente/:id"]
    PRONTUARIOS --> PR4["POST /"]
    PRONTUARIOS --> PR5["PUT /:id"]
    PRONTUARIOS --> PR6["DELETE /:id"]
```

---

## Diagrama de Relacionamentos Principais

```mermaid
graph LR
    U["User<br/>(admin, medico, enfermeiro)"]
    P["Paciente<br/>(nome, cpf, status)"]
    M["Medico<br/>(nome, crm, especialidade)"]
    C["Consulta<br/>(data, tipo, status)"]
    PR["Prontuario<br/>(diagnostico, medicamentos)"]
    
    U -->|realiza| C
    U -->|responsável| PR
    P -->|tem| C
    M -->|realiza| C
    P -->|tem| PR
    M -->|responsável| PR
    
    C -.->|gera| PR
    
    style U fill:#e3f2fd
    style P fill:#f3e5f5
    style M fill:#fff3e0
    style C fill:#f1f8e9
    style PR fill:#fce4ec
```

---

## Notas Importantes

### Relacionamentos

1. **User → Consulta (1:N):** Um médico realiza múltiplas consultas
2. **User → Prontuário (1:N):** Um médico é responsável por múltiplos prontuários
3. **Paciente → Consulta (1:N):** Um paciente tem múltiplas consultas
4. **Medico → Consulta (1:N):** Um médico realiza múltiplas consultas
5. **Paciente → Prontuário (1:N):** Um paciente tem múltiplos prontuários
6. **Medico → Prontuário (1:N):** Um médico é responsável por múltiplos prontuários

### Constraints

- **UNIQUE:** email (users), cpf (pacientes), crm (medicos)
- **NOT NULL:** nome, email, password (users); nome, cpf (pacientes); nome, crm (medicos)
- **FOREIGN KEY:** Integridade referencial em todos os relacionamentos
- **CHECK:** status deve estar em valores válidos (enum)

### Índices

- **PRIMARY KEY:** id em todas as tabelas
- **INDEX:** status, createdAt (para queries frequentes)
- **INDEX:** pacienteId, medicoId (para joins)

---

**Diagrama gerado:** 18 de Maio de 2026  
**Ferramenta:** Mermaid Diagram  
**Versão:** 1.0.0
