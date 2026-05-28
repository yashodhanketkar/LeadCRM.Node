import type { UserTypeDTO } from "@/lib/types";
import { client } from "./client";

export const login = async (data: UserTypeDTO) => {
  console.log(data);
  const res = await client.post("/users/login", { ...data });

  if (res.status !== 200) {
    throw new Error("Login failed");
  }

  return res.data;
};

export const register = async (data: UserTypeDTO) => {
  const res = await client.post("/users/register", { ...data });
  if (res.status !== 201) {
    throw new Error("Register failed");
  }

  return { data: res.data, status: res.status };
};

export const setRole = async (id: string, data: { role: string }) => {
  const res = await client.put("/users/setrole/" + id, { ...data });

  if (res.status !== 200) {
    throw new Error("Set role failed");
  }

  return res.data;
};

export const deactivate = async (id: string) => {
  const res = await client.put("/users/deactivate/" + id);

  if (res.status !== 200) {
    throw new Error("Deactivate failed");
  }

  return res.data;
};
