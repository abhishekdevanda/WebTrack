"use server";

import { website } from "@/db/schema";
import { auth } from "@/lib/configs/auth-config";
import { db } from "@/lib/configs/drizzle-config";
import { getSession } from "@/lib/isAuthenticated";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

export async function getWebsitesList() {

    // Authenticate User
    const isAuthenticated = await getSession();
    if (!isAuthenticated) {
        return {
            message: "Unauthorized",
        };
    }

    // User Websites
    try {
        const websites = await db
            .select()
            .from(website)
            .where(eq(website.userId, isAuthenticated.user.id));

        return {
            websites,
        };

    } catch (error) {
        return {
            message: "Failed to Fetch Websites.",
        };
    }
}