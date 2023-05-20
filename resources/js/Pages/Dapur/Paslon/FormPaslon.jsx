import Container, { Board, Section } from "@/Components/Container";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import DapurLayout from "@/Layouts/DapurLayout";
import { Head, router, useForm } from "@inertiajs/react";
import SectionVisiMisi from "./Partials/SectionVisiMisi";
import SectionCandidate from "./Partials/SectionCandidate";
import SectionPartner from "./Partials/SectionPartner";

export default function FormPaslon({ paslon = "", pemira = "", can }) {
    const {
        data,
        setData,
        post,
        put,
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
                    : "",
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
                    : "",
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
                        <Section>
                            <SectionCandidate
                                data={data}
                                handleChange={handleChange}
                                errors={errors}
                            />
                        </Section>

                        <Section>
                            <SectionPartner
                                data={data}
                                handleChange={handleChange}
                                errors={errors}
                            />
                        </Section>

                        <Section>
                            <SectionVisiMisi
                                data={data}
                                handleChange={handleChange}
                                errors={errors}
                                photo={paslon?.photo_path || ""}
                            />
                        </Section>

                        <Section className="mt-8 bg-slate-50">
                            <div className="flex items-center justify-between">
                                {can?.delete_paslon && (
                                    <SecondaryButton
                                        type="button"
                                        className="text-red-600"
                                        onClick={(e) => onDelete(e)}
                                    >
                                        Hapus
                                    </SecondaryButton>
                                )}
                                <div className="flex w-full justify-end">
                                    <SecondaryButton onClick={handleCloseForm}>
                                        Batal
                                    </SecondaryButton>

                                    <PrimaryButton
                                        className="ml-3"
                                        disabled={processing}
                                    >
                                        Simpan
                                    </PrimaryButton>
                                </div>
                            </div>
                        </Section>
                    </Board>
                </form>
            </Container>
        </DapurLayout>
    );
}
