import { Link } from "@inertiajs/react";
import React from "react";

export const Paginator = ({ links }) => {
    return (
        <>
            <div className="hidden md:flex md:justify-end mt-8">
                {links.map((link) => (
                    <Link
                        key={link.label}
                        href={link.url}
                        className={`py-2 px-4 border ${
                            link.active
                                ? "bg-indigo-500 text-white"
                                : "bg-white"
                        }`}
                    >
                        <span
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        ></span>
                    </Link>
                ))}
            </div>
            <div className="flex justify-between mt-8 md:hidden">
                <Link
                    href={links[0].url}
                    className={`py-2 px-4 border shadow-sm ${
                        links[0].active
                            ? "bg-indigo-500 text-white"
                            : "bg-white"
                    }`}
                >
                    <span
                        dangerouslySetInnerHTML={{
                            __html: links[0].label,
                        }}
                    ></span>
                </Link>
                <Link
                    href={links[links.length - 1].url}
                    className={`py-2 px-4 border shadow-sm ${
                        links[links.length - 1].active
                            ? "bg-indigo-500 text-white"
                            : "bg-white"
                    }`}
                >
                    <span
                        dangerouslySetInnerHTML={{
                            __html: links[links.length - 1].label,
                        }}
                    ></span>
                </Link>
            </div>
        </>
    );
};
