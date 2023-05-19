import Modal from "@/Components/Modal";
import DapurLayout from "@/Layouts/DapurLayout";
import { Head, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { IconAlertOctagonFilled } from "@tabler/icons-react";
import { toast } from "react-toastify";
import FormPemira from "./FormPemira";
import { PlayButton } from "@/Components/PrimaryButton";
import Container, { Board, Section } from "@/Components/Container";
import DangerButton from "@/Components/DangerButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Badge from "@/Components/Badge";
import TablePaslon from "../Paslon/TablePaslon";
import DateTime from "@/Components/DateTime";

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
        } else if (flash.status === "New Paslon") {
            toastMessage("Paslon berhasil ditambahkan");
        }
    }, [flash.status]);

    return (
        <DapurLayout header="Pemira">
            <Head title={pemira.nama_pemira} />

            <Container>
                <Board>
                    <Section className="sm:py-6 flex flex-row items-center justify-between">
                        <div className="flex items-center">
                            <span className="font-medium text-sm text-gray-600 mr-2">
                                Status:
                            </span>
                            <Badge status={pemira.status}>
                                {pemira.status}
                            </Badge>
                        </div>

                        <PlayButton
                            type="button"
                            onClick={(e) => onSwitchStatus(e)}
                            status={utility.title_btn}
                            disabled={processing}
                        >
                            {utility.title_btn}
                        </PlayButton>
                    </Section>

                    <Section>
                        <div className="mb-4">
                            <h1 className="font-semibold text-2xl lg:text-3xl text-gray-800">
                                {pemira.nama_pemira}
                            </h1>
                            <p className="text-gray-600">
                                {pemira?.keterangan}
                            </p>
                        </div>
                        <div className="flex flex-col md:flex-row items-start md:items-center">
                            <div className="pb-2 md:pb-0 md:pr-8">
                                <span className="text-sm text-gray-600">
                                    Mulai:
                                </span>
                                <h5 className="text-lg text-gray-800 font-semibold">
                                    <DateTime datetime={pemira?.activated_at} />
                                </h5>
                            </div>

                            <div className="pt-2 md:pt-0 md:pl-8">
                                <span className="text-sm text-gray-600">
                                    Selesai:
                                </span>
                                <h5 className="text-lg text-gray-800 font-semibold">
                                    <DateTime datetime={pemira?.finished_at} />
                                </h5>
                            </div>
                        </div>
                    </Section>

                    <Section className="sm:py-4">
                        <div className="flex items-center justify-end gap-x-2">
                            <SecondaryButton
                                type="button"
                                className="text-red-600 pr-4"
                                onClick={() => {
                                    setIsShowingModal(true);
                                    setConfirmingDeletion(true);
                                    setEditing(false);
                                }}
                            >
                                Hapus
                            </SecondaryButton>
                            <SecondaryButton
                                type="button"
                                className="text-gray-800 pl-4"
                                onClick={() => {
                                    setIsShowingModal(true);
                                    setEditing(true);
                                    setConfirmingDeletion(false);
                                }}
                            >
                                Edit
                            </SecondaryButton>
                        </div>
                    </Section>
                </Board>

                <Board className="mt-8">
                    <Section>
                        <TablePaslon pemira={pemira} />
                    </Section>
                </Board>
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
