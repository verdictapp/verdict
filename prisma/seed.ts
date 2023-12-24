import prisma from "../app/_lib/prisma";
import bcrypt from "bcryptjs";

async function reset() {
  await prisma.languages.deleteMany();
  await prisma.topics.deleteMany();
  await prisma.users.deleteMany();
  await prisma.tags.deleteMany();
}

async function createLanguages(languages) {
  languages.en = await prisma.languages.create({
    data: {
      language: "English",
      code: "en",
    },
  });
  languages.ar = await prisma.languages.create({
    data: {
      language: "Arabic",
      code: "ar",
    },
  });
  languages.es = await prisma.languages.create({
    data: {
      language: "Spanish",
      code: "es",
    },
  });
}

async function createUsers(users) {
  users.admin = await prisma.users.create({
    data: {
      admin: true,
      username: "admin",
      password: bcrypt.hashSync("admin", 10),
      verified: true,
    },
  });
  users.unverified = await prisma.users.create({
    data: {
      admin: false,
      verified: false,
      username: "unverified",
      password: bcrypt.hashSync("unverified", 10),
    },
  });
}

async function createTags(tags, languages) {
  tags.popular = await prisma.tags.create({
    include: {
      tagInfo: true,
    },
    data: {
      priority: 20,
      tagInfo: {
        createMany: {
          data: [
            { languageId: languages.en.id, name: "popular" },
            { languageId: languages.ar.id, name: "رائج" },
            { languageId: languages.es.id, name: "popular" },
          ],
        },
      },
    },
  });
  tags.programming = await prisma.tags.create({
    include: {
      tagInfo: true,
    },
    data: {
      priority: 20,
      tagInfo: {
        createMany: {
          data: [
            { languageId: languages.en.id, name: "programming" },
            { languageId: languages.ar.id, name: "برمجة" },
          ],
        },
      },
    },
  });
  tags.sport = await prisma.tags.create({
    include: {
      tagInfo: true,
    },
    data: {
      priority: 20,
      tagInfo: {
        createMany: {
          data: [
            { languageId: languages.en.id, name: "sport" },
            { languageId: languages.ar.id, name: "رياضة" },
            { languageId: languages.es.id, name: "deporte" },
          ],
        },
      },
    },
  });
}

async function createTopic(topics, languages) {
  let stats = {};
  let timedStats = {};
  Object.keys({ "0": "yes", "1": "no" }).map((key) => {
    timedStats[key] = {};
    stats[key] = { verified: 0, unverified: 0 };
  });
  topics.first = await prisma.topics.create({
    include: {
      topicInfo: true,
    },
    data: {
      state: 1,
      image:
        "https://i.jeded.com/i/avatar-the-last-airbender-second-season.154-21537.jpg",
      priority: 12,
      stats: stats,
      timedStats: timedStats,
      topicInfo: {
        createMany: {
          data: [
            {
              languageId: languages.en.id,
              title: "First topic's title",
              description: "First topic's description",
              options: { "0": "yes", "1": "no" },
            },
            {
              languageId: languages.ar.id,
              title: "عنوان أول موضوع",
              description: "وصف أول عنوان",
              options: { "0": "yes", "1": "no" },
            },
          ],
        },
      },
    },
  });
}

async function main() {
  await reset();
  // create languages
  let languages = { en: {}, ar: {}, es: {} };
  await createLanguages(languages);

  // create users
  let users = { admin: {}, unverified: {} };
  await createUsers(users);

  // create tags
  let tags = { popular: {}, programming: {}, sport: {} };
  await createTags(tags, languages);

  // create topics
  let topics = { first: {} };
  await createTopic(topics, languages);

  console.log("====================================");
  console.log("languages", JSON.stringify(languages, null, "  "));
  console.log("====================================");
  console.log("====================================");
  console.log("users", JSON.stringify(users, null, "  "));
  console.log("====================================");
  console.log("====================================");
  console.log("tags", JSON.stringify(tags, null, "  "));
  console.log("====================================");
  console.log("====================================");
  console.log("topics", JSON.stringify(topics, null, "  "));
  console.log("====================================");
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
