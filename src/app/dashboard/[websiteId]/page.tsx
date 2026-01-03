import { Separator } from "@/components/ui/separator";
import { getSession } from "@/lib/isAuthenticated";
import { redirect } from "next/navigation";
import { getWebsite } from "../_actions/website";
import { EditWebsiteForm } from "./_components/edit-website-card";
import { DeleteWebsiteCard } from "./_components/delete-website-card";
import { ScriptCard } from "./_components/script-card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface PageProps {
    params: Promise<{
        websiteId: string;
    }>
}

export default async function WebsitePage({ params }: PageProps) {
    const isAuthenticated = await getSession();
    if (!isAuthenticated) {
        redirect("/login");
    }

    const { websiteId } = await params;
    const result = await getWebsite(websiteId);

    if (result.error || !result.website) {
        redirect("/dashboard");
    }

    const { website } = result;

    return (
        <div className="space-y-4 max-w-4xl mx-auto">
            <div className="flex flex-col justify-start items-start sm:flex-row sm:items-center gap-4">
                <Link href="/dashboard">
                    <Button variant="outline">
                        <ArrowLeft />
                        Dashboard
                    </Button>
                </Link>
                <div>
                    <h3 className="text-2xl font-semibold tracking-tight">{website.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                        Manage settings and integration for this website.
                    </p>
                </div>
            </div>

            <Separator />

            <div className="grid gap-8">
                {/* Integration Section */}
                <section className="grid gap-4">
                    <h4 className="text-base font-medium">Integration</h4>
                    <ScriptCard websiteId={website.websiteId} />
                </section>

                <Separator />

                {/* Settings Section */}
                <section className="grid gap-4">
                    <h4 className="text-base font-medium">Settings</h4>
                    <EditWebsiteForm website={website} />
                </section>

                <Separator />

                {/* Danger Zone */}
                <section className="grid gap-4">
                    <h4 className="text-base font-medium text-destructive">Danger Zone</h4>
                    <DeleteWebsiteCard websiteId={website.id} />
                </section>
            </div>
        </div>
    );
}