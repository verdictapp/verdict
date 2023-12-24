import bcrypt from "bcryptjs";

export async function hashPass(password: string) {
  if (!password) return undefined;
  return bcrypt.hashSync(password);
}

export async function isSamePass(password: string, hashedPassword: string) {
  return bcrypt.compareSync(password, hashedPassword);
}
