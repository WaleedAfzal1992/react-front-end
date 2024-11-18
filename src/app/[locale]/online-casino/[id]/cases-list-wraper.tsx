import { Locale } from "../../../../types/locale.type";
import { SiteCaseResponse } from "../../../../types/site-case-response.type";
import GamingSiteCasesList from "./cases-list";

type Props = {
    cases?: SiteCaseResponse[];
    locale: Locale;
    siteSlug: string;
    siteId: string;
};

export default async function CasesListWraper(props: Props) {
    return (
        <GamingSiteCasesList
            siteId={props.siteId}
            cases={props.cases}
            siteSlug={props.siteSlug}
        />
    );
}
