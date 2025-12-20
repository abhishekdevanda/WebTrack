"use server";

import { headers } from "next/headers";
import { auth } from "./configs/auth-config"

export const getSession = async () => {
    const isAuthenticated = await auth.api.getSession({
        headers: await headers(),
    });
    if (!isAuthenticated) {
        return null;
    }
    return isAuthenticated;
}
