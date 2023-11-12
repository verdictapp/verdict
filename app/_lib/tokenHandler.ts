import * as jose from "jose";

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
 * @returns the created token
 */
export async function createToken(user) {
  let token = await new jose.SignJWT(user)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .sign(new TextEncoder().encode(process.env.JWT_SECRET_TOKEN as string));
  return token;
}
