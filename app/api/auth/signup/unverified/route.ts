import { createUnverifiedUser } from "@/app/_controllers/usersController";
import { errors } from "@/app/_enums/errorsEnums";
import { createToken } from "@/app/_lib/apiJwt";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  let body = await request.json();
  await prisma.users.deleteMany();
  let result = await createUnverifiedUser(body.username, body.password);
  if (result === errors.username_taken) {
    return new Response("username taken");
  } else {
    return new Response(JSON.stringify({ token: await createToken(result) }));
  }
}
