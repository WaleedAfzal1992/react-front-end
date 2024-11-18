import "server-only";
import { DEFAULT_CACHE_TIME } from "../../config/const";
import { Pages } from "../../enums/pages.enum";
import { Locale } from "../../types/locale.type";
import { PageContent } from "../../types/page-content-response.type";

class PageContentService {
    private readonly INTERNAL_API_URL = process.env.INTERNAL_API_URL;

    public async getContent(page: Pages, locale: Locale): Promise<PageContent> {
        try {
            const resp = await fetch(
                `${this.INTERNAL_API_URL}/page-content/${page}`,
                {
                    headers: {
                        locale: locale,
                    },
                    cache: "force-cache",
                    next: {
                        revalidate: DEFAULT_CACHE_TIME,
                    },
                }
            );
            if (resp.ok) {
                const data = await resp.json();
                return data;
            } else {
                console.error(resp.statusText);
                throw new Error("Failed to fetch data");
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export const PageContentAPI = new PageContentService();
