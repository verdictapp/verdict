import prisma from "@/app/_lib/prisma";
import { successReturn } from "../_lib/controllerReturnGenerator";
import getPagination from "../_lib/paginationHelper";
/**
 * get all tags
 * @param search
 * @returns success with all tags
 */
export async function getTags(search?: string, take?: any, skip?: any) {
  let result = await prisma.tags.findMany({
    where: {
      name: {
        contains: search === null ? "" : search,
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
export async function createTag(name: string, priority: number = 0) {
  await prisma.tags.create({
    data: {
      name: name,
      priority: priority,
    },
  });
  return successReturn();
}

/**
 * update a tag
 * @param id id of the tag
 * @param name name of the tag
 * @param priority tag priority, 0 lowest
 * @returns success
 */
export async function updateTag(id: number, name?: string, priority?: number) {
  await prisma.tags.update({
    where: {
      id: id,
    },
    data: {
      name: name,
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
