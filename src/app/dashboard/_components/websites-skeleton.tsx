import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function WebsitesSkeleton() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="flex flex-col overflow-hidden">
                    <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0 space-y-2">
                                <Skeleton className="h-5 w-32" />
                                <Skeleton className="h-3 w-48" />
                            </div>
                            <Skeleton className="h-8 w-8 rounded-md shrink-0" />
                        </div>
                    </CardHeader>

                    <CardContent className="pb-0">
                        <Skeleton className="h-32 w-full rounded-md" />
                    </CardContent>

                    <CardFooter className="flex-col items-start gap-2 pt-4">
                        <div className="w-full space-y-2">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-3 w-24" />
                        </div>
                        <Skeleton className="h-9 w-full mt-2" />
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}
