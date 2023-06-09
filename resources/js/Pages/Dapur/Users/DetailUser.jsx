import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import React from "react";

export const DetailUser = ({ user, closeModal, showUser }) => {
    return (
        <Modal show={showUser} onClose={closeModal}>
            <div className="px-2 py-4 md:p-6">
                {user && (
                    <>
                        <div className="mb-3 px-4 md:px-0">
                            <h3 className="text-lg font-medium leading-7 text-gray-900">
                                {user.name}
                            </h3>
                        </div>
                        <div className="border-t border-gray-100">
                            <dl className="divide-y divide-gray-100">
                                <div className="px-4 py-2 md:p-4 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
                                    <dt className="text-sm leading-6 text-gray-600">
                                        NIM
                                    </dt>
                                    <dd className="mt-1 leading-6 text-gray-900 sm:col-span-4 sm:mt-0">
                                        {user.nim}
                                    </dd>
                                </div>
                                <div className="px-4 py-2 md:p-4 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
                                    <dt className="text-sm leading-6 text-gray-600">
                                        Email
                                    </dt>
                                    <dd className="mt-1 leading-6 text-gray-900 sm:col-span-4 sm:mt-0">
                                        {user.email}
                                    </dd>
                                </div>
                                <div className="px-4 py-2 md:p-4 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
                                    <dt className="text-sm leading-6 text-gray-600">
                                        Fakultas
                                    </dt>
                                    <dd className="mt-1 leading-6 text-gray-900 sm:col-span-4 sm:mt-0 capitalize">
                                        {user?.department?.faculty?.name}
                                    </dd>
                                </div>
                                <div className="px-4 py-2 md:p-4 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
                                    <dt className="text-sm leading-6 text-gray-600">
                                        Angkatan
                                    </dt>
                                    <dd className="mt-1 leading-6 text-gray-900 sm:col-span-4 sm:mt-0">
                                        {user.academic_year}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </>
                )}
            </div>
            <div className="flex items-center justify-end gap-x-4 bg-gray-100 px-6 py-4">
                <SecondaryButton type="button" onClick={closeModal}>
                    Tutup
                </SecondaryButton>
            </div>
        </Modal>
    );
};
