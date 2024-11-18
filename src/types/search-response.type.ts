import { GamingSiteStatus } from "../enums/gaming-status.enum";

export interface SearchResponse {
    id: string;
    name: string;
    url: string;
    logo: string;
    slug: string;
    warningLogo?: "red" | "yellow" | null;
    status: GamingSiteStatus;
}
