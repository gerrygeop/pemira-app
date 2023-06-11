import React from "react";
import SideLink from "./SideLink";
import {
    IconLayoutDashboard,
    IconShieldLock,
    IconBuildingBank,
    IconUsers,
} from "@tabler/icons-react";

export default function Sidebar({ can }) {
    return (
        <div className="fixed hidden lg:block lg:w-64">
            <div className="flex flex-col md:h-screen bg-gray-800 py-4 px-2">
                <div className="flex-shrink-0 flex items-center mx-auto mb-10">
                    <img
                        src="/image/Logo-UNMUL.png"
                        alt="Logo"
                        className="w-24 h-auto"
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

                    {can.includes("read_voting") && (
                        <SideLink
                            href={route("d.voting.index")}
                            active={route().current("d.voting.*")}
                        >
                            <IconBuildingBank />
                            <span className="tracking-wide">Voting</span>
                        </SideLink>
                    )}

                    {can.includes("cooking") && (
                        <>
                            <SideLink
                                href={route("d.users.index")}
                                active={route().current("d.users.index")}
                            >
                                <IconUsers />
                                <span className="tracking-wide">Users</span>
                            </SideLink>
                            <SideLink
                                href={route("d.roles.index")}
                                active={route().current("d.roles.*")}
                            >
                                <IconShieldLock />
                                <span className="tracking-wide">
                                    Roles & Permissions
                                </span>
                            </SideLink>
                        </>
                    )}
                </nav>
            </div>
        </div>
    );
}
