import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "../lib/store.js";
import type { UserRoles } from "../lib/types.js";

type DecodedToken = {
  userId: number;
  username: string;
  role: UserRoles;
  iat: number;
  exp: number;
};

export const JWT = (req: Request, res: Response, next: NextFunction) => {
  const auth = req.header("Authorization");
  if (!auth) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  const token = auth.split(" ")[1];
  if (!token) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.decode(token) as DecodedToken;

    if (decoded.role === "inactive") {
      return res.status(401).send({ message: "Inactive user" });
    }

    if (decoded.exp < Date.now() / 1000) {
      return res.status(401).send({ message: "Token expired" });
    }

    req.userId = decoded.userId;
    req.username = decoded.username;
    req.role = decoded.role;

    next();
  } catch (err) {
    return res.status(401).send({ message: "Unauthorized" });
  }
};

export const createToken = async (userId: number, username: string) => {
  const payload = {
    userId,
    username,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
  };

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "1d",
  });
};
