import { InferSelectModel } from "drizzle-orm";
import { pageView, website } from "@/db/schema";

export type Website = InferSelectModel<typeof website>;
export type PageView = InferSelectModel<typeof pageView>;

// Analytics System
export interface AnalyticsData {
    overview: WebsiteAnalyticsOverview;
    deviceAnalytics: DeviceAnalytics;
    geoAnalytics: GeoAnalytics;
    sourceAnalytics: SourceAnalytics;
    pageAnalytics: PageAnalytics;
    sessionAnalytics: SessionAnalytics;
    visitorAnalytics: VisitorAnalytics;
    timeSeries: TimeSeriesDataPoint[];
}

export type WebsiteWithAnalytics<K extends keyof AnalyticsData = keyof AnalyticsData> = Website & {
    analytics: Pick<AnalyticsData, K>;
};

export type TimeSeriesDataPoint = {
    count: number;
    date: string;
    label: string;
};

// General Analytics Types
export type AnalyticsPeriod = '24h' | '7d' | '30d' | '90d' | 'all';

export type WebsiteAnalyticsOverview = {
    totalVisitors: number;
    totalPageViews: number;
    activeNow: number;
    avgActiveTime: number;
    bounceRate: number;
};

export type VisitorAnalytics = {
    totalVisitors: number;
    uniqueVisitors: number;
    newVisitors: number;
    returningVisitors: number;
    visitorsByDate: {
        date: string;
        count: number;
    }[];
};

export type SessionAnalytics = {
    totalSessions: number;
    avgSessionDuration: number;
    totalActiveTime: number;
};

export type DeviceAnalytics = {
    byDevice: { device: string; count: number }[];
    byOS: { os: string; count: number }[];
    byBrowser: { browser: string; count: number }[];
};

export type GeoAnalytics = {
    byCountry: { country: string; code: string; count: number }[];
    byCity: { city: string; country: string; count: number }[];
    byRegion: { region: string; count: number }[];
};

export type SourceAnalytics = {
    byReferrer: { referrer: string; count: number }[];
    byUTMSource: { source: string; count: number }[];
    byUTMMedium: { medium: string; count: number }[];
    byUTMCampaign: { campaign: string; count: number }[];
};

export type PageAnalytics = {
    topPages: { url: string; visits: number }[];
    entryPages: { url: string; visits: number }[];
    exitPages: { url: string; visits: number }[];
};

export type WebsiteInfoType = {
    website: Website;
    overview?: WebsiteAnalyticsOverview;
};