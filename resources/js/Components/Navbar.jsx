import React, { useState } from "react";
import { IconChevronDown, IconMenu2, IconX } from "@tabler/icons-react";
import Dropdown from "@/Components/Dropdown";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { usePage } from "@inertiajs/react";

export default function Navbar({ header }) {
    const { auth } = usePage().props;
    const { user, guard } = auth;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <nav
            className={`bg-white border-b${
                guard === "admin" ? " lg:bg-transparent" : ""
            }`}
        >
            <div className="block lg:hidden">
                <div className="max-w-7xl mx-auto px-2 py-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-center lg:justify-start space-x-2">
                        <img
                            src="/image/Logo-UNMUL.png"
                            alt="Logo"
                            className="w-14"
                        />
                        <img
                            src="/image/logo-dpm-km.png"
                            alt="Logo"
                            className="w-14 h-auto"
                        />
                        <img
                            src="/image/logo-kppr.png"
                            alt="Logo"
                            className="w-14 h-auto"
                        />
                        <img
                            src="/image/logo-itp.png"
                            alt="Logo"
                            className="w-14 h-auto"
                        />
                        <img
                            src="/image/logo-uname.png"
                            alt="Logo"
                            className="w-14 h-auto"
                        />
                    </div>
                </div>

                <div className="border-t"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20">
                    <div className="flex">
                        <div className="shrink-0 flex items-center gap-x-4">
                            {guard === "admin" ? (
                                <h1 className="text-gray-800 text-lg sm:text-xl font-medium">
                                    {header}
                                </h1>
                            ) : (
                                <div className="hidden lg:flex lg:items-center lg:gap-x-3">
                                    <img
                                        src="/image/Logo-UNMUL.png"
                                        alt="Logo"
                                        className="w-14"
                                    />
                                    <img
                                        src="/image/logo-dpm-km.png"
                                        alt="Logo"
                                        className="w-14 h-auto"
                                    />
                                    <img
                                        src="/image/logo-kppr.png"
                                        alt="Logo"
                                        className="w-14 h-auto"
                                    />
                                    <img
                                        src="/image/logo-itp.png"
                                        alt="Logo"
                                        className="w-14 h-auto"
                                    />
                                    <img
                                        src="/image/logo-uname.png"
                                        alt="Logo"
                                        className="w-14 h-auto"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="hidden lg:flex lg:items-center lg:ml-6">
                        <div className="ml-3 relative">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md">
                                        <button
                                            type="button"
                                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-600 bg-transparent hover:text-gray-900 focus:outline-none transition ease-in-out duration-150"
                                        >
                                            {user.name}
                                            <IconChevronDown className="ml-2 -mr-0.5 h-4 w-4" />
                                        </button>
                                    </span>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    {guard === "admin" && (
                                        <Dropdown.Link
                                            href={route("d.profile.edit")}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                    )}
                                    <Dropdown.Link
                                        href={
                                            guard === "admin"
                                                ? route("d.logout")
                                                : route("logout")
                                        }
                                        method="post"
                                        as="button"
                                    >
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>

                    {/* Responsive Toggle Menu */}
                    <div className="-mr-2 flex items-center lg:hidden">
                        <button
                            onClick={() =>
                                setShowingNavigationDropdown(
                                    (previousState) => !previousState
                                )
                            }
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                        >
                            {showingNavigationDropdown ? (
                                <IconX />
                            ) : (
                                <IconMenu2 />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Responsive Menu */}
            <div
                className={
                    (showingNavigationDropdown ? "block" : "hidden") +
                    " lg:hidden w-full bg-white shadow-lg border absolute left-0 z-50"
                }
            >
                {guard === "admin" && (
                    <div className="pt-2 pb-3 space-y-1 border-b border-gray-200">
                        <ResponsiveNavLink
                            href={route("d.dashboard")}
                            active={route().current("d.dashboard")}
                        >
                            Dashboard
                        </ResponsiveNavLink>

                        {user?.permission.includes("read_pemira") && (
                            <ResponsiveNavLink
                                href={route("d.pemira.index")}
                                active={route().current("d.pemira.*")}
                            >
                                Pemira
                            </ResponsiveNavLink>
                        )}

                        {user?.permission.includes("cooking") && (
                            <>
                                <ResponsiveNavLink
                                    href={route("d.users.index")}
                                    active={route().current("d.users.index")}
                                >
                                    Users
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route("d.roles.index")}
                                    active={route().current("d.roles.*")}
                                >
                                    Roles & Permissions
                                </ResponsiveNavLink>
                            </>
                        )}
                    </div>
                )}

                <div className="pt-4 pb-1">
                    <div className="px-4">
                        <div className="font-medium text-base text-gray-800">
                            {user.name}
                        </div>
                        <div className="font-medium text-sm text-gray-500">
                            {guard === "admin" ? user.username : user.nim}
                        </div>
                    </div>

                    <div className="mt-3 space-y-1">
                        {guard === "admin" && (
                            <ResponsiveNavLink href={route("d.profile.edit")}>
                                Profile
                            </ResponsiveNavLink>
                        )}
                        <ResponsiveNavLink
                            method="post"
                            href={
                                guard === "admin"
                                    ? route("d.logout")
                                    : route("logout")
                            }
                            as="button"
                        >
                            Log Out
                        </ResponsiveNavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
}
