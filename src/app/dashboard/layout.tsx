import { Header } from "@/components/layout/header";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard - WebTrack",
    description: "Analytics for the websites.",
};

export default function DashboardLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <Header />
            <main className="max-w-7xl mx-auto p-4 mt-4">
                {children}
            </main>
        </>
    );
}
