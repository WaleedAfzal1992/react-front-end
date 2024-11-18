"use client";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { getAssetsUrl } from "../utils/assets";

type Props = {
    isVerified?: boolean;
    signature?: string;
};
export default function Seal(props: Props) {
    const { isVerified, signature } = props;
    const url = signature ? "/verify-site/" + signature : "";
    const { t } = useTranslation("site-info-page");

    return (
        <Link href={url ?? "#"}>
            <div className="flex items-center gap-2">
                <div>
                    <Image
                        src={getAssetsUrl(
                            `images/${
                                isVerified
                                    ? "Verified_Dark.svg"
                                    : "not-verified.svg"
                            }`
                        )}
                        alt="Verified"
                        width={0}
                        height={0}
                        className="h-8 w-auto"
                    />
                    <p className="text-black text-[10px] text-center">
                        {/* {format(new Date(), "dd MMM yyyy HH:mm")} */}
                        {isVerified ? (
                            t("certified")
                        ) : (
                            <span className="text-red-500">
                                {t("notCertified")}
                            </span>
                        )}
                    </p>
                </div>
            </div>
        </Link>
    );
}
