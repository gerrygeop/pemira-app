import { SectionTitle } from "@/Components/Container";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextArea from "@/Components/TextArea";
import TextInput from "@/Components/TextInput";

export default function SectionPartner({ data, handleChange, errors }) {
    return (
        <SectionTitle title="Form Calon Wakil Ketua">
            <div>
                <InputLabel htmlFor="partner-name" value="Nama" />
                <TextInput
                    id="partner-name"
                    name="partner.name"
                    value={data.partner?.name}
                    onChange={handleChange}
                    className="mt-2 block w-full"
                    required
                />
                <InputError message={errors.partner} className="mt-2" />
            </div>
            <div>
                <InputLabel htmlFor="partner-angkatan" value="Angkatan" />
                <TextInput
                    id="partner-angkatan"
                    name="partner.profile.angkatan"
                    type="number"
                    value={data.partner?.profile?.angkatan}
                    onChange={handleChange}
                    className="mt-2 block w-full"
                    required
                />
                <InputError message={errors.partner} className="mt-2" />
            </div>
            <div>
                <InputLabel htmlFor="partner-fakultas" value="Fakultas" />
                <TextInput
                    id="partner-fakultas"
                    name="partner.profile.fakultas"
                    value={data.partner?.profile?.fakultas}
                    onChange={handleChange}
                    className="mt-2 block w-full"
                    required
                />
                <InputError message={errors.partner} className="mt-2" />
            </div>
            <div>
                <InputLabel
                    htmlFor="partner-organisasi"
                    value="Riwayat Organisasi"
                />
                <TextArea
                    id="partner-organisasi"
                    name="partner.profile.organisasi"
                    value={data.partner?.profile?.organisasi || ""}
                    onChange={handleChange}
                    className="mt-2 block w-full"
                />
                <InputError message={errors.partner} className="mt-2" />
            </div>
            <div>
                <InputLabel
                    htmlFor="partner-pendidikan"
                    value="Riwayat Pendidikan"
                />
                <TextArea
                    id="partner-pendidikan"
                    name="partner.profile.pendidikan"
                    value={data.partner?.profile?.pendidikan || ""}
                    onChange={handleChange}
                    className="mt-2 block w-full"
                />
                <InputError message={errors.partner} className="mt-2" />
            </div>
            <div>
                <InputLabel
                    htmlFor="partner-prestasi"
                    value="Riwayat Prestasi"
                />
                <TextArea
                    id="partner-prestasi"
                    name="partner.profile.prestasi"
                    value={data.partner?.profile?.prestasi || ""}
                    onChange={handleChange}
                    className="mt-2 block w-full"
                />
                <InputError message={errors.partner} className="mt-2" />
            </div>
        </SectionTitle>
    );
}
