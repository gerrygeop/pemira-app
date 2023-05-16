import {
    IconPlayerPauseFilled,
    IconPlayerPlayFilled,
    IconPlayerStopFilled,
} from "@tabler/icons-react";

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

export function PlayButton({
    className = "",
    children,
    disabled,
    status,
    ...props
}) {
    const theme = {
        publish:
            "bg-gray-800 hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900",
        tutup: "bg-red-600 hover:bg-red-500 focus:bg-red-500 active:bg-red-700",
        tunda: "bg-yellow-500 hover:bg-yellow-400 focus:bg-yellow-400 active:bg-yellow-600",
    }[status];

    const icons = {
        publish: <IconPlayerPlayFilled className="w-5 h-5 mr-2" />,
        tutup: <IconPlayerStopFilled className="w-5 h-5 mr-2" />,
        tunda: <IconPlayerPauseFilled className="w-5 h-5 mr-2" />,
    }[status];

    return (
        <button
            {...props}
            className={
                `inline-flex items-center px-4 py-2 rounded-md font-semibold text-xs text-white uppercase tracking-widest border border-transparent ${theme} focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition ease-in-out duration-150 ${
                    disabled && "opacity-25"
                } ` + className
            }
            disabled={disabled}
        >
            {icons}
            {children}
        </button>
    );
}
