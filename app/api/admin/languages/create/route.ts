import { storeLanguage } from "@/app/_controllers/languagesController";
import { successResponse } from "@/app/_lib/responseGenerator";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  let body = await request.json();
  await storeLanguage(body.language, body.code);
  return successResponse();
}
