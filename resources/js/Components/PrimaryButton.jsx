export default function PrimaryButton({
    className = "",
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 ${
                    disabled && "opacity-25"
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}

export function BorderButton({
    className = "",
    colors = "",
    disabled,
    children,
    ...props
}) {
    let theme =
        "text-gray-700 hover:border-gray-400 hover:text-gray-800 focus:text-gray-900 focus:ring-gray-500";
    switch (colors) {
        case "indigo":
            theme =
                "text-indigo-600 border-indigo-300 hover:text-indigo-800 focus:text-indigo-900 focus:ring-indigo-500";
            break;
        case "red":
            theme =
                "text-red-600 border-red-400 hover:text-red-700 focus:text-red-900 focus:ring-red-500";
            break;
        default:
            break;
    }
    return (
        <button
            {...props}
            className={
                `flex items-center px-4 py-2 bg-white font-semibold text-xs border ${theme} uppercase tracking-widest rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150 ${
                    disabled && "opacity-25"
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
