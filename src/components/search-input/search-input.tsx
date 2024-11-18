"use client";
import Image from "next/image";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    Combobox,
    ComboboxInput,
    ComboboxOption,
    ComboboxOptions,
    Transition,
} from "@headlessui/react";
import { debounce, stringToBase64 } from "@/utils/helper-methods";
import Loader from "../loader/loader";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import StatusBadge from "../status-badges/staus-badge";
import { SearchResponse } from "../../types/search-response.type";
import { SearchAPI } from "../../data-api/public/search.api";
import { Locale } from "../../types/locale.type";
import { getAssetsUrl } from "../../utils/assets";

type SearchInputProps = {
    showTagLine?: boolean;
    showHints?: boolean;
};

const isValidUrl = (text?: string) => {
    try {
        if (!text) return false;

        if (text.length > 4 && text.includes(".")) {
            const parts = text.split(".");
            if (
                parts.length > 1 &&
                parts[parts.length - 1].length > 1 &&
                parts[parts.length - 2].length > 1
            ) {
                return true;
            }
        }
        return false;
    } catch {
        return false;
    }
};

export default function SearchInput(props: SearchInputProps) {
    const { t, i18n } = useTranslation("common");
    const currentPath = usePathname();
    const [searchResults, setSearchResults] = useState<SearchResponse[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>();
    const [searching, setSearching] = useState<boolean>(false);

    const router = useRouter();
    const resRef = useRef(searchResults);
    resRef.current = searchResults;
    const [pageTransition, setPageTransition] = useState<boolean>(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchSites = useCallback(
        debounce(async (query: string) => {
            if (query?.length > 1) {
                setSearching(true);
                const results = await SearchAPI.search(
                    query,
                    i18n.language as Locale
                );
                setSearchResults(results ?? []);
                setSearching(false);
            } else {
                setSearchResults([]);
                setSearching(false);
            }
        }, 300),
        []
    );

    const [selectedSite, setSelectedSite] = useState<unknown>(null);

    useEffect(() => {
        try {
            if (
                searchQuery &&
                searchQuery.length > 7 &&
                isValidUrl(searchQuery)
            ) {
                setSearching(true);
                fetchSites(searchQuery);
            } else {
                setSearchResults([]);
                setSearching(false);
            }
        } catch {}
    }, [searchQuery, fetchSites]);

    return pageTransition ? (
        <div className="flex justify-center w-full">
            <Loader />
        </div>
    ) : (
        <>
            {props.showHints && (
                <div className="flex flex-row gap-3 md:gap-8 mb-2 text-sm md:text-lg text-app-grey">
                    <div className="flex flex-row justify-center items-center">
                        <Image
                            src={getAssetsUrl("images/verified.svg")}
                            width={0}
                            className="w-6 h-6 md:w-7 md:h-7"
                            height={0}
                            alt={"tick"}
                        />
                        {t("authentic", {
                            ns: "common",
                        })}
                    </div>
                    <div className="flex flex-row justify-center  items-center">
                        <Image
                            src={getAssetsUrl("images/unverified.svg")}
                            width={0}
                            className="w-6 h-6 md:w-7 md:h-7"
                            height={0}
                            alt={"tick"}
                        />
                        {t("counterfeit", {
                            ns: "common",
                        })}
                    </div>

                    <div className="flex flex-row justify-center  items-center">
                        <Image
                            src={getAssetsUrl("images/pending_check.svg")}
                            width={0}
                            className="w-6 h-6 md:w-7 md:h-7"
                            height={0}
                            alt={"tick"}
                        />
                        {t("pending", {
                            ns: "common",
                        })}
                    </div>
                </div>
            )}
            <Combobox
                onChange={(val: SearchResponse) => {
                    if (val) {
                        setSelectedSite(val);
                        if (
                            currentPath ===
                            `/${i18n.language}/online-casino/${
                                val.slug || val.id
                            }`
                        ) {
                            window?.scrollTo(0, 0);
                            setSelectedSite(null);
                            return;
                        }
                        setPageTransition(true);
                        router.push(`/online-casino/${val.slug || val.id}`);
                    }
                }}
                value={selectedSite}
            >
                <div className="relative mt-1 w-full">
                    <div className="relative w-full h-12  cursor-default overflow-hidden  focus:outline-none">
                        <Image
                            className="text-2xl top-3 left-6 text-app-grey absolute"
                            src={getAssetsUrl("images/search.svg")}
                            alt="Logo"
                            width={24}
                            height={24}
                            priority={true}
                        />
                        {/* <CiSearch className="text-2xl top-3 left-4 text-app-grey absolute" /> */}
                        <ComboboxInput
                            placeholder={t("searchPlaceholder")}
                            className="w-full h-12 px-4 pl-14 text-lg font-normal  bg-white text-app-grey border-2 border-app-green focus:shadow outline-none rounded-sm"
                            displayValue={(s: SearchResponse) => s?.name}
                            onChange={(event) =>
                                setSearchQuery(event.target.value?.trim())
                            }
                            autoComplete="off"
                            maxLength={200}
                        />
                    </div>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setSearchQuery("")}
                    >
                        <ComboboxOptions className="absolute mt-1 max-h-60 w-full overflow-auto  bg-white  shadow-lg   z-50">
                            {searchQuery?.trim() && !isValidUrl(searchQuery) ? (
                                <div className="relative cursor-default select-none h-14">
                                    <div className="px-4 h-full w-full flex justify-between items-center">
                                        <p className=" text-black text-lg font-semibold">
                                            {t("invalidURL")}
                                        </p>
                                    </div>
                                </div>
                            ) : searching && !searchResults?.length ? (
                                <div className="relative cursor-default select-none  h-14 text-gray-700">
                                    <div className="flex justify-center items-center px-4 w-full h-full ">
                                        <Loader />
                                    </div>
                                </div>
                            ) : searchResults.length === 0 &&
                              !searching &&
                              (searchQuery?.length ?? 0) > 1 &&
                              isValidUrl(searchQuery) ? (
                                <div className="relative cursor-default select-none h-14">
                                    <div className="px-4 h-full w-full flex justify-between items-center">
                                        <p className=" text-black text-lg font-semibold">
                                            {t("siteNotFound")}
                                        </p>
                                        <Link
                                            href={`/online-casino/report/${
                                                searchQuery
                                                    ? stringToBase64(
                                                          searchQuery
                                                      )
                                                    : ""
                                            }`}
                                            onClick={() => setSearchQuery("")}
                                            className=" bg-black text-white px-4 py-2 rounded-sm text-xs"
                                        >
                                            {t("requestVerification")}
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                searchResults.map((site, i) => (
                                    <ComboboxOption
                                        key={i}
                                        className={({ focus }) =>
                                            `relative  h-14 cursor-default select-none ${
                                                focus ? "bg-[#eaeaea]" : ""
                                            }`
                                        }
                                        value={site}
                                    >
                                        <div
                                            className={`flex h-full w-full items-center cursor-pointer p-2  gap-2 ${
                                                searchResults.length - 1 === i
                                                    ? ""
                                                    : "border-b border-b-gray-300"
                                            }`}
                                            key={i}
                                        >
                                            <div className=" relative w-10 h-10">
                                                {site.logo && (
                                                    <Image
                                                        src={site.logo}
                                                        width={40}
                                                        height={40}
                                                        alt=""
                                                        className="overflow-hidden aspect-square"
                                                        objectFit="contain"
                                                    />
                                                )}

                                                {site.warningLogo && (
                                                    <div className=" absolute top-0 right-0 h-full w-full backdrop-blur-[2px]">
                                                        <Image
                                                            width={40}
                                                            src={getAssetsUrl(
                                                                site.warningLogo ===
                                                                    "red"
                                                                    ? "images/red-warning-icon.svg"
                                                                    : "images/warning-icon.svg"
                                                            )}
                                                            height={40}
                                                            alt=""
                                                        />
                                                    </div>
                                                )}
                                            </div>

                                            <p className="flex-1 line-clamp-1 text-lg font-semibold">
                                                {site.name}
                                            </p>
                                            <StatusBadge status={site.status} />
                                        </div>
                                    </ComboboxOption>
                                ))
                            )}
                        </ComboboxOptions>
                    </Transition>
                </div>
            </Combobox>
            {props.showTagLine ? (
                <p className="text-xs mt-3 text-app-grey md:text-left">
                    {t("instruction", {
                        ns: "home",
                    })}
                </p>
            ) : null}
        </>
    );
}
