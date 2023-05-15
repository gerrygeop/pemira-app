import React from "react";
import SideLink from "./SideLink";
import { IconLayoutDashboard, IconShieldLock } from "@tabler/icons-react";

export default function Sidebar() {
    return (
        <div className="fixed hidden md:block md:w-52 lg:w-64">
            <div className="flex flex-col md:h-screen bg-gray-700 py-6 px-2">
                <div className="flex-shrink-0 flex items-center mx-5 mb-10">
                    <img
                        src="https://img.logoipsum.com/289.svg"
                        alt="Logo"
                        className="w-24"
                    />
                </div>

                <nav>
                    <SideLink
                        href={route("dp.dashboard")}
                        active={route().current("dp.dashboard")}
                    >
                        <IconLayoutDashboard />
                        <span className="tracking-wide">Dashboard</span>
                    </SideLink>

                    <SideLink
                        href={route("dp.roles.index")}
                        active={route().current("dp.roles.*")}
                    >
                        <IconShieldLock />
                        <span className="tracking-wide">
                            Roles & Permissions
                        </span>
                    </SideLink>
                </nav>
            </div>
        </div>
    );
}
