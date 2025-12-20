"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Settings, BarChart2 } from "lucide-react";
import Link from "next/link";
import { website } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";

type Website = InferSelectModel<typeof website>;

interface WebsitesCardProps {
    website: Website;
}

export const WebsitesCard = ({ website }: WebsitesCardProps) => {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card key={website.id} className="flex flex-col">
                <CardHeader>
                    <CardTitle className="flex items-center justify-between gap-2">
                        <span className="truncate" title={website.name}>{website.name}</span>
                        <Button variant="ghost" size="icon" asChild className="shrink-0">
                            <Link href={`/dashboard/${website.id}/settings`}>
                                <Settings className="h-4 w-4" />
                                <span className="sr-only">Settings</span>
                            </Link>
                        </Button>
                    </CardTitle>
                    <CardDescription className="truncate">
                        <a href={website.url} target="_blank" rel="noreferrer" className="flex items-center hover:underline max-w-full">
                            <span className="truncate">{website.url}</span>
                            <ExternalLink className="ml-1 h-3 w-3 shrink-0" />
                        </a>
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                    <div className="text-sm text-muted-foreground">
                        <span className="font-medium">Timezone:</span> {website.timezone}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" asChild>
                        <Link href={`/dashboard/${website.id}`}>
                            <BarChart2 className="mr-2 h-4 w-4" />
                            View Analytics
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};