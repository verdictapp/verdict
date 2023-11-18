import prisma from "@/app/_lib/prisma";
import { successReturn } from "../_lib/controllerReturnGenerator";

/**
 * structures an object for the tag condition on the topics table
 * @param tag a string representing the tag
 * @returns a condition object for the tag on the topics table
 */
function getTagConditions(tag: any) {
  return tag
    ? {
        tagged: {
          some: {
            tag: {
              name: {
                equals: tag,
              },
            },
          },
        },
      }
    : {};
}

/**
 * structures an object for the state condition on the topics table
 * @param state 0 for false, 1 for true
 * @returns a condition object for the state on the topics table
 */
function getStateConditions(state: any) {
  return state
    ? {
        state: {
          equals: Number(state) || 0,
        },
      }
    : {};
}

/**
 * structures an object for the search condition on the topics table
 * @param search a string representing the search keyword
 * @returns a condition object for the search on the topics table
 */
function getSearchConditions(search: any) {
  return search === ""
    ? {
        topicInfo: {
          some: {
            title: {
              contains: search,
            },
          },
        },
      }
    : {};
}

/**
 * fetch the topics (excluding the timed stats)
 * @param state 0 for false, 1 for true
 * @param tag a string representing the tag
 * @param search a string representing the search keyword
 * @param code language code (two letter representation of the language)
 * @returns the topics that matches the criteria
 */
export async function showTopics(
  state = undefined,
  tag = undefined,
  search = "",
  code = "en"
) {
  let result = await prisma.topics.findMany({
    where: {
      ...getTagConditions(tag),
      ...getStateConditions(state),
      ...getSearchConditions(search),
    },
    select: {
      id: true,
      image: true,
      createdAt: true,
      priority: true,
      state: true,
      stats: true,
      topicInfo: {
        where: {
          languages: {
            OR: [{ code: "en" }, { code: code.toLowerCase() }],
          },
        },
      },
      tagged: {
        select: {
          id: true,
          tag: true,
        },
      },
    },
    orderBy: {
      priority: "desc",
    },
  });
  return successReturn(result);
}

/**
 * fetch the stats and the timed stats of a topic
 * @param id the topic Id
 * @returns the stats and timed stats of the topic
 */
export async function showTopicTimedStats(id: number) {
  let result = await prisma.topics.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      stats: true,
      timedStats: true,
    },
  });
  return successReturn(result);
}

/**
 * store a topic in the database
 * @param data array of language-specific topic info
 * @param image
 * @param state defaults to 1 (enabled)
 */
export async function storeTopic(
  data = [
    {
      languageId: 0,
      title: "title in English",
      description: "description in English",
      options: "options with English values",
    },
  ],
  priority: number = 0,
  image: any,
  state = 1
) {
  let stats = {};
  let timedStats = {};
  Object.keys(data[0].options).map((key) => {
    timedStats[key] = {};
    stats[key] = { verified: 0, unverified: 0 };
  });
  await prisma.topics.create({
    data: {
      image: image,
      state: state || 1,
      stats: stats,
      timedStats: timedStats,
      priority: priority,
      topicInfo: {
        createMany: {
          data: data.map((topicInfo) => {
            return {
              languageId: topicInfo.languageId,
              title: topicInfo.title,
              description: topicInfo.description,
              options: topicInfo.options,
            };
          }),
        },
      },
    },
  });
  return successReturn();
}

/**
 * deletes a topic from the database
 * @param id the id of the topic to be deleted
 * @returns success always
 */
export async function deleteTopic(id: number) {
  await prisma.topics.delete({ where: { id: id } });
  return successReturn();
}

/**
 * extracts the provided fields to be updated
 * @param image
 * @param state
 * @returns an object with only the defined values of the input
 */
function getUpdateDataObject(image: any, state: 0 | 1) {
  return {
    ...(image && { image: image }),
    ...(state && { state: state }),
  };
}

/**
 * update a topic by it's id, only the defined inputs will be updated
 * @param id
 * @param title
 * @param description
 * @param image
 * @param state
 * @returns success always
 */
export async function updateTopic(id: number, image: any, state: 0 | 1) {
  await prisma.topics.update({
    where: {
      id: id,
    },
    data: getUpdateDataObject(image, state),
  });
  return successReturn();
}
