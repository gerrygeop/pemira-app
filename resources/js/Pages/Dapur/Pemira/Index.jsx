import ButtonAdd from "@/Components/Button";
import Container from "@/Components/Container";
import Modal from "@/Components/Modal";
import Table from "@/Components/Table";
import DapurLayout from "@/Layouts/DapurLayout";
import { Head, router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { IconPlus } from "@tabler/icons-react";
import { toast } from "react-toastify";
import FormPemira from "./FormPemira";

export default function Index({ pemiraList, flash }) {
    const [isShowingForm, setIsShowingForm] = useState(false);

    const handleRowClickOpenModal = (pemira) => {
        router.visit(route("pemira.show", pemira.id));
    };

    const successAlert = () => {
        toast.success(flash.status, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };

    return (
        <DapurLayout header="Pemira">
            <Head title="Pemira" />

            <Container>
                <div className="py-4 flex items-center justify-end">
                    <ButtonAdd
                        type="button"
                        onClick={() => setIsShowingForm(true)}
                    >
                        <IconPlus className="w-5 h-5" />
                        Pemira
                    </ButtonAdd>
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
                                    <Table.Td>{item.activated_at}</Table.Td>
                                    <Table.Td>{item.finished_at}</Table.Td>
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
            </Container>

            <Modal show={isShowingForm} onClose={() => setIsShowingForm(false)}>
                <FormPemira
                    closeModal={() => setIsShowingForm(false)}
                    successAlert={successAlert}
                />
            </Modal>
        </DapurLayout>
    );
}
