import React from "react";

export default function Badge({ children, status = "default" }) {
    const colors = {
        active: "bg-green-50 text-green-700 ring-green-600/20",
        inactive: "bg-red-50 text-red-700 ring-red-600/10",
        pending: "bg-yellow-50 text-yellow-800 ring-yellow-600/20",
        default: "bg-gray-50 text-gray-600 ring-gray-500/10",
    }[status];

    return (
        <span
            className={`inline-flex items-center rounded-md px-2 py-1 font-medium text-xs ring-1 ring-inset ${colors}`}
        >
            {children}
        </span>
    );
}
