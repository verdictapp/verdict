import { DURATIONS } from "../_constants/durations";
import { errors } from "../_enums/errorsEnums";
import { createToken } from "../_lib/apiJwt";
import { hashPass, isSamePass } from "../_lib/hashing";
import prisma from "@/app/_lib/prisma";

/**
 * tries to authenticate a user based on his username and password
 * @param username
 * @param password
 * @returns if correct token or wrong_credentials enum value
 */
export async function authenticateUserLocally(
  username: string,
  password: string,
  rememberMe: boolean = false
) {
  let user = await prisma.users.findUnique({
    where: { username: username },
  });
  if (user && (await isSamePass(password, user.password))) {
    return {
      token: await createToken(
        user,
        rememberMe && DURATIONS.LONG_TOKEN_EXPIRATION
      ),
    };
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

/**
 * TESTING PURPOSES ONLY
 *
 * creates a verified user with a username and password
 * @param username
 * @param password
 * @returns
 */
export async function createVerifiedUser(username: string, password: string) {
  let result = await prisma.users.findUnique({ where: { username: username } });
  if (result) {
    return errors.username_taken;
  }
  return await prisma.users.create({
    data: {
      username: username,
      password: await hashPass(password),
      verified: true,
    },
  });
}

/**
 * creates an admin
 * @param username
 * @param password
 * @returns the created user(admin) or username_taken enum value
 */
export async function createAdmin(username: string, password: string) {
  let result = await prisma.users.findUnique({ where: { username: username } });
  if (result) {
    return errors.username_taken;
  }
  return await prisma.users.create({
    data: {
      username: username,
      password: await hashPass(password),
      verified: true,
      admin: true,
    },
  });
}
