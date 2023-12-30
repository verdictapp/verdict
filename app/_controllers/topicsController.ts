import prisma from "@/app/_lib/prisma";
import { successReturn } from "../_lib/controllerReturnGenerator";
import getPagination from "../_lib/paginationHelper";
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
              tagInfo: {
                some: {
                  name: tag,
                },
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
  return search !== null
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
  take?,
  skip?,
  state?,
  tag?,
  search?,
  code?: string,
  userId?: number
) {
  let result = await prisma.topics.findMany({
    where: {
      ...getStateConditions(state),
      ...getTagConditions(tag),
      ...getSearchConditions(search),
    },
    select: {
      id: true,
      image: true,
      createdAt: true,
      priority: true,
      state: true,
      stats: true,
      votes: userId && {
        where: {
          userId: userId,
        },
      },
      topicInfo: {
        where: {
          languages: {
            OR: [{ code: "en" }, { code: code }],
          },
        },
      },
      tagged: {
        select: {
          id: true,
          tag: {
            select: {
              id: true,
              tagInfo: {
                where: {
                  languages: {
                    OR: [{ code: "en" }, { code: code }],
                  },
                },
              },
            },
          },
        },
      },
    },
    orderBy: {
      priority: "desc",
    },
    ...getPagination(take, skip),
  });
  return successReturn(result);
}

export async function showTopic(id: number) {
  let result = await prisma.topics.findFirst({
    where: {
      id: id,
    },
    select: {
      id: true,
      image: true,
      createdAt: true,
      priority: true,
      state: true,
      topicInfo: true,
      tagged: {
        select: {
          id: true,
          tag: {
            select: {
              id: true,
              tagInfo: {
                where: {
                  languages: {
                    code: "en",
                  },
                },
              },
            },
          },
        },
      },
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
  let result = await prisma.topics.findFirst({
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
      state: state,
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

export async function updateTopic(
  id: number,
  image: string,
  priority: number,
  state: 0 | 1
) {
  await prisma.topics.update({
    where: {
      id: id,
    },
    data: {
      image: image,
      priority: priority,
      state: state,
    },
  });
  return successReturn();
}

/**
 * update a topic's image by it's id
 * @param id
 * @param image
 * @returns success always
 */
export async function updateTopicImage(id: number, image: any) {
  await prisma.topics.update({
    where: {
      id: id,
    },
    data: {
      image: image,
    },
  });
  return successReturn();
}

/**
 * update a topic's priority by it's id
 * @param id
 * @param priority
 * @returns success always
 */
export async function updateTopicPriority(id: number, priority: number) {
  await prisma.topics.update({
    where: {
      id: id,
    },
    data: {
      priority: priority,
    },
  });
  return successReturn();
}

/**
 * update a topic's state by it's id
 * @param id
 * @param state
 * @returns success always
 */
export async function updateTopicState(id: number, state?: 0 | 1) {
  await prisma.topics.update({
    where: {
      id: id,
    },
    data: {
      state: state,
    },
  });
  return successReturn();
}
