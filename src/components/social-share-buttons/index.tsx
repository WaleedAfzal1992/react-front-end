"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { MdShare } from "react-icons/md";
import { getAssetsUrl } from "../../utils/assets";

type SocialShareButtonsProps = {
    content?: string;
    shareCurrentUrl?: boolean;
};

export default function SocialShareButtons(props: SocialShareButtonsProps) {
    const { content, shareCurrentUrl } = props;
    const [currentUrl, setCurrentUrl] = useState<string>("");
    const { t } = useTranslation();

    useEffect(() => {
        if (shareCurrentUrl) {
            setCurrentUrl(window.location.href);
        }
    }, [shareCurrentUrl]);

    return (
        <div className="flex flex-col gap-2 ">
            <h2 className=" text-lg font-bold text-app-grey ">{`${t(
                "socialShare",
                {
                    ns: "site-info-page",
                }
            )} `}</h2>
            <div className="flex md:flex-1 h-7 gap-4  flex-1 justify-start">
                <a
                    href={`https://telegram.me/share/url?url=${currentUrl}`}
                    className="w-10 aspect-square relative "
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
                    href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`}
                    className="w-10  aspect-square relative "
                    target="_blank"
                >
                    <Image
                        src={getAssetsUrl("images/social-icons/fb_gray.svg")}
                        alt="Telegram"
                        className="w-full h-full hover:opacity-0 transition-all duration-300 absolute"
                        height={0}
                        width={0}
                    />
                    <Image
                        src={getAssetsUrl("images/social-icons/fb_hover.svg")}
                        alt="Telegram"
                        className="w-full h-full opacity-0 hover:opacity-100 transition-all duration-300 absolute"
                        height={0}
                        width={0}
                    />
                </a>

                <a
                    href={`http://www.reddit.com/submit?url=${currentUrl}`}
                    target="_blank"
                    className="w-10   aspect-square relative "
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

                {/* <a href="#" className=" w-6 h-6 relative ">
                <Image
                    src="/images/social-icons/discord.svg"
                    alt="Telegram"
                    className="w-6 h-6 hover:opacity-0 transition-all duration-300 absolute"
                    height={0}
                    width={0}
                />
                <Image
                    src="/images/social-icons/discord-hover.svg"
                    alt="Telegram"
                    className="w-6 h-6 opacity-0 hover:opacity-100 transition-all duration-300 absolute"
                    height={0}
                    width={0}
                />
            </a> */}

                <a
                    href={`https://twitter.com/intent/tweet?text=${currentUrl}`}
                    className="w-10  aspect-square relative "
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
                    href={`https://api.whatsapp.com/send?text=${
                        shareCurrentUrl ? currentUrl : content
                    }`}
                    target="_blank"
                    className="w-10  aspect-square relative "
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

                <button
                    onClick={() =>
                        navigator.share({
                            title: "Share",
                            url: currentUrl,
                        })
                    }
                    className=" w-10 aspect-square shadow-sm flex justify-center items-center bg-[#707070] rounded-[4px] text-white hover:bg-green-400 transition-all duration-300"
                    title="Share"
                >
                    <MdShare />
                </button>
            </div>
        </div>
    );
}
