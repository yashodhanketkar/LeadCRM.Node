// users

export type UserRoles = "admin" | "manager" | "sales" | "inactive";

export type UserTypeDTO = {
  username: string;
  password: string;
  role: UserRoles;
};

export type UserType = UserTypeDTO & { id: number };

// leads
export type LeadStatus =
  | "Not Contacted"
  | "Interested"
  | "Not Interested"
  | "Converted";
export type LeadSource = "Call" | "WhatsApp" | "Field";

export type LeadTypeDTO = {
  name: string;
  phone: string;
  source: LeadSource;
  status: LeadStatus;
  lead_generator: number;
};

export type LeadType = LeadTypeDTO & { id: number };
