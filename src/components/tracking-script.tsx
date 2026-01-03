"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { Check, Copy } from "lucide-react";

export function TrackingScript({ websiteId }: { websiteId: string }) {
    const [copied, setCopied] = useState(false);

    const scriptCode = `<script 
  defer 
  data-website-id="${websiteId}" 
  src="${process.env.NEXT_PUBLIC_BASE_URL}/analytics.js"
  >
</script>`;
    const handleCopy = () => {
        navigator.clipboard.writeText(scriptCode);
        setCopied(true);
        toast.success("Script copied to clipboard");
        setTimeout(() => setCopied(false), 2000);
    };
    return (
        <div className="relative rounded-lg border bg-muted p-4 font-mono text-sm">
            <pre className="overflow-x-auto whitespace-pre-wrap break-all">
                {scriptCode}
            </pre>
            <Button
                size="icon"
                variant="ghost"
                className="absolute right-2 top-2 h-8 w-8 text-muted-foreground hover:text-foreground"
                onClick={handleCopy}
            >
                {copied ? (
                    <Check className="h-4 w-4 text-green-500" />
                ) : (
                    <Copy className="h-4 w-4" />
                )}
                <span className="sr-only">Copy script</span>
            </Button>
        </div>
    );
}