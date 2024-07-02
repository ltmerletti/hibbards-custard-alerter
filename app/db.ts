import { drizzle } from "drizzle-orm/postgres-js";
import { pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { eq } from "drizzle-orm";
import postgres from "postgres";
import { genSaltSync, hashSync } from "bcrypt-ts";

// Optionally, if not using email/pass login, you can
// use the Drizzle adapter for Auth.js / NextAuth
// https://authjs.dev/reference/adapter/drizzle
let client = postgres(`${process.env.POSTGRES_URL!}?sslmode=require`);
let db = drizzle(client);

export async function getUser(email: string) {
  const users = await ensureTableExists();
  return await db.select().from(users).where(eq(users.email, email));
}

export async function createUser(email: string, password: string) {
  const users = await ensureTableExists();
  let salt = genSaltSync(10);
  let hash = hashSync(password, salt);

  return await db.insert(users).values({ email, password: hash });
}

export async function loadWhitelist(email: string): Promise<string[]> {
  const users = await ensureTableExists();
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);
  if (user.length > 0 && user[0].whiteList) {
    return user[0].whiteList;
  }
  return [];
}

export async function loadBlacklist(email: string): Promise<string[]> {
  const users = await ensureTableExists();
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);
  if (user.length > 0 && user[0].blackList) {
    return user[0].blackList;
  }
  return [];
}

export async function setWhitelist(
  email: string,
  whitelist: string[]
): Promise<void> {
  const users = await ensureTableExists();
  await db
    .update(users)
    .set({ whiteList: whitelist })
    .where(eq(users.email, email));
}

export async function setBlacklist(
  email: string,
  blacklist: string[]
): Promise<void> {
  const users = await ensureTableExists();
  await db
    .update(users)
    .set({ blackList: blacklist })
    .where(eq(users.email, email));
}

async function ensureTableExists() {
  const result = await client`
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'User'
    );`;

  if (!result[0].exists) {
    await client`
      CREATE TABLE "User" (
        id SERIAL PRIMARY KEY,
        email VARCHAR(64),
        password VARCHAR(64)
      );`;
  }

  // sourcery skip: inline-immediately-returned-variable
  const table = pgTable("User", {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 64 }),
    password: varchar("password", { length: 64 }),
    whiteList: varchar("whiteList", { length: 255 }).array(),
    blackList: varchar("blackList", { length: 255 }).array(),
  });

  return table;
}
