# MediCare — Sistema de Gestão Hospitalar
## Apresentação Técnica do Projeto

---

## Slide 1: Capa
**Título:** MediCare — Sistema de Gestão Hospitalar
**Subtítulo:** Aplicação Web com React, Roteamento SPA e PWA Responsivo
**Detalhes:** Disciplina de Desenvolvimento Web | 2025
**Visual:** Fundo escuro com ícone médico em ciano, linhas de grade sutis, estilo tecnológico

---

## Slide 2: O React como Framework de Navegação — SPA com Roteamento Declarativo

O MediCare demonstra a navegação em React por meio do padrão **Single Page Application (SPA)**, onde toda a interface é carregada uma única vez e as transições entre páginas ocorrem sem recarregamento do servidor. A biblioteca **Wouter** gerencia as rotas de forma declarativa, com componentes `<Route>` e `<Switch>` que mapeiam caminhos de URL para componentes React. O sistema implementa **rotas protegidas** com o componente `ProtectedRoute`, que verifica o estado de autenticação antes de renderizar qualquer página privada, redirecionando automaticamente para `/login` quando necessário.

**Rotas implementadas:**
- `/login` — Autenticação de usuários
- `/dashboard` — Visão geral e métricas
- `/pacientes` — Gestão de pacientes
- `/medicos` — Cadastro de médicos
- `/consultas` — Agendamento de consultas
- `/prontuarios` — Registros médicos

---

## Slide 3: Arquitetura de Componentes — Separação de Responsabilidades em React

A arquitetura do MediCare segue os princípios de **composição de componentes** do React, com clara separação entre camadas de apresentação, lógica de negócio e gerenciamento de estado. O **Layout.tsx** encapsula a estrutura global (sidebar + header + área de conteúdo), sendo compartilhado por todas as páginas protegidas via `ProtectedRoute`. O estado de autenticação é gerenciado pelo **AuthContext** usando a API de Context do React, eliminando prop drilling e permitindo acesso ao usuário logado em qualquer nível da árvore de componentes. Os dados são centralizados em `mockData.ts`, simulando uma camada de serviço real.

**Estrutura de pastas:**
```
src/
  pages/        → Componentes de página (rotas)
  components/   → UI reutilizável (Layout, PWABanner)
  contexts/     → Estado global (AuthContext, ThemeContext)
  hooks/        → Lógica reutilizável (usePWA)
  lib/          → Dados e utilitários (mockData)
```

---

## Slide 4: Progressive Web App (PWA) — Instalável, Offline e Responsivo

O MediCare implementa os três pilares de um **PWA completo**: instalabilidade, funcionamento offline e design responsivo. O **Web App Manifest** (`manifest.json`) define nome, ícones em 8 tamanhos (72px a 512px), cor de tema, atalhos de tela inicial e modo de exibição `standalone`. O **Service Worker** (`sw.js`) implementa estratégia *stale-while-revalidate* para assets estáticos e *network-first* para chamadas de API, garantindo que o sistema funcione mesmo sem conexão. O hook `usePWA` abstrai o registro do SW, detecção de instalabilidade e status de conectividade, exibindo banners contextuais ao usuário.

**Critérios PWA atendidos:**
- Manifest com ícones e shortcuts ✓
- Service Worker com cache estratégico ✓
- HTTPS (via deployment) ✓
- Design responsivo mobile-first ✓
- Banner de instalação nativo ✓
- Indicador offline/online ✓

---

## Slide 5: Design Responsivo — Mobile-First com Tailwind CSS

O sistema foi construído com abordagem **mobile-first**, onde o layout base é otimizado para telas pequenas e progressivamente expandido para tablets e desktops. A **sidebar** é oculta em mobile e exibida como drawer animado via Framer Motion, acionada por um botão hambúrguer no header. As tabelas de dados se transformam em **listas de cards** em telas menores, mantendo a legibilidade. O grid de métricas do Dashboard usa `grid-cols-2 sm:grid-cols-3 xl:grid-cols-6` para adaptar automaticamente ao viewport. O Tailwind CSS 4 com tokens de design customizados garante consistência visual em todos os breakpoints sem CSS manual.

**Breakpoints utilizados:**
- Mobile: < 640px — layout em coluna única, sidebar oculta
- Tablet: 640px–1024px — layout em 2 colunas, sidebar em drawer
- Desktop: > 1024px — sidebar fixa, grid completo de métricas

---

## Slide 6: Funcionalidades do Sistema — Módulos Integrados

O MediCare integra **5 módulos principais** que cobrem o fluxo completo de atendimento hospitalar. O **Dashboard** apresenta 6 métricas em tempo real (pacientes, consultas, leitos, críticos, cirurgias, médicos), gráfico de barras semanal com Recharts e gráfico de pizza por departamento. A **gestão de pacientes** oferece busca em tempo real, filtros por status e modal de detalhes. O módulo de **médicos** exibe cards com status de disponibilidade em tempo real. As **consultas** são agrupadas por data com filtros múltiplos. Os **prontuários** apresentam accordion expansível com medicamentos e exames solicitados.

**Tecnologias utilizadas:**
- React 19 + TypeScript — Framework principal
- Wouter — Roteamento SPA
- Framer Motion — Animações fluidas
- Recharts — Gráficos interativos
- Tailwind CSS 4 + shadcn/ui — Design system
- Vite — Build tool e dev server

---

## Slide 7: Segurança e Autenticação — Proteção de Rotas no Frontend

O sistema implementa um **fluxo de autenticação completo** no frontend, com persistência de sessão via `localStorage` e proteção de todas as rotas privadas. O `AuthContext` mantém o estado do usuário logado e expõe funções `login()` e `logout()`. O componente `ProtectedRoute` age como **guard de rota**: verifica `isAuthenticated` antes de renderizar e redireciona para `/login` caso não autenticado. Três perfis de acesso são suportados (Administrador, Médico, Enfermeiro), com dados do usuário exibidos na sidebar. Em produção, a autenticação seria integrada a um backend com JWT ou OAuth.

**Fluxo de autenticação:**
1. Usuário acessa qualquer rota → ProtectedRoute verifica auth
2. Não autenticado → Redirect automático para /login
3. Login bem-sucedido → Redirect para /dashboard
4. Logout → Limpeza do localStorage + Redirect para /login

---

## Slide 8: Resultados e Demonstração — Sistema em Produção

O MediCare foi desenvolvido como uma aplicação de produção completa, demonstrando as melhores práticas de desenvolvimento React moderno. A aplicação está disponível como PWA instalável, com design dark mode premium inspirado em equipamentos hospitalares de alta tecnologia. Todas as páginas são acessíveis via URL direta, suportam navegação por histórico do browser (botão voltar/avançar) e mantêm o estado de autenticação entre sessões. O sistema é totalmente responsivo, funcionando de smartphones a monitores ultrawide, e pode ser instalado como aplicativo nativo em qualquer dispositivo.

**Métricas do projeto:**
- 6 rotas implementadas com proteção de autenticação
- 5 módulos funcionais com dados mock realistas
- PWA completo com Service Worker e Manifest
- 100% responsivo (mobile, tablet, desktop)
- Animações fluidas com Framer Motion
- Design system coeso com 20+ componentes customizados
