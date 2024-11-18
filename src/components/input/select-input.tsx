"use client";
import * as React from "react";
import Select, { Props as SelectProps } from "react-select";
import { useTranslation } from "react-i18next";
import config from "../../../tailwind.config";

type Props = {
    label?: string;
    error?: string;
} & SelectProps;

export default function SelectInput(props: Props) {
    const { error, label, options } = props;
    const { t } = useTranslation("common");
    return (
        <div>
            <label>{label}</label>
            <Select
                instanceId={"askljfddaskdjf"}
                isClearable
                options={options}
                styles={{
                    control: (styles) => ({
                        ...styles,
                        width: "100%",
                        borderRadius: 0,
                        backgroundColor: "#ffffff",
                        outline: "none !important",
                        border: "0",
                        ":focus": {
                            border: "0",
                            outline: "none !important",
                        },
                    }),
                    option: (styles, { isSelected }) => ({
                        ...styles,
                        backgroundColor: isSelected
                            ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
                              (config.theme?.extend?.colors as any)?.[
                                  "app-green"
                              ]
                            : "#fff",
                        color: isSelected ? "#fff" : "#000",
                    }),
                    input: (base) => ({
                        ...base,
                        color: "#707070",
                        outline: "none !important",
                        border: "0",
                        ":focus": {
                            border: "0",
                            outline: "none !important",
                        },
                    }),
                    menuList(base) {
                        return {
                            ...base,
                            backgroundColor: "#fff",
                        };
                    },
                    singleValue: (styles) => ({
                        ...styles,
                        color: "#707070",
                    }),
                    placeholder: (styles) => ({
                        ...styles,
                        color: "#707070",
                    }),
                }}
                {...props}
                className="mt-2"
                classNames={{
                    input: () => "px-2 py-2",
                    singleValue: () => "px-2 py-1.5",
                    placeholder: () => "px-2 py-1.5 text-app-grey",
                }}
                placeholder={t("select")}
            />
            {error && (
                <div className="h-4 text-app-red py-1 text-xs">{error}</div>
            )}
        </div>
    );
}
