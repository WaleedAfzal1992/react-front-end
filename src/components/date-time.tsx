"use client";
import { parseISO, format } from "date-fns";

type Props = {
    isoDateStr: string;
    formatStr?: string;
};
export default function DateTime(props: Props) {
    const { isoDateStr, formatStr } = props;
    return format(parseISO(isoDateStr), formatStr ?? "yyyy-MM-dd HH:mm");
}
