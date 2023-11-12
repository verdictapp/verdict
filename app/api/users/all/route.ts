import { getUsers } from "@/app/_controllers/usersController";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  let result = await getUsers(Number(request.nextUrl.searchParams.get("flag")));
  return new Response(JSON.stringify(result));
}
