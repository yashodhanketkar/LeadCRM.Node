import type { LeadSource, LeadStatus } from "@/lib/types";

export type FilterType = {
  source: LeadSource[];
  status: LeadStatus[];
};

export const AllStatusOptions: LeadStatus[] = [
  "Not Contacted",
  "Interested",
  "Not Interested",
  "Converted",
];

export const AllSourceOptions: LeadSource[] = ["Call", "WhatsApp", "Field"];
