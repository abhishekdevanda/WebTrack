"use server";

import { pageView, website } from "@/db/schema";
import { db } from "@/lib/configs/drizzle-config";
import { getSession } from "@/lib/isAuthenticated";
import { eq, sql, and, gte, inArray } from "drizzle-orm";
import { TimeSeriesDataPoint } from "@/types/types";

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

        if (websites.length === 0) {
            return {
                websites: [],
            };
        }

        const websiteIds = websites.map((w) => w.websiteId);
        const analyticsData = await fetchLast24HourVisitorCounts(websiteIds);

        const websitesWithAnalytics = websites.map((site) => {
            const siteAnalytics = analyticsData.filter((a) => a.websiteId === site.websiteId);

            const chartData: TimeSeriesDataPoint[] = [];
            for (let i = 23; i >= 0; i--) {
                const d = new Date();
                d.setHours(d.getHours() - i);
                d.setMinutes(0, 0, 0);

                // Use UTC for matching with DB
                const year = d.getUTCFullYear();
                const month = String(d.getUTCMonth() + 1).padStart(2, '0');
                const day = String(d.getUTCDate()).padStart(2, '0');
                const hour = String(d.getUTCHours()).padStart(2, '0');
                const dateStr = `${year}-${month}-${day} ${hour}:00`;

                // Use Local time for display label
                const hourLabel = d.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });

                const found = siteAnalytics.find((a) => a.date === dateStr);
                chartData.push({
                    label: hourLabel,
                    count: found ? found.visitors : 0,
                    date: dateStr,
                });
            }

            return {
                ...site,
                analytics: {
                    timeSeries: chartData
                },
            };
        });

        return {
            websites: websitesWithAnalytics,
        };

    } catch (error) {
        console.error("Error Fetching Websites:", error);
        return {
            message: "Failed to Fetch Websites.",
        };
    }
}

async function fetchLast24HourVisitorCounts(websiteIds: string[]) {
    const now = new Date();
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    return await db
        .select({
            websiteId: pageView.websiteId,
            date: sql<string>`to_char(${pageView.entryTime}, 'YYYY-MM-DD HH24:00')`,
            visitors: sql<number>`count(DISTINCT ${pageView.visitorId})`.mapWith(Number)
        })
        .from(pageView)
        .where(
            and(
                inArray(pageView.websiteId, websiteIds),
                gte(pageView.entryTime, twentyFourHoursAgo)
            )
        )
        .groupBy(pageView.websiteId, sql`to_char(${pageView.entryTime}, 'YYYY-MM-DD HH24:00')`)
        .orderBy(sql`to_char(${pageView.entryTime}, 'YYYY-MM-DD HH24:00')`);
}