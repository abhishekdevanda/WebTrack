import { Separator } from "@/components/ui/separator";
import { redirect } from "next/navigation";
import { ConnectedAccountsCard } from "./_components/connected-accounts-card";
import { DeleteAccountCard } from "./_components/delete-account-card";
import { getSession } from "@/lib/isAuthenticated";
import { getLinkedAccounts } from "@/app/(auth)/login/_actions/auth-actions";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default async function AccountPage() {
    const isAuthenticated = await getSession();

    if (!isAuthenticated) {
        redirect("/login");
    }

    const linkedAccounts = await getLinkedAccounts();

    return (
        <div className="space-y-4 max-w-2xl mx-auto">
            <div className="flex justify-between items-center">
                <Link href="/dashboard">
                    <Button variant="outline">
                        <ArrowLeft />
                        Dashboard
                    </Button>
                </Link>
            </div>
            <div>
                <h3 className="text-2xl font-semibold tracking-tight">Account Settings</h3>
                <p className="text-sm text-muted-foreground mt-1">
                    Manage your profile, connected accounts, and security preferences.
                </p>
            </div>

            <Separator className="my-6" />

            <div className="grid gap-8">

                {/* Security Section */}
                <section className="grid gap-4">
                    <h4 className="text-base font-medium">Security</h4>
                    <ConnectedAccountsCard linkedAccounts={linkedAccounts} />
                </section>

                <Separator />

                {/* Danger Zone */}
                <section className="grid gap-4">
                    <h4 className="text-base font-medium text-destructive">Danger Zone</h4>
                    <DeleteAccountCard />
                </section>
            </div>
        </div>
    );
}
