import { redirect } from "next/navigation";
import { LoginForm } from "./_components/login-form";
import { getSession } from "@/lib/isAuthenticated";

export default async function LoginPage() {
  const isAuthenticated = await getSession();
  if (isAuthenticated) {
    redirect("/dashboard");
  }
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <LoginForm />
      </div>
    </div>
  );
}
