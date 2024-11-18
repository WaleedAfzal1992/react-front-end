type PageContainerProps = {
    children: React.ReactNode;
    heading?: string;
    className?: string;
};
export default function PageContainer({
    children,
    heading,
    className,
}: PageContainerProps) {
    return (
        <div
            className={` px-4 md:px-8 pt-10 pb-7 mt-2 text-app-grey h-full ${className}`}
        >
            {heading ? (
                <h1 className="text-[20px] font-bold mb-4">{heading}</h1>
            ) : null}

            {children}
        </div>
    );
}
