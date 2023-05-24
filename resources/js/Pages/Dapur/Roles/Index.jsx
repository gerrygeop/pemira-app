import Container, { Board, Section } from "@/Components/Container";
import Modal from "@/Components/Modal";
import Table from "@/Components/Table";
import DapurLayout from "@/Layouts/DapurLayout";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { IconPlus } from "@tabler/icons-react";
import FormRole from "./FormRole";
import PrimaryButton from "@/Components/PrimaryButton";
import { toast } from "react-toastify";

export default function Index({ roles, permissions, flash }) {
    const [role, setRole] = useState(null);
    const [isShowingForm, setIsShowingForm] = useState(false);

    const handleRowClickOpenModal = (r) => {
        setRole(r);
        openModal();
    };

    const openModal = () => {
        setIsShowingForm(true);
    };

    const closeModal = () => {
        setIsShowingForm(false);
        setRole(null);
    };

    const toastMessage = (message) => {
        toast.success(message, {
            autoClose: 3000,
            pauseOnHover: false,
        });
    };

    useEffect(() => {
        toastMessage(flash.status?.message);
    }, [flash.status]);

    return (
        <DapurLayout header="Roles & Permissions">
            <Head title="Roles & Permissions" />

            <Container>
                <Board>
                    <Section>
                        <div className="flex items-center justify-end">
                            <PrimaryButton type="button" onClick={openModal}>
                                <IconPlus className="w-5 h-5 -ml-0.5 mr-1.5" />
                                Role baru
                            </PrimaryButton>
                        </div>
                        <Table>
                            <Table.Thead>
                                <tr>
                                    <Table.Th scope="col">Nama</Table.Th>
                                    <Table.Th scope="col" className="px-4">
                                        Permissions
                                    </Table.Th>
                                </tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {roles.map((role) => (
                                    <tr
                                        key={role.id}
                                        role="button"
                                        onClick={() =>
                                            handleRowClickOpenModal(role)
                                        }
                                        className="cursor-pointer hover:bg-slate-50"
                                    >
                                        <Table.Td>
                                            <span className="uppercase text-sm font-medium text-gray-800">
                                                {role.name}
                                            </span>
                                        </Table.Td>
                                        <Table.Td>
                                            {role.permissions
                                                .slice(0, 3)
                                                .map((permission) => (
                                                    <span
                                                        key={permission.id}
                                                        className="px-1 mr-1.5 bg-yellow-50 text-yellow-800 ring-1 ring-yellow-600/20 rounded"
                                                    >
                                                        {permission.name}
                                                    </span>
                                                ))}
                                            {role.permissions.length > 3 &&
                                                " ..."}
                                        </Table.Td>
                                    </tr>
                                ))}
                            </Table.Tbody>
                        </Table>
                    </Section>
                </Board>
            </Container>

            <Modal show={isShowingForm} onClose={closeModal}>
                <FormRole
                    closeModal={closeModal}
                    permissions={permissions}
                    role={role}
                />
            </Modal>
        </DapurLayout>
    );
}
