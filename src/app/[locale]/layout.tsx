import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { Locale } from "../../types/locale.type";
import { PageContentAPI } from "../../data-api/internal/page-content.api";
import { Pages } from "../../enums/pages.enum";
import { getMetaDataObject } from "../../utils/helper-methods";
import i18nConfig from "../../../i18nConfig";
import initTranslations from "../../i18n/init";
import { i18nNamespaces } from "../../i18n/i18n-namespaces";
import TranslationsProvider from "../../i18n/translation.provider";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

const inter = Inter({ subsets: ["latin"] });
type Props = {
    children: React.ReactNode;
    params: Promise<{ locale: Locale }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
    const { locale } = await props.params;
    try {
        const metaData = await PageContentAPI.getContent(Pages.Home, locale);
        return {
            ...getMetaDataObject(metaData, "default.jpg", locale),
            icons: ["/images/icon.png"],
            metadataBase: new URL(
                process.env.NEXT_PUBLIC_URL ?? "https://gamecheck.com"
            ),
        };
    } catch (error) {
        console.error(error);
    }
    return {
        title: "GameCheck",
        description: "GameCheck",
        icons: ["/images/icon.png"],
        metadataBase: new URL(
            process.env.NEXT_PUBLIC_URL ?? "https://gamecheck.com"
        ),
    };
}

export function generateStaticParams() {
    return i18nConfig.locales.map((locale) => ({ locale }));
}

export default async function RootLayout(props: Props) {
    const { children } = props;
    const { locale } = await props.params;
    const { resources } = await initTranslations(
        locale,
        i18nNamespaces,
        null,
        null
    );
    return (
        <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
            <body
                className={`${inter.className} bg-app-bg-main overflow-x-hidden`}
            >
                <noscript>
                    <iframe
                        src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
                        height="0"
                        width="0"
                        style={{
                            display: "none",
                            visibility: "hidden",
                        }}
                    ></iframe>
                </noscript>
                <TranslationsProvider
                    namespaces={i18nNamespaces}
                    locale={locale}
                    resources={resources}
                >
                    <div className=" w-full mx-auto max-w-3xl">
                        <div className="min-h-screen w-full flex">
                            <div className="flex flex-col w-full">
                                <Navbar />
                                <div className="flex-1">{children}</div>
                            </div>
                        </div>
                        <Footer />
                    </div>
                </TranslationsProvider>
                <Script
                    id="gtm_"
                    strategy="lazyOnload"
                    dangerouslySetInnerHTML={{
                        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${
                            process.env.NEXT_PUBLIC_GTM_ID ?? ""
                        }');`,
                    }}
                    defer
                />
            </body>
        </html>
    );
}
