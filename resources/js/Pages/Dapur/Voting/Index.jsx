import Container from "@/Components/Container";
import RealTimeChart from "@/Components/RealTimeChart";
import DapurLayout from "@/Layouts/DapurLayout";
import { Head } from "@inertiajs/react";

export default function Index({ pemira }) {
    return (
        <DapurLayout header="Voting">
            <Head title="Voting" />

            <Container>
                {pemira.length > 0 ? (
                    <div className="grid grid-cols-1 gap-y-10">
                        {pemira.map((item) => (
                            <div key={item.id} className="pb-10 border-b-2">
                                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                                    <div className="flex justify-center mb-4">
                                        <h2 className="font-medium text-lg text-gray-700 uppercase">
                                            {item.nama_pemira}
                                        </h2>
                                    </div>
                                    <RealTimeChart pemira={item} />
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
