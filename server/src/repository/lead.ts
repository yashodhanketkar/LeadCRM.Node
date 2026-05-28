import { query } from "../lib/db.js";
import type { LeadTypeDTO } from "../lib/types.js";

export class LeadRepository {
  async getAllManager(): Promise<any[]> {
    const res = await query("SELECT * FROM leads");
    return res.rows;
  }

  async getByIdManager(id: number): Promise<any | Error> {
    const res = await query("SELECT * FROM leads WHERE id = $1", [id]);

    if (res.rowCount === 0) return new Error("Lead not found");
    return res.rows[0];
  }

  async getAll(id: number): Promise<any[]> {
    const res = await query("SELECT * FROM leads WHERE lead_generator = $1", [
      id,
    ]);

    return res.rows;
  }

  async getById(id: number, lead_generator: number): Promise<any | Error> {
    const res = await query(
      "SELECT * FROM leads WHERE id = $1 and lead_generator = $2",
      [id, lead_generator],
    );

    if (res.rowCount === 0) return new Error("Lead not found");
    return res.rows[0];
  }

  async create(lead: LeadTypeDTO): Promise<string | Error> {
    const res = await query("SELECT COUNT(*) FROM leads where name = $1", [
      lead.name,
    ]);
    if (res.rows[0].count !== "0") return new Error("Lead name already exists");

    if (!lead.source) lead.source = "Call";
    if (!lead.status) lead.status = "Not Contacted";

    const created = await query(
      "INSERT INTO leads(name, phone, source, status, lead_generator) VALUES ($1, $2, $3, $4, $5)",
      [lead.name, lead.phone, lead.source, lead.status, lead.lead_generator],
    );

    if (created.rowCount === 0) return new Error("Error creating lead");

    return "New Lead created";
  }

  async updateStatus(
    id: number,
    status: string,
    userId: number,
  ): Promise<string | Error> {
    const lead = await this.getById(id, userId);
    if (lead instanceof Error) return lead;

    if (lead.status === status) return "Status already set to " + status;
    const updated = await query("UPDATE leads SET status = $1 WHERE id = $2", [
      status,
      id,
    ]);

    if (updated.rowCount === 0) return new Error("Error updating status");

    return "Status updated";
  }

  async delete(id: number, userId: number): Promise<string | Error> {
    const lead = await this.getById(id, userId);
    if (lead instanceof Error) return lead;

    const deleted = await query("DELETE FROM leads WHERE id = $1", [id]);
    if (deleted.rowCount === 0) return new Error("Error deleting lead");

    return "Lead deleted";
  }
}
