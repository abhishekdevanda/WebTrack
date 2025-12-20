"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/configs/auth-config";

export async function signInWithGoogle() {
  const result = await auth.api.signInSocial({
    body: {
      provider: "google",
      callbackURL: "/dashboard",
    },
    headers: await headers(),
  });

  if (result.url) {
    redirect(result.url);
  }
}

export async function signOut() {
  const result = await auth.api.signOut({
    headers: await headers(),
  });
  if (result) {
    redirect("/login");
  }
}
