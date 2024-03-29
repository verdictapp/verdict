import prisma from "@/app/_lib/prisma";
import { errorReturn, successReturn } from "../_lib/controllerReturnGenerator";
import { errors } from "../_enums/enums";
import getPagination from "../_lib/paginationHelper";

export async function getDefaultLanguage() {
  let defaultLanguage = await prisma.languages.findFirst({
    where: {
      code: "en",
    },
  });
  if (!defaultLanguage) {
    return errorReturn(errors.default_language_not_found);
  }

  return successReturn(defaultLanguage.id);
}

/**
 * get all languages
 * @returns languages array
 */
export async function getLanguages(take?: any, skip?: any) {
  let languages = await prisma.languages.findMany({
    ...getPagination(take, skip),
  });
  return successReturn(languages);
}

/**
 * create a unique new language
 * @param language language name
 * @param code language two letter representation
 * @returns language_exists error, or success
 */
export async function storeLanguage(language?: string, code?: string) {
  let result = await prisma.languages.findFirst({
    where: {
      OR: [{ language: language }, { code: code }],
    },
  });
  if (result) return errorReturn(errors.language_exists);
  await prisma.languages.create({
    data: {
      language: language,
      code: code,
    },
  });
  return successReturn();
}

/**
 * update an existing language with unique language and code
 * @param id language id
 * @param language new language name
 * @param code new language code
 * @returns language_exists error, or success
 */
export async function updateLanguage(
  id: number,
  language: string,
  code: string
) {
  let result = await prisma.languages.findFirst({
    where: {
      id: { not: id },
      OR: [{ language: language }, { code: code }],
    },
  });
  if (result) return errorReturn(errors.language_exists);
  await prisma.languages.update({
    where: {
      id: id,
    },
    data: {
      language: language,
      code: code,
    },
  });
  return successReturn();
}
export async function deleteLanguage(id: number) {
  await prisma.languages.delete({ where: { id: id } });
  return successReturn();
}
