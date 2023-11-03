import prisma from "@/app/_lib/prisma";

export async function GET() {
  let result = await prisma.$queryRaw`
        SELECT  event_object_table AS table_name ,trigger_name         
        FROM information_schema.triggers   
        GROUP BY table_name , trigger_name 
        ORDER BY table_name ,trigger_name;
    `;
  return new Response(JSON.stringify(result));
}

export async function POST() {
  // increment_stats
  await prisma.$executeRaw`
    CREATE OR REPLACE FUNCTION increment_stats() RETURNS TRIGGER AS $$
    BEGIN
    UPDATE "topics"
    SET "stats" = jsonb_set("stats", ARRAY[NEW.vote::text, CASE WHEN u.verified THEN 'verified' ELSE 'unverified' END], to_jsonb((("stats" -> NEW.vote::text -> CASE WHEN u.verified THEN 'verified' ELSE 'unverified' END)::int + 1)::text), true)
    FROM "users" u
    WHERE u.id = NEW.userId AND "topics"."id" = NEW."topicId";
    RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
    `;
  await prisma.$executeRaw`
    CREATE OR REPLACE TRIGGER increment_stats_trigger
    AFTER INSERT ON "votes"
    FOR EACH ROW
    EXECUTE FUNCTION increment_stats();`;
  // =====================================================================================
  // change_stats
  await prisma.$executeRaw`
    CREATE OR REPLACE FUNCTION change_stats() RETURNS TRIGGER AS $$
    BEGIN
    UPDATE "topics"
    SET "stats" = jsonb_set(jsonb_set("stats", ARRAY[NEW.vote::text, CASE WHEN u.verified THEN 'verified' ELSE 'unverified' END], to_jsonb((("stats" -> NEW.vote::text -> CASE WHEN u.verified THEN 'verified' ELSE 'unverified' END)::int + 1)::text), true), ARRAY[OLD.vote::text, CASE WHEN u.verified THEN 'verified' ELSE 'unverified' END], to_jsonb((("stats" -> OLD.vote::text -> CASE WHEN u.verified THEN 'verified' ELSE 'unverified' END)::int - 1)::text), true)
    FROM "users" u
    WHERE u.id = NEW.userId AND "topics"."id" = NEW."topicId";
    RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
    `;
  await prisma.$executeRaw`
    CREATE TRIGGER change_stats_trigger
    AFTER UPDATE ON "votes"
    FOR EACH ROW
    EXECUTE FUNCTION change_stats();
  `;
  // =====================================================================================
  // increment_timed_stats
  await prisma.$executeRaw`
    CREATE OR REPLACE FUNCTION increment_timed_stats() RETURNS TRIGGER AS $$
    DECLARE
    week_num INTEGER;
    month_num INTEGER;
    year_num INTEGER;
    week_start DATE;
    week_end DATE;
    week_key TEXT;
    BEGIN
    week_num := EXTRACT(WEEK FROM NEW."createdAt");
    month_num := EXTRACT(MONTH FROM NEW."createdAt");
    year_num := EXTRACT(YEAR FROM NEW."createdAt");
    week_start := DATE_TRUNC('week', NEW."createdAt");
    week_end := week_start + INTERVAL '6 days';
    week_key := CONCAT(week_num, '/', month_num, '/', year_num);
    UPDATE "topics"
    SET "timedStats" = jsonb_set("timedStats", ARRAY[week_key, NEW.vote::text], to_jsonb((("timedStats" -> week_key ->> NEW.vote::text)::int + 1)::text), true)
    WHERE "id" = NEW."topic_id";
    RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `;
  await prisma.$executeRaw`
    CREATE OR REPLACE TRIGGER increment_timed_stats_trigger
    AFTER INSERT ON "votes"
    FOR EACH ROW
    EXECUTE FUNCTION increment_timed_stats();
  `;
  // =====================================================================================
  // change_timed_stats
  await prisma.$executeRaw`
    CREATE OR REPLACE FUNCTION change_timed_stats() RETURNS TRIGGER AS $$
    DECLARE
    week_num INTEGER;
    month_num INTEGER;
    year_num INTEGER;
    week_start DATE;
    week_end DATE;
    week_key TEXT;
    BEGIN
    week_num := EXTRACT(WEEK FROM NEW."createdAt");
    month_num := EXTRACT(MONTH FROM NEW."createdAt");
    year_num := EXTRACT(YEAR FROM NEW."createdAt");
    week_start := DATE_TRUNC('week', NEW."createdAt");
    week_end := week_start + INTERVAL '6 days';
    week_key := CONCAT(week_num, '/', month_num, '/', year_num);
    UPDATE "topics"
    SET "timedStats" = jsonb_set("timedStats", ARRAY[week_key, NEW.vote::text], to_jsonb((("timedStats" -> week_key ->> NEW.vote::text)::int + 1)::text), true),
        "timedStats" = jsonb_set("timedStats", ARRAY[week_key, OLD.vote::text], to_jsonb((("timedStats" -> week_key ->> OLD.vote::text)::int - 1)::text), true)
    WHERE "id" = NEW."topic_id";
    RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
    `;
  await prisma.$executeRaw`
    CREATE OR REPLACE TRIGGER change_timed_stats_trigger
    AFTER UPDATE ON "votes"
    FOR EACH ROW
    EXECUTE FUNCTION change_timed_stats();
    `;
  // =====================================================================================

  // change_verified_stats
  await prisma.$executeRaw`
CREATE OR REPLACE FUNCTION change_verified_stats() RETURNS TRIGGER AS $$
  BEGIN
  UPDATE "topics"
  SET "stats" = jsonb_set(jsonb_set("stats", ARRAY[v.vote::text, 'verified'], to_jsonb((("stats" -> v.vote::text ->> 'verified')::int + 1)::text), true), ARRAY[v.vote::text, 'unverified'], to_jsonb((("stats" -> v.vote::text ->> 'unverified')::int - 1)::text), true)
  FROM "votes" v
  WHERE v.userId = NEW.id AND "topics"."id" = v."topicId";
  RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;
`;

  await prisma.$executeRaw`
  CREATE OR REPLACE TRIGGER change_verified_stats_trigger
  AFTER UPDATE ON "users"
  FOR EACH ROW
  WHEN (OLD.verified = false AND NEW.verified = true)
  EXECUTE FUNCTION change_verified_stats();
  `;
  // =====================================================================================
  return new Response("OK");
}

export async function DELETE() {
  await prisma.$transaction([
    prisma.$executeRaw`
    DROP TRIGGER increment_stats_trigger ON votes;
    `,
    prisma.$executeRaw`
    DROP FUNCTION increment_stats;
    `,
    // =================================================
    prisma.$executeRaw`
    DROP TRIGGER change_stats_trigger ON votes;
    `,
    prisma.$executeRaw`
    DROP FUNCTION change_stats;
    `,
    // =================================================
    prisma.$executeRaw`
    DROP TRIGGER increment_timed_stats_trigger ON votes;
    `,
    prisma.$executeRaw`
    DROP FUNCTION increment_timed_stats;
    `,
    // =================================================
    prisma.$executeRaw`
    DROP TRIGGER change_timed_stats_trigger ON votes;
    `,
    prisma.$executeRaw`
    DROP FUNCTION change_timed_stats;
    `,
    // =================================================
    prisma.$executeRaw`
    DROP TRIGGER change_verified_stats_trigger ON users;
    `,
    prisma.$executeRaw`
    DROP FUNCTION change_verified_stats;
    `,
  ]);
  return new Response("OK");
}
