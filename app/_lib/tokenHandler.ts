import * as jose from "jose";
import { errorReturn, successReturn } from "./controllerReturnGenerator";
import { errors } from "../_enums/enums";

/**
 * checks if the token the user provided is still valid
 * @param token user's token
 * @param callback a function called with the payload if token valid
 * @returns wether the token is valid or not
 */
export async function verifyToken(token: string) {
  if (!token) return errorReturn(errors.token_error);
  let isAuth = true;

  try {
    const { payload } = await jose.jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET_TOKEN as string)
    );
    return successReturn(payload);
  } catch (error) {
    return errorReturn(errors.token_error);
  }
}

/**
 * creates a token for a user
 * @param user the payload to the sign function (user's object)
 * @returns the created token
 */
export async function issueToken(user) {
  let token = await new jose.SignJWT({ id: user.id })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .sign(new TextEncoder().encode(process.env.JWT_SECRET_TOKEN as string));
  return token;
}
