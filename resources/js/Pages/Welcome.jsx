import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { IconDiscountCheckFilled, IconLoader2 } from "@tabler/icons-react";
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
                        <div className="col-span-full flex justify-start items-center gap-x-2.5 mb-8 lg:mb-20 h-16">
                            <img
                                src="/image/Logo-UNMUL.png"
                                alt="Logo UNMUL"
                                className="h-14 md:h-16 shrink-0"
                            />
                            <img
                                src="/image/logo-dpm-km.png"
                                alt="Logo"
                                className="h-14 md:h-16 shrink-0"
                            />
                            <img
                                src="/image/logo-bawasra.png"
                                alt="Logo"
                                className="h-14 md:h-16 shrink-0"
                            />
                            <img
                                src="/image/logo-kppr.png"
                                alt="Logo"
                                className="h-14 md:h-16 shrink-0"
                            />
                            <img
                                src="/image/logo-itp.png"
                                alt="Logo"
                                className="h-14 md:h-16 shrink-0"
                            />
                        </div>

                        <div className="mb-4 md:mb-0 md:col-span-2 flex flex-col justify-center text-slate-800">
                            <h2 className="text-3xl lg:text-5xl font-semibold uppercase">
                                Pemilihan Umum Raya <br /> Universitas
                                Mulawarman
                            </h2>
                            <p className="mt-3 md:w-3/4 lg:text-xl text-gray-70">
                                Pemira adalah sebuah pesta demokrasi kampus
                                dalam rangka pemilihan Presiden dan Wakil
                                Presiden BEM yang diselenggarakan secara
                                langsung, umum, bebas, rahasia, jujur, dan adil.
                            </p>

                            <div className="mt-4 flex flex-col sm:flex-row">
                                <a
                                    href="https://www.instagram.com/p/CtfxBsjPHtN/?igshid=MzRlODBiNWFlZA=="
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center py-2 px-3 gap-x-1 text-white text-sm shadow bg-green-600 hover:bg-green-700 focus:outline-none tracking-wide capitalize rounded-md sm:w-1/5 md:w-1/4"
                                >
                                    <span>Tutorial Pemilihan</span>
                                </a>
                            </div>
                        </div>

                        <div className="w-full px-4 md:px-6 py-4 bg-white shadow-md overflow-hidden rounded-lg">
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
                                                    "Kode OTP telah kedaluwarsa. Silahkan login ulang."}
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
                                                required
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
                                                required
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
                                                required
                                                onChange={(e) =>
                                                    setData(
                                                        "password",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>

                                        <div className="flex items-center justify-end mt-4 anima">
                                            <PrimaryButton
                                                className="ml-4"
                                                disabled={processing}
                                            >
                                                {processing ? (
                                                    <>
                                                        Loading
                                                        <span className="animate-spin">
                                                            <IconLoader2 className="w-4 h-4 ml-1" />
                                                        </span>
                                                    </>
                                                ) : (
                                                    "Log in"
                                                )}
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
