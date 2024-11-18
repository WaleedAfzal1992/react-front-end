"use client";
import {
    Popover,
    PopoverButton,
    PopoverPanel,
    Transition,
} from "@headlessui/react";
import { Fragment } from "react";
import { Trans, useTranslation } from "react-i18next";
import { IoInformationCircleOutline } from "react-icons/io5";
import { MdOutlineClose } from "react-icons/md";

export default function ReportReasonsPopup() {
    const { t } = useTranslation("report-form-page");
    return (
        <Popover className="relative">
            {({ close }) => (
                <>
                    <PopoverButton className="flex items-center py-2 outline-none focus:outline-none">
                        <div className="flex  items-center gap-1 ">
                            <p className="text-sm ">
                                {t("reasonToReportTagLine")}
                            </p>
                            <IoInformationCircleOutline />
                        </div>
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
                            className="absolute z-10 right-0 mr-4 md:mx-0 -mt-9 md:w-72 shadow-lg rounded-xl"
                        >
                            <div className="overflow-hidden  bg-white">
                                <div className="flex justify-between items-center px-2 py-2 text-sm">
                                    <p className=" font-bold text-app-grey line-clamp-1">
                                        {t("reasonPopupTitle")}
                                    </p>
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
                                <div className="text-xs px-2 flex-col gap-4 flex font-medium text-app-grey pt-4 pb-6">
                                    <p>
                                        <Trans
                                            i18nKey="reasonPopupP1"
                                            t={t}
                                            components={[
                                                // eslint-disable-next-line react/jsx-key
                                                <strong />,
                                            ]}
                                        />
                                    </p>

                                    <p>
                                        <Trans
                                            i18nKey="reasonPopupP2"
                                            t={t}
                                            components={[
                                                // eslint-disable-next-line react/jsx-key
                                                <strong />,
                                            ]}
                                        />
                                    </p>
                                </div>
                            </div>
                        </PopoverPanel>
                    </Transition>
                </>
            )}
        </Popover>
    );
}
