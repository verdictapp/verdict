import { createUnverifiedUser } from "@/app/_controllers/usersController";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  let body = await request.json();
  let result = await createUnverifiedUser(body.username, body.password);
  if (result === -1) {
    return new Response("username taken");
  }
}
