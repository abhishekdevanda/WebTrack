"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Settings, TrendingUp, BarChart2 } from "lucide-react";
import Link from "next/link";
import { Website } from "@/db/schema";
import { Area, AreaChart } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

interface WebsitesCardProps {
    website: Website;
}

// Mock analytics data
const chartData = [
    { day: 'Mon', visitors: 120 },
    { day: 'Tue', visitors: 190 },
    { day: 'Wed', visitors: 150 },
    { day: 'Thu', visitors: 220 },
    { day: 'Fri', visitors: 250 },
    { day: 'Sat', visitors: 210 },
    { day: 'Sun', visitors: 180 },
];

const chartConfig = {
    visitors: {
        label: "Visitors",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig;

export const WebsitesCard = ({ website }: WebsitesCardProps) => {
    const totalVisitors = chartData.reduce((sum, day) => sum + day.visitors, 0);

    return (
        <Card key={website.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg truncate">{website.name}</CardTitle>
                        <CardDescription className="flex items-center gap-1 mt-1 truncate text-xs">
                            <ExternalLink className="h-3 w-3 shrink-0" />
                            <a
                                href={website.url}
                                target="_blank"
                                rel="noreferrer"
                                className="hover:underline truncate"
                            >
                                {website.url}
                            </a>
                        </CardDescription>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        asChild
                        className="shrink-0 h-8 w-8"
                    >
                        <Link href={`/dashboard/${website.id}/settings`}>
                            <Settings className="h-4 w-4" />
                            <span className="sr-only">Settings</span>
                        </Link>
                    </Button>
                </div>
            </CardHeader>

            <CardContent className="pb-0">
                <ChartContainer config={chartConfig} className="h-32 w-full">
                    <AreaChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                        }}
                    >
                        <Area
                            dataKey="visitors"
                            type="natural"
                            fill="var(--color-primary)"
                            fillOpacity={0.4}
                            stroke="var(--color-primary)"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>

            <CardFooter className="flex-col items-start gap-2 pt-4">
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 leading-none font-medium">
                            {totalVisitors} total visitors <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="text-muted-foreground flex items-center gap-2 leading-none text-xs">
                            Last 7 days
                        </div>
                    </div>
                </div>
                <Button className="w-full mt-2" asChild variant="outline" size="sm">
                    <Link href={`/dashboard/${website.id}`}>
                        <BarChart2 className="mr-2 h-4 w-4" />
                        View Full Analytics
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
};