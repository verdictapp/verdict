import * as jose from "jose";
import { DURATIONS } from "../_constants/durations";

/**
 * checks if the token the user provided is still valid
 * @param token user's token
 * @param callback a function called with the payload if token valid
 * @returns wether the token is valid or not
 */
export async function verifyToken(token: string, callback = (f) => f) {
  if (!token) return false;
  let isAuth = true;

  try {
    const { payload } = await jose.jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET_TOKEN as string)
    );
    callback(payload);
  } catch (error) {
    isAuth = false;
  }
  return isAuth;
}

/**
 * creates a token for a user
 * @param user the payload to the sign function (user's object)
 * @param expirationTime how long will the token stay valid. default (2h) see duration.ts in _constants for more
 * @returns the created token
 */
export async function createToken(
  user,
  expirationTime = DURATIONS.SHORT_TOKEN_EXPIRATION
) {
  let token = await new jose.SignJWT(user)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expirationTime)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET_TOKEN as string));
  return token;
}
