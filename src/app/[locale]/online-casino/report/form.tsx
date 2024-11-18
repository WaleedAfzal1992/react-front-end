/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Trans, useTranslation } from "react-i18next";
import { useState } from "react";
import Link from "next/link";
import { MdClose } from "react-icons/md";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ReportReasonsPopup from "./reasons-popup";
import { GamingProvider } from "../../../../types/gaming-provider.type";
import { FormActionResponse } from "../../../../types/form-response.type";
import PageContainer from "../../../../components/containers/page-container";
import SelectInput from "../../../../components/input/select-input";
import TextAreaInput from "../../../../components/input/text-area";
import Input from "../../../../components/input/input";
import { Checkbox, Field, Label } from "@headlessui/react";
import { Pages } from "../../../../enums/pages.enum";
import Loader from "../../../../components/loader/loader";
import { RequestVerificationAPI } from "../../../../data-api/public/request-verification.api";

type ReportSiteFormProps = {
    websiteValue?: string;
    websiteId?: string;
    gamingProviders?: Pick<GamingProvider, "id" | "name">[];
};

export default function ReportSiteForm(props: ReportSiteFormProps) {
    const { t } = useTranslation("report-form-page");
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState<FormActionResponse>();
    const [gamingProvider, setGamingProvider] = useState<any>("");
    const [descriptionText, setDescriptionText] = useState("");
    const [contactConsent, setContactConsent] = useState(false);
    const router = useRouter();
    const [siteUrl, setSiteUrl] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        // get data from form
        const formData = new FormData(form);
        setLoading(true);
        (window as any)?.grecaptcha?.ready?.(() => {
            (window as any)?.grecaptcha
                ?.execute?.(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, {
                    action: "reportSubmitForm",
                })
                .then(async (token: string) => {
                    try {
                        setSiteUrl(formData.get("website") as string);
                        formData.set("captcha", token);
                        if (gamingProvider?.id)
                            formData.set("gamingProvider", gamingProvider.id);

                        if (contactConsent) {
                            formData.set("contactConsent", "true");
                        }
                        const respo =
                            await RequestVerificationAPI.submitRequestVerification(
                                formData
                            );
                        setState(respo);
                        setSelectedFiles([]);
                    } catch {
                        setState({
                            success: false,
                            errors: {
                                "": [
                                    t("unknownError", {
                                        ns: "form-errors",
                                    }),
                                ],
                            },
                        });
                    } finally {
                        setLoading(false);
                    }
                });
        });
    };

    return state?.success ? (
        <PageContainer className="flex flex-col gap-2">
            <h4 className="text-2xl font-bold">{t("successTitle")}</h4>
            <p className="text-xl font-bold">
                {t("formId")}: {state.id}
            </p>
            <p className="mt-4">
                <Trans
                    t={t}
                    i18nKey={"successNote"}
                    components={[<span key={"1"}> {siteUrl}</span>]}
                />
            </p>

            <Link
                href={"/"}
                className="text-white text-center bg-app-green px-6 py-2 rounded-sm mt-8"
            >
                {t("backToHome", {
                    ns: "common",
                })}
            </Link>
        </PageContainer>
    ) : (
        <PageContainer heading={t("title")}>
            <ReportReasonsPopup />

            <fieldset disabled={loading}>
                <form
                    id="reportForm"
                    className="flex flex-col gap-8 mt-8 text-app-grey"
                    onSubmit={handleSubmit}
                >
                    <input
                        hidden
                        name="websiteId"
                        defaultValue={props.websiteId}
                    />

                    <input type="hidden" name="captcha" id="captcha" />

                    <div className=" relative">
                        <Input
                            name="website"
                            label={t("website")}
                            required
                            max={255}
                            error={state?.errors?.["website"]?.[0]}
                            defaultValue={props.websiteValue}
                            readOnly={!!props.websiteValue}
                            autoFocus={!props.websiteValue}
                        />
                        {(props.websiteId || props.websiteValue) && (
                            <MdClose
                                onClick={() =>
                                    router.replace("/online-casino/report")
                                }
                                className=" absolute right-2 bottom-[10px] cursor-pointer "
                                size={20}
                            />
                        )}
                    </div>

                    <SelectInput
                        name="gamingProvider"
                        options={[
                            ...(props.gamingProviders?.sort((a, b) =>
                                a?.name?.trim()?.localeCompare(b.name?.trim())
                            ) ?? []),
                            {
                                id: "",
                                name: t("other"),
                            },
                        ]}
                        error={state?.errors?.["gamingProvider"]?.[0]}
                        onChange={(e: any) => setGamingProvider(e ?? "")}
                        value={gamingProvider ?? ""}
                        label={t("gamingProvider")}
                        getOptionLabel={(gp: any) => gp.name}
                        getOptionValue={(gp: any) => gp.id}
                    />

                    <div className=" flex-col gap-2 flex">
                        <label>{t("descriptionLabel")}</label>
                        <div className=" bg-white p-4 text-sm relative min-h-52">
                            {!descriptionText && (
                                <ul className=" list-disc  list-outside  space-y-2 opacity-50 ms-4">
                                    <li className=" list-item">
                                        {t("descriptionPlaceholder1")}
                                    </li>
                                    <li className=" list-item">
                                        {t("descriptionPlaceholder2")}
                                    </li>
                                    <li className=" list-item">
                                        {t("descriptionPlaceholder3")}
                                    </li>
                                    <li className=" list-item">
                                        {t("descriptionPlaceholder4")}
                                    </li>
                                </ul>
                            )}

                            <TextAreaInput
                                onChange={(e) =>
                                    setDescriptionText(e.target.value)
                                }
                                label=""
                                name="description"
                                required
                                error={state?.errors?.["description"]?.[0]}
                                max={1000}
                                className=" absolute top-0 left-0 bottom-0  right-0 resize-none"
                                style={{
                                    backgroundColor: "transparent",
                                }}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block">{t("evidence")}</label>
                        <small>{t("acceptedTypes")}</small>
                        <button
                            type="button"
                            className="bg-black text-white text-xs px-6 mt-2 py-2 rounded-sm block"
                            onClick={() => {
                                document.getElementById("fileInput-x")?.click();
                            }}
                        >
                            {selectedFiles.length > 0
                                ? t("selectedFiles", {
                                      count: selectedFiles.length,
                                  })
                                : t("selectFiles")}
                        </button>
                        <input
                            onChange={(e) => {
                                setState({
                                    ...state,
                                    errors: {
                                        ...state?.errors,
                                        evidence: [],
                                    },
                                });
                                if (e.target.files) {
                                    // check if total files are greater than 5
                                    if (
                                        e.target.files.length +
                                            selectedFiles?.length >
                                        5
                                    ) {
                                        setState({
                                            success: false,
                                            errors: {
                                                evidence: [
                                                    t("maxFilesAllowed", {
                                                        ns: "form-errors",
                                                        maxFiles: "5",
                                                    }),
                                                ],
                                            },
                                        });
                                        e.target.files = null;
                                        e.target.value = "";
                                        return;
                                    }

                                    // check mime types
                                    for (
                                        let i = 0;
                                        i < e.target.files.length;
                                        i++
                                    ) {
                                        if (
                                            ![
                                                "image/png",
                                                "image/jpeg",
                                                "video/mp4",
                                                "video/quicktime",
                                            ].includes(e.target.files[i].type)
                                        ) {
                                            setState({
                                                success: false,
                                                errors: {
                                                    evidence: [
                                                        t("fileTypeError", {
                                                            ns: "form-errors",
                                                            types: "png, jpeg, mp4, quicktime",
                                                        }),
                                                    ],
                                                },
                                            });
                                            e.target.files = null;
                                            e.target.value = "";
                                            return;
                                        }
                                    }

                                    // calculate total size of files
                                    let totalSize = 0;
                                    for (
                                        let i = 0;
                                        i < e.target.files.length;
                                        i++
                                    ) {
                                        totalSize += e.target.files[i].size;
                                    }

                                    // check if total size is greater than 50MB
                                    if (totalSize > 50 * 1024 * 1024) {
                                        setState({
                                            success: false,
                                            errors: {
                                                evidence: [
                                                    t("fileSizeError", {
                                                        ns: "form-errors",
                                                        size: "50MB",
                                                    }),
                                                ],
                                            },
                                        });
                                        e.target.files = null;
                                        e.target.value = "";
                                        return;
                                    } else {
                                        const fs = [
                                            ...e.target.files,
                                            ...selectedFiles,
                                        ];
                                        if (fs.length) {
                                            const newFiles: any = [];
                                            for (
                                                let i = 0;
                                                i < fs.length;
                                                i++
                                            ) {
                                                if (
                                                    !newFiles.find(
                                                        (f: any) =>
                                                            f.name ===
                                                                fs[i].name &&
                                                            f.type ===
                                                                fs[i].type
                                                    )
                                                ) {
                                                    newFiles.push(fs[i]);
                                                }
                                            }

                                            setSelectedFiles(newFiles);
                                        }
                                    }
                                }

                                e.target.value = "";
                                e.target.files = null;
                            }}
                            name="evidence"
                            type="file"
                            id="fileInput-x"
                            multiple
                            accept="image/png,image/jpeg,video/mp4,video/quicktime"
                            className="hidden"
                        />
                        {state?.errors?.["evidence"]?.[0] && (
                            <div className=" text-app-red py-1 text-xs">
                                {state.errors?.["evidence"]?.[0]}
                            </div>
                        )}
                    </div>
                    {selectedFiles.length > 0 && (
                        <div className="flex flex-wrap gap-6">
                            {selectedFiles.map((file, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="w-20 h-20 relative"
                                    >
                                        {file.type.includes("image") ? (
                                            <Image
                                                src={URL.createObjectURL(file)}
                                                alt=""
                                                className="w-auto h-full object-cover"
                                                height={0}
                                                width={0}
                                            />
                                        ) : (
                                            <video
                                                src={URL.createObjectURL(file)}
                                                className="w-auto h-full object-cover"
                                                controls
                                            ></video>
                                        )}
                                        <button
                                            type="button"
                                            className=" w-6 h-6 rounded-full bg-white text-red-600 flex items-center justify-center opacity-80 absolute -top-2 -right-2"
                                            onClick={() => {
                                                setSelectedFiles((prev) =>
                                                    prev.filter(
                                                        (_, i) => i !== index
                                                    )
                                                );
                                            }}
                                        >
                                            <MdClose />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    <Input
                        name="reporterName"
                        label={t("yourName")}
                        error={state?.errors?.["reporterName"]?.[0]}
                        max={255}
                    />
                    <Input
                        name="email"
                        label={t("email")}
                        type="email"
                        error={state?.errors?.["email"]?.[0]}
                        max={255}
                    />
                    <div>
                        <Field>
                            <Label className="text-xs">
                                <Trans
                                    i18nKey="contactConsent"
                                    t={t}
                                    components={[
                                        // eslint-disable-next-line react/jsx-key
                                        <Link
                                            className=" underline"
                                            href={`/${Pages.PrivacyPolicy}`}
                                        />,
                                    ]}
                                />
                            </Label>
                            <Checkbox
                                checked={contactConsent}
                                onChange={setContactConsent}
                                className="group size-5 inline-block outline-none rounded border bg-white data-[checked]:bg-app-green -mb-1 ms-2"
                            >
                                {/* Checkmark icon */}
                                <svg
                                    className="stroke-white opacity-0 group-data-[checked]:opacity-100"
                                    viewBox="0 0 14 14"
                                    fill="none"
                                >
                                    <path
                                        d="M3 8L6 11L11 3.5"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </Checkbox>
                        </Field>
                    </div>

                    {state?.errors?.[""]?.[0] && (
                        <div className=" text-app-red my-2 py-1 text-xs">
                            {state.errors?.[""]?.[0]}
                        </div>
                    )}

                    <div className="">
                        <button
                            type="submit"
                            className={`${
                                loading ? " bg-gray-200" : "bg-app-green"
                            } text-white text-sm min-w-12 min-h-5 rounded-sm flex justify-center items-center w-52 h-10`}
                        >
                            {loading ? <Loader /> : t("submit")}
                        </button>
                    </div>
                </form>
            </fieldset>
        </PageContainer>
    );
}
