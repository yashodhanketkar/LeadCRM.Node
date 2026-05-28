import type { LeadStatus, LeadTypeDTO, LeadType } from "@/lib/types";
import { client } from "./client";

export const getLeads = async (): Promise<LeadType[]> => {
  const res = await client.get("/leads");
  if (res.status !== 200) throw new Error("Failed to get leads");

  return res.data;
};

export const getLead = async (id: string) => {
  const res = await client.get("/leads/" + id);
  if (res.status !== 200) throw new Error("Failed to get lead");

  return res.data;
};

export const getLeadsByManager = async () => {
  const res = await client.get("/leads/manager/all");
  if (res.status !== 200) throw new Error("Failed to get leads by manager");

  return res.data;
};

export const getLeadByManager = async (id: string) => {
  const res = await client.get("/leads/manager/" + id);
  if (res.status !== 200) throw new Error("Failed to get lead by manager");

  return res.data;
};

export const createLead = async (data: LeadTypeDTO) => {
  const res = await client.post("/leads", { ...data });
  if (res.status !== 201) throw new Error("Failed to create lead");

  return res.data;
};

export const updateLead = async (id: number, data: { status: LeadStatus }) => {
  const res = await client.put("/leads/status/" + id, { ...data });
  if (res.status !== 200) throw new Error("Failed to update lead");

  return res.data;
};

export const deleteLead = async (id: number) => {
  const res = await client.delete("/leads/" + id);
  if (res.status !== 200) throw new Error("Failed to delete lead");

  return res.data;
};
