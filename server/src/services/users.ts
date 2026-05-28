import { hashPassword, verifyPassword } from "../lib/crypt.js";
import type { UserType } from "../lib/types.js";
import { createToken } from "../middlewares/jwt.js";
import { UsersRepository } from "../repository/users.js";

export class UsersService {
  private readonly repo = new UsersRepository();

  getAll = async (): Promise<UserType[]> => {
    return this.repo.getAll();
  };

  getById = async (id: any): Promise<UserType | Error> => {
    if (typeof id !== "number") {
      return new Error("Invalid id");
    }

    return this.repo.getById(id);
  };

  create = async (user: UserType): Promise<string | Error> => {
    let hashed = await hashPassword(user.password);
    user.password = hashed;

    return this.repo.create(user);
  };

  login = async (
    username: string,
    password: string,
  ): Promise<string | Error> => {
    const user = await this.repo.getByUsername(username);
    if (user instanceof Error) return user;

    const valid = await verifyPassword(password, user.password);
    if (!valid) return new Error("Invalid username or password");

    return createToken(user.id, user.username, user.role);
  };

  setRole = async (id: number, role: string): Promise<string | Error> => {
    if (!id) return new Error("Invalid id");
    return this.repo.updateRole(id, role);
  };

  deactivate = async (id: number): Promise<string | Error> => {
    if (!id) return new Error("Invalid id");
    return this.repo.deactivate(id);
  };
}
