"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Loader2 } from "lucide-react";
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
import { deleteWebsite } from "../../_actions/website";

interface DeleteWebsiteCardProps {
    websiteId: string;
}

export function DeleteWebsiteCard({ websiteId }: DeleteWebsiteCardProps) {
    return (
        <Card className="border-destructive/40">
            <CardContent className="flex items-center justify-between p-6">
                <div className="space-y-1">
                    <h4 className="font-medium text-destructive flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        Delete Website
                    </h4>
                    <p className="text-sm text-muted-foreground text-destructive/80">
                        Permanently remove this website and all of its analytics data. This action cannot be undone.
                    </p>
                </div>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive">Delete Website</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete this website and remove all of its analytics data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deleteWebsite(websiteId)}>
                                Delete Website
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </CardContent>
        </Card>
    );
}
