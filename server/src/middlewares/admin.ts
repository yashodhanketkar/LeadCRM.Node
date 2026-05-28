import type { Request, Response, NextFunction } from "express";

export const admin = (req: Request, res: Response, next: NextFunction) => {
  if (req.role !== "admin") {
    return res.status(403).send({ message: "You don't have permission" });
  }

  next();
};

export const manager = (req: Request, res: Response, next: NextFunction) => {
  if (req.role !== "manager") {
    return res.status(403).send({ message: "You don't have permission" });
  }

  next();
};
