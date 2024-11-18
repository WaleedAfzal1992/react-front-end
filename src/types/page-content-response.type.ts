import { Pages } from "../enums/pages.enum";
import { Media } from "./media.type";

export interface PageContent {
    id: string;
    name: Pages;
    meta: {
        title: string;
        description: string;
        image: Media;
    };
    contentHtml: string;
}
