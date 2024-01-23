import { getTranslationsByTagId } from "@/app/_controllers/tagInfoController";
import { successResponse } from "@/app/_lib/responseGenerator";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }) {
  let result = await getTranslationsByTagId(Number(params.id));
  return successResponse(result.returned);
}
