import { IconCheck, IconPlayerPause, IconX } from "@tabler/icons-react";

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
                `inline-flex items-center px-3 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2 transition ease-in-out duration-150 ${
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
        aktifkan:
            "text-white bg-indigo-600 hover:bg-indigo-500 focus:bg-indigo-500 active:bg-indigo-700",
        tutup: "text-white bg-red-600 hover:bg-red-500 focus:bg-red-500 active:bg-red-700",
        tunda: "text-black bg-slate-600/20 hover:bg-slate-500/50 focus:bg-slate-600/30",
    }[status];

    const icons = {
        aktifkan: <IconCheck className="w-5 h-5 -ml-0.5 mr-1.5" />,
        tutup: <IconX className="w-5 h-5 -ml-0.5 mr-1.5" />,
        tunda: <IconPlayerPause className="w-5 h-5 -ml-0.5 mr-1.5" />,
    }[status];

    return (
        <button
            {...props}
            className={
                `inline-flex items-center px-3 py-2 rounded-md font-semibold text-xs uppercase tracking-widest border border-transparent ${theme} focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2 transition ease-in-out duration-150 ${
                    disabled && "opacity-25"
                } ` + className
            }
            disabled={disabled}
        >
            {icons ?? ""}
            {children}
        </button>
    );
}
