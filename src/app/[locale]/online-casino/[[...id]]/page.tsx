import initTranslations from "@/i18n/init";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { IoChevronBackOutline } from "react-icons/io5";
import { Locale } from "../../../../types/locale.type";
import { getOgImageUrl } from "../../../../utils/assets";
import { GamingSiteStatus } from "../../../../enums/gaming-status.enum";
import PageContainer from "../../../../components/containers/page-container";
import DateTime from "../../../../components/date-time";
import { Pages } from "../../../../enums/pages.enum";
import { CasesApi } from "../../../../data-api/internal/cases.api";

type Props = {
    params: Promise<{
        locale: Locale;
        id: string[];
    }>;
};

// generate meta data for the page

export async function generateMetadata(props: Props): Promise<Metadata> {
    // read route params
    const { id, locale } = await props.params;

    const { t } = await initTranslations(
        locale,
        ["case", "common"],
        null,
        null
    );

    const caseNumber = id?.[id.length - 1];
    const siteSlug = id?.[id.length - 2];
    if (!id) return notFound();

    try {
        const siteCase = await CasesApi.getCase(caseNumber, locale);

        if (!siteCase) {
            return {
                title: "Gamecheck",
                description: "Gamecheck",
            };
        }

        const title = `${
            siteCase.site?.name ? siteCase.site.name + " | " : ""
        }Case No ${siteCase.caseNumber} | Gamecheck`;

        const description = t("metaDescription");

        return {
            title: title ?? "Gamecheck",
            description: description ?? "Gamecheck",
            openGraph: {
                title: title ?? "Gamecheck",
                description: description ?? "Gamecheck",
                type: "website",
                url: `${process.env.NEXT_PUBLIC_URL}/online-casino/${siteSlug}/${caseNumber}`,
                images: [
                    {
                        url: getOgImageUrl("default.jpg"),
                        width: 1200,
                        height: 627,
                        alt: "Gamecheck",
                    },
                ],
            },
            twitter: {
                title: title ?? "Gamecheck",
                description: description ?? "Gamecheck",
                card: "summary_large_image",
                images: [
                    {
                        url: getOgImageUrl("default.jpg"),
                        width: 1200,
                        height: 627,
                        alt: "Gamecheck",
                    },
                ],
            },
        };
    } catch (error) {
        console.error(error);
    }
    return {
        title: "Gamecheck",
        description: "Gamecheck",
    };
}

export default async function Page(props: Props) {
    const { id, locale } = await props.params;
    const { t } = await initTranslations(
        locale,
        ["case", "common"],
        null,
        null
    );

    const caseNumber = id?.[id.length - 1];
    const siteSlug = id?.[id.length - 2];

    if (!id) return notFound();
    try {
        const siteCase = await CasesApi.getCase(caseNumber, locale);
        if (siteCase) {
            let description = "";
            switch (siteCase.caseType) {
                case GamingSiteStatus.AuthenticGames:
                    description = t("noCounterfeitMessage");
                    break;
                case GamingSiteStatus.CounterFeitGames:
                    description = t("counterfeitMessage");
                    break;
                default:
                    description = t("pendingMessage");
            }

            return (
                <PageContainer>
                    <div className="flex my-6 items-center">
                        <p className="text-xl flex-1 font-bold text-black">
                            {t("case")} {siteCase.caseNumber}
                        </p>
                        <p className="text-sm ">
                            <DateTime
                                isoDateStr={siteCase.createdAt}
                                formatStr="hh:mm a / dd-MM-yyyy"
                            />
                        </p>
                    </div>

                    <div className=" border border-gray-200" />
                    <div className="my-6 flex items-center gap-1">
                        <p className="">{t("website")} </p>
                        <p className="flex-1 line-clamp-1 first-letter:lowercase">
                            {siteCase.site?.url ?? ""}
                        </p>
                    </div>

                    <div className=" border border-gray-200" />

                    <p className="my-6">{description}</p>

                    {siteCase.caseType ===
                        GamingSiteStatus.CounterFeitGames && (
                        <>
                            <p className="mt-4 text-black font-semibold">
                                {t("contactNote")}
                            </p>
                            <div className="my-6">
                                <Link
                                    href={`/${Pages.ContactUs}`}
                                    className=" font-semibold bg-app-green px-10 py-2 text-white rounded-sm"
                                >
                                    {t("getInTouch")}
                                </Link>
                            </div>
                        </>
                    )}

                    <div className="">
                        <Link
                            className="flex items-center gap-x-2"
                            href={`/online-casino/${siteSlug}`}
                        >
                            <IoChevronBackOutline />
                            {` ${t("backToProfile")}`}
                        </Link>
                    </div>
                </PageContainer>
            );
        }
    } catch (error) {
        console.error(error);
    }
    return notFound();
}
