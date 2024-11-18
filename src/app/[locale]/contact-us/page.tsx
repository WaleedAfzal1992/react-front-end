import { Metadata } from "next";
import { Locale } from "../../../types/locale.type";
import { PageContentAPI } from "../../../data-api/internal/page-content.api";
import { Pages } from "../../../enums/pages.enum";
import { getMetaDataObject } from "../../../utils/helper-methods";
import PageContainer from "../../../components/containers/page-container";

type Props = {
    params: Promise<{
        locale: Locale;
    }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
    const { locale } = await props.params;

    const data = await PageContentAPI.getContent(Pages.ContactUs, locale);
    return getMetaDataObject(data, "contact_us.jpg", locale);
}

export default async function Page(props: Props) {
    const { locale } = await props.params;

    const data = await PageContentAPI.getContent(Pages.ContactUs, locale);

    return (
        <PageContainer>
            <div
                className="editor-content"
                dangerouslySetInnerHTML={{
                    __html: data?.contentHtml ?? "",
                }}
            ></div>
            {/* <Separator /> */}

            {/* <p className="my-2">
                {t("companyAddress")} 45 Albemarle Street, Mayfair, London, W1S
                4JL
            </p>

            <Separator /> */}

            {/* <div className="w-full aspect-square md:aspect-video shadow-md bg-white my-6">
                <iframe
                    className="w-full h-full"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    src={`https://www.google.com/maps/embed/v1/place?q=place_id:ChIJhRVT3CkFdkgRfXLbnoDr-6k&key=${process.env.GOOGLE_MAPS_KEY}`}
                ></iframe>
            </div> */}
        </PageContainer>
    );
}
