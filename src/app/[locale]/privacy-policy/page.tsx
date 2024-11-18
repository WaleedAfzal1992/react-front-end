import { Metadata } from "next";
import { notFound } from "next/navigation";
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

    const data = await PageContentAPI.getContent(Pages.PrivacyPolicy, locale);

    return getMetaDataObject(data, "privacy_policy.jpg");
}

export default async function Page(props: Props) {
    try {
        const { locale } = await props.params;
        const data = await PageContentAPI.getContent(
            Pages.PrivacyPolicy,
            locale
        );
        return (
            <PageContainer>
                <div
                    className="editor-content"
                    dangerouslySetInnerHTML={{
                        __html: data?.contentHtml ?? "",
                    }}
                />
            </PageContainer>
        );
    } catch (error) {
        console.error(error);
    }

    return notFound();
}
