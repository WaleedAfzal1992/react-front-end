import { GamingSiteStatus } from "../enums/gaming-status.enum";

export interface SiteCaseResponse {
    id: string;
    site: {
        id: string;
        slug: string;
        name: string;
        logo: string;
        url: string;
    };
    createdAt: string;
    caseNumber: string;
    caseType: GamingSiteStatus;
}
