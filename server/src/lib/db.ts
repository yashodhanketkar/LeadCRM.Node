import { Pool } from "pg";
import { DB_URL } from "./store.js";

const pool = new Pool({ connectionString: DB_URL });

export const query = async (text: string, params: any[] = []) => {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log(`Query ${text}:${params} executed in ${duration}ms`);
  return res;
};

const createTablesQuery = `
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role users_role NOT NULL DEFAULT 'inactive'
);

CREATE TABLE IF NOT EXISTS leads (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(16) NOT NULL,
  source lead_source NOT NULL DEFAULT 'Call',
  status lead_status NOT NULL DEFAULT 'Not Contacted',
  lead_generator INT NOT NULL REFERENCES users(id)
);
`;

// split from createTablesQuery for more readability
// created custom functions for enums due to pg limitations
const createTypeQuery = `
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'users_role') THEN
        CREATE TYPE users_role AS ENUM ('admin', 'manager', 'sales', 'inactive');
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'lead_status') THEN
        CREATE TYPE lead_status AS ENUM ('Not Contacted', 'Interested', 'Not Interested', 'Converted');
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'lead_source') THEN
        CREATE TYPE lead_source AS ENUM ('Call', 'WhatsApp', 'Field');
    END IF;
END
$$;
`;

export const initDb = async () => {
  try {
    await pool.query(createTypeQuery);
    await pool.query(createTablesQuery);
    console.log("Database initialized");
  } catch (err) {
    console.error("Error initializing database: ", err);
    process.exit(1);
  }
};
