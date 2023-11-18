import { addTopicsToTag } from "@/app/_controllers/taggedController";
import { successResponse } from "@/app/_lib/responseGenerator";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest, { params }) {
  let body = await request.json();
  await addTopicsToTag(Number(params.id), body.topics);
  return successResponse();
}
