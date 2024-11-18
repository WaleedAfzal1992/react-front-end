import { SupportedLanguages } from "@/i18n/supported-languages";
import { Config } from "next-i18n-router/dist/types";

const i18nConfig: Config = {
    locales: SupportedLanguages?.length
        ? ["default", ...SupportedLanguages.map((lang) => lang.code)]
        : ["default", "en"],
    defaultLocale: "default",
};
export default i18nConfig;
