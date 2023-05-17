import Container, { Box } from "@/Components/Container";
import Modal from "@/Components/Modal";
import Table from "@/Components/Table";
import DapurLayout from "@/Layouts/DapurLayout";
import { Head, router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { IconPlus } from "@tabler/icons-react";
import FormPemira from "./FormPemira";
import { format } from "date-fns";
import idLocale from "date-fns/locale/id";
import PrimaryButton from "@/Components/PrimaryButton";
import { toast } from "react-toastify";

export default function Index({ pemiraList, flash }) {
    const [isShowingForm, setIsShowingForm] = useState(false);

    const handleRowClickOpenModal = (pemira) => {
        router.visit(route("d.pemira.show", pemira.id));
    };

    useEffect(() => {
        if (flash.status === "Delete") {
            toast.success("Pemira berhasil dihapus", {
                autoClose: 3000,
                pauseOnHover: false,
            });
        }
    }, []);

    return (
        <DapurLayout header="Pemira">
            <Head title="Pemira" />

            <Container>
                <Box>
                    <div className="py-4 flex items-center justify-end">
                        <PrimaryButton
                            type="button"
                            onClick={() => setIsShowingForm(true)}
                        >
                            <IconPlus className="w-5 h-5 mr-2" />
                            Pemira baru
                        </PrimaryButton>
                    </div>
                    <Table>
                        <Table.Thead>
                            <tr>
                                <Table.Th scope="col">Nama</Table.Th>
                                <Table.Th scope="col">Mulai</Table.Th>
                                <Table.Th scope="col">Selesai</Table.Th>
                            </tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {pemiraList.length > 0 ? (
                                pemiraList.map((item) => (
                                    <tr
                                        key={item.id}
                                        role="button"
                                        onClick={() =>
                                            handleRowClickOpenModal(item)
                                        }
                                        className="cursor-pointer hover:bg-slate-50"
                                    >
                                        <Table.Td className="uppercase">
                                            {item.nama_pemira}
                                        </Table.Td>
                                        <Table.Td>
                                            {format(
                                                new Date(item.activated_at),
                                                "d MMM yyyy, HH:mm",
                                                {
                                                    locale: idLocale,
                                                }
                                            )}
                                        </Table.Td>
                                        <Table.Td>
                                            {format(
                                                new Date(item.finished_at),
                                                "d MMM yyyy, HH:mm",
                                                {
                                                    locale: idLocale,
                                                }
                                            )}
                                        </Table.Td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <Table.Td colSpan="3">
                                        <p className="text-gray-500 text-center italic">
                                            Tidak ada data
                                        </p>
                                    </Table.Td>
                                </tr>
                            )}
                        </Table.Tbody>
                    </Table>
                </Box>
            </Container>

            <Modal show={isShowingForm} onClose={() => setIsShowingForm(false)}>
                <div className="p-6">
                    <FormPemira onCancel={() => setIsShowingForm(false)} />
                </div>
            </Modal>
        </DapurLayout>
    );
}
