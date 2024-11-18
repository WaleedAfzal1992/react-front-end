"use client";
import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Transition,
} from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import LanguageDropdown from "./lang-dropdown";
import { MdChevronRight } from "react-icons/md";
import { Pages } from "../../enums/pages.enum";
import { getAssetsUrl } from "../../utils/assets";

export default function DesktopNavbar() {
    const { t } = useTranslation("navbar");

    const path = usePathname();

    const navbarMenu = useMemo(
        () => [
            { name: t("home"), href: "/", current: true },
            // {
            //     name: t("getRealGames"),
            //     href: "/get-real-games",
            //     current: false,
            // },
        ],
        [t]
    );

    const dropdownMenu = useMemo(
        () => [
            { name: t("aboutUs"), href: `/${Pages.AboutUs}`, current: false },
            {
                name: t("howItWorks"),
                href: `/${Pages.HowItWorks}`,
                current: false,
            },
            {
                name: t("contactUs"),
                href: `/${Pages.ContactUs}`,
                current: false,
            },
        ],
        [t]
    );

    return (
        <div className="hidden md:block px-4">
            <div className=" md:flex items-center  gap-4 mt-4 text-sm">
                <Link href={"/"} className="">
                    <Image
                        src={getAssetsUrl("images/Verified_Dark.svg")}
                        alt="logo"
                        width={192} //earlier it was height:170px and Width: 50px
                        height={56}
                        priority
                    />
                </Link>
                <div className="flex-1 flex justify-end gap-4 items-center">
                    <LanguageDropdown />
                    {navbarMenu.slice(0, 2).map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            aria-current={item.current ? "page" : undefined}
                            className={`hover:bg-gray-200 line-clamp-1 p-2 transition-all delay-100 ${
                                path === item.href ? "bg-gray-200" : ""
                            }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                <Menu>
                    <MenuButton className="inline-flex items-center p-2  hover:bg-gray-200 line-clamp-1 transition-all delay-100">
                        {/* {t("menu")} */}
                        Menu
                        <MdChevronRight className=" text-black size-6 rotate-90" />
                    </MenuButton>
                    <Transition
                        enter="transition ease-out duration-75"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <MenuItems
                            anchor="bottom end"
                            className="flex flex-col w-52 origin-top-right border border-gray-100 shadow-lg bg-white [--anchor-gap:var(--spacing-1)] focus:outline-none rounded-[4px]"
                            as="div"
                        >
                            {dropdownMenu.map((item) => (
                                <MenuItem
                                    as={Link}
                                    key={item.name}
                                    href={item.href}
                                    className="hover:bg-gray-200 text-app-grey text-sm px-4 py-[10px]"
                                >
                                    {item.name}
                                </MenuItem>
                            ))}
                        </MenuItems>
                    </Transition>
                </Menu>
            </div>
            <div className=" border mt-4 border-gray-200" />
        </div>
    );
}
