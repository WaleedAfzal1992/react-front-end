import "server-only";
import { Locale } from "../../types/locale.type";
import { SiteProfilePageData } from "../../types/site-profile-response.type";

class Site {
    private readonly INTERNAL_API_URL = process.env.INTERNAL_API_URL;
    public async getSiteProfilePageData(
        slug: string,
        locale: Locale
    ): Promise<SiteProfilePageData> {
        try {
            const resp = await fetch(
                `${this.INTERNAL_API_URL}/site/site-profile-page-data/${slug}`,
                {
                    headers: {
                        locale,
                    },
                }
            );
            if (resp.ok) {
                return await resp.json();
            } else {
                throw new Error(resp.statusText);
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export const SiteProfileApi = new Site();
