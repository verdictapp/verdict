import { getUser } from "@/app/_controllers/usersController";
import { successResponse } from "@/app/_lib/responseGenerator";
import { NextRequest } from "next/server";

// get the user of the request
export async function GET(request: NextRequest) {
  let result = await getUser(JSON.parse(request.headers.get("user")).id);
  return successResponse(result.returned);
}
