import bcrypt from "bcryptjs";

export function hashPass(password: string) {
  if (!password) return undefined;
  return bcrypt.hashSync(password);
}

export function isSamePass(password: string, hashedPassword: string) {
  return bcrypt.compareSync(password, hashedPassword);
}
