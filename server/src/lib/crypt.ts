import { compare, hash } from "bcrypt";

const hashPassword = async (password: string): Promise<string> => {
  const hashed = await hash(password, 10);
  // console.log({ password, hashed });
  return hashed;
};

const verifyPassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return compare(password, hash);
};

export { hashPassword, verifyPassword };
