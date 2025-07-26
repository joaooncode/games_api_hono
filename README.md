# 🚚 Hono Games API 🎮

Bem-vindo ao **Hono Games API**!  
Este projeto é uma API RESTful para gerenciamento de jogos, construída com [Hono](https://hono.dev/), [Drizzle ORM](https://orm.drizzle.team/), [Postgres Neon](https://neon.tech/) e [Bun](https://bun.sh/).  
Ideal para quem quer aprender, testar ou construir sistemas modernos de backend com TypeScript!

---

## ✨ Funcionalidades

- **CRUD completo de jogos**: crie, liste, edite e remova jogos.
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
   DB_CONNECTION_STRING=postgresql://usuario:senha@host/database?sslmode=require
   PORT=3000
   ```

3. Inicie o servidor:

   ```bash
   bun run index.ts
   ```

4. Acesse a API em `http://localhost:3000/games`

---

## 🧪 Testes

Execute os testes automatizados:

```bash
bun test
```

---

## 🗂 Estrutura de pastas

- `/src/interfaces` — Tipos e interfaces TypeScript
- `/src/enums` — Enum de categorias
- `/src/database` — Schemas Drizzle e validação Zod
- `/src/services` — Lógica de negócio e acesso ao banco
- `/src/controllers` — Lógica das rotas
- `/src/routes` — Definição das rotas Hono
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

- **GET** `/games` — Lista todos os jogos
- **GET** `/games/id` — Busca um jogo pelo id
- **POST** `/games/create` — Cria um novo jogo
- **PUT** `/games/update/:id` — Atualiza um jogo
- **DELETE** `/games/delete/:id` — Remove um jogo

---

## 🤝 Contribua!

Sinta-se livre para abrir issues, enviar PRs ou sugerir melhorias.  
Este projeto é perfeito para estudos, portfólios e experimentação com o ecossistema TypeScript moderno.

---

**Divirta-se programando e explorando o mundo dos jogos!**
