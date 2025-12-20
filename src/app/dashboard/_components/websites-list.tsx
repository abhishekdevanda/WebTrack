import { getWebsitesList } from "../_actions/website"
import { NoWebsites } from "./no-websites";
import { WebsitesCard } from "./website-card";

export const WebsitesList = async () => {
    const data = await getWebsitesList();
    return (
        <>
            {data.websites && data.websites.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {data.websites.map((website) => (
                        <WebsitesCard key={website.id} website={website} />
                    ))}
                </div>
            )
                :
                <NoWebsites />
            }
        </>
    );
}
