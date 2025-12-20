import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Globe } from "lucide-react";
import Link from "next/link";

export const NoWebsites = () => {
    return (
        <Empty>
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <Globe />
                </EmptyMedia>
                <EmptyTitle>No websites tracked</EmptyTitle>
                <EmptyDescription>
                    You haven&apos;t added any websites to track yet.
                    Start by adding your first website.
                </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
                <Link href="/dashboard/new">
                    <Button>Add New Website</Button>
                </Link>
            </EmptyContent>
        </Empty>
    );
}