import { useFormStatus } from "react-dom";
import Loader from "../loader/loader";

type SubmitButtonProps = React.HTMLProps<HTMLButtonElement>;
export default function SubmitButton(props: SubmitButtonProps) {
    const formStatus = useFormStatus();
    return (
        <button
            {...props}
            type={props.type as "submit" | "reset" | "button" | undefined}
            className={
                `${
                    formStatus.pending ? " bg-gray-200" : "bg-app-green"
                } text-white text-sm min-w-12 min-h-5 rounded-sm flex justify-center items-center ` +
                props.className
            }
        >
            {formStatus.pending ? <Loader /> : props.label}
        </button>
    );
}
