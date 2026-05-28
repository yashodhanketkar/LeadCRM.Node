import type { LeadType, LeadTypeDTO } from "../lib/types.js";
import { LeadRepository } from "../repository/lead.js";

export class LeadService {
  private readonly repo = new LeadRepository();

  getAllManager = async (): Promise<LeadType[]> => {
    return this.repo.getAllManager();
  };

  getByIdManager = async (id: number): Promise<LeadType | Error> => {
    return this.repo.getByIdManager(id);
  };

  getAll = async (id: number): Promise<LeadType[]> => {
    return this.repo.getAll(id);
  };

  getById = async (id: number, userId: number): Promise<LeadType | Error> => {
    return this.repo.getById(id, userId);
  };

  create = async (lead: LeadTypeDTO, id: number): Promise<string | Error> => {
    lead.lead_generator = id;
    return this.repo.create(lead);
  };

  updateStatus = async (
    id: number,
    status: string,
    userId: number,
  ): Promise<string | Error> => {
    return this.repo.updateStatus(id, status, userId);
  };

  delete = async (id: number, userId: number): Promise<string | Error> => {
    return this.repo.delete(id, userId);
  };
}
