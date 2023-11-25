import { updateLanguage } from "@/app/_controllers/languagesController";
import { errorResponse, successResponse } from "@/app/_lib/responseGenerator";
import { NextRequest } from "next/server";

export async function PUT(request: NextRequest, { params }) {
  let body = await request.json();
  let result = await updateLanguage(
    Number(params.id),
    body.language,
    body.code
  );
  if (!result.success) {
    return errorResponse(result.errorCode);
  }
  return successResponse();
}
