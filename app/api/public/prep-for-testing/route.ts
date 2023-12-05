import { createAdmin } from "@/app/_controllers/usersController";
import prisma from "@/app/_lib/prisma";
import { errorResponse, successResponse } from "@/app/_lib/responseGenerator";
import { issueToken } from "@/app/_lib/tokenHandler";
export async function GET() {
  await prisma.users.deleteMany();
  await prisma.topics.deleteMany();
  await prisma.languages.deleteMany();
  await prisma.tags.deleteMany();
  await prisma.topicInfo.deleteMany();
  await prisma.votes.deleteMany();
  await prisma.tagged.deleteMany();
  let result = await createAdmin("kamil", "kamil");
  return successResponse(result.returned);
}
