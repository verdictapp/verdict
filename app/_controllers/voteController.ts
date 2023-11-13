import { errors } from "../_enums/enums";
import prisma from "@/app/_lib/prisma";

/**
 *
 * @param topicId
 * @param userId
 * @param vote
 * @returns
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
  if (result) {
    if (!result.changed) {
      return updateVote(result.id, vote);
    }
    return errors.already_voted;
  }
  await prisma.votes.create({
    data: {
      topicId: topicId,
      userId: userId,
      vote: vote,
    },
  });
}

/**
 *
 * @param voteId
 * @param vote
 * @returns
 */
export async function updateVote(voteId: number, vote: string) {
  let result = await prisma.votes.findUnique({
    where: {
      id: voteId,
    },
  });
  if (result.changed) {
    return errors.already_changed_vote;
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
}
