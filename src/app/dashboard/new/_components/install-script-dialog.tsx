"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Check, Copy, Terminal } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const InstallScriptDialog = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [websiteId, setWebsiteId] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const id = searchParams.get("websiteId");
        if (id) {
            setWebsiteId(id);
            setIsOpen(true);
        }
    }, [searchParams]);

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
        if (!open) {
            // Remove params and redirect to dashboard when closed
            router.push("/dashboard");
        }
    };

    const scriptCode = `<script
  defer
  data-website-id="${websiteId}"
  src="${process.env.NEXT_PUBLIC_BASE_URL}/script.js"
></script>`;

    const copyToClipboard = async () => {
        try {
            // Copy with formatting preserved
            await navigator.clipboard.writeText(scriptCode);
            setCopied(true);
            toast.success("Script copied to clipboard!");
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            toast.error("Failed to copy script");
        }
    };

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

                <div className="my-4 relative group">
                    <div className="absolute -top-4 left-4 bg-background px-2 text-xs font-medium text-muted-foreground z-10">
                        HTML
                    </div>
                    <div className="relative rounded-lg border bg-muted/50 p-4 font-mono text-sm text-foreground shadow-sm transition-colors hover:bg-muted/70">
                        <pre className="m-0 overflow-x-auto whitespace-pre-wrap break-word">
                            {scriptCode}
                        </pre>
                    </div>
                    <Button
                        size="sm"
                        variant="outline"
                        className="absolute right-2 top-2 h-8 gap-1 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={copyToClipboard}
                    >
                        {copied ? (
                            <>
                                <Check className="h-3.5 w-3.5 text-green-500" />
                                <span className="text-xs">Copied</span>
                            </>
                        ) : (
                            <>
                                <Copy className="h-3.5 w-3.5" />
                                <span className="text-xs">Copy</span>
                            </>
                        )}
                    </Button>
                </div>

                <DialogFooter className="sm:justify-end gap-2 items-center">
                    <Button
                        type="button"
                        onClick={() => handleOpenChange(false)}
                    >
                        Done, I've installed it
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
