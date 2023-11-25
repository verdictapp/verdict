import { storeLanguage } from "@/app/_controllers/languagesController";
import { errorResponse, successResponse } from "@/app/_lib/responseGenerator";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  let body = await request.json();
  let result = await storeLanguage(body.language, body.code);
  if (result.success) {
    return successResponse();
  } else {
    return errorResponse(result.errorCode);
  }
}
