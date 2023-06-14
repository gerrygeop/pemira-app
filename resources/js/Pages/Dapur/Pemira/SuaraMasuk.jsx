import DapurLayout from "@/Layouts/DapurLayout";
import Container, { Board } from "@/Components/Container";
import Badge from "@/Components/Badge";
import PemiraTabs from "./PemiraTabs";
import RealTimeChart from "@/Components/RealTimeChart";
import PrimaryButton from "@/Components/PrimaryButton";
import { router } from "@inertiajs/react";
import { IconArchive } from "@tabler/icons-react";

export default function SuaraMasuk({ auth, pemira }) {
    const handleOnClick = (e) => {
        e.preventDefault();

        router.visit(route("d.pemira.rekapitulasi", pemira));
    };

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

                    {pemira.status === "finished" && (
                        <div>
                            <div className="bg-white overflow-hidden flex justify-center p-4 lg:p-6">
                                <PrimaryButton
                                    onClick={(e) => handleOnClick(e)}
                                >
                                    <IconArchive className="mr-2 w-5 h-5" />
                                    Hasil voting
                                </PrimaryButton>
                            </div>
                        </div>
                    )}
                    {pemira.status === "active" && (
                        <div>
                            <div className="bg-white overflow-hidden flex justify-center p-4 lg:p-6">
                                <RealTimeChart pemira={pemira} />
                            </div>
                        </div>
                    )}
                </Board>

                {pemira.status === "finished" && (
                    <Board className="mt-6">
                        <div>
                            <div className="bg-white overflow-hidden flex justify-center p-4 lg:p-6">
                                <RealTimeChart pemira={pemira} />
                            </div>
                        </div>
                    </Board>
                )}
            </Container>
        </DapurLayout>
    );
}
