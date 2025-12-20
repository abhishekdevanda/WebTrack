import { redirect } from "next/navigation";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WebsitesList } from "./_components/websites-list";
import { getSession} from "@/lib/isAuthenticated";
import { Suspense } from "react";
import { WebsitesSkeleton } from "./_components/websites-skeleton";

export default async function Dashboard() {
    const isAuthenticated = await getSession();
    if (!isAuthenticated) {
        redirect("/login");
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">My Websites</h2>
                <Link href="/dashboard/new">
                    <Button>
                        <Plus />
                        Website
                    </Button>
                </Link>
            </div>

            <Suspense fallback={<WebsitesSkeleton />}>
                <WebsitesList />
            </Suspense>
        </div>
    )
}
