import { deleteTopic } from "@/app/_controllers/topicsController";
import { successResponse } from "@/app/_lib/responseGenerator";
import { NextRequest } from "next/server";

// deletes a topic
export async function DELETE(request: NextRequest, { params }) {
  await deleteTopic(Number(params.id));
  return successResponse();
}
