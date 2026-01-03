import { getSession } from "@/lib/isAuthenticated";
import { redirect } from "next/navigation";

interface PageProps {
    params: Promise<{
        websiteId: string;
    }>
};
export default async function Page({ params }: PageProps) {
    const isAuthenticated = await getSession();
    if (!isAuthenticated) {
        redirect("/login");
    }
    const {websiteId} = await params;
    console.log(websiteId);
    return (
        <h1>abc</h1>
    )
}