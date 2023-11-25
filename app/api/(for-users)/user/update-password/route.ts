import { updatePassword } from "@/app/_controllers/usersController";
import { errors } from "@/app/_enums/enums";
import { isSamePass } from "@/app/_lib/hashing";
import { errorResponse, successResponse } from "@/app/_lib/responseGenerator";
import { NextRequest } from "next/server";

export async function PUT(request: NextRequest) {
  let user = JSON.parse(request.headers.get("user"));
  let body = await request.json();
  if (await isSamePass(body.oldPassword, user.password)) {
    let result = await updatePassword(user.id, body.newPassword);
    return successResponse(result.returned);
  }
  return errorResponse(errors.incorrect_password);
}
