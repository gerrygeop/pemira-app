import React from "react";
import SideLink from "./SideLink";
import {
    IconLayoutDashboard,
    IconShieldLock,
    IconBuildingBank,
} from "@tabler/icons-react";

export default function Sidebar({ can }) {
    return (
        <div className="fixed hidden lg:block lg:w-64">
            <div className="flex flex-col md:h-screen bg-gray-800 py-4 px-2">
                <div className="flex-shrink-0 flex items-center mx-auto mb-10">
                    <img
                        src="https://img.logoipsum.com/289.svg"
                        alt="Logo"
                        className="h-14 w-auto"
                    />
                </div>

                <nav>
                    <SideLink
                        href={route("d.dashboard")}
                        active={route().current("d.dashboard")}
                    >
                        <IconLayoutDashboard />
                        <span className="tracking-wide">Dashboard</span>
                    </SideLink>

                    {can.includes("read_pemira") && (
                        <SideLink
                            href={route("d.pemira.index")}
                            active={route().current("d.pemira.*")}
                        >
                            <IconBuildingBank />
                            <span className="tracking-wide">Pemira</span>
                        </SideLink>
                    )}

                    {can.includes("cooking") && (
                        <SideLink
                            href={route("d.roles.index")}
                            active={route().current("d.roles.*")}
                        >
                            <IconShieldLock />
                            <span className="tracking-wide">
                                Roles & Permissions
                            </span>
                        </SideLink>
                    )}
                </nav>
            </div>
        </div>
    );
}
