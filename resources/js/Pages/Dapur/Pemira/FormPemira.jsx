import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import React from "react";
import "flatpickr/dist/themes/airbnb.css";
import Flatpickr from "react-flatpickr";
import { Indonesian } from "flatpickr/dist/l10n/id.js";
import { toast } from "react-toastify";
import TextArea from "@/Components/TextArea";

export default function FormPemira({ onCancel = () => {}, pemira = "" }) {
    const { data, setData, post, patch, processing, reset, errors } = useForm({
        nama_pemira: pemira ? pemira.nama_pemira : "",
        activated_at: pemira ? pemira.activated_at : "",
        finished_at: pemira ? pemira.finished_at : "",
        keterangan: pemira ? pemira?.keterangan : "",
    });

    const onChangeDates = (date_at) => {
        let date = new Date(date_at);
        let formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${date
            .getDate()
            .toString()
            .padStart(2, "0")} ${date
            .getHours()
            .toString()
            .padStart(2, "0")}:${date
            .getMinutes()
            .toString()
            .padStart(2, "0")}`;
        return formattedDate;
    };

    const onStore = (e) => {
        e.preventDefault();
        post(route("d.pemira.store"), {
            onSuccess: () => {
                handleCloseForm();
                toastMessage(`Berhasil membuat Pemira`);
            },
        });
    };

    const onUpdate = (e) => {
        e.preventDefault();
        patch(route("d.pemira.update", pemira.id), {
            onSuccess: () => handleCloseForm(),
        });
    };

    const handleCloseForm = () => {
        onCancel();
        reset();
    };

    const toastMessage = (message) => {
        toast.success(message, {
            autoClose: 3000,
            pauseOnHover: false,
        });
    };

    return (
        <form onSubmit={pemira ? onUpdate : onStore}>
            <div className="mt-2">
                <InputLabel htmlFor="nama_pemira" value="Nama Pemira" />

                <TextInput
                    id="nama_pemira"
                    type="text"
                    name="nama_pemira"
                    value={data.nama_pemira}
                    onChange={(e) => setData("nama_pemira", e.target.value)}
                    className="mt-2 block w-full"
                    isFocused
                    required
                />

                <InputError message={errors.nama_pemira} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="activated_at" value="Waktu Mulai" />
                <Flatpickr
                    data-enable-time
                    value={data.activated_at}
                    onChange={([date]) => {
                        let formatDate = onChangeDates(date);
                        setData("activated_at", formatDate);
                    }}
                    options={{
                        dateFormat: "Y-m-d H:i",
                        enableTime: true,
                        altInput: true,
                        locale: Indonesian,
                        altFormat: "j F Y, H:i",
                    }}
                    className="mt-2 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                    placeholder="Pilih waktu mulai"
                    required
                />

                <InputError message={errors.activated_at} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="finished_at" value="Waktu Selesai" />
                <Flatpickr
                    data-enable-time
                    value={data.finished_at}
                    onChange={([date]) => {
                        let formatDate = onChangeDates(date);
                        setData("finished_at", formatDate);
                    }}
                    options={{
                        dateFormat: "Y-m-d H:i",
                        enableTime: true,
                        altInput: true,
                        locale: Indonesian,
                        altFormat: "j F Y, H:i",
                    }}
                    className="mt-2 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                    placeholder="Pilih waktu selesai"
                    required
                />

                <InputError message={errors.finished_at} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="keterangan">
                    Keterangan{" "}
                    <span className="font-normal text-gray-500 italic">
                        (opsional)
                    </span>
                </InputLabel>

                <TextArea
                    id="keterangan"
                    name="keterangan"
                    value={data.keterangan ?? ""}
                    onChange={(e) => setData("keterangan", e.target.value)}
                    className="mt-2 block w-full"
                ></TextArea>

                <InputError message={errors.keterangan} className="mt-2" />
            </div>

            <div className="mt-8 flex items-center justify-end">
                <SecondaryButton onClick={handleCloseForm}>
                    Batal
                </SecondaryButton>

                <PrimaryButton className="ml-3" disabled={processing}>
                    Simpan
                </PrimaryButton>
            </div>
        </form>
    );
}
