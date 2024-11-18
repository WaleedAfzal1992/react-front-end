type InputProps = {
    label: string;
    error?: string;
    optionalLable?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function Input(props: InputProps) {
    const { label, error } = props;
    return (
        <div>
            <label className="block ">{label}</label>
            <input
                type="text"
                {...props}
                className={`w-full  rounded-sm  px-4 py-2 mt-2 outline-none ${
                    error ? "bg-red-200 border-2 border-red-600" : "bg-white"
                } ${props.className}`}
            />
            {error && (
                <div className="h-4 text-app-red py-1 text-xs">{error}</div>
            )}
        </div>
    );
}
