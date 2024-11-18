"use client";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BsInfoCircle } from "react-icons/bs";
import { SiteCaseResponse } from "../../../../types/site-case-response.type";
import { GamingSiteStatus } from "../../../../enums/gaming-status.enum";
import DateTime from "../../../../components/date-time";
import Loader from "../../../../components/loader/loader";
import { CasesApi } from "../../../../data-api/public/cases.api";

type Props = {
    cases?: SiteCaseResponse[];
    siteSlug: string;
    siteId: string;
};
export default function GamingSiteCasesList(props: Props) {
    const { siteSlug } = props;
    const { t } = useTranslation("site-info-page");
    const [cases, setCases] = useState<SiteCaseResponse[]>(props.cases ?? []);
    const [nextPageData, setNextPageData] = useState<SiteCaseResponse[]>([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);

    const getCategoryText = (status: GamingSiteStatus) => {
        switch (status) {
            case GamingSiteStatus.CounterFeitGames:
                return t("counterfeitCategory", {
                    ns: "case",
                });
            case GamingSiteStatus.AuthenticGames:
                return t("noCounterfeitCategory", {
                    ns: "case",
                });
            default:
                return t("pendingCategory", {
                    ns: "case",
                });
        }
    };

    const getCases = useCallback(async () => {
        try {
            setLoading(true);
            const response = await CasesApi.getCases(props.siteId, page + 1, 5);
            if (response?.length) {
                setNextPageData(response);
            } else {
                setNextPageData([]);
            }
        } catch {
            setNextPageData([]);
        } finally {
            setLoading(false);
        }
    }, [page, props.siteId]);

    useEffect(() => {
        getCases();
    }, [page, getCases]);

    return (
        <div className="flex flex-col gap-5">
            {cases?.length ? (
                cases?.map((x, i) => (
                    <Link
                        key={i}
                        href={"/online-casino/" + siteSlug + "/" + x.caseNumber}
                        className=" hover:underline"
                    >
                        <div className="text-sm py-[2px] font-medium text-nowrap items-center gap-2 flex-wrap border-l-gray-400 border-l-2 ps-2 flex">
                            <p className="line-clamp-1">
                                {getCategoryText(
                                    x.caseType as GamingSiteStatus
                                )}
                            </p>
                            <p>-</p>
                            <p>
                                <DateTime
                                    isoDateStr={x.createdAt}
                                    formatStr="hh:mm a - dd/MM/yyyy"
                                />
                            </p>
                            <div className=" flex items-center gap-2 ">
                                <BsInfoCircle size={15} className=" " />
                                <span className="">
                                    {t("readMore", {
                                        ns: "common",
                                    })}
                                </span>
                            </div>
                        </div>
                    </Link>
                ))
            ) : (
                <p className=" text-sm font-medium">{t("noCaseAvailable")}</p>
            )}

            {!loading &&
            (page === 0
                ? nextPageData?.length - (props.cases?.length ?? 0)
                : nextPageData?.length) > 0 ? (
                <div>
                    <button
                        onClick={() => {
                            if (page === 0) {
                                setCases(nextPageData);
                            } else {
                                setCases([...cases, ...nextPageData]);
                            }
                            setPage(page + 1);
                        }}
                        className="text-sm font-medium underline"
                    >
                        {t("viewMore")}
                    </button>
                </div>
            ) : null}
            {loading && <Loader />}
        </div>
    );
}
