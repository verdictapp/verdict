import { getDefaultLanguage } from "@/app/_controllers/languagesController";
import { errorResponse, successResponse } from "@/app/_lib/responseGenerator";

export default async function GET() {
  let result = await getDefaultLanguage();
  if (!result.success) return errorResponse(result.errorCode);

  return successResponse(result.returned);
}
