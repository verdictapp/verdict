import { authenticateUserLocally } from "@/app/_controllers/usersController";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  let body = await request.json();
  let result = await authenticateUserLocally(body.username, body.password);
  if (result === errors.wrong_credentials) {
    return new Response("wrong credentials");
  } else {
    return new Response(JSON.stringify(result));
  }
}
