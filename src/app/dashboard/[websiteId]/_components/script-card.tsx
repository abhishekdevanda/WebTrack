import { TrackingScript } from "@/components/tracking-script";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ScriptCardProps {
    websiteId: string;
}

export function ScriptCard({ websiteId }: ScriptCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Tracking Script</CardTitle>
                <CardDescription>
                    Add this script to the <code>&lt;head&gt;</code> of your website to start tracking visitors.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <TrackingScript websiteId={websiteId} />
            </CardContent>
        </Card>
    );
}
