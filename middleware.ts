import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./app/_lib/tokenHandler";
const DEBUG = true;

export async function middleware(request: NextRequest) {
  if (DEBUG) return NextResponse.next();
  if (request.nextUrl.pathname.startsWith("/api")) {
    // exclude auth folder
    if (request.nextUrl.pathname.startsWith("/api/auth"))
      return NextResponse.next();

    // passing the user to the endpoint
    const headers = new Headers(request.headers);
    const setUser = (user) => {
      headers.set("user", JSON.stringify(user));
    };
    if (
      await verifyToken(
        request.headers.get("authorization")?.split(" ")[1] || undefined,
        setUser
      )
    ) {
      return NextResponse.next({ headers: headers });
    } else {
      return NextResponse.json({ message: "unauthenticated" }, { status: 401 });
    }
  } else {
    // routing middleware
    return NextResponse.next();
  }
}
