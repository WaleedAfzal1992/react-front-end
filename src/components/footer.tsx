"use client";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Pages } from "../enums/pages.enum";
import { getAssetsUrl } from "../utils/assets";

export default function Footer() {
    const { t } = useTranslation("footer");
    return (
        <div>
            <div className=" border my-1 border-gray-200 md:mx-8 mx-4" />

            <div className="flex flex-col text-xs leading-5 items-center justify-center md:justify-start p-4 md:px-8 md:py-4 gap-2 text-app-grey md:gap-6 ">
                <div className="w-full flex md:flex-row flex-col md:gap-5 ">
                    <p className=" h-8 md:font-medium text-lg text-app-grey">
                        {t("followUs")}
                    </p>
                    <div className=" w-full flex gap-3 flex-1 justify-start my-4 md:mt-0">
                        <a
                            href={`https://t.me/+yox46W2Ap_Q0Nzk0`}
                            className=" w-full max-w-7 aspect-square relative "
                            target="_blank"
                        >
                            <Image
                                src={getAssetsUrl(
                                    "images/social-icons/telegram_gray.svg"
                                )}
                                alt="Telegram"
                                className="w-full h-full hover:opacity-0 transition-all duration-300 absolute"
                                height={0}
                                width={0}
                            />
                            <Image
                                src={getAssetsUrl(
                                    "images/social-icons/telegram_hover.svg"
                                )}
                                alt="Telegram"
                                className="w-full h-full opacity-0 hover:opacity-100 transition-all duration-300 absolute"
                                height={0}
                                width={0}
                            />
                        </a>

                        <a
                            href={`https://www.facebook.com/gamecheckplatform`}
                            className=" w-full max-w-7 aspect-square relative "
                            target="_blank"
                        >
                            <Image
                                src={getAssetsUrl(
                                    "images/social-icons/fb_gray.svg"
                                )}
                                alt="Telegram"
                                className="w-full h-full hover:opacity-0 transition-all duration-300 absolute"
                                height={0}
                                width={0}
                            />
                            <Image
                                src={getAssetsUrl(
                                    "images/social-icons/fb_hover.svg"
                                )}
                                alt="Telegram"
                                className="w-full h-full opacity-0 hover:opacity-100 transition-all duration-300 absolute"
                                height={0}
                                width={0}
                            />
                        </a>

                        <a
                            href={`https://www.reddit.com/user/game_check`}
                            target="_blank"
                            className=" w-full max-w-7 aspect-square relative "
                        >
                            <Image
                                src={getAssetsUrl(
                                    "images/social-icons/reddit_gray.svg"
                                )}
                                alt="Telegram"
                                className="w-full h-full hover:opacity-0 transition-all duration-300 absolute"
                                height={0}
                                width={0}
                            />
                            <Image
                                src={getAssetsUrl(
                                    "images/social-icons/reddit_hover.svg"
                                )}
                                alt="Telegram"
                                className="w-full h-full opacity-0 hover:opacity-100 transition-all duration-300 absolute"
                                height={0}
                                width={0}
                            />
                        </a>
                        <a
                            href={`https://x.com/sm_gc17999`}
                            className=" w-full max-w-7 aspect-square relative "
                            target="_blank"
                        >
                            <Image
                                src={getAssetsUrl(
                                    "images/social-icons/twitter_gray.svg"
                                )}
                                alt="Telegram"
                                className="w-full h-full hover:opacity-0 transition-all duration-300 absolute"
                                height={0}
                                width={0}
                            />
                            <Image
                                src={getAssetsUrl(
                                    "images/social-icons/twitter_hover.svg"
                                )}
                                alt="Telegram"
                                className="w-full h-full opacity-0 hover:opacity-100 transition-all duration-300 absolute"
                                height={0}
                                width={0}
                            />
                        </a>

                        <a
                            href={`#`}
                            target="_blank"
                            className=" w-full max-w-7 aspect-square relative "
                        >
                            <Image
                                src={getAssetsUrl(
                                    "images/social-icons/whatsapp_gray.svg"
                                )}
                                alt="Telegram"
                                className="w-full h-full hover:opacity-0 transition-all duration-300 absolute"
                                height={0}
                                width={0}
                            />
                            <Image
                                src={getAssetsUrl(
                                    "images/social-icons/whatsapp_hover.svg"
                                )}
                                alt="Telegram"
                                className="w-full h-full opacity-0 hover:opacity-100 transition-all duration-300 absolute"
                                height={0}
                                width={0}
                            />
                        </a>
                    </div>
                </div>

                <div className="flex flex-col w-full flex-1 gap-2 ">
                    <div>
                        <span> {t("companyAddress")}</span>
                    </div>
                    {/* <p className=" text-xs font-normal leading-[18px] ">
                            {t("p1")}
                        </p> */}
                    <div className=" text-[10px] flex gap-2 items-center  flex-wrap">
                        <Link href={`/${Pages.PrivacyPolicy}`}>
                            {t("privacyPolicy")}
                        </Link>{" "}
                        {" | "}
                        <Link href={`/${Pages.CookiePolicy}`}>
                            {t("cookiePolicy")}
                        </Link>
                        {" | "}
                        <Link href={`/${Pages.TermsOfUse}`}>
                            {t("termsOfUse")}
                        </Link>
                        {" | "}
                        <Link href={`/${Pages.ContactUs}`}>
                            {t("contactUs")}
                        </Link>
                    </div>
                    <div>
                        <span> {t("allRightsReserved")}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
