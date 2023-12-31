import { getUsers } from "@/app/_controllers/usersController";
import { successResponse } from "@/app/_lib/responseGenerator";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  let result = await getUsers(
    Number(request.nextUrl.searchParams.get("flag") || undefined),
    request.nextUrl.searchParams.get("take"),
    request.nextUrl.searchParams.get("skip")
  );
  return successResponse(result.returned);
}
