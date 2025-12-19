import { headers } from "next/headers";
import { auth } from "@/lib/configs/auth-config";
import { ThemeToggle } from "./theme-toggle";
import { UserButton } from "./user-button";

export const Header = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    return (
        <header className="w-full p-4">
            <div className="flex items-center justify-between">
                <div className="flex gap-2 items-center">
                    {/* TODO: Add logo here */}
                    <h1 className="text-lg font-bold">WebTrack</h1>
                </div>
                <div className="flex gap-4 items-center">
                    <ThemeToggle />
                    <UserButton user={session?.user || null} />
                </div>
            </div>
        </header>
    );
}