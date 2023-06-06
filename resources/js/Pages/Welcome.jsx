import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, useForm } from "@inertiajs/react";
import { IconDiscountCheckFilled } from "@tabler/icons-react";
import { useEffect } from "react";

export default function Welcome({ flash }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        nim: "",
        password: "",
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <div className="bg-image">
            <div className="min-h-screen flex flex-col text-gray-900 bg-gradient-to-br from-yellow-500 to-[#f5df48]/50 bg-opacity-90 backdrop-blur-[3px] font-custom antialiased">
                <div className="max-w-7xl mx-auto flex-auto py-10 px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-2">
                        <div className="col-span-full flex justify-between items-center mb-8 lg:mb-20 h-16">
                            <img
                                src="/image/Logo-UNMUL.png"
                                alt="Logo UNMUL"
                                className="h-16 flex-shrink-0"
                            />
                        </div>

                        <div className="mb-4 md:mb-0 md:col-span-2 flex flex-col justify-center text-slate-800">
                            <h2 className="text-5xl font-semibold uppercase">
                                Pemilihan Umum Raya <br /> universitas
                                mulawarman
                            </h2>
                            <p className="mt-3 md:w-3/4 text-lg text-gray-70">
                                PEMIRA adalah pesta demokrasi mahasiswa dalam
                                rangka pemilihan Presiden dan Wakil Presiden BEM
                                Fakultas Ilmu Sosial dan Ilmu Politik
                                Universitas Mularman.
                            </p>

                            <div className="mt-4 flex flex-col sm:flex-row">
                                <Link
                                    href="https://www.instagram.com/reel/ClmmO_QDga9/?igshid=YmMyMTA2M2Y="
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center py-2 px-3 gap-x-1 text-white text-sm shadow bg-green-600 hover:bg-green-700 focus:outline-none tracking-wide capitalize rounded-md sm:w-1/5 md:w-1/4"
                                >
                                    <span>Tutorial Pemilihan</span>
                                </Link>
                            </div>
                        </div>

                        <div className="w-full px-6 py-4 bg-white shadow-md overflow-hidden rounded-lg">
                            {flash.status === "success" ? (
                                <div className="text-center h-full flex flex-col items-center justify-center">
                                    <IconDiscountCheckFilled
                                        className="text-amber-500"
                                        size={52}
                                    />
                                    <h3 className="text-2xl text-gray-800 font-semibold my-2">
                                        Voting berhasil!
                                    </h3>
                                    <p className="text-lg text-gray-700">
                                        Terima kasih telah berpartisipasi!
                                        <br />
                                        Suara Anda sangat berarti dalam
                                        pemilihan.
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <div className="mb-4 py-2">
                                        <h2 className="text-2xl font-semibold text-gray-700">
                                            Log In
                                        </h2>

                                        <div className="mt-2">
                                            <p className="text-sm text-red-600">
                                                {flash.status === "expired" &&
                                                    "Kode telah kedaluwarsa. Silahkan login kembali."}
                                                {flash.status === "invalid" &&
                                                    "Kode OTP tidak valid!"}
                                                {errors.email && errors.email}
                                            </p>
                                        </div>
                                    </div>

                                    <form onSubmit={submit}>
                                        <div>
                                            <InputLabel
                                                htmlFor="email"
                                                value="Email"
                                            />

                                            <TextInput
                                                id="email"
                                                type="email"
                                                name="email"
                                                value={data.email}
                                                className="mt-1 block w-full"
                                                autoComplete="username"
                                                isFocused={true}
                                                onChange={(e) =>
                                                    setData(
                                                        "email",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>

                                        <div className="mt-4">
                                            <InputLabel
                                                htmlFor="nim"
                                                value="NIM"
                                            />

                                            <TextInput
                                                id="nim"
                                                name="nim"
                                                value={data.nim}
                                                className="mt-1 block w-full"
                                                autoComplete="username"
                                                onChange={(e) =>
                                                    setData(
                                                        "nim",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>

                                        <div className="mt-4">
                                            <InputLabel
                                                htmlFor="password"
                                                value="Password"
                                            />

                                            <TextInput
                                                id="password"
                                                type="password"
                                                name="password"
                                                value={data.password}
                                                className="mt-1 block w-full"
                                                autoComplete="current-password"
                                                onChange={(e) =>
                                                    setData(
                                                        "password",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>

                                        <div className="flex items-center justify-end mt-4">
                                            <PrimaryButton
                                                className="ml-4"
                                                disabled={processing}
                                            >
                                                Log in
                                            </PrimaryButton>
                                        </div>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
