# Guia de Contribuição - MediCare

Obrigado por considerar contribuir para o MediCare! Este documento fornece diretrizes e instruções para contribuir com o projeto.

## 📋 Código de Conduta

Este projeto adota um Código de Conduta para garantir um ambiente acolhedor para todos. Esperamos que todos os contribuidores sigam estas diretrizes.

## 🚀 Como Contribuir

### Reportar Bugs

Antes de criar um relatório de bug, verifique se o problema já foi reportado. Se você encontrar um bug:

1. **Use um título claro e descritivo** para a issue
2. **Descreva os passos exatos** para reproduzir o problema
3. **Forneça exemplos específicos** para demonstrar os passos
4. **Descreva o comportamento observado** e o que você esperava ver
5. **Inclua screenshots ou gifs** se possível
6. **Mencione sua versão** do Node.js, npm/pnpm e SO

### Sugerir Melhorias

Sugestões de melhorias são sempre bem-vindas! Para sugerir uma melhoria:

1. **Use um título claro e descritivo**
2. **Forneça uma descrição detalhada** da melhoria sugerida
3. **Liste alguns exemplos** de como a melhoria seria útil
4. **Mencione outras aplicações** similares que implementam essa funcionalidade

### Pull Requests

1. **Fork o repositório** e crie uma branch para sua feature
2. **Siga o guia de estilo** do projeto
3. **Escreva testes** para novas funcionalidades
4. **Atualize a documentação** conforme necessário
5. **Faça commits com mensagens claras** (veja Convenção de Commits abaixo)

## 📝 Convenção de Commits

Usamos a [Conventional Commits](https://www.conventionalcommits.org/) para padronizar mensagens de commit:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Tipos de Commit

- **feat:** Uma nova funcionalidade
- **fix:** Correção de um bug
- **docs:** Mudanças na documentação
- **style:** Mudanças que não afetam o código (formatação, etc.)
- **refactor:** Refatoração de código
- **perf:** Melhorias de performance
- **test:** Adição ou modificação de testes
- **chore:** Mudanças em ferramentas de build, dependências, etc.

### Exemplos

```
feat(pacientes): adicionar filtro por status

Permite filtrar pacientes por status (ativo, internado, alta, óbito)
na página de listagem.

Closes #123
```

```
fix(api): corrigir erro de validação de CPF

O validador de CPF estava aceitando CPFs inválidos.
Agora valida corretamente usando algoritmo oficial.

Fixes #456
```

## 🔧 Configuração do Ambiente de Desenvolvimento

```bash
# 1. Fork e clone
git clone https://github.com/seu-usuario/medicare-hospital-system.git
cd medicare-hospital-system

# 2. Instalar dependências
pnpm install

# 3. Configurar .env
cp .env.example .env
# Editar .env com suas credenciais

# 4. Executar migrações
pnpm db:push

# 5. Popular banco
pnpm seed

# 6. Iniciar em desenvolvimento
pnpm dev
```

## 🧪 Executando Testes

```bash
# Testes unitários
pnpm test

# Testes com cobertura
pnpm test:coverage

# Testes em modo watch
pnpm test:watch
```

## 📋 Checklist para Pull Request

Antes de submeter seu PR, verifique:

- [ ] Meu código segue o guia de estilo do projeto
- [ ] Executei `pnpm format` para formatação
- [ ] Executei `pnpm check` para verificar TypeScript
- [ ] Adicionei testes para novas funcionalidades
- [ ] Todos os testes passam (`pnpm test`)
- [ ] Atualizei a documentação conforme necessário
- [ ] Meus commits têm mensagens claras e descritivas
- [ ] Não tenho conflitos com a branch main

## 🎨 Guia de Estilo

### TypeScript

- Use tipos explícitos sempre que possível
- Evite `any` - use tipos genéricos ou `unknown`
- Use interfaces para contratos públicos
- Use types para tipos de utilidade

### React

- Use functional components com hooks
- Nomeie componentes com PascalCase
- Use nomes descritivos para props
- Extraia componentes reutilizáveis

### Commit Messages

- Use imperative mood ("add feature" não "added feature")
- Não capitalize a primeira letra
- Sem ponto final
- Máximo 50 caracteres no subject

## 📚 Documentação

Ao adicionar novas funcionalidades:

1. Atualize o README.md se necessário
2. Adicione comentários no código para lógica complexa
3. Atualize DOCUMENTACAO_TECNICA.md
4. Atualize GUIA_API.md se for um novo endpoint

## 🤝 Processo de Review

1. Pelo menos um maintainer revisará seu PR
2. Mudanças podem ser solicitadas
3. Uma vez aprovado, seu PR será mergeado

## ❓ Dúvidas?

- Abra uma [Discussion](https://github.com/seu-usuario/medicare-hospital-system/discussions)
- Crie uma [Issue](https://github.com/seu-usuario/medicare-hospital-system/issues) com tag `question`

---

**Obrigado por contribuir! 🎉**
