import prisma from "@/app/_lib/prisma";
import { successReturn } from "../_lib/controllerReturnGenerator";
import getPagination from "../_lib/paginationHelper";
/**
 * get all tags
 * @param search
 * @returns success with all tags
 */
export async function getTags(
  search?: string,
  code?: string,
  take?: any,
  skip?: any
) {
  let result = await prisma.tags.findMany({
    where: {
      tagInfo: {
        some: {
          name: {
            contains: search === null ? "" : search,
          },
        },
      },
    },
    select: {
      id: true,
      priority: true,
      tagInfo: {
        where: {
          languages: {
            OR: [{ code: "en" }, { code: code }],
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

/**
 * create a new tag
 * @param name name of the tag
 * @param priority tag priority, 0 lowest
 * @returns success
 */
export async function createTag(
  data = [
    {
      languageId: 0,
      name: "test",
    },
  ],
  priority: number = 0
) {
  await prisma.tags.create({
    data: {
      priority: priority,
      tagInfo: {
        createMany: {
          data: data.map((tagInfo) => {
            return {
              languageId: tagInfo.languageId,
              name: tagInfo.name,
            };
          }),
        },
      },
    },
  });
  return successReturn();
}

/**
 * update a tag's priority
 * @param id id of the tag
 * @param priority tag priority, 0 lowest
 * @returns success
 */
export async function updateTagPriority(id: number, priority?: number) {
  await prisma.tags.update({
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
 * delete a tag
 * @param id id of the tag
 * @returns success
 */
export async function deleteTag(id: number) {
  await prisma.tags.delete({
    where: {
      id: id,
    },
  });
  return successReturn();
}
