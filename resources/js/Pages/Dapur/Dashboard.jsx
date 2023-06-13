import Badge from "@/Components/Badge";
import Container from "@/Components/Container";
import DapurLayout from "@/Layouts/DapurLayout";
import { Head } from "@inertiajs/react";
import { IconUserShield, IconUsers, IconUsersGroup } from "@tabler/icons-react";

export default function Dashboard({ pemira, stats }) {
    return (
        <DapurLayout header="Dashboard">
            <Head title="Dashboard" />

            <Container>
                {pemira.length > 0 ? (
                    <div className="grid grid-cols-1 gap-y-10">
                        {pemira.map((item) => (
                            <div key={item.id} className="pb-10 border-b-2">
                                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                                    <div className="flex items-center justify-between mb-5">
                                        <h2 className="font-medium text-2xl text-gray-700 uppercase">
                                            {item.nama_pemira}
                                        </h2>
                                        <div className="flex items-center">
                                            <span className="font-medium text-sm text-gray-600 mr-2">
                                                Status:
                                            </span>
                                            <Badge status={item.status} />
                                        </div>
                                    </div>
                                    <section className="grid grid-cols-4 gap-2 lg:gap-6 text-gray-600">
                                        <div className="col-span-2 md:col-span-1">
                                            <div className="flex items-center bg-white px-4 md:px-2 py-1 lg:py-3 space-x-4 border rounded">
                                                <IconUsersGroup
                                                    className="text-green-600 w-10 h-10 lg:w-12 lg:h-12"
                                                    stroke={1.8}
                                                />
                                                <div>
                                                    <h2 className="font-semibold text-lg lg:text-xl text-gray-700">
                                                        {stats.users}
                                                    </h2>
                                                    <p className="text-sm lg:text-base">
                                                        Pemilih
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-2 md:col-span-1">
                                            <div className="flex items-center bg-white px-4 md:px-2 py-1 lg:py-3 space-x-4 border rounded">
                                                <IconUsers className="text-green-600 w-10 h-10 lg:w-12 lg:h-12" />
                                                <div>
                                                    <h2 className="font-semibold text-lg lg:text-xl text-gray-700">
                                                        {item.paslon_count}
                                                    </h2>
                                                    <p className="text-sm lg:text-base">
                                                        Paslon
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-2 md:col-span-1">
                                            <div className="flex items-center bg-white px-4 md:px-2 py-1 lg:py-3 space-x-4 border rounded">
                                                <IconUserShield className="text-green-600 w-10 h-10 lg:w-12 lg:h-12" />
                                                <div>
                                                    <h2 className="font-semibold text-lg lg:text-xl text-gray-700">
                                                        {item.admins_count}
                                                    </h2>
                                                    <p className="text-sm lg:text-base">
                                                        Panitia
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-center">
                                <h2 className="font-medium text-lg text-gray-600 capitalize">
                                    Tidak ada pemira
                                </h2>
                            </div>
                        </div>
                    </div>
                )}
            </Container>
        </DapurLayout>
    );
}
