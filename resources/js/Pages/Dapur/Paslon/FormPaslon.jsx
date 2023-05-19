import Container, {
    Board,
    Section,
    SectionTitle,
} from "@/Components/Container";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextArea from "@/Components/TextArea";
import TextInput from "@/Components/TextInput";
import DapurLayout from "@/Layouts/DapurLayout";
import { Head, router, useForm } from "@inertiajs/react";
import React from "react";

export default function FormPaslon({ paslon = "", pemira = "" }) {
    const { data, setData, post, patch, processing, reset, errors } = useForm({
        no_urut: paslon.no_urut || "",
        items: {
            visi: paslon.items?.visi || "",
            misi: paslon.items?.misi || "",
        },
        photo_path: paslon.photo_path || "",
        candidate: {
            name: paslon.candidate?.name || "",
            profile: {
                angkatan: paslon.candidate?.profile?.angkatan || "",
                fakultas: paslon.candidate?.profile?.fakultas || "",
                organisasi: paslon.candidate?.profile?.organisasi || "",
                pendidikan: paslon.candidate?.profile?.pendidikan || "",
                prestasi: paslon.candidate?.profile?.prestasi || "",
            },
        },
        partner: {
            name: paslon.partner?.name || "",
            profile: {
                angkatan: paslon.partner?.profile?.angkatan || "",
                fakultas: paslon.partner?.profile?.fakultas || "",
                organisasi: paslon.partner?.profile?.organisasi || "",
                pendidikan: paslon.partner?.profile?.pendidikan || "",
                prestasi: paslon.partner?.profile?.prestasi || "",
            },
        },
    });
    console.log(data);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (paslon) {
            patch(route("d.pemira.paslon.update", paslon.id), {
                onSuccess: () => reset(),
            });
        } else {
            post(route("d.pemira.paslon.store", pemira), {
                onSuccess: () => reset(),
            });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const keys = name.split(".");

        setData((prevData) => {
            let updatedData = { ...prevData };
            let currentObj = updatedData;

            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];

                if (i === keys.length - 1) {
                    currentObj[key] = value;
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
        router.visit(route("d.pemira.show", pemira));
    };

    return (
        <DapurLayout header="Paslon">
            <Head title="Paslon" />

            <Container>
                <form onSubmit={handleSubmit}>
                    <Board>
                        <Section>
                            <SectionTitle title="Form Calon Ketua">
                                <div>
                                    <InputLabel
                                        htmlFor="candidate-name"
                                        value="Nama"
                                    />
                                    <TextInput
                                        id="candidate-name"
                                        name="candidate.name"
                                        value={data.candidate.name}
                                        onChange={handleChange}
                                        className="mt-2 block w-full"
                                        required
                                    />
                                    <InputError
                                        message={errors.candidate}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor="candidate-angkatan"
                                        value="Angkatan"
                                    />
                                    <TextInput
                                        id="candidate-angkatan"
                                        name="candidate.profile.angkatan"
                                        type="number"
                                        value={
                                            data.candidate?.profile?.angkatan
                                        }
                                        onChange={handleChange}
                                        className="mt-2 block w-full"
                                        required
                                    />
                                    <InputError
                                        message={errors.candidate}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor="candidate-fakultas"
                                        value="Fakultas"
                                    />
                                    <TextInput
                                        id="candidate-fakultas"
                                        name="candidate.profile.fakultas"
                                        value={
                                            data.candidate?.profile?.fakultas
                                        }
                                        onChange={handleChange}
                                        className="mt-2 block w-full"
                                        required
                                    />
                                    <InputError
                                        message={errors.candidate}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor="candidate-organisasi"
                                        value="Riwayat Organisasi"
                                    />
                                    <TextArea
                                        id="candidate-organisasi"
                                        name="candidate.profile.organisasi"
                                        value={
                                            data.candidate?.profile?.organisasi
                                        }
                                        onChange={handleChange}
                                        className="mt-2 block w-full"
                                    />
                                    <InputError
                                        message={errors.candidate}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor="candidate-pendidikan"
                                        value="Riwayat Pendidikan"
                                    />
                                    <TextArea
                                        id="candidate-pendidikan"
                                        name="candidate.profile.pendidikan"
                                        value={
                                            data.candidate?.profile?.pendidikan
                                        }
                                        onChange={handleChange}
                                        className="mt-2 block w-full"
                                    />
                                    <InputError
                                        message={errors.candidate}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor="candidate-prestasi"
                                        value="Riwayat Prestasi"
                                    />
                                    <TextArea
                                        id="candidate-prestasi"
                                        name="candidate.profile.prestasi"
                                        value={
                                            data.candidate?.profile?.prestasi
                                        }
                                        onChange={handleChange}
                                        className="mt-2 block w-full"
                                    />
                                    <InputError
                                        message={errors.candidate}
                                        className="mt-2"
                                    />
                                </div>
                            </SectionTitle>
                        </Section>

                        <Section>
                            <SectionTitle title="Form Calon Wakil Ketua">
                                <div>
                                    <InputLabel
                                        htmlFor="partner-name"
                                        value="Nama"
                                    />
                                    <TextInput
                                        id="partner-name"
                                        name="partner.name"
                                        value={data.partner?.name}
                                        onChange={handleChange}
                                        className="mt-2 block w-full"
                                        required
                                    />
                                    <InputError
                                        message={errors.partner}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor="partner-angkatan"
                                        value="Angkatan"
                                    />
                                    <TextInput
                                        id="partner-angkatan"
                                        name="partner.profile.angkatan"
                                        type="number"
                                        value={data.partner?.profile?.angkatan}
                                        onChange={handleChange}
                                        className="mt-2 block w-full"
                                        required
                                    />
                                    <InputError
                                        message={errors.partner}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor="partner-fakultas"
                                        value="Fakultas"
                                    />
                                    <TextInput
                                        id="partner-fakultas"
                                        name="partner.profile.fakultas"
                                        value={data.partner?.profile?.fakultas}
                                        onChange={handleChange}
                                        className="mt-2 block w-full"
                                        required
                                    />
                                    <InputError
                                        message={errors.partner}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor="partner-organisasi"
                                        value="Riwayat Organisasi"
                                    />
                                    <TextArea
                                        id="partner-organisasi"
                                        name="partner.profile.organisasi"
                                        value={
                                            data.partner?.profile?.organisasi
                                        }
                                        onChange={handleChange}
                                        className="mt-2 block w-full"
                                    />
                                    <InputError
                                        message={errors.partner}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor="partner-pendidikan"
                                        value="Riwayat Pendidikan"
                                    />
                                    <TextArea
                                        id="partner-pendidikan"
                                        name="partner.profile.pendidikan"
                                        value={
                                            data.partner?.profile?.pendidikan
                                        }
                                        onChange={handleChange}
                                        className="mt-2 block w-full"
                                    />
                                    <InputError
                                        message={errors.partner}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor="partner-prestasi"
                                        value="Riwayat Prestasi"
                                    />
                                    <TextArea
                                        rows="3"
                                        id="partner-prestasi"
                                        name="partner.profile.prestasi"
                                        value={data.partner?.profile?.prestasi}
                                        onChange={handleChange}
                                        className="mt-2 block w-full"
                                    />
                                    <InputError
                                        message={errors.partner}
                                        className="mt-2"
                                    />
                                </div>
                            </SectionTitle>
                        </Section>

                        <Section>
                            <SectionTitle title="Visi & Misi">
                                <div>
                                    <InputLabel htmlFor="visi" value="Visi" />
                                    <TextArea
                                        id="visi"
                                        name="items.visi"
                                        value={data.items?.visi}
                                        onChange={handleChange}
                                        className="mt-2 block w-full"
                                        required
                                    />
                                    <InputError
                                        message={errors.items}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <InputLabel htmlFor="misi" value="Misi" />
                                    <TextArea
                                        id="misi"
                                        name="items.misi"
                                        value={data.items?.misi}
                                        onChange={handleChange}
                                        className="mt-2 block w-full"
                                        required
                                    />
                                    <InputError
                                        message={errors.items}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="no_urut"
                                        value="No Urut"
                                    />
                                    <TextInput
                                        id="no_urut"
                                        type="number"
                                        name="no_urut"
                                        value={data.no_urut}
                                        onChange={(e) =>
                                            setData("no_urut", e.target.value)
                                        }
                                        className="mt-2 block w-full"
                                        required
                                    />
                                    <InputError
                                        message={errors.no_urut}
                                        className="mt-2"
                                    />
                                </div>
                            </SectionTitle>
                        </Section>

                        <Section className="mt-8 bg-slate-50">
                            <div className="flex items-center justify-end">
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
                        </Section>
                    </Board>
                </form>
            </Container>
        </DapurLayout>
    );
}
