"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AppWindow, Globe, MapPin, Loader2 } from "lucide-react";
import { useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { updateWebsite } from "@/app/dashboard/_actions/website";
import { WebsiteInput, websiteSchema } from "@/app/dashboard/_schemas/website";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Website } from "@/types/types";

interface EditWebsiteCardProps {
    website: Website;
}

export function EditWebsiteForm({ website }: EditWebsiteCardProps) {
    const [state, formAction, isPending] = useActionState(updateWebsite, {
        message: null,
        errors: {},
    });

    const form = useForm<WebsiteInput>({
        resolver: zodResolver(websiteSchema),
        defaultValues: {
            websiteId: website.websiteId,
            name: website.name,
            url: website.url.replace(/^https?:\/\//, ''),
            timezone: website.timezone,
        },
    })

    useEffect(() => {
        if (state.message) {
            if (state.message.includes("success")) {
                toast.success(state.message);
            } else if (state.message !== "Unauthorized") {
                toast.error(state.message);
            }
        }
    }, [state.message])

    return (
        <Card>
            <CardHeader>
                <CardTitle>Website Settings</CardTitle>
                <CardDescription>
                    Update your website details.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form action={formAction} className="space-y-6">
                        <input type="hidden" name="websiteId" value={website.websiteId} />
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Website Name</FormLabel>
                                    <FormControl>
                                        <InputGroup>
                                            <InputGroupAddon align="inline-start">
                                                <AppWindow className="size-4" />
                                            </InputGroupAddon>
                                            <InputGroupInput placeholder="My Awesome Website" {...field} />
                                        </InputGroup>
                                    </FormControl>
                                    <FormMessage />
                                    {state.errors?.name && (
                                        <p className="text-sm font-medium text-destructive">
                                            {state.errors.name}
                                        </p>
                                    )}
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="url"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Website URL</FormLabel>
                                    <FormControl>
                                        <InputGroup>
                                            <InputGroupAddon align="inline-start">
                                                <Globe className="size-4" />
                                                <span className="ml-2">https://</span>
                                            </InputGroupAddon>
                                            <InputGroupInput placeholder="example.com" {...field} />
                                        </InputGroup>
                                    </FormControl>
                                    <FormDescription>
                                        Enter the full URL.
                                    </FormDescription>
                                    <FormMessage />
                                    {state.errors?.url && (
                                        <p className="text-sm font-medium text-destructive">
                                            {state.errors.url}
                                        </p>
                                    )}
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="timezone"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Timezone</FormLabel>
                                    <Select name="timezone" onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="size-4 text-muted-foreground" />
                                                    <SelectValue placeholder="Select a timezone" />
                                                </div>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>North America</SelectLabel>
                                                <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                                                <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
                                                <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
                                                <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
                                                <SelectItem value="akst">Alaska Standard Time (AKST)</SelectItem>
                                                <SelectItem value="hst">Hawaii Standard Time (HST)</SelectItem>
                                            </SelectGroup>
                                            <SelectGroup>
                                                <SelectLabel>Europe & Africa</SelectLabel>
                                                <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
                                                <SelectItem value="cet">Central European Time (CET)</SelectItem>
                                                <SelectItem value="eet">Eastern European Time (EET)</SelectItem>
                                                <SelectItem value="west">
                                                    Western European Summer Time (WEST)
                                                </SelectItem>
                                                <SelectItem value="cat">Central Africa Time (CAT)</SelectItem>
                                                <SelectItem value="eat">East Africa Time (EAT)</SelectItem>
                                            </SelectGroup>
                                            <SelectGroup>
                                                <SelectLabel>Asia</SelectLabel>
                                                <SelectItem value="msk">Moscow Time (MSK)</SelectItem>
                                                <SelectItem value="ist">India Standard Time (IST)</SelectItem>
                                                <SelectItem value="cst_china">China Standard Time (CST)</SelectItem>
                                                <SelectItem value="jst">Japan Standard Time (JST)</SelectItem>
                                                <SelectItem value="kst">Korea Standard Time (KST)</SelectItem>
                                                <SelectItem value="ist_indonesia">
                                                    Indonesia Central Standard Time (WITA)
                                                </SelectItem>
                                            </SelectGroup>
                                            <SelectGroup>
                                                <SelectLabel>Australia & Pacific</SelectLabel>
                                                <SelectItem value="awst">
                                                    Australian Western Standard Time (AWST)
                                                </SelectItem>
                                                <SelectItem value="acst">
                                                    Australian Central Standard Time (ACST)
                                                </SelectItem>
                                                <SelectItem value="aest">
                                                    Australian Eastern Standard Time (AEST)
                                                </SelectItem>
                                                <SelectItem value="nzst">New Zealand Standard Time (NZST)</SelectItem>
                                                <SelectItem value="fjt">Fiji Time (FJT)</SelectItem>
                                            </SelectGroup>
                                            <SelectGroup>
                                                <SelectLabel>South America</SelectLabel>
                                                <SelectItem value="art">Argentina Time (ART)</SelectItem>
                                                <SelectItem value="bot">Bolivia Time (BOT)</SelectItem>
                                                <SelectItem value="brt">Brasilia Time (BRT)</SelectItem>
                                                <SelectItem value="clt">Chile Standard Time (CLT)</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                    {state.errors?.timezone && (
                                        <p className="text-sm font-medium text-destructive">
                                            {state.errors.timezone}
                                        </p>
                                    )}
                                </FormItem>
                            )}
                        />

                        <div className="grid gap-2">
                            <Label>Website ID</Label>
                            <Input
                                value={website.websiteId}
                                disabled
                                className="bg-muted font-mono"
                            />
                            <p className="text-xs text-muted-foreground">
                                This ID is used in your tracking script and cannot be changed.
                            </p>
                        </div>

                        <div className="flex justify-end pt-4 border-t">
                            <Button type="submit" disabled={isPending}>
                                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
