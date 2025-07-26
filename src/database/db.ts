import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import "dotenv/config";

export const db = drizzle(
  new Pool({
    connectionString: process.env.DB_CONNECTION_STRING,
  }),
);
