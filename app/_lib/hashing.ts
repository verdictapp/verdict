import bcrypt from "bcryptjs";

export async function hashPass(password: string) {
  if (!password) return undefined;
  let newHash = "";
  bcrypt.hash(password, 8, function (err, hash) {
    newHash = hash;
  });
  return newHash;
}

export async function isSamePass(password: string, hashedPassword: string) {
  let isSame = false;
  bcrypt.compare(password, hashedPassword, function (err, res) {
    isSame = res;
  });
  return isSame;
}
