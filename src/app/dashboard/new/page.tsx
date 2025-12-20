import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WebsiteForm } from "./_components/website-form";
import { getSession } from "@/lib/isAuthenticated";

export default async function AddWebsite() {
    const isAuthenticated = await getSession();
    if (!isAuthenticated) {
        redirect("/login");
    }
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <Link href="/dashboard">
                    <Button variant="outline">
                        <ArrowLeft />
                        Return to Dashboard
                    </Button>
                </Link>
            </div>

            <WebsiteForm />
        </div>
    )
}
