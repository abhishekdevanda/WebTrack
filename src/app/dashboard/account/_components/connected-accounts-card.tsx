"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Loader2 } from "lucide-react";
import { linkSocialAccount, unlinkAccount } from "@/app/(auth)/login/_actions/auth-actions";
import { useState } from "react";
import { toast } from "sonner";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ConnectedAccountsCardProps {
    linkedAccounts: {
        id: string;
        providerId: string;
        createdAt: Date;
        updatedAt: Date;
        accountId: string;
        userId: string;
        scopes: string[];
    }[]
}

export function ConnectedAccountsCard({ linkedAccounts }: ConnectedAccountsCardProps) {
    const [isLoading, setIsLoading] = useState<string | null>(null);

    const isConnected = (provider: string) => {
        return linkedAccounts.some(acc => acc.providerId === provider);
    };

    const handleLinkGoogle = async () => {
        setIsLoading("google");
        try {
            await linkSocialAccount("google");
        } catch (error) {
            console.error(error);
            setIsLoading(null);
        }
    };

    const handleLinkGitHub = async () => {
        setIsLoading("github");
        try {
            await linkSocialAccount("github");
        } catch (error) {
            console.error(error);
            setIsLoading(null);
        }
    };

    const handleUnlink = async (provider: string) => {
        setIsLoading(provider);
        try {
            await unlinkAccount(provider);
            toast.success(`Disconnected ${provider} account`);
        } catch (error) {
            toast.error((error as Error)?.message || "Failed to disconnect account");
        } finally {
            setIsLoading(null);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Connected Accounts</CardTitle>
                <CardDescription>
                    Manage the accounts linked to your profile to log in easily.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Google */}
                <div className={`flex items-center justify-between p-4 border rounded-lg ${!isConnected("google") ? "opacity-70" : ""}`}>
                    <div className="flex items-center gap-4">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted/50">
                            <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Google</title><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" /></svg>
                        </div>
                        <div>
                            <p className="font-medium">Google</p>
                            <p className="text-sm text-muted-foreground">
                                {isConnected("google") ? "Connected" : "Not connected"}
                            </p>
                        </div>
                    </div>
                    {isConnected("google") ? (
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={isLoading === "google"}
                                    className="bg-green-50 text-green-600 border-green-200 hover:bg-green-100 hover:text-green-700 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900"
                                >
                                    {isLoading === "google" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4 mr-2" />}
                                    Connected
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Disconnect Google Account?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Are you sure you want to disconnect your Google account? You will no longer be able to sign in with Google.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleUnlink("google")}>Disconnect</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    ) : (
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={isLoading === "google"}
                                >
                                    {isLoading === "google" ? <Loader2 className="h-4 w-4 animate-spin" /> : "Connect"}
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Connect Google Account</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        You are about to link your Google account. This will allow you to sign in using Google.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleLinkGoogle}>Connect</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    )}
                </div>

                {/* GitHub */}
                <div className={`flex items-center justify-between p-4 border rounded-lg ${!isConnected("github") ? "opacity-70" : ""}`}>
                    <div className="flex items-center gap-4">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted/50">
                            <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
                        </div>
                        <div>
                            <p className="font-medium">GitHub</p>
                            <p className="text-sm text-muted-foreground">
                                {isConnected("github") ? "Connected" : "Not connected"}
                            </p>
                        </div>
                    </div>
                    {isConnected("github") ? (
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={isLoading === "github"}
                                    className="bg-green-50 text-green-600 border-green-200 hover:bg-green-100 hover:text-green-700 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900"
                                >
                                    {isLoading === "github" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4 mr-2" />}
                                    Connected
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Disconnect GitHub Account?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Are you sure you want to disconnect your GitHub account? You will no longer be able to sign in with GitHub.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleUnlink("github")}>Disconnect</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    ) : (
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={isLoading === "github"}
                                >
                                    {isLoading === "github" ? <Loader2 className="h-4 w-4 animate-spin" /> : "Connect"}
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Connect GitHub Account</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        You are about to link your GitHub account. This will allow you to sign in using GitHub.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleLinkGitHub}>Connect</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
