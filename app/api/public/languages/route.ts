import { getLanguages } from "@/app/_controllers/languagesController";
import { successResponse } from "@/app/_lib/responseGenerator";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  let result = await getLanguages(
    request.nextUrl.searchParams.get("take"),
    request.nextUrl.searchParams.get("skip")
  );
  return successResponse(result.returned);
}
