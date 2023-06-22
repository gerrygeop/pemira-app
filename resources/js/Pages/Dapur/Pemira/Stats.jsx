import DapurLayout from "@/Layouts/DapurLayout";
import { Board } from "@/Components/Container";
import Badge from "@/Components/Badge";
import PemiraTabs from "./PemiraTabs";

export default function Rekapitulasi({ pemira, votings }) {
    console.log(votings);
    return (
        <DapurLayout header="Pemira">
            <div className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
                <PemiraTabs className="mb-6" params={pemira} />

                <Board className="mb-8">
                    <div className="py-6 px-4 sm:px-6 flex flex-col lg:flex-row items-start lg:items-center lg:justify-between gap-3">
                        <h2 className="font-semibold text-base lg:text-xl text-gray-700 uppercase">
                            Jumlah pemilih setiap fakultas
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 lg:p-6">
                        {votings.map((data, i) => (
                            <div
                                key={i}
                                className="flex items-center justify-between border rounded px-4 py-3 text-sm text-gray-900"
                            >
                                <div className="uppercase text-xs tracking-wide">
                                    Paslon ID
                                    <span className="ml-1 font-medium text-base rounded-md bg-blue-50 px-3 text-blue-800 ring-1 ring-inset ring-blue-600/20">
                                        {data.paslon_id}
                                    </span>
                                </div>
                                <span className="uppercase text-xs tracking-wide">
                                    {data.name}
                                </span>
                                <span className="font-medium text-base rounded-md bg-blue-50 px-3 text-blue-800 ring-1 ring-inset ring-blue-600/20">
                                    {data.user_count}
                                </span>
                            </div>
                        ))}
                    </div>
                </Board>
            </div>
        </DapurLayout>
    );
}
