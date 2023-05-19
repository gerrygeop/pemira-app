import { SectionTitle } from "@/Components/Container";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextArea from "@/Components/TextArea";
import TextInput from "@/Components/TextInput";

export default function SectionCandidate({ data, handleChange, errors }) {
    return (
        <SectionTitle title="Form Calon Ketua">
            <div>
                <InputLabel htmlFor="candidate-name" value="Nama" />
                <TextInput
                    id="candidate-name"
                    name="candidate.name"
                    value={data.candidate.name}
                    onChange={handleChange}
                    className="mt-2 block w-full"
                    required
                    isFocused
                />
                <InputError message={errors.candidate} className="mt-2" />
            </div>
            <div>
                <InputLabel htmlFor="candidate-angkatan" value="Angkatan" />
                <TextInput
                    id="candidate-angkatan"
                    name="candidate.profile.angkatan"
                    type="number"
                    value={data.candidate?.profile?.angkatan || ""}
                    onChange={handleChange}
                    className="mt-2 block w-full"
                    required
                />
                <InputError message={errors.candidate} className="mt-2" />
            </div>
            <div>
                <InputLabel htmlFor="candidate-fakultas" value="Fakultas" />
                <TextInput
                    id="candidate-fakultas"
                    name="candidate.profile.fakultas"
                    value={data.candidate?.profile?.fakultas || ""}
                    onChange={handleChange}
                    className="mt-2 block w-full"
                    required
                />
                <InputError message={errors.candidate} className="mt-2" />
            </div>
            <div>
                <InputLabel
                    htmlFor="candidate-organisasi"
                    value="Riwayat Organisasi"
                />
                <TextArea
                    id="candidate-organisasi"
                    name="candidate.profile.organisasi"
                    value={data.candidate?.profile?.organisasi || ""}
                    onChange={handleChange}
                    className="mt-2 block w-full"
                />
                <InputError message={errors.candidate} className="mt-2" />
            </div>
            <div>
                <InputLabel
                    htmlFor="candidate-pendidikan"
                    value="Riwayat Pendidikan"
                />
                <TextArea
                    id="candidate-pendidikan"
                    name="candidate.profile.pendidikan"
                    value={data.candidate?.profile?.pendidikan || ""}
                    onChange={handleChange}
                    className="mt-2 block w-full"
                />
                <InputError message={errors.candidate} className="mt-2" />
            </div>
            <div>
                <InputLabel
                    htmlFor="candidate-prestasi"
                    value="Riwayat Prestasi"
                />
                <TextArea
                    id="candidate-prestasi"
                    name="candidate.profile.prestasi"
                    value={data.candidate?.profile?.prestasi || ""}
                    onChange={handleChange}
                    className="mt-2 block w-full"
                />
                <InputError message={errors.candidate} className="mt-2" />
            </div>
        </SectionTitle>
    );
}
