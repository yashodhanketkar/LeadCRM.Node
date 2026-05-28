import type { Request, Response } from "express";
import { UsersService } from "../services/users.js";

export class UsersController {
  private readonly svc = new UsersService();

  getAll = async (_req: Request, res: Response) => {
    const users = await this.svc.getAll();
    res.send(users);
  };

  getById = async (req: Request, res: Response) => {
    const user = await this.svc.getById(req.params.id);
    if (user instanceof Error) return res.status(404).send(user);

    res.send(user);
  };

  create = async (req: Request, res: Response) => {
    const user = req.body;
    const created = await this.svc.create(user);
    if (created instanceof Error) return res.status(400).send(created);

    res.status(201).send({ message: created });
  };

  login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    console.log(username, password);
    const token = await this.svc.login(username, password);
    if (token instanceof Error) return res.status(400).send("Failed to login");

    res.send({ token });
  };

  setRole = async (req: Request, res: Response) => {
    const { role } = req.body;
    if (typeof role !== "string") return res.status(400).send("Invalid role");

    const { id } = req.params;
    const udpdated = await this.svc.setRole(Number(id), role);
    if (udpdated instanceof Error)
      return res.status(400).send({ error: udpdated.message });

    res.send({ message: udpdated });
  };

  deactivate = async (req: Request, res: Response) => {
    const { id } = req.params;
    const deactivated = await this.svc.deactivate(Number(id));
    if (deactivated instanceof Error)
      return res.status(400).send({ error: deactivated.message });

    res.send({ message: deactivated });
  };
}
