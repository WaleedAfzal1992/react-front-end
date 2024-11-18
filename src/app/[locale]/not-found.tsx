import { Metadata } from "next";
import Link from "next/link";
import PageContainer from "../../components/containers/page-container";

export const metadata: Metadata = {
    title: "Not Found | Gamecheck",
};

export default function NotFound() {
    return (
        <PageContainer className="flex justify-center items-center flex-col gap-4">
            <h2 className="text-xl font-bold">Not Found</h2>
            <p>Could not find requested resource</p>
            <Link className=" px-6 py-2 bg-app-green text-white" href="/">
                Return Home
            </Link>
        </PageContainer>
    );
}
