"use client";
import { Trans, useTranslation } from "react-i18next";
import { BsCircleFill } from "react-icons/bs";
import Link from "next/link";
import PageContainer from "../../../components/containers/page-container";

export default function HowItWorksClientContent() {
    const { t } = useTranslation("how-it-works-page");
    const link = (
        <Link className="underline" key={1} href={"/online-casino/report"} />
    );
    return (
        <PageContainer
            heading={t("heading", {
                ns: "how-it-works-page",
            })}
        >
            <div className="flex flex-col gap-4 text-sm text-justify">
                <p>{t("p1")}</p>

                <p>{t("p2")}</p>

                <p>{t("p3")}</p>

                <p className=" text-lg  font-bold">{t("ourGoals")}</p>

                <div>
                    <h2 className="font-bold text-lg block">{t("h1")}</h2>
                    <p>{t("p4")}</p>
                </div>

                <p className="font-bold text-lg">{t("gamecheckHas")}</p>

                <div>
                    <div className="flex flex-row items-center ms-7 gap-2">
                        <BsCircleFill size={6} />
                        <p>{t("li1")}</p>
                    </div>
                    <p>
                        <Trans
                            i18nKey="p5"
                            t={t}
                            // eslint-disable-next-line react/jsx-key
                            components={[link]}
                        />
                    </p>
                </div>

                <div>
                    <div className="flex flex-row items-center ms-7 gap-2">
                        <BsCircleFill size={6} />
                        <p>{t("li2")}</p>
                    </div>
                    <p>{t("p6")}</p>
                </div>

                <div>
                    <div className="flex flex-row items-center ms-7 gap-2">
                        <BsCircleFill size={6} />
                        <p>
                            <Trans i18nKey="li3" t={t} components={[link]} />
                        </p>
                    </div>
                    <p>
                        <Trans i18nKey="p7" t={t} components={[link]} />
                    </p>
                </div>

                <div>
                    <h2 className="font-bold text-lg  block">{t("h2")}</h2>
                    <p>{t("p8")}</p>
                </div>

                <h2 className="font-bold text-lg  block">{t("h3")}</h2>

                <div>
                    <div className="flex flex-row items-center ms-7 gap-2">
                        <BsCircleFill size={6} />
                        <p>{t("li4")}</p>
                    </div>
                    <p>{t("p9")}</p>
                </div>

                <div>
                    <div className="flex flex-row items-center ms-7 gap-2">
                        <BsCircleFill size={6} />
                        <p>{t("li5")}</p>
                    </div>
                    <p>
                        <Trans i18nKey="p10" t={t} components={[link]} />
                    </p>
                </div>
            </div>
        </PageContainer>
    );
}
