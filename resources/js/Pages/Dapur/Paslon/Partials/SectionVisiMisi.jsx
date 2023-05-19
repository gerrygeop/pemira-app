import { SectionTitle } from "@/Components/Container";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextArea from "@/Components/TextArea";
import TextInput from "@/Components/TextInput";

export default function SectionVisiMisi({ data, handleChange, errors }) {
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
        </SectionTitle>
    );
}
