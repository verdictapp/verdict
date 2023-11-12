import { getUser } from "@/app/_controllers/usersController";
import { NextRequest } from "next/server";

// get a single user
export async function GET(request: NextRequest) {
  let user = await getUser(JSON.parse(request.headers.get("user")).id);
  return new Response(JSON.stringify(user || "user not found"));
}
