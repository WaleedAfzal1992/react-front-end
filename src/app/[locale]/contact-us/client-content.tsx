"use client";

import Link from "next/link";
import { Trans, useTranslation } from "react-i18next";

export default function ContactUsContent() {
    const { t } = useTranslation("contact-us");
    return (
        <div className="flex flex-col gap-4">
            <p>
                <Trans
                    t={t}
                    i18nKey="p1"
                    components={[
                        <a
                            key={1}
                            className=" font-semibold text-black"
                            href="mailto:gameprovider@gamecheck.com"
                        >
                            gameprovider@gamecheck.com
                        </a>,
                    ]}
                />
            </p>
            <p>
                <Trans
                    t={t}
                    i18nKey="p2"
                    components={[
                        <Link
                            key={1}
                            href="/online-casino/report"
                            className=" font-semibold text-black"
                        >
                            {t("requestVerification", {
                                ns: "common",
                            })}
                        </Link>,
                    ]}
                />
            </p>

            <p>
                <Trans
                    t={t}
                    i18nKey="p3"
                    components={[
                        <a
                            key={1}
                            className=" font-semibold text-black"
                            href="mailto:onlinecasino@gamecheck.com"
                        >
                            onlinecasino@gamecheck.com
                        </a>,
                    ]}
                />
            </p>

            <p>
                <Trans
                    t={t}
                    i18nKey="p4"
                    components={[
                        <a
                            key={1}
                            className=" font-semibold text-black"
                            href="mailto:help@gamecheck.com"
                        >
                            help@gamecheck.com
                        </a>,
                    ]}
                />
            </p>
        </div>
    );
}
