import { createVote } from "@/app/_controllers/voteController";
import { errorResponse, successResponse } from "@/app/_lib/responseGenerator";
import { NextRequest } from "next/server";

export async function GET() {
  let result = await prisma.votes.findMany();
  return successResponse(result);
}

// create a vote
export async function POST(request: NextRequest, { params }) {
  let body = await request.json();
  let result = await createVote(
    Number(params.id),
    JSON.parse(request.headers.get("user")).id,
    body.vote
  );
  if (result.errorCode) {
    return errorResponse(result.errorCode);
  }
  return successResponse();
}
