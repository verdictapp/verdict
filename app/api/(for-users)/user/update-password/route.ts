import { updatePassword } from "@/app/_controllers/usersController";
import { errors } from "@/app/_enums/enums";
import { isSamePass } from "@/app/_lib/hashing";
import { errorResponse, successResponse } from "@/app/_lib/responseGenerator";
import { NextRequest } from "next/server";

export async function PUT(request: NextRequest) {
  let userId = Number(request.headers.get("userId"));
  let body = await request.json();
  let result = await updatePassword(userId, body.oldPassword, body.newPassword);
  if (!result.success) return errorResponse(result.errorCode);

  return successResponse(result.returned);
}
