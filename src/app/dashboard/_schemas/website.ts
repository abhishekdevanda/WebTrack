import { z } from "zod";

export const websiteSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    url: z.url({
        message: "Please enter a valid URL.",
    }),
    timezone: z.string().nonempty({
        message: "Please select a timezone.",
    }),
    websiteId: z.string().optional(), // For updating
});

export type WebsiteInput = z.infer<typeof websiteSchema>;
