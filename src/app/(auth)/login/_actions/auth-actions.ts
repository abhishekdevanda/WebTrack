"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/configs/auth-config";
import { revalidatePath } from "next/cache";

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

export async function signInWithGitHub() {
  const result = await auth.api.signInSocial({
    body: {
      provider: "github",
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

export async function getLinkedAccounts() {
  const accounts = await auth.api.listUserAccounts({
    headers: await headers(),
  });
  return accounts;
}

export async function linkSocialAccount(provider: string) {
  const result = await auth.api.linkSocialAccount({
    body: {
      provider,
      callbackURL: "/dashboard/account",
    },
    headers: await headers(),
  });

  if (result.url) {
    redirect(result.url);
  }
}

export async function unlinkAccount(providerId: string) {
  await auth.api.unlinkAccount({
    body: {
      providerId,
    },
    headers: await headers(),
  });
  revalidatePath("/dashboard/account");

  return { success: true };
}

export async function deleteUser() {
  const result = await auth.api.deleteUser({
    body: {},
    headers: await headers(),
  });
  if (result) {
    redirect("/login");
  }
}