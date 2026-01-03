import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AnalyticsPage() {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <Link href="/dashboard">
                    <Button variant="outline">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Dashboard
                    </Button>
                </Link>
            </div>
            <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4 text-center">
                <h2 className="text-2xl font-bold">Analytics Coming Soon</h2>
                <p className="text-muted-foreground">
                    Detailed analytics for this website are currently under development.
                </p>
            </div>
        </div>
    );
}
