import prisma from "@/app/_lib/prisma";

export async function getLanguages() {
  let languages = await prisma.languages.findMany();
  return languages;
}

export async function storeLanguage(language: string, code: string) {
  await prisma.languages.create({
    data: {
      language: language,
      code: code,
    },
  });
}
export async function updateLanguage(
  id: number,
  language: string,
  code: string
) {
  await prisma.languages.update({
    where: {
      id: id,
    },
    data: {
      language: language,
      code: code,
    },
  });
}
export async function deleteLanguage(id: number) {
  await prisma.languages.delete({ where: { id: id } });
}
