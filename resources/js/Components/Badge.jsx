import React from "react";

export default function Badge({ status }) {
    const colors = {
        active: "bg-green-50 text-green-700 ring-green-600/20",
        inactive: "bg-red-50 text-red-700 ring-red-600/10",
        pending: "bg-yellow-50 text-yellow-800 ring-yellow-600/20",
        finished: "bg-gray-50 text-gray-600 ring-gray-500/50",
    }[status];
    const text = {
        active: "aktif",
        inactive: "tidak aktif",
        pending: "tunda",
        finished: "selesai",
    }[status];

    return (
        <span
            className={`inline-flex items-center rounded-md px-2 py-1 font-medium capitalize text-sm ring-1 ring-inset ${colors}`}
        >
            {text}
        </span>
    );
}
