import { IconCheck, IconPlayerPause, IconX } from "@tabler/icons-react";
import { parseISO, isBefore, isAfter, isSameDay } from "date-fns";

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
                `inline-flex items-center px-3 py-2 bg-gray-800 border border-transparent rounded-md font-medium text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2 transition ease-in-out duration-150 ${
                    disabled && "opacity-25"
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}

export function PlayButton({ className = "", disabled, ...props }) {
    const status = toggleStatus(props.status, props.activatedat);
    const theme = {
        indigo: {
            title: "Aktifkan",
            class: "text-white bg-indigo-600 hover:bg-indigo-500 focus:bg-indigo-500 active:bg-indigo-700",
            icon: <IconCheck className="w-5 h-5 -ml-0.5 mr-1.5" />,
        },
        red: {
            title: "Tutup",
            class: "text-white bg-red-600 hover:bg-red-500 focus:bg-red-500 active:bg-red-700",
            icon: <IconX className="w-5 h-5 -ml-0.5 mr-1.5" />,
        },
        slate: {
            title: "Tunda",
            class: "text-black bg-slate-600/20 hover:bg-slate-500/50 focus:bg-slate-600/30",
            icon: <IconPlayerPause className="w-5 h-5 -ml-0.5 mr-1.5" />,
        },
    }[status];

    return (
        <button
            {...props}
            className={
                `inline-flex items-center px-3 py-2 rounded-md font-medium text-xs uppercase tracking-widest border border-transparent ${
                    theme.class
                } focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2 transition ease-in-out duration-150 ${
                    disabled && "opacity-25"
                } ` + className
            }
            disabled={disabled}
        >
            {theme.icon}
            {theme.title}
        </button>
    );
}

function toggleStatus(status, activated_at) {
    const activatedAt = parseISO(activated_at);
    const now = new Date();

    if (status === "finished") {
        return "white";
    } else if (status === "inactive" || status === "pending") {
        return "indigo";
    } else if (status === "active" && isAfter(activatedAt, now)) {
        return "red";
    } else if (status === "active" && isBefore(activatedAt, now)) {
        return "slate";
    }
}
