import { successReturn } from "../_lib/controllerReturnGenerator";
import prisma from "@/app/_lib/prisma";

/**
 * add multiple tags to a topic
 * @param topicId
 * @param tags array of tag ids
 * @returns success
 */
export async function addTagsToTopic(topicId: number, tags: any[] = []) {
  await prisma.tagged.createMany({
    data: tags.map((tagId) => {
      return {
        topicId: topicId,
        tagId: tagId,
      };
    }),
  });
  return successReturn();
}

/**
 * add multiple topics to a tag
 * @param tagId
 * @param topics array of topic ids
 * @returns success
 */
export async function addTopicsToTag(tagId: number, topics: any[] = []) {
  await prisma.tagged.createMany({
    data: topics.map((topicId) => {
      return {
        topicId: topicId,
        tagId: tagId,
      };
    }),
  });
  return successReturn();
}

/**
 * get all the topics that doesn't have this tag
 * @param tagId
 * @returns success, with the available topics
 */
export async function availableTopics(tagId: number) {
  let result = await prisma.topics.findMany({
    select: {
      id: true,
      topicInfo: {
        select: {
          title: true,
        },
        take: 1,
      },
    },
    where: {
      tagged: {
        none: {
          tagId: tagId,
        },
      },
    },
  });
  return successReturn(result);
}

/**
 * get all the tags that are not assigned to this topic
 * @param topicId
 * @returns success, with all the available tags
 */
export async function availableTags(topicId: number) {
  let result = await prisma.tags.findMany({
    where: {
      tagged: {
        none: {
          topicId: topicId,
        },
      },
    },
  });
  return successReturn(result);
}

export async function unlinkTagTopic(linkId: number) {
  await prisma.tagged.delete({
    where: {
      id: linkId,
    },
  });
  return successReturn();
}
