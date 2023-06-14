import DapurLayout from "@/Layouts/DapurLayout";
import Container, { Board } from "@/Components/Container";
import Badge from "@/Components/Badge";
import PemiraTabs from "./PemiraTabs";
import BarChart from "@/Components/BarChart";
import PrimaryButton from "@/Components/PrimaryButton";
import BarChartRace from "@/Components/BarChartRace";

export default function Rekapitulasi({ pemira, votes }) {
    return (
        <DapurLayout header="Pemira">
            <Container classFirst="lg:py-8">
                <PemiraTabs className="mb-6" params={pemira} />

                <Board>
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

                    <div>
                        <div className="bg-white overflow-hidden flex justify-center py-4 lg:py-6">
                            <BarChartRace pemira={pemira} />
                        </div>
                    </div>
                </Board>

                {/* {pemira.status === "finished" && (
                    <Board className="mt-6">
                        <div>
                            <div className="bg-white overflow-hidden flex justify-center p-4 lg:p-6">
                                p
                            </div>
                        </div>
                    </Board>
                )} */}
            </Container>
        </DapurLayout>
    );
}
