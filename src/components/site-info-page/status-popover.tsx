"use client";
import {
    Popover,
    PopoverButton,
    PopoverPanel,
    Transition,
} from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import Loader from "../loader/loader";
import StatusBadge from "../status-badges/staus-badge";
import { GamingSiteStatus } from "@/enums/gaming-status.enum";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";
import { useTranslation } from "react-i18next";

type Props = {
    status: GamingSiteStatus;
    result?: string;
    noReport?: boolean;
    loading?: boolean;
};

export default function GamingProviderStatusPopover(props: Props) {
    const { status, result, noReport, loading } = props;
    const [fakeLoading, setFakeLoading] = useState(true);
    const { t } = useTranslation("common");
    useEffect(() => {
        setTimeout(() => {
            setFakeLoading(false);
        }, 500);
    }, []);
    return (
        <Popover className="relative">
            {({ close }) => (
                <>
                    <PopoverButton
                        disabled={
                            noReport &&
                            status !== GamingSiteStatus.PendingChecks
                        }
                        className={`outline-none `}
                    >
                        {loading || fakeLoading ? (
                            <div className="w-full flex justify-end">
                                <Loader height={20} width={60} />
                            </div>
                        ) : (
                            <div className="flex gap-3 items-center">
                                <BsInfoCircle size={24} />
                                <StatusBadge status={status} />
                            </div>
                        )}
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
                        <PopoverPanel className="absolute z-10 w-52 right-0">
                            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5 bg-white">
                                <div className="flex justify-between items-center px-2 py-1">
                                    <p>{t("check")}</p>
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
                                <p className="text-xs px-2 py-1">
                                    {noReport &&
                                    !result &&
                                    status === GamingSiteStatus.PendingChecks
                                        ? t("notVerifiedNote", {
                                              ns: "site-info-page",
                                          })
                                        : result}
                                </p>
                            </div>
                        </PopoverPanel>
                    </Transition>
                </>
            )}
        </Popover>
    );
}
