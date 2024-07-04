import { drizzle } from "drizzle-orm/postgres-js";
import { pgTable, serial, varchar, text } from "drizzle-orm/pg-core";
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

export async function getAllUsers() {
  const users = await ensureTableExists();
  return await db.select().from(users);
}

export async function getUserEmailAddressById(id: number) {
  const users = await ensureTableExists();
  return await db
    .select({ email: users.email })
    .from(users)
    .where(eq(users.id, id));
}

export async function createUser(email: string, password: string) {
  const users = await ensureTableExists();
  let salt = genSaltSync(10);
  let hash = hashSync(password, salt);

  return await db.insert(users).values({
    email,
    password: hash,
    whitelist: [],
    blacklist: [],
  });
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
        password VARCHAR(64),
        whitelist TEXT[],
        blacklist TEXT[],
        customInstructions TEXT
      );`;
  }

  const table = pgTable("User", {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 64 }),
    password: varchar("password", { length: 64 }),
    whitelist: text("whitelist").array(),
    blacklist: text("blacklist").array(),
    customInstructions: text("customInstructions"),
  });

  return table;
}

export async function getWhitelist(email: string) {
  const users = await ensureTableExists();
  const result = await db
    .select({ whitelist: users.whitelist })
    .from(users)
    .where(eq(users.email, email));
  return result[0]?.whitelist || [];
}

export async function setWhitelist(email: string, whitelist: string[]) {
  const users = await ensureTableExists();
  await db.update(users).set({ whitelist }).where(eq(users.email, email));
}

export async function getBlacklist(email: string) {
  const users = await ensureTableExists();
  const result = await db
    .select({ blacklist: users.blacklist })
    .from(users)
    .where(eq(users.email, email));
  return result[0]?.blacklist || [];
}

export async function setBlacklist(email: string, blacklist: string[]) {
  const users = await ensureTableExists();
  await db.update(users).set({ blacklist }).where(eq(users.email, email));
}

export async function getCustomInstructions(email: string) {
  const users = await ensureTableExists();
  const result = await db
    .select({ customInstructions: users.customInstructions })
    .from(users)
    .where(eq(users.email, email));
  return result[0]?.customInstructions || "";
}

export async function setCustomInstructions(
  email: string,
  customInstructions: string
) {
  const users = await ensureTableExists();
  await db
    .update(users)
    .set({ customInstructions })
    .where(eq(users.email, email));
}
