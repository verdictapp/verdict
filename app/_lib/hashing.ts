import bcrypt from "bcrypt";

export async function hashPass(password: string) {
  return await bcrypt.hash(password, 10);
}

export async function isSamePass(password: string, hashedPassword: string) {
  return await bcrypt.compare(password, hashedPassword);
}
