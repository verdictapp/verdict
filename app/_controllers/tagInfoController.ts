import { errors } from "../_enums/enums";
import { errorReturn, successReturn } from "../_lib/controllerReturnGenerator";
import prisma from "../_lib/prisma";

export async function createTagInfo(
  tagId: number,
  languageId: number,
  name: string
) {
  let result = await prisma.tagInfo.findFirst({
    where: {
      tagId: tagId,
      languageId: languageId,
    },
  });
  if (result) return errorReturn(errors.tag_language_exists);
  await prisma.tagInfo.create({
    data: {
      languageId: languageId,
      tagId: tagId,
      name: name,
    },
  });
  return successReturn();
}

export async function updateTagInfo(id: number, name: string) {
  await prisma.tagInfo.update({
    where: {
      id: id,
    },
    data: {
      name: name,
    },
  });
  return successReturn();
}

export async function deleteTagInfo(id: number) {
  await prisma.tagInfo.delete({
    where: {
      id: id,
    },
  });
  return successReturn();
}

export async function getTranslationsByTagId(tagId: number) {
  let result = await prisma.tagInfo.findMany({
    where: {
      tagId: tagId,
    },
  });
  return successReturn(result);
}
