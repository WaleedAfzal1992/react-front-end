import { notFound } from "next/navigation";
import initTranslations from "@/i18n/init";
import CasesListWraper from "./cases-list-wraper";
import SiteStatus from "./site-status";
import ReportButton from "./report-sticky-button";
import { Metadata } from "next";
import { Locale } from "../../../../types/locale.type";
import { SiteProfileApi } from "../../../../data-api/internal/sites.api";
import { GamingSiteStatus } from "../../../../enums/gaming-status.enum";
import { getAssetsUrl, getOgImageUrl } from "../../../../utils/assets";
import PageContainer from "../../../../components/containers/page-container";
import Image from "next/image";
import { AvailabilityStatus } from "../../../../enums/status.enum";
import SocialShareButtons from "../../../../components/social-share-buttons";
import SearchInput from "../../../../components/search-input/search-input";

type GamingSiteInfoPageProps = {
    params: Promise<{
        id: string;
        locale: Locale;
    }>;
};

// generate metadata for the page
export async function generateMetadata(
    props: GamingSiteInfoPageProps
): Promise<Metadata> {
    const { id, locale } = await props.params;
    const { t } = await initTranslations(
        locale,
        ["site-info-page", "common"],
        null,
        null
    );
    try {
        // get site by id or slug
        const site = await SiteProfileApi.getSiteProfilePageData(id, locale);

        // if site not found return default title
        if (!site)
            return {
                title: "Gamecheck",
            };

        const title = site.meta?.title?.trim()
            ? site.meta?.title
            : `${site.name} - Gamecheck`;
        const description = site.meta?.description?.trim()
            ? site.meta?.description
            : t("metaDescription", {
                  name: site.name,
              });

        const ogImage = {
            url: "",
            width: 1200,
            height: 627,
            alt: "Gamecheck",
        };

        switch (site.status) {
            case GamingSiteStatus.AuthenticGames:
                ogImage.url = getOgImageUrl("authentic.jpg");
                break;
            case GamingSiteStatus.CounterFeitGames:
                ogImage.url = getOgImageUrl("counterfeit.jpg");
                break;
            default:
                ogImage.url = getOgImageUrl("pending.jpg");
                break;
        }

        return {
            title: title,
            description: description,
            openGraph: {
                title: title,
                description: description,
                url:
                    process.env.NEXT_PUBLIC_URL +
                    `/${locale}/online-casino/${site.slug}`,
                siteName: "Gamecheck",
                images: [ogImage],
                locale: locale,
                type: "website",
            },
            twitter: {
                title: title,
                description: description,
                card: "summary_large_image",
                images: [ogImage],
            },
        };
    } catch (error) {
        // if error return default title
        console.log(
            "Error in generating metadata for site profile page",
            error
        );
        return { title: "Gamecheck" };
    }
}

export default async function GamingSiteInfoPage(
    props: GamingSiteInfoPageProps
) {
    // id can be either id or slug
    const { id, locale } = await props.params;
    const { t } = await initTranslations(
        locale,
        ["site-info-page", "common"],
        null,
        null
    );
    try {
        // get site by id or slug
        const site = await SiteProfileApi.getSiteProfilePageData(id, locale);
        // if site not found return 404
        if (site) {
            return (
                <PageContainer className="flex flex-col">
                    <SiteStatus status={site.status} locale={locale} />

                    <div className="flex gap-2 flex-row items-center mt-7">
                        <div className="relative w-16 h-16">
                            <Image
                                width={64}
                                src={site.logo ?? ""}
                                height={0}
                                alt=""
                            />
                            {(site.gamingSiteNote ||
                                site.availibility ===
                                    AvailabilityStatus.Inactive) && (
                                <div className=" absolute top-0 right-0 h-16 w-16 backdrop-blur-[2px] flex justify-center items-center">
                                    <Image
                                        width={40}
                                        src={getAssetsUrl(
                                            site.availibility ===
                                                AvailabilityStatus.Inactive
                                                ? "images/red-warning-icon.svg"
                                                : "images/warning-icon.svg"
                                        )}
                                        height={40}
                                        alt=""
                                    />
                                </div>
                            )}
                        </div>

                        <div className="flex-1">
                            <p className="text-lg first-letter:lowercase font-semibold text-black">
                                {site.url || "N/A"}
                            </p>
                            {site.gamingSiteNote && (
                                <p className="text-sm font-semibold text-app-red">
                                    {site.gamingSiteNote}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex mt-3 flex-col gap-6 ">
                        <div className=" border  border-gray-200" />
                        <div className=" flex items-center gap-2">
                            <span className=" text-sm font-bold">
                                {t("brand")}:
                            </span>
                            <p className="  text-sm font-medium">
                                {site.name || "N/A"}
                            </p>
                        </div>
                        <div className="border  border-gray-200" />
                        <p className="text-lg font-bold">{t("caseArchives")}</p>
                        <CasesListWraper
                            cases={site.cases}
                            siteSlug={site.slug}
                            siteId={site.id}
                            locale={locale}
                        />
                    </div>
                    <div className="flex-1"></div>
                    <div className=" border my-6 border-gray-200" />

                    <div className="mb-8">
                        <SocialShareButtons shareCurrentUrl />
                    </div>

                    {/* <div className="flex justify-start mt-8 mb-7">
                    <SomethingWrongButton />
                </div> */}

                    <SearchInput />
                    <ReportButton slug={site.slug} />
                </PageContainer>
            );
        }
    } catch (error) {
        console.log("Exception in site profile page", error);
    }
    return notFound();
}
