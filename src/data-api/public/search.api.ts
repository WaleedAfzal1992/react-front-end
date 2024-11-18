import { SearchResponse } from "../../types/search-response.type";

class Search {
    private readonly API_URL = process.env.NEXT_PUBLIC_PUBLIC_API_URL;
    public async search(
        query: string,
        locale: string
    ): Promise<SearchResponse[]> {
        try {
            const resp = await fetch(`${this.API_URL}/site/search?q=${query}`, {
                headers: {
                    locale,
                },
            });
            if (resp.ok) {
                const data = await resp.json();
                return data;
            } else {
                console.error(resp.statusText);
                throw new Error("Failed to fetch data");
            }
        } catch (error) {
            throw error;
        }
    }
}

export const SearchAPI = new Search();
