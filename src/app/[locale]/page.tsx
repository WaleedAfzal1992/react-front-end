import initTranslations from "@/i18n/init";
import Link from "next/link";
import { Locale } from "../../types/locale.type";
import SearchInput from "../../components/search-input/search-input";

type Props = {
    params: Promise<{ locale: Locale }>;
};

export default async function Home(props: Props) {
    const { locale } = await props.params;
    const { t } = await initTranslations(
        locale,
        ["home", "common"],
        null,
        null
    );

    return (
        <div className="flex flex-col justify-center  items-center min-h-full gap-4 p-4 md:p-8 max-w-2xl mx-auto">
            <div className="flex-1 flex flex-col justify-center md:items-start w-full">
                <SearchInput showHints showTagLine />
            </div>
            <Link
                href={"/online-casino/report"}
                className="my-4 underline text-xs font-semibold"
            >
                {t("requestVerification", {
                    ns: "common",
                })}
            </Link>
        </div>
    );
}
