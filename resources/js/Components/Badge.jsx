import React from "react";

export default function Badge({ children, status = "default" }) {
    const colors = {
        active: "bg-green-100 text-green-800 border-green-800/50",
        inactive: "bg-red-100 text-red-800 border-red-800/50",
        pending: "bg-yellow-100 text-yellow-800 border-yellow-800/50",
        default: "bg-gray-100 text-gray-800 border-gray-800/50",
    }[status];

    return (
        <span
            className={`px-3 py-0.5 flex rounded-lg capitalize tracking-wide border font-semibold text-sm ${colors}`}
        >
            {children}
        </span>
    );
}
