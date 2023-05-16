import Modal from "@/Components/Modal";
import Table from "@/Components/Table";
import DapurLayout from "@/Layouts/DapurLayout";
import { Head, router, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import {
    IconAlertOctagonFilled,
    IconPlayerPlayFilled,
    IconSquareRoundedPlus,
} from "@tabler/icons-react";
import { toast } from "react-toastify";
import FormPemira from "./FormPemira";
import { format } from "date-fns";
import idLocale from "date-fns/locale/id";
import PrimaryButton, { PlayButton } from "@/Components/PrimaryButton";
import Container, { Box } from "@/Components/Container";
import DangerButton from "@/Components/DangerButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Badge from "@/Components/Badge";

export default function Show({ pemira, utility, flash }) {
    const [isShowingModal, setIsShowingModal] = useState(false);
    const [editing, setEditing] = useState(false);
    const [confirmingDeletion, setConfirmingDeletion] = useState(false);

    const { patch, delete: destroy, processing } = useForm();

    const onSwitchStatus = (e) => {
        e.preventDefault();
        patch(route("d.pemira.switchable", pemira.id));
    };

    const onDelete = (e) => {
        e.preventDefault();
        destroy(route("d.pemira.destroy", pemira.id));
    };

    const toastMessage = (message, type = "success") => {
        if (type === "danger") {
            toast.error(message, {
                autoClose: 3000,
                pauseOnHover: false,
            });
        } else {
            toast.success(message, {
                autoClose: 3000,
                pauseOnHover: false,
            });
        }
    };

    useEffect(() => {
        if (flash.status === "New Pemira") {
            toastMessage("Pemira berhasil dibuat");
        } else if (flash.status === "active") {
            toastMessage("Pemira diaktifkan");
        } else if (flash.status === "inactive") {
            toastMessage("Pemira dinonaktifkan");
        } else if (flash.status === "pending") {
            toastMessage("Pemira ditunda");
        }
    }, [flash.status]);

    return (
        <DapurLayout header="Pemira">
            <Head title={pemira.nama_pemira} />

            <Container>
                <Box padding="p-0">
                    <div className="px-4 md:px-6 py-6 border-b flex flex-col md:flex-row items-center justify-between gap-y-6 md:gap-y-0">
                        <div className="flex items-center w-full order-last md:order-first">
                            <span className="font-medium text-sm text-gray-600 mr-2">
                                Status:
                            </span>
                            <Badge status={pemira.status}>
                                {pemira.status}
                            </Badge>
                        </div>

                        <div className="flex items-center justify-between w-full md:w-auto">
                            <div className="flex items-center divide-x md:mr-14">
                                <button
                                    type="button"
                                    className="text-red-600 pr-4"
                                    onClick={() => {
                                        setIsShowingModal(true);
                                        setConfirmingDeletion(true);
                                        setEditing(false);
                                    }}
                                >
                                    Hapus
                                </button>
                                <button
                                    type="button"
                                    className="text-gray-800 pl-4"
                                    onClick={() => {
                                        setIsShowingModal(true);
                                        setEditing(true);
                                        setConfirmingDeletion(false);
                                    }}
                                >
                                    Edit
                                </button>
                            </div>

                            <PlayButton
                                type="button"
                                onClick={(e) => onSwitchStatus(e)}
                                status={utility.title_btn}
                                disabled={processing}
                            >
                                {utility.title_btn}
                            </PlayButton>
                        </div>
                    </div>

                    <div className="px-4 md:px-6 py-6">
                        <div className="mb-6">
                            <h1 className="font-semibold text-2xl lg:text-3xl text-gray-800">
                                {pemira.nama_pemira}
                            </h1>
                            <p className="text-gray-600">
                                {pemira?.keterangan}
                            </p>
                        </div>
                        <div className="flex flex-col md:flex-row items-start md:items-center md:divide-x">
                            <div className="pb-2 md:pb-0 md:pr-8">
                                <span className="text-sm text-gray-600 font-medium">
                                    Mulai:
                                </span>
                                <h5 className="text-lg text-gray-800 font-semibold">
                                    {format(
                                        new Date(pemira.activated_at),
                                        "d MMM yyyy, HH:mm",
                                        {
                                            locale: idLocale,
                                        }
                                    )}
                                </h5>
                            </div>

                            <div className="pt-2 md:pt-0 md:pl-8">
                                <span className="text-sm text-gray-600 font-medium">
                                    Selesai:
                                </span>
                                <h5 className="text-lg text-gray-800 font-semibold">
                                    {format(
                                        new Date(pemira.finished_at),
                                        "d MMM yyyy, HH:mm",
                                        {
                                            locale: idLocale,
                                        }
                                    )}
                                </h5>
                            </div>
                        </div>
                    </div>
                </Box>

                <Box classFirst="mt-6 border">
                    <div className="py-4 flex items-center justify-end">
                        <PrimaryButton type="button">
                            <IconSquareRoundedPlus className="w-5 h-5 mr-2" />
                            Paslon
                        </PrimaryButton>
                    </div>
                    <Table>
                        <Table.Thead>
                            <tr>
                                <Table.Th scope="col">No</Table.Th>
                                <Table.Th scope="col">Paslon</Table.Th>
                                <Table.Th scope="col">Selesai</Table.Th>
                            </tr>
                        </Table.Thead>
                        <Table.Tbody>
                            <tr>
                                <Table.Td colSpan="3">
                                    <p className="text-gray-500 text-center italic">
                                        Tidak ada data
                                    </p>
                                </Table.Td>
                            </tr>
                        </Table.Tbody>
                    </Table>
                </Box>
            </Container>

            <Modal
                show={isShowingModal}
                onClose={() => setIsShowingModal(false)}
                maxWidth={editing ? "3xl" : "2xl"}
            >
                {editing && (
                    <div className="p-6">
                        <FormPemira
                            onCancel={() => {
                                setIsShowingModal(false);
                            }}
                            pemira={pemira}
                        />
                    </div>
                )}

                {confirmingDeletion && (
                    <>
                        <div className="p-6 flex items-center">
                            <IconAlertOctagonFilled
                                className="text-red-600 mr-3 animate-pulse"
                                size={32}
                            />
                            <p className="text-gray-700 text-lg font-medium">
                                Yakin ingin menghapus {pemira.nama_pemira}
                            </p>
                        </div>
                        <div className="flex items-center justify-end gap-x-4 bg-gray-100 px-6 py-4">
                            <SecondaryButton
                                type="button"
                                onClick={() => setIsShowingModal(false)}
                            >
                                Batal
                            </SecondaryButton>
                            <DangerButton
                                type="button"
                                onClick={(e) => onDelete(e)}
                                disabled={processing}
                            >
                                Hapus
                            </DangerButton>
                        </div>
                    </>
                )}
            </Modal>
        </DapurLayout>
    );
}
