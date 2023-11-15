import {
  getLanguages,
  storeLanguage,
} from "@/app/_controllers/languagesController";
import { successResponse } from "@/app/_lib/responseGenerator";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  let result = await getLanguages();
  return successResponse(result.returned);
}
export async function POST(request: NextRequest) {
  let body = await request.json();
  await storeLanguage(body.language, body.code);
  return successResponse();
}
