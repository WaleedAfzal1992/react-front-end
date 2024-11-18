import { GamingSiteStatus } from "../enums/gaming-status.enum";
import { AvailabilityStatus } from "../enums/status.enum";
import { SiteCaseResponse } from "./site-case-response.type";

export interface SiteProfilePageData {
    id: string;
    slug: string;
    name: string;
    url: string;
    status: GamingSiteStatus;
    cases?: SiteCaseResponse[];
    logo?: string;
    gamingSiteNote?: string;
    availibility: AvailabilityStatus;
    meta?: {
        title?: string;
        description?: string;
        image?: string;
    };
}
