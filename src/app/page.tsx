import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
        <h1>Landing Page</h1>
        <Link href="/dashboard">Go to Dashboard</Link>
    </div>
  );
}
