import "server-only";
import { GamingProvider } from "../../types/gaming-provider.type";

class GamingProviders {
    private readonly INTERNAL_API_URL = process.env.INTERNAL_API_URL;
    async getProviders(): Promise<GamingProvider[]> {
        try {
            const response = await fetch(
                `${this.INTERNAL_API_URL}/gaming-provider`
            );
            if (response.ok) {
                return await response.json();
            } else {
                throw new Error(response.statusText);
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
export const GamingProviderApi = new GamingProviders();
