import { authenticateUserLocally } from "@/app/_controllers/usersController";
import { errors } from "@/app/_enums/errorsEnums";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  let body = await request.json();
  let result = await authenticateUserLocally(body.username, body.password);
  if (result === errors.wrong_credentials) {
    return new Response("wrong credentials", { status: 401 });
  } else {
    return new Response(JSON.stringify(result));
  }
}
