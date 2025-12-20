import { NextRequest, NextResponse } from "next/server";
import { UAParser } from 'ua-parser-js';
import { db } from "@/lib/configs/drizzle-config";
import { PageView, pageView } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { type, visitorId, websiteId, entryTime, exitTime, totalActiveTime, referrer, url, utmSource, utmMedium, utmCampaign, refParams } = body;

    if (!websiteId || !visitorId || !type) {
        return NextResponse.json({ status: "error", message: "Missing required fields" }, { status: 400 });
    }

    // Get device info
    const parser = new UAParser(req.headers.get('user-agent') || '');
    const device = parser.getDevice().model || null;
    const os = parser.getOS().name || null;
    const browser = parser.getBrowser().name || null;

    // Get geo info
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || req.headers.get('x-real-ip') || 'Unknown';
    const geoRes = await fetch(`http://ip-api.com/json/${ip}`);
    const geoInfo = await geoRes.json();

    // Insert page view record
    let result: PageView[];
    if (type === "entry") {
        result = await db.insert(pageView).values({
            id: crypto.randomUUID(),
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
            region: geoInfo.regionName,
            city: geoInfo.city,
            ipAddress: ip,
        }).returning();

    } else {
        // Update existing page view record on exit
        result = await db.update(pageView).set({
            exitTime: new Date(exitTime),
            totalActiveTime,
        }).where(eq(pageView.visitorId, visitorId)).returning();
    }

    return NextResponse.json({ message: "Data recorded successfully", data: result });
}
