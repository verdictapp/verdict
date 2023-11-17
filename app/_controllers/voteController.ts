import { errors } from "../_enums/enums";
import prisma from "@/app/_lib/prisma";
import { errorReturn, successReturn } from "../_lib/controllerReturnGenerator";

/**
 * vote on a specific topic
 * @param topicId
 * @param userId
 * @param vote
 * @returns already voted error if the user already voted, success otherwise
 */
export async function createVote(
  topicId: number,
  userId: number,
  vote: string
) {
  let result = await prisma.votes.findFirst({
    where: {
      topicId: topicId,
      userId: userId,
    },
  });

  if (result) return errorReturn(errors.already_voted);

  await prisma.votes.create({
    data: {
      topicId: topicId,
      userId: userId,
      vote: vote,
    },
  });
  return successReturn();
}

/**
 * change user vote
 * @param voteId
 * @param vote
 * @returns did not vote yet error if the vote was not found, already voted error if the new vote is the same as the old one, and already changed vote error (self explanatory), otherwise success
 */
export async function updateVote(voteId: number, vote: string) {
  let result = await prisma.votes.findUnique({
    where: {
      id: voteId,
    },
  });
  if (!result) return errorReturn(errors.did_not_vote_yet);

  // vote didn't change
  if (result.vote === vote) return errorReturn(errors.already_voted);

  if (result.changed) {
    return errorReturn(errors.already_changed_vote);
  }
  await prisma.votes.update({
    where: {
      id: voteId,
    },
    data: {
      changed: true,
      vote: vote,
    },
  });
  return successReturn();
}
