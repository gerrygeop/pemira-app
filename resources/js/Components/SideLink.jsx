import { Link } from "@inertiajs/react";
import React from "react";

export default function SideLink({
    active = false,
    className = "",
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                "flex items-center mx-2 mt-2 px-4 py-4 md:py-2 space-x-3 text-base rounded-md focus:outline-none " +
                (active
                    ? "text-white bg-amber-600 font-medium "
                    : "text-gray-400 hover:bg-gray-600 hover:text-amber-100 focus:text-amber-100 focus:bg-gray-600 ") +
                className +
                " transition"
            }
        >
            {children}
        </Link>
    );
}
