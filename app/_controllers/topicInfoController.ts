import { errors } from "../_enums/enums";
import { errorReturn, successReturn } from "../_lib/controllerReturnGenerator";
import prisma from "@/app/_lib/prisma";

/**
 * update language specific info of a topic
 * @param id topic info id
 * @param title
 * @param description
 * @param options
 * @returns success always
 */
export async function updateTopicInfo(
  id: number,
  title?: any,
  description?: any,
  options?: any
) {
  await prisma.topicInfo.update({
    where: {
      id: id,
    },
    data: {
      title,
      description,
      options,
    },
  });
  return successReturn();
}

/**
 * create a topic info in as specific language
 * @param topicId
 * @param data
 * @returns topic_language_exists error or success
 */
export async function createTopicInfo(
  topicId: number,
  languageId,
  title,
  description,
  options
) {
  let result = await prisma.topicInfo.findFirst({
    where: {
      topicId: topicId,
      languageId: languageId,
    },
  });
  if (result) return errorReturn(errors.topic_language_exists);
  await prisma.topicInfo.create({
    data: {
      topicId: topicId,
      languageId: languageId,
      title: title,
      description: description,
      options: options,
    },
  });
  return successReturn();
}

/**
 * delete a topic's info from the
 * @param id the topic info id
 * @returns success always
 */
export async function deleteTopicInfo(id: number) {
  await prisma.topicInfo.delete({
    where: {
      id: id,
    },
  });
  return successReturn();
}
