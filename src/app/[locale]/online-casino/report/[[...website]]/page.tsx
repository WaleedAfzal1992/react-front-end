import ReportSiteForm from "../form";
import { Metadata } from "next";
import Script from "next/script";
import { Locale } from "../../../../../types/locale.type";
import { PageContentAPI } from "../../../../../data-api/internal/page-content.api";
import { Pages } from "../../../../../enums/pages.enum";
import {
    base64ToString,
    getMetaDataObject,
} from "../../../../../utils/helper-methods";
import { GamingProvider } from "../../../../../types/gaming-provider.type";
import { GamingProviderApi } from "../../../../../data-api/internal/gaming-provider.api";
import { SiteProfileApi } from "../../../../../data-api/internal/sites.api";
import { SiteProfilePageData } from "../../../../../types/site-profile-response.type";

type PageProps = {
    params: Promise<{
        locale: Locale;
        website?: string[];
    }>;
};

export async function generateMetadata(props: PageProps): Promise<Metadata> {
    const { locale } = await props.params;

    const data = await PageContentAPI.getContent(
        Pages.RequestVerification,
        locale
    );

    return getMetaDataObject(data, "request_verification.jpg", locale);
}

export default async function Page(props: PageProps) {
    const { locale, website } = await props.params;
    let siteId = "";
    let websiteText = "";
    let gamingProviders: GamingProvider[] = [];

    let siteToReport = website?.filter((x) => x !== locale)?.[0];

    if (siteToReport) {
        siteToReport = base64ToString(siteToReport);
    }

    if (siteToReport) {
        try {
            const respData = await Promise.all([
                new Promise(async (resolve) => {
                    try {
                        const res = await SiteProfileApi.getSiteProfilePageData(
                            siteToReport,
                            locale
                        );
                        resolve(res);
                    } catch (error) {
                        console.log(error);
                        resolve(null);
                    }
                }),
                new Promise(async (resolve) => {
                    try {
                        const p = await GamingProviderApi.getProviders();
                        resolve(p);
                    } catch (error) {
                        console.error(error);
                        resolve([]);
                    }
                }),
            ]);
            const site = respData[0] as SiteProfilePageData;
            gamingProviders = respData[1] as GamingProvider[];

            if (site) {
                siteId = site.id;
                websiteText = site.url;
            } else {
                websiteText = siteToReport;
            }
        } catch {
            websiteText = siteToReport;
        }
    } else {
        try {
            gamingProviders = await GamingProviderApi.getProviders();
        } catch {}
    }
    return (
        <>
            <Script
                src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
            ></Script>
            <ReportSiteForm
                websiteId={siteId ?? undefined}
                websiteValue={websiteText ?? undefined}
                gamingProviders={gamingProviders}
            />
        </>
    );
}
