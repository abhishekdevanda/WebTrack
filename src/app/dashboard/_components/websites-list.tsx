import { getWebsitesList } from "../_actions/website"
import { NoWebsites } from "./no-websites";
import { WebsitesCard } from "./websites-card";

export const WebsitesList = async () => {
    const data = await getWebsitesList();
    return (
        <>
            {data.websites && data.websites.length > 0 ? (
                data.websites.map((website) => (
                    <WebsitesCard key={website.id} website={website} />
                ))
            )
                :
                <NoWebsites />
            }
        </>
    );
}
