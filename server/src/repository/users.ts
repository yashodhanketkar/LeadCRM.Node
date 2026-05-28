import { query } from "../lib/db.js";
import type { UserType } from "../lib/types.js";

export class UsersRepository {
  async getAll(): Promise<UserType[]> {
    const res = await query("SELECT * FROM users");
    return res.rows;
  }

  async getById(id: number): Promise<UserType | Error> {
    const res = await query("SELECT * FROM users WHERE id = $1", [id]);

    if (res.rowCount === 0) return new Error("User not found");

    return res.rows[0];
  }

  async getByUsername(username: string): Promise<UserType | Error> {
    const res = await query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);

    if (res.rowCount === 0) return new Error("User not found");

    return res.rows[0];
  }

  async create(user: UserType): Promise<string | Error> {
    const res = await query("SELECT COUNT(*) FROM users where username = $1", [
      user.username,
    ]);

    if (res.rows[0].count !== "0") return new Error("Username already exists");

    const created = await query(
      "INSERT INTO users(username, password) VALUES ($1, $2)",
      [user.username, user.password],
    );

    if (created.rowCount === 0) return new Error("Error creating user");

    return "New User created";
  }

  async updateRole(id: number, role: string): Promise<string | Error> {
    const user = await this.getById(Number(id));
    if (user instanceof Error) return user;

    if (user.role === role) return "Role already set to " + role;

    const updated = await query("UPDATE users SET role = $1 WHERE id = $2", [
      role,
      id,
    ]);

    if (updated.rowCount === 0) return new Error("Error updating role");

    return "Role updated";
  }

  async deactivate(id: number): Promise<string | Error> {
    const updated = await this.updateRole(id, "inactive");
    if (updated instanceof Error || updated === "Role already set")
      return updated;

    return "User deactivated";
  }
}
