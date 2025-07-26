import { describe, expect, test } from "bun:test";

import app from "../app";

app.get("/games", c => c.text("Many games"));

describe("Example", () => {
  test("GET /games", async () => {
    const res = await app.request("/games");
    expect(res.status).toBe(200);
    // expect(await res.text()).toBe('Many games');
  });
});

describe("GET /games", () => {
  test("should return a list of games", async () => {
    const res = await app.request("/games");
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(Array.isArray(data)).toBe(true);
  });
});

describe("GET /games/:id", () => {
  test("should return a game by ID", async () => {
    const res = await app.request("/games/1");
    expect(res.status).toBe(200);
    const data = (await res.json()) as { id: number };
    expect(data).toHaveProperty("id");
    expect(Number(data.id)).toBe(1);
  });

  test("should return 404 for non-existent game", async () => {
    const res = await app.request("/games/9999");
    expect(res.status).toBe(404);
  });
});

describe("POST /games/create", () => {
  test("should create a new game", async () => {
    const newGame = {
      title: "Test Game",
      genre: "Adventure",
      releaseYear: 2025,
      developer: "Test Dev",
      category: "Gold",
      isAvailable: true,
    };
    const res = await app.request("/games/create", {
      method: "POST",
      body: JSON.stringify(newGame),
      headers: { "Content-Type": "application/json" },
    });
    expect(res.status).toBe(201);
    const data = (await res.json()) as { id: number; title: string };
    expect(data).toHaveProperty("id");
    expect(data.title).toBe(newGame.title);
  });

  test("should fail with invalid data", async () => {
    const invalidGame = { title: "Invalid" }; // missing required fields
    const res = await app.request("/games/create", {
      method: "POST",
      body: JSON.stringify(invalidGame),
      headers: { "Content-Type": "application/json" },
    });
    expect(res.status).toBe(400);
  });
});

describe("PUT /games/update/:id", () => {
  test("should update a game", async () => {
    const update = { title: "Updated Title" };
    const res = await app.request("/games/update/1", {
      method: "PUT",
      body: JSON.stringify(update),
      headers: { "Content-Type": "application/json" },
    });
    expect(res.status).toBe(200);
    const data = (await res.json()) as { title: string };
    expect(data.title).toBe(update.title);
  });

  test("should return 404 for non-existent game", async () => {
    const update = { title: "Updated Title" };
    const res = await app.request("/games/update/9999", {
      method: "PUT",
      body: JSON.stringify(update),
      headers: { "Content-Type": "application/json" },
    });
    expect(res.status).toBe(404);
  });
});

describe("DELETE /games/delete/:id", () => {
  test("should delete a game", async () => {
    // First, create a game to delete
    const newGame = {
      title: "Delete Me",
      genre: "Action",
      releaseYear: 2024,
      developer: "Dev",
      category: "Silver",
      isAvailable: true,
    };
    const createRes = await app.request("/games/create", {
      method: "POST",
      body: JSON.stringify(newGame),
      headers: { "Content-Type": "application/json" },
    });
    const created = (await createRes.json()) as { id: number };

    // Now, delete it
    const res = await app.request(`/games/delete/${created.id}`, {
      method: "DELETE",
    });
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data).toHaveProperty("message");
  });

  test("should return 404 for non-existent game", async () => {
    const res = await app.request("/games/delete/9999", { method: "DELETE" });
    expect(res.status).toBe(404);
  });
});
