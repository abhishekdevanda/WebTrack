import { ThemeToggle } from "./theme-toggle";
import { UserButton } from "./user-button";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/isAuthenticated";

export const Header = async () => {
    const isAuthenticated = await getSession();
    if (!isAuthenticated) {
        redirect("/login");
    }

    return (
        <header className="max-w-7xl mx-auto p-4">
            <div className="flex items-center justify-between">
                <div className="flex gap-2 items-center">
                    {/* TODO: Add logo here */}
                    <h1 className="text-lg font-bold">WebTrack</h1>
                </div>
                <div className="flex gap-4 items-center">
                    <ThemeToggle />
                    <UserButton user={isAuthenticated.user} />
                </div>
            </div>
        </header>
    );
}