"use client";
import {
    SupportedLanguage,
    SupportedLanguages,
} from "@/i18n/supported-languages";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

import { MdChevronRight } from "react-icons/md";
import { getAssetsUrl } from "../../utils/assets";

export default function LanguageDropdown() {
    const pathName = usePathname();
    const redirectedPathName = (locale: SupportedLanguage) => {
        if (!pathName) return "/";
        const segments = pathName.split("/");
        if (SupportedLanguages.map((x) => x.code).includes(segments[1])) {
            segments[1] = locale.code;
        } else {
            segments.splice(1, 0, locale.code);
        }

        // reload the page with the new locale

        window.location.href = segments.join("/");
    };

    const { i18n } = useTranslation();
    const currentLang = SupportedLanguages.find(
        (x) => x.code === i18n.language
    );

    const menuItem = (lang: SupportedLanguage, selected: boolean = false) => {
        return (
            <div
                className={`flex outline-none items-center ${
                    selected
                        ? "md:hover:bg-gray-200 transition-all delay-100 p-2 pr-0"
                        : ""
                }`}
            >
                <Image
                    className={`me-1`}
                    src={getAssetsUrl(`images/flags/${lang.flag}`)}
                    alt={lang.name}
                    width={20}
                    height={20}
                />
                <span className=" uppercase">
                    {lang.code === currentLang?.code
                        ? lang.code?.toLowerCase()
                        : lang.name}
                </span>
                {selected && (
                    <MdChevronRight
                        className=" text-black rotate-90"
                        size={24}
                    />
                )}
            </div>
        );
    };

    return (
        <Menu>
            <MenuButton className=" focus:outline-none">
                {currentLang
                    ? menuItem(currentLang, true)
                    : menuItem(SupportedLanguages[0], true)}
            </MenuButton>
            <MenuItems
                anchor="bottom end"
                className={" bg-white rounded-[4px] focus:outline-none"}
            >
                {SupportedLanguages.filter(
                    (x) => x.code !== currentLang?.code
                ).map((lang) => (
                    <MenuItem
                        as={"div"}
                        onClick={() => redirectedPathName(lang)}
                        key={lang.code}
                        className="block data-[focus]:bg-blue-100 text-sm text-app-grey cursor-pointer py-[10px] px-4"
                    >
                        {menuItem(lang)}
                    </MenuItem>
                ))}
            </MenuItems>
        </Menu>
    );
}
