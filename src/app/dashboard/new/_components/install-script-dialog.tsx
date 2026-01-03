"use client";

import { TrackingScript } from "@/components/tracking-script";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Terminal } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const InstallScriptDialog = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [websiteId, setWebsiteId] = useState<string | null>(null);

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
        if (!open) {
            // Remove params and redirect to dashboard when closed
            router.push("/dashboard");
        }
    };

    useEffect(() => {
        const id = searchParams.get("websiteId");
        if (id) {
            setWebsiteId(id);
            setIsOpen(true);
        }
    }, [searchParams]);

    if (!websiteId) return null;

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-primary/10 rounded-full">
                            <Terminal className="w-5 h-5 text-primary" />
                        </div>
                        <DialogTitle>Install Tracking Script</DialogTitle>
                    </div>
                    <DialogDescription className="pt-2">
                        To start tracking your website analytics, copy and paste the following code snippet into the <code className="text-primary font-mono bg-primary/10 px-1 py-0.5 rounded">&lt;head&gt;</code> of your website.
                    </DialogDescription>
                </DialogHeader>

                <TrackingScript websiteId={websiteId} />

                <DialogFooter className="sm:justify-end gap-2 items-center">
                    <Button
                        type="button"
                        onClick={() => handleOpenChange(false)}
                    >
                        Done, I&apos;ve installed it
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
