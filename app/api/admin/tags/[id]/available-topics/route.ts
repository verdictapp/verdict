import { availableTopics } from "@/app/_controllers/taggedController";
import { successResponse } from "@/app/_lib/responseGenerator";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }) {
  let result = await availableTopics(
    Number(params.id),
    request.nextUrl.searchParams.get("take"),
    request.nextUrl.searchParams.get("skip")
  );
  return successResponse(result.returned);
}
