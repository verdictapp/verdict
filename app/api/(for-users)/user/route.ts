import { getUser } from "@/app/_controllers/usersController";
import { successResponse } from "@/app/_lib/responseGenerator";
import { NextRequest } from "next/server";

// get the user of the request
export async function GET(request: NextRequest) {
  let result = await getUser(Number(request.headers.get("userId")));
  return successResponse(result.returned);
}
