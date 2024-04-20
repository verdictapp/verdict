import prisma from "@/app/_lib/prisma";
import { successResponse } from "@/app/_lib/responseGenerator";

export async function GET() {
  let result = await prisma.$queryRaw`
        SELECT  event_object_table AS table_name ,trigger_name         
        FROM information_schema.triggers   
        GROUP BY table_name , trigger_name 
        ORDER BY table_name ,trigger_name;
    `;
  return successResponse(result);
}

export async function POST() {
  // increment_stats
  await prisma.$executeRaw`
    CREATE OR REPLACE FUNCTION increment_stats() RETURNS TRIGGER AS $$
    BEGIN
    UPDATE "topics"
    SET "stats" = jsonb_set("stats", ARRAY[NEW.vote::text, CASE WHEN u.verified THEN 'verified' ELSE 'unverified' END], to_jsonb((("stats" -> NEW.vote::text -> CASE WHEN u.verified THEN 'verified' ELSE 'unverified' END)::int + 1)::int), true)
    FROM "users" u
    WHERE u.id = NEW."userId" AND "topics"."id" = NEW."topicId";
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
    SET "stats" = jsonb_set(jsonb_set("stats", ARRAY[NEW.vote::text, CASE WHEN u.verified THEN 'verified' ELSE 'unverified' END], to_jsonb((("stats" -> NEW.vote::text -> CASE WHEN u.verified THEN 'verified' ELSE 'unverified' END)::int + 1)::int), true), ARRAY[OLD.vote::text, CASE WHEN u.verified THEN 'verified' ELSE 'unverified' END], to_jsonb((("stats" -> OLD.vote::text -> CASE WHEN u.verified THEN 'verified' ELSE 'unverified' END)::int - 1)::int), true)
    FROM "users" u
    WHERE u.id = NEW."userId" AND "topics"."id" = NEW."topicId";
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
    day_num INTEGER;
    month_num INTEGER;
    year_num INTEGER;
    -- week_start DATE;
    -- week_end DATE;
    date_key TEXT;
    temp TEXT;
    BEGIN
    day_num := EXTRACT(DAY FROM NEW."createdAt");
    month_num := EXTRACT(MONTH FROM NEW."createdAt");
    year_num := EXTRACT(YEAR FROM NEW."createdAt");
    -- week_start := DATE_TRUNC('week', NEW."createdAt");
    -- week_end := week_start + INTERVAL '6 days';
    date_key := CONCAT(day_num, '/', month_num, '/', year_num);
    UPDATE "topics"
    SET "timedStats" = jsonb_set("timedStats", ARRAY[NEW.vote, date_key], to_jsonb(COALESCE((("timedStats" -> NEW.vote ->> date_key::text)::int + 1), 1::int )), true)
    WHERE "id" = NEW."topicId";
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
  await prisma.$executeRaw`;
      CREATE OR REPLACE FUNCTION change_timed_stats() RETURNS TRIGGER AS $$
      DECLARE
      day_num INTEGER;
      month_num INTEGER;
      year_num INTEGER;
      -- week_start DATE;
      -- week_end DATE;
      date_key TEXT;
      BEGIN
      day_num := EXTRACT(DAY FROM NEW."createdAt");
      month_num := EXTRACT(MONTH FROM NEW."createdAt");
      year_num := EXTRACT(YEAR FROM NEW."createdAt");
      -- week_start := DATE_TRUNC('week', NEW."createdAt");
      -- week_end := week_start + INTERVAL '6 days';
      date_key := CONCAT(day_num, '/', month_num, '/', year_num);
      UPDATE "topics"
      SET "timedStats" = jsonb_set(jsonb_set("timedStats", ARRAY[ NEW.vote::text,date_key], to_jsonb(COALESCE((("timedStats" -> NEW.vote ->> date_key::text)::int + 1), 1::int )), true), ARRAY[ OLD.vote::text,date_key], to_jsonb((("timedStats" -> OLD.vote ->> date_key::text)::int - 1)::int), true)
        WHERE "id" = NEW."topicId";
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
    SET "stats" = jsonb_set(jsonb_set("stats", ARRAY[v.vote::text, CASE WHEN NEW.verified THEN 'verified' ELSE 'unverified' END], to_jsonb((("stats" -> v.vote::text ->> CASE WHEN NEW.verified THEN 'verified' ELSE 'unverified' END)::int + 1)::int), true), ARRAY[v.vote::text, CASE WHEN NEW.verified THEN 'unverified' ELSE 'verified' END], to_jsonb((("stats" -> v.vote::text ->> CASE WHEN NEW.verified THEN 'unverified' ELSE 'verified' END)::int - 1)::int), true)
    FROM "votes" v
    WHERE v."userId" = NEW.id AND "topics"."id" = v."topicId";
    RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `;

  await prisma.$executeRaw`
    CREATE OR REPLACE TRIGGER change_verified_stats_trigger
    AFTER UPDATE ON "users"
    FOR EACH ROW
    WHEN (OLD.verified <> NEW.verified)
    EXECUTE FUNCTION change_verified_stats();
    `;
  // =====================================================================================
  return successResponse();
}

export async function DELETE() {
  // =================================================
  await prisma.$executeRaw`
    DROP TRIGGER increment_stats_trigger ON votes;
    `;
  await prisma.$executeRaw`
    DROP FUNCTION increment_stats;
    `;
  // =================================================
  await prisma.$executeRaw`
    DROP TRIGGER change_stats_trigger ON votes;
    `;
  await prisma.$executeRaw`
    DROP FUNCTION change_stats;
    `;
  // =================================================
  await prisma.$executeRaw`
    DROP TRIGGER increment_timed_stats_trigger ON votes;
    `;
  await prisma.$executeRaw`
    DROP FUNCTION increment_timed_stats;
    `;
  // // =================================================
  await prisma.$executeRaw`
    DROP TRIGGER change_timed_stats_trigger ON votes;
    `;
  await prisma.$executeRaw`
    DROP FUNCTION change_timed_stats;
    `;
  // // =================================================
  await prisma.$executeRaw`
    DROP TRIGGER change_verified_stats_trigger ON users;
    `;
  await prisma.$executeRaw`
    DROP FUNCTION change_verified_stats;
    `;
  return successResponse();
}
