import { errors, userFilterFlags } from "../_enums/enums";
import { createToken } from "../_lib/tokenHandler";
import { hashPass, isSamePass } from "../_lib/hashing";
import prisma from "@/app/_lib/prisma";

/**
 * create the condition object for the users search
 * @param filterFlag userFilterFlags enum value
 * @returns object with the right condition based on the flag
 */
function getFlagsCondition(filterFlag: number) {
  if (filterFlag === undefined) {
    return {};
  }
  switch (filterFlag) {
    case userFilterFlags.admins_only:
      return { admin: true };
    case userFilterFlags.non_admins:
      return { admin: false };
    case userFilterFlags.members_only:
      return { membership: true };
    case userFilterFlags.non_members:
      return { membership: false };
    case userFilterFlags.unverified_only:
      return { verified: false };
    case userFilterFlags.verified_only:
      return { verified: true };
    default:
      return {};
  }
}

/**
 * Fetch all the users based on the flag condition
 * @param flags userFilterFlags enum value
 * @returns all the users that matches the flags criteria
 */
export async function getUsers(filterFlag: number = undefined) {
  let result = await prisma.users.findMany({
    where: getFlagsCondition(filterFlag),
  });
  return result;
}

/**
 * get a single user from the database
 * @param id user's id
 * @returns user object
 */
export async function getUser(id: number) {
  return await prisma.users.findUnique({
    where: {
      id: id,
    },
  });
}

/**
 * tries to authenticate a user based on his username and password
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
  if (user && (await isSamePass(password, user.password))) {
    return {
      token: await createToken(user),
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
