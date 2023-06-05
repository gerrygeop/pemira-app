import { Board, Section } from "@/Components/Container";
import Modal from "@/Components/Modal";
import Table from "@/Components/Table";
import { useState } from "react";
import { IconPlus } from "@tabler/icons-react";
import PrimaryButton from "@/Components/PrimaryButton";
import Register from "@/Pages/Dapur/Panitia/Partials/Register";
import { router, usePage } from "@inertiajs/react";

export default function TablePanitia({ pemira, roles }) {
    const { auth } = usePage().props;
    const permissions = auth.user?.permission;

    const [isShowingForm, setIsShowingForm] = useState(false);

    const handleRowClick = (panitia) => {
        if (permissions.includes("update_admin")) {
            router.visit(route("d.pemira.panitia.edit", [pemira, panitia]));
        }
    };

    const closeModal = () => {
        setIsShowingForm(false);
    };

    return (
        <>
            <Board>
                <Section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl text-gray-800 font-medium">
                            Daftar Panitia
                        </h2>
                        {pemira?.status !== "finished" &&
                            permissions.includes("create_admin") && (
                                <PrimaryButton
                                    type="button"
                                    onClick={() => setIsShowingForm(true)}
                                >
                                    <IconPlus className="w-5 h-5 -ml-0.5 mr-1.5" />
                                    Panitia
                                </PrimaryButton>
                            )}
                    </div>
                    <Table>
                        <Table.Thead>
                            <tr>
                                <Table.Th scope="col">Nama</Table.Th>
                                <Table.Th scope="col">Username</Table.Th>
                                <Table.Th scope="col">Role</Table.Th>
                            </tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {pemira.admins.length > 0 ? (
                                pemira.admins.map((panitia) => (
                                    <tr
                                        key={panitia.id}
                                        role="button"
                                        onClick={() => handleRowClick(panitia)}
                                        className="cursor-pointer hover:bg-slate-50"
                                    >
                                        <Table.Td className="capitalize font-medium text-gray-800">
                                            {panitia.name}
                                        </Table.Td>
                                        <Table.Td>{panitia.username}</Table.Td>
                                        <Table.Td>
                                            {panitia.roles.length > 0 ? (
                                                <span className="px-1 mr-1.5 bg-indigo-50 text-sm text-indigo-800 uppercase ring-1 ring-indigo-600/20 rounded">
                                                    {panitia.roles[0].name}
                                                </span>
                                            ) : (
                                                "-"
                                            )}
                                        </Table.Td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <Table.Td colSpan="3">
                                        <p className="text-gray-500 text-center italic">
                                            Belum ada Panitia
                                        </p>
                                    </Table.Td>
                                </tr>
                            )}
                        </Table.Tbody>
                    </Table>
                </Section>
            </Board>

            <Modal show={isShowingForm} onClose={closeModal}>
                <div className="p-6">
                    <Register
                        pemira={pemira.id}
                        roles={roles}
                        closeModal={closeModal}
                    />
                </div>
            </Modal>
        </>
    );
}
