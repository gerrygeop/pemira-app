import SecondaryButton from "@/Components/SecondaryButton";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import DapurLayout from "@/Layouts/DapurLayout";
import { Link } from "@inertiajs/react";

export default function Edit({ panitia, pemira, roles, flash }) {
    return (
        <DapurLayout header="Panitia">
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="my-6 flex">
                        <Link href={route("d.pemira.show", pemira)}>
                            <SecondaryButton>Kembali</SecondaryButton>
                        </Link>
                    </div>
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdateProfileInformationForm
                            user={panitia}
                            roles={roles}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdatePasswordForm
                            user={panitia}
                            className="max-w-xl"
                            status={flash.status}
                        />
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <DeleteUserForm
                            user={panitia}
                            pemira={pemira}
                            className="max-w-xl"
                            status={flash.status}
                        />
                    </div>
                </div>
            </div>
        </DapurLayout>
    );
}
