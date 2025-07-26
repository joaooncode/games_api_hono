import app from "./src/app";
import "dotenv/config";

Bun.serve({
  port: Number(process.env.PORT) || 8000,
  fetch: app.fetch,
});
console.warn(`🚀 Server running on port ${process.env.PORT || 8000}`);
