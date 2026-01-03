"use server";
import { redirect } from "next/navigation";
import { db } from "@/lib/configs/drizzle-config";
import { website } from "@/db/schema";
import { websiteSchema } from "../_schemas/website";
import { eq, and } from "drizzle-orm";
import z from "zod";
import { getSession } from "@/lib/isAuthenticated";
import { revalidatePath } from "next/cache";

export type State = {
    errors?: {
        name?: string[];
        url?: string[];
        timezone?: string[];
        websiteId?: string[];
    };
    message?: string | null;
};

export async function getWebsite(websiteId: string) {
    const isAuthenticated = await getSession();
    if (!isAuthenticated) {
        redirect("/login");
    }

    try {
        const sites = await db
            .select()
            .from(website)
            .where(
                and(
                    eq(website.id, websiteId),
                    eq(website.userId, isAuthenticated.user.id)
                )
            )
            .limit(1);

        const site = sites[0];

        if (!site) {
            return {
                error: "Website not found",
            };
        }

        return {
            website: site,
        };
    } catch (error) {
        console.error("Error Fetching Website:", error);
        return {
            error: "Failed to fetch website details",
        };
    }
}

export async function addWebsite(prevState: State, formData: FormData): Promise<State> {

    // Authenticate User
    const isAuthenticated = await getSession();

    if (!isAuthenticated) {
        return {
            message: "Unauthorized",
        };
    }

    // Validate Input
    let url = formData.get("url") as string;
    if (url && !url.startsWith("http://") && !url.startsWith("https://")) {
        url = `https://${url}`;
    }

    const validatedFields = websiteSchema.safeParse({
        name: formData.get("name"),
        url,
        timezone: formData.get("timezone"),
    });

    if (!validatedFields.success) {
        const flattened = z.flattenError(validatedFields.error);
        return {
            errors: flattened.fieldErrors,
            message: "Missing Fields. Failed to Create Website.",
        };
    }

    const { name, timezone } = validatedFields.data;
    // url is already extracted and modified above, but we should use the validated one to be safe
    const validatedUrl = validatedFields.data.url;

    // Check for existing website with same URL for this user
    const existingWebsite = await db
        .select()
        .from(website)
        .where(and(eq(website.url, validatedUrl), eq(website.userId, isAuthenticated.user.id)))
        .then((res) => res[0]);

    if (existingWebsite) {
        return {
            errors: {
                url: ["Website already exists."],
            },
            message: "Website already exists.",
        };
    }

    const websiteId = crypto.randomUUID();

    try {
        await db.insert(website).values({
            id: crypto.randomUUID(),
            websiteId,
            name,
            url: validatedUrl,
            timezone,
            userId: isAuthenticated.user.id,
        });
    } catch (error) {
        console.error("Database Insertion Error:", error);
        return {
            message: "Database Error: Failed to Create Website.",
        };
    }

    redirect(`/dashboard/new?websiteId=${websiteId}`);
}

export async function updateWebsite(prevState: State, formData: FormData): Promise<State> {
    const isAuthenticated = await getSession();
    if (!isAuthenticated) {
        return {
            message: "Unauthorized",
        };
    }

    // Validate Input
    let url = formData.get("url") as string;
    if (url && !url.startsWith("http://") && !url.startsWith("https://")) {
        url = `https://${url}`;
    }

    const validatedFields = websiteSchema.safeParse({
        websiteId: formData.get("websiteId"),
        name: formData.get("name"),
        url,
        timezone: formData.get("timezone"),
    });

    if (!validatedFields.success) {
        const flattened = z.flattenError(validatedFields.error);
        return {
            errors: flattened.fieldErrors,
            message: "Failed to Update Website.",
        };
    }

    const { name, timezone, websiteId } = validatedFields.data;
    const validatedUrl = validatedFields.data.url;

    if (!websiteId) {
        return {
            message: "Website ID is missing.",
        };
    }

    try {
        const updated = await db
            .update(website)
            .set({
                name,
                url: validatedUrl,
                timezone,
                updatedAt: new Date(),
            })
            .where(
                and(
                    eq(website.websiteId, websiteId),
                    eq(website.userId, isAuthenticated.user.id)
                )
            )
            .returning();

        if (updated.length === 0) {
            return {
                message: "Website not found.",
            };
        }

        revalidatePath("/dashboard");
        revalidatePath(`/dashboard/${websiteId}`);
        return {
            message: "Website updated successfully",
        };
    } catch (error) {
        console.error("Error Updating Website:", error);
        return {
            message: "Failed to update website",
        };
    }
}

export async function deleteWebsite(websiteId: string) {
    const isAuthenticated = await getSession();
    if (!isAuthenticated) {
        return {
            error: "Unauthorized",
        };
    }

    try {
        await db
            .delete(website)
            .where(
                and(
                    eq(website.id, websiteId),
                    eq(website.userId, isAuthenticated.user.id)
                )
            );

        revalidatePath("/dashboard");
    } catch (error) {
        console.error("Error Deleting Website:", error);
        return {
            error: "Failed to delete website",
        };
    }

    redirect("/dashboard");
}