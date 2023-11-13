import { usernameAvailable } from "@/app/_controllers/usersController";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  let result = await usernameAvailable(
    request.nextUrl.searchParams.get("username") || undefined
  );
  return new Response(JSON.stringify(result));
}
