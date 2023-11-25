import { updateUsername } from "@/app/_controllers/usersController";
import { errorResponse, successResponse } from "@/app/_lib/responseGenerator";
import { NextRequest } from "next/server";

export async function PUT(request: NextRequest) {
  let user = JSON.parse(request.headers.get("user"));
  let body = await request.json();
  let result = await updateUsername(user.id, body.username);
  if (!result.success) {
    return errorResponse(result.errorCode);
  }
  return successResponse(result.returned);
}
