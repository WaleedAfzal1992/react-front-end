"use client";
import {
    Popover,
    PopoverButton,
    PopoverPanel,
    Transition,
} from "@headlessui/react";
import Link from "next/link";
import { Fragment } from "react";
import { Trans, useTranslation } from "react-i18next";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";
import { Pages } from "../../../enums/pages.enum";

export default function SomethingWrongButton() {
    const { t } = useTranslation("site-info-page");
    return (
        <Popover className="relative">
            {({ close }) => (
                <>
                    <PopoverButton className="flex text-xs items-center gap-2 bg-app-grey text-white py-2 px-3 rounded-sm">
                        {t("somethingWrong")} <BsInfoCircle />
                    </PopoverButton>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                    >
                        <PopoverPanel
                            anchor={{
                                to: "bottom start",
                            }}
                            className="absolute z-10 w-52 right-0 pt-2"
                        >
                            <div className="overflow-hidden rounded-xl   ring-black/5 bg-white">
                                <div className="flex justify-between items-center px-2 py-1 text-sm">
                                    <p></p>
                                    <MdOutlineClose
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            close();
                                        }}
                                        size={20}
                                    />
                                </div>
                                <div className=" border border-gray-200"></div>
                                <p className="text-xs px-2 font-medium text-app-grey pt-1 pb-2">
                                    <Trans
                                        i18nKey="somethingWrongNote"
                                        t={t}
                                        components={[
                                            // eslint-disable-next-line react/jsx-key
                                            <Link
                                                className=" underline font-bold text-black"
                                                href={`/${Pages.ContactUs}`}
                                            />,
                                        ]}
                                    />
                                </p>
                            </div>
                        </PopoverPanel>
                    </Transition>
                </>
            )}
        </Popover>
    );
}
