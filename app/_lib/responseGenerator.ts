import { serialize } from "cookie";

export function successLoginResponse(tokenObject?: { token: string }) {
  return new Response(
    JSON.stringify({
      success: true,
    }),
    {
      headers: {
        "Set-Cookie": serialize("authToken", tokenObject.token, {
          secure: true,
          domain: "localhost",
          path: "/",
          maxAge: 2147483647,
        }),
      },
    }
  );
}

export function successLogoutResponse() {
  return new Response(
    JSON.stringify({
      success: true,
    }),
    {
      headers: {
        "Set-Cookie": serialize("authToken", "", {
          secure: true,
          domain: "localhost",
          path: "/",
          maxAge: -1,
        }),
      },
    }
  );
}

export function successResponse(result?: any) {
  return new Response(
    JSON.stringify({
      success: true,
      result: result || undefined,
    })
  );
}

export function errorResponse(code: number, result?: any) {
  return new Response(
    JSON.stringify({
      success: false,
      errorCode: code,
      result: result || undefined,
    })
  );
}
