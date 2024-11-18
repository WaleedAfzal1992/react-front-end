"use client";
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import LanguageDropdown from "./lang-dropdown";
import { MdAdd, MdClose } from "react-icons/md";
import { Pages } from "../../enums/pages.enum";
import { getAssetsUrl } from "../../utils/assets";

function LogoImage() {
    return (
        <Link href={"/"}>
            <Image
                src={getAssetsUrl("images/Verified_Dark.svg")}
                alt="logo"
                width={162} // earlier it was Width:160px and Height:50px
                height={0}
                priority
            />
        </Link>
    );
}

export default function MobileNavbar() {
    const { t } = useTranslation("navbar");

    const navigation = useMemo(
        () => [
            // { name: t("home"), href: "/", current: true },
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
        <Disclosure as="div" className="relative md:hidden">
            {({ open }) => (
                <>
                    <div className="flex flex-row px-4 items-center justify-between mt-9 h-5">
                        <div className="flex-1">
                            <LogoImage />
                        </div>

                        <div className="flex text-[16px] font-medium items-center justify-center">
                            <LanguageDropdown />
                            <DisclosureButton
                                className={
                                    "flex flex-row justify-center items-center md:hover:bg-gray-200 transition-all delay-100 p-2 pr-0 focus:outline-none"
                                }
                            >
                                {/* {open ? t("close") : t("menu")} */}
                                {open ? "Close" : "Menu"}
                                <MdAdd size={18} />
                            </DisclosureButton>
                        </div>
                    </div>

                    <DisclosurePanel
                        as="div"
                        className={"fixed left-0 top-0 bottom-0 right-0 z-50"}
                    >
                        <div className="flex flex-col gap-2 z-10 bg-app-bg-main h-full w-full max-w-md mx-auto relative">
                            <div className="flex px-4 items-center justify-between mt-9 h-5">
                                <LogoImage />

                                <DisclosureButton className=" text-[16px]  font-medium  flex flex-row justify-center items-center">
                                    {/* {open ? t("close") : t("menu")} */}
                                    {open ? "Close" : "Menu"}
                                    <MdClose size={18} />
                                </DisclosureButton>
                            </div>
                            <div className="mt-8 flex flex-col font-medium text-app-grey gap-4 px-4 text-2xl py-[10px] ">
                                {navigation.map((item) => (
                                    <DisclosureButton
                                        key={item.name}
                                        as={Link}
                                        href={item.href}
                                        aria-current={
                                            item.current ? "page" : undefined
                                        }
                                        className={"focus:outline-none"}
                                    >
                                        {item.name}
                                    </DisclosureButton>
                                ))}
                            </div>
                        </div>
                    </DisclosurePanel>
                </>
            )}
        </Disclosure>
    );
}
