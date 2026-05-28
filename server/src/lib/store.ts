import { config } from "dotenv";

const NODE_ENV = process.env.NODE_ENV;
let env_path: string;

switch (NODE_ENV) {
  case "test":
    env_path = ".env.test";
    break;
  case "prod":
    env_path = ".env.prod";
    break;
  default:
    env_path = ".env.dev";
}

config({ path: env_path });

const GET_ENV = (env_key: string): string => {
  const env_value = process.env[env_key];
  if (!env_value) {
    throw new Error(`Environment variable ${env_key} is not set`);
  }
  return env_value;
};

export const DB_URL = GET_ENV("DB_URL");
export const JWT_SECRET = GET_ENV("JWT_SECRET");
export const PORT = GET_ENV("PORT");
