import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WebsiteForm } from "./_components/website-form";
import { getSession } from "@/lib/isAuthenticated";
import { InstallScriptDialog } from "./_components/install-script-dialog";
import { Suspense } from "react";

export default async function AddWebsite() {
    const isAuthenticated = await getSession();
    if (!isAuthenticated) {
        redirect("/login");
    }
    return (
        <div className="space-y-4 max-w-2xl mx-auto">
            <div className="flex flex-col justify-start items-start sm:flex-row sm:items-center gap-4">
                <Link href="/dashboard">
                    <Button variant="outline">
                        <ArrowLeft />
                        Dashboard
                    </Button>
                </Link>
                <div>
                    <h3 className="text-2xl font-semibold tracking-tight">Add Website</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                        Add a new website to track its analytics.
                    </p>
                </div>
            </div>

            <WebsiteForm />
            <Suspense>
                <InstallScriptDialog />
            </Suspense>
        </div>
    )
}
