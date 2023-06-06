import DangerButton from "@/Components/DangerButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { IconAlertOctagonFilled } from "@tabler/icons-react";
import React, { useState } from "react";

export default function FormRole({ closeModal, permissions, role }) {
    const {
        data,
        setData,
        post,
        patch,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        name: role ? role.name : "",
        permissions: role ? role.permissions.map((p) => p.id) : [],
    });

    const [confirmingDeletion, setConfirmingDeletion] = useState(false);

    const onStore = (e) => {
        e.preventDefault();
        post(route("d.roles.store"), {
            onSuccess: () => handleCloseModal(),
        });
    };

    const onUpdate = (e) => {
        e.preventDefault();
        patch(route("d.roles.update", role.id), {
            onSuccess: () => handleCloseModal(),
        });
    };

    const onDelete = (e) => {
        e.preventDefault();
        let roleName = role.name;
        destroy(route("d.roles.destroy", role.id), {
            onSuccess: () => handleCloseModal(),
        });
    };

    const handleCloseModal = () => {
        closeModal();
        reset();
    };

    const handlePermissionChange = (e, permissionId) => {
        const isChecked = e.target.checked;
        let updatedPermissions = [...data.permissions];

        if (isChecked) {
            updatedPermissions.push(permissionId);
        } else {
            updatedPermissions = updatedPermissions.filter(
                (permission_id) => permission_id !== permissionId
            );
        }

        setData("permissions", updatedPermissions);
    };

    return (
        <div>
            {confirmingDeletion ? (
                <>
                    <div className="p-6 flex flex-col items-center">
                        <IconAlertOctagonFilled
                            className="text-red-600 animate-pulse mb-2"
                            size={32}
                        />
                        <p className="text-center text-gray-700 font-medium">
                            Yakin ingin menghapus role {role?.name}
                        </p>
                    </div>
                    <div className="flex items-center justify-between gap-x-4 bg-gray-100 px-6 py-4">
                        <SecondaryButton
                            type="button"
                            onClick={() => {
                                handleCloseModal();
                                setConfirmingDeletion(false);
                            }}
                        >
                            Batal
                        </SecondaryButton>
                        <DangerButton
                            type="button"
                            onClick={(e) => onDelete(e)}
                            disabled={processing}
                        >
                            Hapus
                        </DangerButton>
                    </div>
                </>
            ) : (
                <form onSubmit={role ? onUpdate : onStore} className="p-6">
                    <div className="mt-2">
                        <InputLabel htmlFor="name" value="Nama Role" />

                        <TextInput
                            id="name"
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="mt-2 block w-full"
                            isFocused
                        />

                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="mt-6">
                        <InputLabel htmlFor="permissions" value="Permissions" />

                        <div className="mt-2 grid grid-cols-2 lg:grid-cols-3 gap-2">
                            {permissions.map((permission, i) => (
                                <div key={i} className="col-span-1">
                                    <label
                                        htmlFor={`permission-${permission.id}`}
                                        className="inline-flex items-center"
                                    >
                                        <TextInput
                                            id={`permission-${permission.id}`}
                                            type="checkbox"
                                            name="permissions"
                                            value={permission.id}
                                            checked={data.permissions.includes(
                                                permission.id
                                            )}
                                            onChange={(e) =>
                                                handlePermissionChange(
                                                    e,
                                                    permission.id
                                                )
                                            }
                                            className="h-5 w-5 text-amber-500"
                                        />
                                        <span className="ml-2">
                                            {permission.name}
                                        </span>
                                    </label>
                                </div>
                            ))}
                        </div>

                        <InputError
                            message={errors.permissions}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-8 flex items-center justify-between">
                        {role && (
                            <button
                                type="button"
                                className="text-red-600 hover:underline"
                                onClick={() => setConfirmingDeletion(true)}
                            >
                                Hapus
                            </button>
                        )}

                        <div className="flex items-center w-full justify-end">
                            <SecondaryButton onClick={handleCloseModal}>
                                Batal
                            </SecondaryButton>

                            <PrimaryButton
                                className="ml-3"
                                disabled={processing}
                            >
                                Simpan
                            </PrimaryButton>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
}
