/* eslint-disable @typescript-eslint/no-explicit-any */

import { Metadata } from "next";
import { Locale } from "../types/locale.type";
import { PageContent } from "../types/page-content-response.type";
import { getOgImageUrl } from "./assets";

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function debounce(func: Function, wait: number) {
    let timeout: NodeJS.Timeout | null = null;
    return function (this: any, ...args: any) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const context = this;
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            timeout = null;
            func.apply(context, args);
        }, wait);
    };
}

export function validateUrl(url: string): boolean {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

export function getMetaDataObject(
    data: PageContent,
    image: string,
    locale: Locale = "en"
): Partial<Metadata> {
    const title = data?.meta?.title ?? "Gamecheck";
    const description = data?.meta?.description ?? "Gamecheck";

    let ogImages = [];

    if (data?.meta?.image) {
        ogImages = [
            {
                url: data.meta.image?.url,
                width: data.meta.image?.width,
                height: data.meta.image?.height,
                alt: data.meta.image?.alt ?? "Gamecheck",
            },
        ];
    } else {
        ogImages = [
            {
                url: getOgImageUrl(image),
                width: 1200,
                height: 627,
                alt: "Gamecheck",
            },
        ];
    }

    return {
        title: title,
        description: description,
        openGraph: {
            title: title,
            description: description,
            url: process.env.NEXT_PUBLIC_PAYLOAD_PUBLIC_URL,
            siteName: "Gamecheck",
            images: ogImages,
            locale: locale,
            type: "website",
        },
        twitter: {
            title: title,
            description: description,
            card: "summary_large_image",
            images: ogImages,
        },
    };
}

export function base64ToString(base64: string) {
    try {
        const str = decodeURIComponent(base64);
        const binString = atob(str);

        return new TextDecoder().decode(
            Uint8Array.from(binString as any, (m: any) => m.codePointAt(0))
        );
    } catch (error) {
        console.log(error);
        return "";
    }
}

export function stringToBase64(text: string) {
    try {
        const bytes = new TextEncoder().encode(text);
        const binString = Array.from(bytes, (byte) =>
            String.fromCodePoint(byte)
        ).join("");
        return btoa(binString);
    } catch {
        return "";
    }
}
