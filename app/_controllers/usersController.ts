import { errors } from "../_enums/errorsEnums";
import { createToken } from "../_lib/apiJwt";
import { hashPass, isSamePass } from "../_lib/hashing";
import prisma from "@/app/_lib/prisma";

/**
 * tries to authenticate a user on his username and password
 * @param username
 * @param password
 * @returns if correct token or wrong_credentials enum value
 */
export async function authenticateUserLocally(
  username: string,
  password: string
) {
  let user = await prisma.users.findUnique({
    where: { username: username },
  });
  if (user && isSamePass(password, user.password)) {
    return { token: await createToken(user) };
  } else {
    return errors.wrong_credentials;
  }
}

/**
 * tries to create an unverified user
 * @param username
 * @param password
 * @returns user object if the input is valid or username_taken enum value
 */
export async function createUnverifiedUser(username: string, password: string) {
  let result = await prisma.users.findUnique({ where: { username: username } });
  if (result) {
    return errors.username_taken;
  }
  return await prisma.users.create({
    data: {
      username: username,
      password: await hashPass(password),
    },
  });
}
