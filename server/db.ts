import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// This looks for .env in the folder above "server"
const envPath = path.resolve(__dirname, "..", ".env");
dotenv.config({ path: envPath });

// If it still didn't find it, it tries the current folder
if (!process.env.DATABASE_URL) {
  dotenv.config();
}

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set in your .env file at the project root.");
}

export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle(pool, { schema });