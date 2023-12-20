import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./app/_lib/tokenHandler";
import { isAdmin } from "./app/_controllers/usersController";
const DEBUG = true;

export async function middleware(request: NextRequest) {
  if (DEBUG) return NextResponse.next();
  if (request.nextUrl.pathname.startsWith("/api")) {
    // public access for auth and public paths
    if (
      request.nextUrl.pathname.startsWith("/api/auth") ||
      request.nextUrl.pathname.startsWith("/api/public")
    )
      return NextResponse.next();

    // verify token
    let result = await verifyToken(
      request.headers.get("authorization")?.split(" ")[1] || undefined
    );

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
    return NextResponse.next();
  }
}
