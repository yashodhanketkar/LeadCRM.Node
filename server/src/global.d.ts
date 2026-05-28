import type { Request } from "express";
import type { UserRoles } from "./lib/types.ts";

declare global {
  namespace Express {
    export interface Request {
      role?: UserRoles;
      userId?: number;
      username?: string;
    }
  }
}
