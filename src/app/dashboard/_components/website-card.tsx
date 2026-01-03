"use client";

import Link from "next/link";
import { ExternalLink, Settings, TrendingUp, BarChart2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Area, AreaChart, XAxis } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { WebsiteWithAnalytics } from "@/types/types";

interface WebsitesCardProps {
    website: WebsiteWithAnalytics<'timeSeries'>;
}

const chartConfig = {
    count: {
        label: "Visitors",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig;

export const WebsitesCard = ({ website }: WebsitesCardProps) => {
    const totalVisitors = website.analytics.timeSeries.reduce((sum, day) => sum + day.count, 0);

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

            <CardContent>
                <ChartContainer config={chartConfig} className="h-32 w-full">
                    <AreaChart
                        accessibilityLayer
                        data={website.analytics.timeSeries}
                        margin={{
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                        }}
                    >
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <XAxis
                            dataKey="label"
                            tickLine={false}
                            axisLine={true}
                            tickMargin={8}
                            interval={2}
                            padding={{ left: 16, right: 16 }}
                        />
                        <Area
                            dataKey="count"
                            type="monotone"
                            fillOpacity={0.4}
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>

            <CardFooter className="flex-col items-start gap-2">
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 leading-none font-medium">
                            {totalVisitors} total visitors <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="text-muted-foreground flex items-center gap-2 leading-none text-xs">
                            Last 24 hours
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