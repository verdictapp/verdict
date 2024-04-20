import prisma from "@/app/_lib/prisma";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  await prisma.users.deleteMany();

  return new Response("users reset complete");
}
