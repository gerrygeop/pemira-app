import { Link } from "@inertiajs/react";
import React from "react";

export default function PemiraTabs({ className, params }) {
    return (
        <div className={`bg-transparent px-2 md:px-0 ${className}`}>
            <div className="flex items-center justify-between md:justify-start w-full md:w-auto gap-x-1">
                <TabButton
                    href={route("d.pemira.show", params)}
                    active={route().current("d.pemira.show")}
                >
                    Detail
                </TabButton>
                <TabButton
                    href={route("d.pemira.suara-masuk", params)}
                    active={route().current("d.pemira.suara-masuk")}
                >
                    Suara Masuk
                </TabButton>
            </div>
        </div>
    );
}

export function TabButton({ children, active, ...props }) {
    return (
        <Link
            {...props}
            className={`w-full md:w-auto flex items-center justify-center px-4 py-2 rounded-md border text-sm capitalize focus:outline-none ${
                active
                    ? "bg-white text-gray-900 font-medium border-gray-200 lg:shadow-sm"
                    : "bg-transparent text-gray-600 hover:bg-gray-50 border-transparent"
            } transition ease-in-out duration-150`}
        >
            {children}
        </Link>
    );
}
