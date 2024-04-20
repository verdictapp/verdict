import { createTagInfo } from "@/app/_controllers/tagInfoController";
import { errorResponse, successResponse } from "@/app/_lib/responseGenerator";
import { NextRequest } from "next/server";

// create tag info in a specific language
export async function POST(request: NextRequest, { params }) {
  let body = await request.json();
  let result = await createTagInfo(
    Number(params.id),
    body.languageId,
    body.name
  );
  if (!result.success) return errorResponse(result.errorCode);
  return successResponse();
}
