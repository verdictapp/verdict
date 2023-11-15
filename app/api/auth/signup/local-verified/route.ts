import { createVerifiedUser } from "@/app/_controllers/usersController";
import { errorResponse, successResponse } from "@/app/_lib/responseGenerator";
import { createToken } from "@/app/_lib/tokenHandler";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  let body = await request.json();
  let result = await createVerifiedUser(body.username, body.password);
  if (result.errorCode) {
    return errorResponse(result.errorCode);
  }
  return successResponse({
    token: await createToken(result.returned),
  });
}
