import { authenticateUserLocally } from "@/app/_controllers/usersController";
import {
  errorResponse,
  successLoginResponse,
} from "@/app/_lib/responseGenerator";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  let body = await request.json();
  let result = await authenticateUserLocally(body.username, body.password);
  if (!result.success) {
    return errorResponse(result.errorCode);
  }
  return successLoginResponse(result.returned);
}
