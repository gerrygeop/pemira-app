import Container, { Board } from "@/Components/Container";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import DapurLayout from "@/Layouts/DapurLayout";
import { Head, router, useForm } from "@inertiajs/react";
import SectionVisiMisi from "./Partials/SectionVisiMisi";
import SectionCandidate from "./Partials/SectionCandidate";
import SectionPartner from "./Partials/SectionPartner";
import { useState } from "react";
import Modal from "@/Components/Modal";
import { IconAlertOctagonFilled } from "@tabler/icons-react";
import DangerButton from "@/Components/DangerButton";

export default function FormPaslon({
    auth,
    paslon = "",
    pemira = "",
    faculties,
}) {
    const {
        data,
        setData,
        post,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        no_urut: paslon.no_urut || "",
        items: {
            visi: paslon.id ? JSON.parse(paslon?.items)?.visi : "",
            misi: paslon.id ? JSON.parse(paslon?.items)?.misi : "",
        },
        photo_path: "",
        candidate: {
            name: paslon.candidate?.name || "",
            profile: {
                angkatan: paslon.id
                    ? JSON.parse(paslon.candidate?.profile)?.angkatan
                    : "",
                fakultas: paslon.id
                    ? JSON.parse(paslon.candidate?.profile)?.fakultas
                    : faculties[0].name,
                organisasi: paslon.id
                    ? JSON.parse(paslon.candidate?.profile)?.organisasi
                    : "",
                pendidikan: paslon.id
                    ? JSON.parse(paslon.candidate?.profile)?.pendidikan
                    : "",
                prestasi: paslon.id
                    ? JSON.parse(paslon.candidate?.profile)?.prestasi
                    : "",
            },
        },
        partner: {
            name: paslon.partner?.name || "",
            profile: {
                angkatan: paslon.id
                    ? JSON.parse(paslon.partner?.profile)?.angkatan
                    : "",
                fakultas: paslon.id
                    ? JSON.parse(paslon.partner?.profile)?.fakultas
                    : faculties[0].name,
                organisasi: paslon.id
                    ? JSON.parse(paslon.partner?.profile)?.organisasi
                    : "",
                pendidikan: paslon.id
                    ? JSON.parse(paslon.partner?.profile)?.pendidikan
                    : "",
                prestasi: paslon.id
                    ? JSON.parse(paslon.partner?.profile)?.prestasi
                    : "",
            },
        },
    });

    const permissions = auth.user?.permission;

    const [confirmingDeletion, setConfirmingDeletion] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (paslon.id) {
            router.post(route("d.pemira.paslon.update", paslon.id), {
                _method: "put",
                data: data,
                onSuccess: () => reset(),
            });
        } else {
            post(route("d.pemira.paslon.store", pemira), {
                onSuccess: () => reset(),
            });
        }
    };

    const onDelete = (e) => {
        e.preventDefault();
        destroy(route("d.pemira.paslon.destroy", paslon.id));
    };

    const handleChange = (e, file = false) => {
        const { name, value } = e.target;
        const keys = name.split(".");

        setData((prevData) => {
            let updatedData = { ...prevData };
            let currentObj = updatedData;

            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];

                if (i === keys.length - 1) {
                    if (file) {
                        currentObj[key] = e.target.files[0];
                    } else {
                        currentObj[key] = value;
                    }
                } else {
                    if (!currentObj[key]) {
                        currentObj[key] = {};
                    }
                    currentObj = currentObj[key];
                }
            }

            return updatedData;
        });
    };

    const handleCloseForm = () => {
        reset();
        router.visit(
            route("d.pemira.show", paslon.id ? paslon.pemira_id : pemira)
        );
    };

    return (
        <DapurLayout header="Paslon">
            <Head title="Paslon" />

            <Container>
                <form onSubmit={handleSubmit}>
                    <Board>
                        <div className="p-6 md:p-8">
                            <SectionCandidate
                                data={data}
                                handleChange={handleChange}
                                errors={errors}
                                faculties={faculties}
                            />
                        </div>

                        <div className="p-6 md:p-8">
                            <SectionPartner
                                data={data}
                                handleChange={handleChange}
                                errors={errors}
                                faculties={faculties}
                            />
                        </div>

                        <div className="p-6 md:p-8">
                            <SectionVisiMisi
                                data={data}
                                handleChange={handleChange}
                                errors={errors}
                                photo={paslon?.photo_path || ""}
                                permissions={permissions}
                            />
                        </div>

                        <div className="p-6 md:p-8 mt-8 bg-slate-50">
                            <div className="flex items-center justify-between">
                                {permissions.includes("delete_paslon") &&
                                    paslon.id && (
                                        <SecondaryButton
                                            type="button"
                                            className="text-red-600"
                                            onClick={() =>
                                                setConfirmingDeletion(true)
                                            }
                                        >
                                            Hapus
                                        </SecondaryButton>
                                    )}

                                <div className="flex w-full justify-end">
                                    <SecondaryButton onClick={handleCloseForm}>
                                        Batal
                                    </SecondaryButton>

                                    {(permissions.includes("update_paslon") ||
                                        permissions.includes(
                                            "create_paslon"
                                        )) && (
                                        <PrimaryButton
                                            className="ml-3"
                                            disabled={processing}
                                        >
                                            Simpan
                                        </PrimaryButton>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Board>
                </form>
            </Container>

            <Modal
                show={confirmingDeletion}
                onClose={() => setConfirmingDeletion(false)}
                maxWidth="2xl"
            >
                <div className="p-6 flex flex-col items-center">
                    <IconAlertOctagonFilled
                        className="text-red-600 mb-2 animate-pulse"
                        size={32}
                    />
                    <p className="text-center text-gray-700 font-medium">
                        Yakin ingin menghapus Paslon {paslon.candidate?.name}{" "}
                        {paslon?.partner?.name && " & " + paslon.partner.name}
                    </p>
                </div>
                <div className="flex items-center justify-between gap-x-4 bg-gray-100 px-6 py-4">
                    <SecondaryButton
                        type="button"
                        onClick={() => setConfirmingDeletion(false)}
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
            </Modal>
        </DapurLayout>
    );
}
