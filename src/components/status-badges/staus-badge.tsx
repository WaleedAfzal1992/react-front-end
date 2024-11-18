"use client";
import { GamingSiteStatus } from "@/enums/gaming-status.enum";
import Image from "next/image";
import { getAssetsUrl } from "../../utils/assets";
type Props = {
    status: GamingSiteStatus;
};
export default function StatusBadge(props: Props) {
    const { status } = props;

    return (
        <div className={`outline-none `}>
            {status === GamingSiteStatus.CounterFeitGames ? (
                <Image
                    src={getAssetsUrl("images/unverified.svg")}
                    width={50}
                    height={50}
                    alt={"tick"}
                />
            ) : status === GamingSiteStatus.AuthenticGames ? (
                <Image
                    src={getAssetsUrl("images/verified.svg")}
                    width={50}
                    height={50}
                    alt={"tick"}
                />
            ) : (
                <Image
                    title="Pending checks"
                    src={getAssetsUrl("images/pending_check.svg")}
                    width={50}
                    height={50}
                    alt={"tick"}
                />
            )}
        </div>
    );
}
