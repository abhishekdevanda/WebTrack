import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to WebTrack Account",
};

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <main className="h-screen w-screen bg-background ">{children}</main>;
}
