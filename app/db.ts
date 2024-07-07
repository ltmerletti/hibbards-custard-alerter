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
  let users = await ensureTableExists();
  return await db.select().from(users);
}

export async function getUserEmailAddressById(id: number) {
  let users = await ensureTableExists();
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

// Add these functions to get and set flavors
export async function getFlavor() {
  const dailyFlavors = await ensureFlavorsTableExists();
  const result = await db.select().from(dailyFlavors).limit(1);
  return result[0]?.flavor || [];
}

export async function setFlavors(flavor: string[]) {
  let dailyFlavors = await ensureFlavorsTableExists();
  let existingFlavors = await getFlavor();

  if (existingFlavors.length > 0) {
    // Update the first row if it exists
    await db.update(dailyFlavors).set({ flavor }).where(eq(dailyFlavors.id, 1));
  } else {
    // Insert a new row if no rows exist
    await db.insert(dailyFlavors).values({ flavor });
  }
}

// Add this function to ensure the DailyFlavors table exists
async function ensureFlavorsTableExists() {
  const result = await client`
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'DailyFlavors'
    );`;

  if (!result[0].exists) {
    await client`
      CREATE TABLE "DailyFlavors" (
        id SERIAL PRIMARY KEY,
        flavor TEXT[]
      );`;
  }

  const table = pgTable("DailyFlavors", {
    id: serial("id").primaryKey(),
    flavor: text("flavor").array(),
  });

  return table;
}

export async function deleteUser(email: string) {
  try {
    const users = await ensureTableExists();

    const result = await db.delete(users).where(eq(users.email, email));

    if (result.length === 0) {
      return { success: false, message: "User not found" };
    }

    return { success: true, message: "User deleted successfully" };
  } catch (error) {
    console.error("Error deleting user:", error);
    return {
      success: false,
      message: "An error occurred while deleting the user",
    };
  }
}
