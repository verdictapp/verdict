import { updateUserLocalInformation } from "@/app/_controllers/usersController";
import { errors } from "@/app/_enums/enums";
import { isSamePass } from "@/app/_lib/hashing";
import { NextRequest } from "next/server";

export async function PUT(request: NextRequest) {
  let user = JSON.parse(request.headers.get("user"));
  let body = await request.json();
  if (isSamePass(body.oldPass, user.password)) {
    let result = await updateUserLocalInformation(
      user.id,
      body.newUsername,
      body.newPass
    );
    if (result === errors.username_taken) {
      return new Response("username taken");
    }
    return new Response("OK");
  }
  return new Response("incorrect password");
}
