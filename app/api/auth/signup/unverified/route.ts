import { createUnverifiedUser } from "@/app/_controllers/usersController";
import { errorResponse, successResponse } from "@/app/_lib/responseGenerator";
import { createToken } from "@/app/_lib/tokenHandler";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  let body = await request.json();
  let result = await createUnverifiedUser(body.username, body.password);
  if (!result.success) {
    return errorResponse(result.errorCode);
  }
  return successResponse(result.returned);
}
