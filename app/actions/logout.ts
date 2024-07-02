"use server";

import { redirect } from "next/navigation";
import { signOut } from "app/auth";

export async function logoutAction() {
  await signOut();
  redirect("/");
}
