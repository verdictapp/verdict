import { getLanguages } from "@/app/_controllers/languagesController";
import { successResponse } from "@/app/_lib/responseGenerator";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  let result = await getLanguages();
  return successResponse(result.returned);
}
