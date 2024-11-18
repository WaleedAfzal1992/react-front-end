type SeparatorProps = {
    className?: string;
};
export default function Separator(props: SeparatorProps) {
    return <div className={`border my-2 border-gray-200 ${props.className}`} />;
}
