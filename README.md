# 🚚 Hono Games API 🎮

Bem-vindo ao **Hono Games API**!
Este projeto é uma API RESTful para gerenciamento de jogos e usuários, construída com [Hono](https://hono.dev/), [Drizzle ORM](https://orm.drizzle.team/), [Postgres Neon](https://neon.tech/) e [Bun](https://bun.sh/).
Ideal para quem quer aprender, testar ou construir sistemas modernos de backend com TypeScript!

---

## ✨ Funcionalidades

- **CRUD completo de jogos**: crie, liste, edite e remova jogos.
- **CRUD completo de usuários**: registre, liste, edite, remova e restaure usuários.
- **Autenticação básica**: rotas protegidas por autenticação HTTP Basic.
- **Autorização**: apenas admins podem listar/deletar/restaurar usuários; usuários comuns podem editar/ver apenas seu próprio perfil.
- **Validação robusta**: todos os dados são validados com [Zod](https://zod.dev/).
- **Enum de categorias**: Bronze, Silver, Gold, Platinum, Diamond.
- **Testes automatizados**: cobertura para todas as rotas usando Bun Test.
- **Estrutura escalável**: controllers, services e schemas separados.

---

## 🚀 Como rodar

1. Instale as dependências:

   ```bash
   bun install
   ```

2. Configure o banco Neon no arquivo `.env`:

   ```
   DATABASE_URL=postgresql://usuario:senha@host/database?sslmode=require
   PORT=8000
   ```

3. Inicie o servidor:

   ```bash
   bun run index.ts
   ```

4. Acesse a API em `http://localhost:8000/games` ou `http://localhost:8000/users`

---

## 🗂 Estrutura de pastas

- `/src/interfaces` — Tipos e interfaces TypeScript
- `/src/enums` — Enum de categorias
- `/src/database` — Schemas Drizzle e validação Zod
- `/src/services` — Lógica de negócio e acesso ao banco
- `/src/controllers` — Lógica das rotas
- `/src/routes` — Definição das rotas Hono
- `/src/middlewares` — Autenticação e autorização
- `/src/tests` — Testes automatizados

---

## 💡 Tecnologias

- **Hono** — Framework web rápido e moderno
- **Drizzle ORM** — ORM typesafe para Postgres
- **Neon** — Banco de dados Postgres serverless
- **Zod** — Validação de dados
- **Bun** — Runtime JS ultrarrápido

---

## 🎲 Exemplos de uso

### Jogos

- **GET** `/games` — Lista todos os jogos (autenticado)
- **GET** `/games/:id` — Busca um jogo pelo id (autenticado)
- **POST** `/games/create` — Cria um novo jogo (admin)
- **PUT** `/games/update/:id` — Atualiza um jogo (admin)
- **DELETE** `/games/delete/:id` — Remove um jogo (admin)

### Usuários

- **POST** `/users/create` — Registra novo usuário (público)
- **GET** `/users` — Lista todos os usuários (admin)
- **GET** `/users/:id` — Busca usuário pelo id (autenticado: admin ou dono)
- **PUT** `/users/update/:id` — Atualiza usuário (autenticado: admin ou dono)
- **DELETE** `/users/soft-delete/:id` — Remove usuário (admin)
- **PUT** `/users/restore/:id` — Restaura usuário (admin)

---

## 🔒 Autenticação e Autorização

- Use o header HTTP Basic Auth:
  `Authorization: Basic <base64(username:password)>`
- Apenas admins podem listar, deletar ou restaurar usuários.
- Usuários comuns só podem acessar/editar seu próprio perfil.

---

## 🤝 Contribua!

Sinta-se livre para abrir issues, enviar PRs ou sugerir melhorias.
Este projeto é perfeito para estudos, portfólios e experimentação com o ecossistema TypeScript moderno.

---

**Divirta-se programando e explorando o mundo dos jogos!**
