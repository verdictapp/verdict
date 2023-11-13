import { createVote } from "@/app/_controllers/voteController";
import { errors } from "@/app/_enums/enums";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest, { params }) {
  let body = await request.json();
  let result = await createVote(
    Number(params.id),
    JSON.parse(request.headers.get("user")).id,
    body.vote
  );
  if (result === errors.already_voted) {
    return new Response("already voted");
  }
  if (result === errors.already_changed_vote) {
    return new Response("already changed vote");
  }
  return new Response("OK");
}
