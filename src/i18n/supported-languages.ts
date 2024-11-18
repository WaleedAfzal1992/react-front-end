export const SupportedLanguages = [
    {
        code: "en",
        name: "English",
        flag: "ENGLAND.svg",
    },
    {
        code: "fr",
        name: "French",
        flag: "FR.svg",
    },
    {
        code: "es",
        name: "Spanish",
        flag: "ES.svg",
    },
    {
        code: "de",
        name: "German",
        flag: "DE.svg",
    },
    {
        code: "it",
        name: "Italian",
        flag: "IT.svg",
    },
    { code: "pt", name: "Portuguese", flag: "PT.svg" },
    { code: "ru", name: "Russian", flag: "RU.svg" },
    { code: "zh", name: "Chinese", flag: "CN.svg" },
    { code: "ja", name: "Japanese", flag: "JP.svg" },
    { code: "ko", name: "Korean", flag: "KR.svg" },
    { code: "ar", name: "Arabic", flag: "SA.svg" },
    { code: "tr", name: "Turkish", flag: "TR.svg" },
    { code: "hi", name: "Hindi", flag: "IN.svg" },
    { code: "pl", name: "Polish", flag: "PL.svg" },
];

export type SupportedLanguage = (typeof SupportedLanguages)[number];
