import { updateVote } from "@/app/_controllers/voteController";
import { errorResponse, successResponse } from "@/app/_lib/responseGenerator";
import { NextRequest } from "next/server";

// change vote
export async function PUT(request: NextRequest, { params }) {
  let body = await request.json();
  let result = await updateVote(Number(params.voteId), body.vote);
  if (result.errorCode) {
    return errorResponse(result.errorCode);
  }
  return successResponse();
}
