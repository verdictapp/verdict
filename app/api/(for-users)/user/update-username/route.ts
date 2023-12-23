import { updateUsername } from "@/app/_controllers/usersController";
import { errorResponse, successResponse } from "@/app/_lib/responseGenerator";
import { NextRequest } from "next/server";

export async function PUT(request: NextRequest) {
  let userId = Number(request.headers.get("userId"));
  let body = await request.json();
  let result = await updateUsername(userId, body.username);
  if (!result.success) {
    return errorResponse(result.errorCode);
  }
  return successResponse(result.returned);
}
