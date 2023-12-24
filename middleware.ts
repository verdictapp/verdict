import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./app/_lib/tokenHandler";
import { isAdmin } from "./app/_controllers/usersController";
const DEBUG = false;

export async function middleware(request: NextRequest) {
  // debugging mode skip this middleware
  if (DEBUG) return NextResponse.next();

  // get the user from token

  let token = request.cookies.get("authToken")?.value || undefined;
  let result = await verifyToken(
    token
    // request.headers.get("authorization")?.split(" ")[1] || undefined
  );

  if (request.nextUrl.pathname.startsWith("/api")) {
    if (
      // public access for auth and public paths
      request.nextUrl.pathname.startsWith("/api/auth") ||
      request.nextUrl.pathname.startsWith("/api/public")
    )
      return NextResponse.next();

    if (result.success) {
      // protecting admin path
      if (
        !(await isAdmin(result.returned.id)).returned &&
        request.nextUrl.pathname.startsWith("/api/admin")
      ) {
        return NextResponse.json({ message: "unauthorized" }, { status: 403 });
      }

      // passing the user's id
      const headers = new Headers(request.headers);
      headers.set("userId", result.returned.id);
      return NextResponse.next({ headers: headers });
    } else {
      return NextResponse.json({ message: "unauthenticated" }, { status: 401 });
    }
  } else {
    // routing middleware
    let newHref =
      request.nextUrl.href +
      (request.nextUrl.href.includes("?")
        ? `&userId=${result.returned.id}`
        : `?userId=${result.returned.id}`);

    return NextResponse.rewrite(newHref);
  }
}
