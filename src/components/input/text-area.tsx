type InputProps = {
    label: string;
    error?: string;
} & React.InputHTMLAttributes<HTMLTextAreaElement>;

export default function TextAreaInput(props: InputProps) {
    const { label, error } = props;
    return (
        <div>
            <label className="block ">{label}</label>
            <textarea
                type="text"
                {...props}
                className={`w-full  rounded-sm  px-4 py-2 mt-2 outline-none ${
                    error ? "bg-red-200 border-2 border-red-600" : "bg-white"
                } ${props.className}`}
            ></textarea>
            {error && (
                <div className="h-4 text-app-red py-1 text-xs">{error}</div>
            )}
        </div>
    );
}
