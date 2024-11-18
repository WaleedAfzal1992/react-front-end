"use client";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { stringToBase64 } from "../../../../utils/helper-methods";

type Props = {
    slug: string;
};
export default function ReportButton(props: Props) {
    const { t } = useTranslation("common");
    return props.slug ? (
        <Link
            href={`/online-casino/report/${stringToBase64(props.slug)}`}
            className="text-xs fixed bg-black text-white -rotate-90 px-4  text-center right-3 bottom-1/2 rounded-t-md py-1 "
            style={{
                transformOrigin: "right center",
            }}
        >
            {t("requestVerification")}
        </Link>
    ) : null;
}
