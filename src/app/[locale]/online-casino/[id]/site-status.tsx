import Image from "next/image";
import initTranslations from "@/i18n/init";
import { GamingSiteStatus } from "../../../../enums/gaming-status.enum";
import { getAssetsUrl } from "../../../../utils/assets";
import { Locale } from "../../../../types/locale.type";

//PENDING STATUS is not yet handled
type Props = {
    status: GamingSiteStatus;
    locale: Locale;
};

const SiteStatus = async (props: Props) => {
    const { status, locale } = props;
    const { t } = await initTranslations(
        locale,
        ["common", "site-info-page"],
        null,
        null
    );

    let statusColor = "app-not-verified";
    let statusText = t("checksPending");
    let imgSrc = "images/pending_check.svg";
    let note = t("siteStatusPending", {
        ns: "site-info-page",
    });
    switch (status) {
        case GamingSiteStatus.CounterFeitGames:
            statusColor = "app-red";
            statusText = t("fakeGame", {
                ns: "site-info-page",
            });
            imgSrc = "images/unverified.svg";
            note = t("counterfeitCheckedStatus", {
                ns: "site-info-page",
            });
            break;
        case GamingSiteStatus.AuthenticGames:
            statusColor = "app-green";
            statusText = t("authenticGame", {
                ns: "site-info-page",
            });
            imgSrc = "images/verified.svg";
            note = t("authenticCheckedStatus", {
                ns: "site-info-page",
            });
            break;
        default:
            statusColor = "app-not-verified";
            statusText = t("checksPending");
            imgSrc = "images/pending_check.svg";
    }
    return (
        <div className="flex justify-center items-center flex-col">
            <div className="">
                <Image
                    src={getAssetsUrl(imgSrc)}
                    alt={status}
                    width={118}
                    height={0}
                />
            </div>
            <div>
                <div
                    className={`font-bold leading-tight text-2xl text-center text-${statusColor}`}
                >
                    {statusText}
                </div>
                <p className=" mt-2 text-xs font-medium text-center">{note}</p>
            </div>
        </div>
    );
};

export default SiteStatus;
