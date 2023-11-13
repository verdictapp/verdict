import { createVote, updateVote } from "@/app/_controllers/voteController";
import { errors } from "@/app/_enums/enums";
import { NextRequest } from "next/server";

export async function PUT(request: NextRequest, { params }) {
  let body = await request.json();
  let result = await updateVote(Number(params.voteId), body.vote);
  if (result === errors.already_changed_vote) {
    return new Response("already changed vote");
  }
  return new Response("OK");
}
