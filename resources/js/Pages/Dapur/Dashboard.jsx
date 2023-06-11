import BarChart from "@/Components/BarChart";
import Container, { Board } from "@/Components/Container";
import DapurLayout from "@/Layouts/DapurLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard() {
    return (
        <DapurLayout header="Dashboard">
            <Head title="Dashboard" />

            <Container>
                <section className="grid grid-cols-4 gap-2 lg:gap-6 text-gray-600">
                    <div className="col-span-2 md:col-span-1">
                        <div className="flex items-center bg-white px-4 md:px-2 py-1 lg:py-3 space-x-4 rounded shadow">
                            <svg
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="text-indigo-500 w-10 h-10 lg:w-12 lg:h-12"
                                viewBox="0 0 24 24"
                            >
                                <path d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                            </svg>
                            <div>
                                <h4 className="font-semibold text-lg lg:text-2xl text-gray-700">
                                    1
                                </h4>
                                <p className="text-sm lg:text-base">Pemira</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <div className="flex items-center bg-white px-4 md:px-2 py-1 lg:py-3 space-x-4 rounded shadow">
                            <svg
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                className="text-indigo-500 w-11 h-11 lg:w-14 lg:h-14"
                                viewBox="0 0 24 24"
                            >
                                <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                            </svg>
                            <div>
                                <h2 className="font-semibold text-lg lg:text-2xl text-gray-700">
                                    1000
                                </h2>
                                <p className="text-sm lg:text-base">Pemilih</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <div className="flex items-center bg-white px-4 md:px-2 py-1 lg:py-3 space-x-4 rounded shadow">
                            <svg
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="text-indigo-500 w-10 h-10 lg:w-12 lg:h-12"
                                viewBox="0 0 24 24"
                            >
                                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75"></path>
                            </svg>
                            <div>
                                <h2 className="font-semibold text-lg lg:text-2xl text-gray-700">
                                    2
                                </h2>
                                <p className="text-sm lg:text-base">Paslon</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <div className="flex items-center bg-white px-4 md:px-2 py-1 lg:py-3 space-x-4 rounded shadow">
                            <svg
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="text-indigo-500 w-10 h-10 lg:w-12 lg:h-12"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                            </svg>
                            <div>
                                <h2 className="font-semibold text-lg lg:text-2xl text-gray-700">
                                    3
                                </h2>
                                <p className="text-sm lg:text-base">Panitia</p>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="my-8 border-t"></div>

                <h2 className="mb-2 font-medium text-lg text-gray-800">
                    Jumlah Suara Masuk
                </h2>
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900">
                        <div className="flex justify-center mb-4">
                            <h2 className="font-medium text-lg text-gray-700 uppercase">
                                Pemilihan Ketua RT
                            </h2>
                        </div>
                        <BarChart />
                    </div>
                </div>
            </Container>
        </DapurLayout>
    );
}
