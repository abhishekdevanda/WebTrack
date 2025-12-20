import { type NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/configs/auth-config";

export async function proxy(request: NextRequest) {

  const session = await auth.api.getSession({
    headers: request.headers,
  });
  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard"], // Apply middleware to specific routes
};
