import DapurLayout from "@/Layouts/DapurLayout";
import { Board } from "@/Components/Container";
import Badge from "@/Components/Badge";
import PemiraTabs from "./PemiraTabs";
import BarChart from "@/Components/BarChart";
import BarChartRace from "@/Components/BarChartRace";
import { useEffect, useState } from "react";
import DonutChart from "@/Components/DonutChart";

export default function Rekapitulasi({ pemira, facultyUserCounts }) {
    const [isFinished, setIsFinished] = useState(false);
    const [showComponent, setShowComponent] = useState(false);

    useEffect(() => {
        if (isFinished) {
            const timer = setTimeout(() => {
                setShowComponent(true);
            }, 8000);

            return () => clearTimeout(timer);
        }
    }, [isFinished]);

    return (
        <DapurLayout header="Pemira">
            <div className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
                <PemiraTabs className="mb-6" params={pemira} />

                <Board
                    className={`mb-8 ${
                        showComponent
                            ? "opacity-100 h-auto scale-100"
                            : "opacity-0 h-0 scale-95"
                    } transition-all duration-1000`}
                >
                    <div className="py-6 px-4 sm:px-6 flex flex-col lg:flex-row items-start lg:items-center lg:justify-between gap-3">
                        <h2 className="font-semibold text-lg lg:text-2xl text-gray-700 uppercase">
                            {pemira.nama_pemira}
                        </h2>
                    </div>

                    <div className="grid grid-cols-12">
                        <div className="col-span-full lg:col-span-8 bg-white font-medium text-lg text-gray-700 overflow-hidden flex flex-col justify-center items-center py-4 lg:py-6">
                            <div className="flex">
                                Berdasarkan jumlah pemilih
                            </div>
                            <BarChart />
                        </div>
                        <div className="col-span-full lg:col-span-4 bg-white border-t lg:border-l lg:border-t-0 font-medium text-lg text-gray-700 overflow-hidden flex flex-col justify-center items-center p-4 lg:p-6">
                            <div className="flex">Perolehan suara paslon</div>
                            <DonutChart />
                        </div>
                    </div>
                </Board>

                <Board
                    className={`mb-8 ${
                        showComponent
                            ? "opacity-100 h-auto scale-100"
                            : "opacity-0 h-0 scale-95"
                    } transition-all duration-1000`}
                >
                    <div className="py-6 px-4 sm:px-6 flex flex-col lg:flex-row items-start lg:items-center lg:justify-between gap-3">
                        <h2 className="font-semibold text-base lg:text-xl text-gray-700 uppercase">
                            Jumlah pemilih setiap fakultas
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 lg:p-6">
                        {facultyUserCounts.map((faculty) => (
                            <div
                                key={faculty.id}
                                className="flex items-center justify-between border rounded px-4 py-3 text-sm text-gray-900"
                            >
                                <span className="uppercase text-xs tracking-wide">
                                    {faculty.name}
                                </span>
                                <span className="font-medium text-base rounded-md bg-blue-50 px-3 text-blue-800 ring-1 ring-inset ring-blue-600/20">
                                    {faculty.user_count}
                                </span>
                            </div>
                        ))}
                    </div>
                </Board>

                <Board>
                    {!showComponent && (
                        <div className="py-6 px-4 sm:px-6 flex flex-col lg:flex-row items-start lg:items-center lg:justify-between gap-3">
                            <h2 className="font-semibold text-lg lg:text-2xl text-gray-700 uppercase">
                                {pemira.nama_pemira}
                            </h2>
                            <div className="flex items-center">
                                <span className="font-medium text-sm text-gray-600 mr-2">
                                    Status:
                                </span>
                                <Badge status={pemira.status} />
                            </div>
                        </div>
                    )}

                    <div>
                        <div className="bg-white overflow-hidden flex justify-center py-4 lg:py-6">
                            <BarChartRace
                                pemira={pemira}
                                isFinished={isFinished}
                                setIsFinished={setIsFinished}
                            />
                        </div>
                    </div>
                </Board>
            </div>
        </DapurLayout>
    );
}
