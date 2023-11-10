import { hashPass } from "../_lib/hashing";

export async function createUnverifiedUser(username: string, password: string) {
  let result = await prisma.users.findUnique({ where: { username: username } });
  if (result) {
    return -1;
  }
  await prisma.users.create({
    data: {
      username: username,
      password: await hashPass(password),
    },
  });
  // jwt
}
