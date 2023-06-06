import GuestLayout from "@/Layouts/GuestLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { Link, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import SecondaryButton from "@/Components/SecondaryButton";

export default function OneTimePassword({ flash }) {
    const { data, setData, post, errors, processing } = useForm({
        token: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("otp.store"));
    };

    const logout = (e) => {
        e.preventDefault();
        post(route("logout"));
    };

    return (
        <GuestLayout>
            <div className="mb-3">
                {flash.status === "resend" && (
                    <div className="text-sm text-amber-600">
                        Kode telah dikirim ulang
                    </div>
                )}
                {flash.status === "invalid" && (
                    <div className="text-sm text-red-600">
                        Kode OTP tidak cocok
                    </div>
                )}
                {errors.token && (
                    <div className="text-sm text-red-600">{errors.token}</div>
                )}
            </div>

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="token" value="Kode OTP" />

                    <TextInput
                        id="token"
                        name="token"
                        value={data.token}
                        className="mt-1 block w-full"
                        onChange={(e) => setData("token", e.target.value)}
                        required
                        isFocused={true}
                    />
                </div>

                <div className="mt-4 flex items-center justify-between">
                    <Link
                        href={route("otp.resend")}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Kirim ulang kode
                    </Link>
                </div>

                <div className="mt-8 flex items-center justify-between">
                    <SecondaryButton onClick={(e) => logout(e)}>
                        Log Out
                    </SecondaryButton>

                    <PrimaryButton disabled={processing}>Submit</PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
