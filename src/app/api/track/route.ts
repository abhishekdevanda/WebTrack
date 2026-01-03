import { NextRequest, NextResponse } from "next/server";
import { UAParser } from 'ua-parser-js';
import { db } from "@/lib/configs/drizzle-config";
import { pageView, website } from "@/db/schema";
import { eq } from "drizzle-orm";
import { PageView } from "@/types/types";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { id, type, visitorId, websiteId, entryTime, exitTime, totalActiveTime, referrer, url, utmSource, utmMedium, utmCampaign, refParams } = body;

    if (!websiteId || !visitorId || !type || !id) {
        return NextResponse.json({ status: "error", message: "Missing required fields" }, { status: 400 });
    }

    // Validate websiteId
    const websiteExists = await db.select().from(website).where(eq(website.websiteId, websiteId)).limit(1);
    if (websiteExists.length === 0) {
        return NextResponse.json({ status: "error", message: "Invalid websiteId" }, { status: 400 });
    }

    // Get device info
    const parser = new UAParser(req.headers.get('user-agent') || '');
    const device = parser.getDevice().model || null;
    const os = parser.getOS().name || null;
    const browser = parser.getBrowser().name || null;

    // Get geo info
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || req.headers.get('x-real-ip') || 'Unknown';
    const geoInfo = await fetch(`http://ip-api.com/json/${ip}`).then(res => res.json()).catch(() => null);

    // Insert page view record
    let result: PageView[];
    if (type === "entry") {
        result = await db.insert(pageView).values({
            id,
            websiteId,
            visitorId,
            entryTime: new Date(entryTime),
            totalActiveTime: totalActiveTime || 0,
            referrer,
            url,
            utmSource,
            utmMedium,
            utmCampaign,
            refParams,
            device,
            os,
            browser,
            country: geoInfo.country,
            countryCode: geoInfo.countryCode,
            region: geoInfo.regionName,
            city: geoInfo.city,
            ipAddress: ip,
        }).returning();

    } else {
        // Update existing page view record on exit
        result = await db.update(pageView).set({
            exitTime: new Date(exitTime),
            totalActiveTime,
        }).where(eq(pageView.id, id)).returning();
    }

    return NextResponse.json({ message: "Data recorded successfully", data: result });
}
