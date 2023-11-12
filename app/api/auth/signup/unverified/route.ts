import { createUnverifiedUser } from "@/app/_controllers/usersController";
import { errors } from "@/app/_enums/enums";
import { createToken } from "@/app/_lib/tokenHandler";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  let body = await request.json();
  let result = await createUnverifiedUser(body.username, body.password);
  if (result === errors.username_taken) {
    return new Response("username taken");
  } else {
    return new Response(
      JSON.stringify({
        token: await createToken(result),
      })
    );
  }
}
