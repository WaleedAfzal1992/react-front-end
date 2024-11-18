import { Locale } from "../../types/locale.type";
import { SiteCaseResponse } from "../../types/site-case-response.type";

class Cases {
    private readonly API_URL = process.env.NEXT_PUBLIC_PUBLIC_API_URL;
    public async getCases(
        siteId: string,
        page: number = 1,
        limit: number = 5,
        locale: Locale = "en"
    ): Promise<SiteCaseResponse[]> {
        try {
            const resp = await fetch(
                `${this.API_URL}/cases/site/${siteId}?page=${page}&limit=${limit}`,
                {
                    headers: {
                        locale,
                    },
                }
            );
            if (resp.ok) {
                return await resp.json();
            } else {
                throw new Error("Failed to fetch cases");
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    public async getCase(
        caseNumber: string,
        locale: Locale = "en"
    ): Promise<SiteCaseResponse> {
        try {
            const resp = await fetch(`${this.API_URL}/cases/${caseNumber}`, {
                headers: {
                    locale,
                },
            });
            if (resp.ok) {
                return await resp.json();
            } else {
                throw new Error("Failed to fetch case");
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export const CasesApi = new Cases();
