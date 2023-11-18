import { updateUserLocalInformation } from "@/app/_controllers/usersController";
import { errors } from "@/app/_enums/enums";
import { isSamePass } from "@/app/_lib/hashing";
import { errorResponse, successResponse } from "@/app/_lib/responseGenerator";
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
    if (result.errorCode) {
      return errorResponse(result.errorCode);
    }
    return successResponse();
  }
  return errorResponse(errors.incorrect_password);
}
