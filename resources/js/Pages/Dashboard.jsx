import CardPaslon from "@/Components/CardPaslon";
import Container from "@/Components/Container";
import DateTime from "@/Components/DateTime";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { IconCheckbox, IconClockHour5 } from "@tabler/icons-react";
import { useState } from "react";
import DetailPaslon from "./Dapur/Paslon/DetailPaslon";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";
import { toast } from "react-toastify";

export default function Dashboard({ collections }) {
    const { data, setData, post, processing, errors } = useForm({
        pemira: {},
    });

    console.log(errors.pemira);

    const [showModal, setShowModal] = useState(false);
    const [paslon, setPaslon] = useState("");

    const submit = (e) => {
        e.preventDefault();
        post(route("vote"), {
            onError: () => toastMessage(),
        });
    };

    const showingModal = (e, paslon) => {
        e.preventDefault();
        setPaslon(paslon);
        setShowModal(true);
    };

    const closeModal = () => {
        setPaslon("");
        setShowModal(false);
    };

    const toastMessage = () => {
        toast.error(errors.pemira || "Gagal melakukan voting", {
            autoClose: 3000,
            pauseOnHover: false,
        });
    };

    return (
        <AuthenticatedLayout header="Dashboard">
            <Container>
                <form onSubmit={submit}>
                    {collections.map((pemira) => (
                        <div key={pemira.id}>
                            <div className="p-6 md:px-20 text-center">
                                <div className="mb-2 md:mb-4">
                                    <h1 className="font-medium uppercase text-2xl lg:text-3xl text-gray-800">
                                        {pemira.nama_pemira}
                                    </h1>

                                    {pemira.keterangan && (
                                        <p className="text-gray-600 mt-2">
                                            {pemira.keterangan}
                                        </p>
                                    )}
                                </div>

                                <div className="flex flex-col sm:flex-row items-center justify-center">
                                    <div className="flex items-center text-gray-600">
                                        <IconClockHour5 className="w-5 h-5" />
                                        <span className="ml-1">Selesai:</span>
                                    </div>

                                    <h6 className="text-gray-700 font-medium ml-0 md:ml-3">
                                        <DateTime
                                            datetime={pemira?.finished_at}
                                        />
                                    </h6>
                                </div>
                            </div>

                            <div className="flex justify-center flex-wrap mt-6">
                                {pemira.paslon.map((paslon) => (
                                    <CardPaslon
                                        key={paslon.id}
                                        paslon={paslon}
                                        detailPaslon={showingModal}
                                        data={data}
                                        setData={setData}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}

                    <div className="flex items-center justify-center mt-10">
                        <PrimaryButton
                            className="w-52 pl-2.5"
                            disabled={processing}
                        >
                            <IconCheckbox className="w-5 h-5 mr-2" />
                            Submit
                        </PrimaryButton>
                    </div>
                </form>
            </Container>

            <Modal show={showModal} onClose={closeModal} maxWidth="4xl">
                <div className="md:p-6">
                    {paslon && (
                        <div className="grid grid-cols-1 gap-y-6 h-[28rem] md:h-[38rem] overflow-y-auto">
                            <div className="col-span-full flex p-2 md:p-0">
                                <h3 className="text-base font-medium bg-amber-500 text-gray-900 py-1.5 px-2 rounded-lg">
                                    No {paslon.no_urut}
                                </h3>
                            </div>

                            <div className="col-span-full">
                                <div className="mb-3 px-4 md:px-0">
                                    <h3 className="text-lg font-medium leading-7 text-gray-900">
                                        Visi & Misi
                                    </h3>
                                </div>
                                <div className="border-t border-gray-100">
                                    <dl className="divide-y divide-gray-100">
                                        <div className="px-4 py-2 md:p-4 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
                                            <dt className="text-sm leading-6 text-gray-600">
                                                Visi
                                            </dt>
                                            <dd className="mt-1 leading-6 text-gray-900 sm:col-span-4 sm:mt-0">
                                                {
                                                    JSON.parse(paslon?.items)
                                                        ?.visi
                                                }
                                            </dd>
                                        </div>
                                        <div className="px-4 py-2 md:p-4 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
                                            <dt className="text-sm leading-6 text-gray-600">
                                                Misi
                                            </dt>
                                            <dd className="mt-1 leading-6 text-gray-900 sm:col-span-4 sm:mt-0">
                                                <p className="whitespace-pre">
                                                    {
                                                        JSON.parse(
                                                            paslon?.items
                                                        )?.misi
                                                    }
                                                </p>
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <div className="mb-3 px-4 md:px-0">
                                    <h3 className="text-lg font-medium leading-7 text-gray-900">
                                        Calon Ketua
                                    </h3>
                                </div>
                                <DetailPaslon paslon={paslon.candidate} />
                            </div>

                            <div className="col-span-full">
                                <div className="mb-3 px-4 md:px-0">
                                    <h3 className="text-lg font-medium leading-7 text-gray-900">
                                        Calon Wakil Ketua
                                    </h3>
                                </div>
                                <DetailPaslon paslon={paslon.partner} />
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-end gap-x-4 bg-gray-100 px-6 py-4">
                    <SecondaryButton type="button" onClick={closeModal}>
                        Tutup
                    </SecondaryButton>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
