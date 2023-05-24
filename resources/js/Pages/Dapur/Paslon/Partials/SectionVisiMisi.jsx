import { SectionTitle } from "@/Components/Container";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextArea from "@/Components/TextArea";
import TextInput from "@/Components/TextInput";
import { useState } from "react";

export default function SectionVisiMisi({ ...props }) {
    const { data, handleChange, errors, photo, permissions } = props;

    const [file, setFile] = useState(
        photo ? "/storage/foto-paslon/" + photo : ""
    );

    const previewImage = (e) => {
        setFile(URL.createObjectURL(e.target.files[0]));
        handleChange(e, true);
    };
    return (
        <SectionTitle title="Visi & Misi">
            <div>
                <InputLabel htmlFor="visi" value="Visi" />
                <TextArea
                    id="visi"
                    name="items.visi"
                    value={data.items?.visi || ""}
                    onChange={handleChange}
                    className="mt-2 block w-full"
                    required
                />
                <InputError message={errors.items} className="mt-2" />
            </div>
            <div>
                <InputLabel htmlFor="misi" value="Misi" />
                <TextArea
                    id="misi"
                    name="items.misi"
                    value={data.items?.misi || ""}
                    onChange={handleChange}
                    className="mt-2 block w-full"
                    required
                />
                <InputError message={errors.items} className="mt-2" />
            </div>
            <div>
                <InputLabel htmlFor="no_urut" value="No Urut" />
                <TextInput
                    id="no_urut"
                    type="number"
                    name="no_urut"
                    value={data.no_urut}
                    onChange={handleChange}
                    className="mt-2 block w-full"
                    required
                />
                <InputError message={errors.no_urut} className="mt-2" />
            </div>

            {permissions.includes("update_paslon") && (
                <div>
                    <InputLabel htmlFor="photo_path" value="Foto Paslon" />
                    <input
                        type="file"
                        id="photo_path"
                        name="photo_path"
                        onChange={(e) => previewImage(e)}
                        className="mt-2 w-full text-sm text-slate-500 bg-slate-100 p-2 border rounded-md file:font-firasans file:mr-4 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-sm file:font-medium file:tracking-wider file:bg-gray-700 file:text-gray-50 hover:file:bg-gray-800 focus:outline-none"
                    />
                    <InputError message={errors.photo_path} className="mt-2" />
                </div>
            )}

            {file && (
                <div>
                    <img
                        src={file}
                        className="max-h-52 w-auto shadow-sm border"
                    />
                </div>
            )}
        </SectionTitle>
    );
}
