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
            Tag: {
              tag: {
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
 * fetch the topics (excluding the timed stats)
 * @param state 0 for false, 1 for true
 * @param tag a string representing the tag
 * @param search a string representing the search keyword
 * @returns a promise resolved as the topics that matches the criteria
 */
export async function showTopics(
  state = undefined,
  tag = undefined,
  search = ""
) {
  let result = await prisma.topics.findMany({
    where: {
      ...getTagConditions(tag),
      ...getStateConditions(state),
      title: {
        contains: search,
      },
    },
    select: {
      id: true,
      title: true,
      description: true,
      image: true,
      createdAt: true,
      options: true,
      state: true,
      stats: true,
    },
  });
  return result;
}

/**
 * fetch the timed stats of a topic
 * @param id the topic Id
 * @returns a promise resolved as the timed stats of the topic
 */
export async function showTopicTimedStats(id: number) {
  let result = await prisma.topics.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      timedStats: true,
    },
  });
  return result;
}

/**
 * store a topic in the database
 * @param title
 * @param description
 * @param image
 * @param options
 * @param state defaults to 1 (enabled)
 */
export async function storeTopic(
  title: any,
  description: any,
  image: any,
  options: {},
  state = 1
) {
  let stats = {};
  Object.keys(options).map((key) => {
    stats[key] = { verified: 0, unverified: 0 };
  });
  await prisma.topics.create({
    data: {
      title: title,
      description: description,
      image: image,
      options: options,
      state: state || 1,
      stats: stats,
      timedStats: {},
    },
  });
}

/**
 * deletes a topic from the database
 * @param id the id of the topic to be deleted
 */
export async function destroyTopic(id: number) {
  await prisma.topics.delete({ where: { id: id } });
}

/**
 * extracts the provided fields to be updated
 * @param title
 * @param description
 * @param image
 * @param state
 * @returns an object with only the defined values of the input
 */
function getUpdateDataObject(
  title: any,
  description: any,
  image: any,
  state: 0 | 1
) {
  return {
    ...(title && { title: title }),
    ...(description && { description: description }),
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
 */
export async function updateTopic(
  id: number,
  title: any,
  description: any,
  image: any,
  state: 0 | 1
) {
  await prisma.topics.update({
    where: {
      id: id,
    },
    data: getUpdateDataObject(title, description, image, state),
  });
  return new Response("OK");
}
