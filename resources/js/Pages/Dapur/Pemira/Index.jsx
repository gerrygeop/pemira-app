import Container, { Board, Section } from "@/Components/Container";
import Modal from "@/Components/Modal";
import Table from "@/Components/Table";
import DapurLayout from "@/Layouts/DapurLayout";
import { Head, router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { IconPlus } from "@tabler/icons-react";
import FormPemira from "./FormPemira";

import PrimaryButton from "@/Components/PrimaryButton";
import { toast } from "react-toastify";
import Badge from "@/Components/Badge";
import DateTime from "@/Components/DateTime";

export default function Index({ auth, pemiraList, flash }) {
    const permissions = auth.user?.permission;
    const [isShowingForm, setIsShowingForm] = useState(false);

    const handleRowClickOpenModal = (pemira) => {
        if (permissions.includes("read_pemira")) {
            router.visit(route("d.pemira.show", pemira.id));
        }
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
                <Board>
                    <Section>
                        {permissions.includes("create_pemira") && (
                            <div className="flex items-center justify-end mb-4">
                                <PrimaryButton
                                    type="button"
                                    onClick={() => setIsShowingForm(true)}
                                >
                                    <IconPlus className="w-5 h-5 -ml-0.5 mr-1.5" />
                                    Pemira baru
                                </PrimaryButton>
                            </div>
                        )}
                        <Table>
                            <Table.Thead>
                                <tr>
                                    <Table.Th scope="col">Nama</Table.Th>
                                    <Table.Th scope="col">Mulai</Table.Th>
                                    <Table.Th scope="col">Selesai</Table.Th>
                                    <Table.Th scope="col">Status</Table.Th>
                                </tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {pemiraList.length > 0 ? (
                                    pemiraList.map((pemira) => (
                                        <tr
                                            key={pemira.id}
                                            role="button"
                                            onClick={() =>
                                                handleRowClickOpenModal(pemira)
                                            }
                                            className="cursor-pointer hover:bg-slate-50"
                                        >
                                            <Table.Td className="uppercase">
                                                <span className="uppercase font-medium text-gray-800">
                                                    {pemira.nama_pemira}
                                                </span>
                                            </Table.Td>
                                            <Table.Td className="text-sm">
                                                <DateTime
                                                    datetime={
                                                        pemira.activated_at
                                                    }
                                                />
                                            </Table.Td>
                                            <Table.Td className="text-sm">
                                                <DateTime
                                                    datetime={
                                                        pemira.finished_at
                                                    }
                                                />
                                            </Table.Td>
                                            <Table.Td>
                                                <Badge status={pemira.status}>
                                                    {pemira.status}
                                                </Badge>
                                            </Table.Td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <Table.Td colSpan="4">
                                            <p className="text-gray-500 text-center italic">
                                                Tidak ada data
                                            </p>
                                        </Table.Td>
                                    </tr>
                                )}
                            </Table.Tbody>
                        </Table>
                    </Section>
                </Board>
            </Container>

            <Modal
                maxWidth="3xl"
                show={isShowingForm}
                onClose={() => setIsShowingForm(false)}
            >
                <div className="p-6">
                    <FormPemira onCancel={() => setIsShowingForm(false)} />
                </div>
            </Modal>
        </DapurLayout>
    );
}
