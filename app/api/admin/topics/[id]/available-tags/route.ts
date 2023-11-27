import { availableTags } from "@/app/_controllers/taggedController";
import { successResponse } from "@/app/_lib/responseGenerator";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }) {
  let result = await availableTags(Number(params.id));
  return successResponse(result.returned);
}
