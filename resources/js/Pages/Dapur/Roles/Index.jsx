import Container, { Box } from "@/Components/Container";
import Modal from "@/Components/Modal";
import Table from "@/Components/Table";
import DapurLayout from "@/Layouts/DapurLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import { IconPlus } from "@tabler/icons-react";
import FormRole from "./FormRole";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Index({ roles, permissions }) {
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

    return (
        <DapurLayout header="Roles & Permissions">
            <Head title="Roles & Permissions" />

            <Container>
                <Box>
                    <div className="py-4 flex items-center justify-end">
                        <PrimaryButton type="button" onClick={openModal}>
                            <IconPlus className="w-5 h-5 mr-2" />
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
                                    <Table.Td className="uppercase">
                                        {role.name}
                                    </Table.Td>
                                    <Table.Td>
                                        {role.permissions
                                            .slice(0, 3)
                                            .map((permission, iteration) => (
                                                <span
                                                    key={permission.id}
                                                    className="px-1 mr-1 bg-indigo-50 border border-indigo-900/20 text-indigo-800 rounded"
                                                >
                                                    {permission.name}
                                                </span>
                                            ))}
                                        {role.permissions.length > 3 && " ..."}
                                    </Table.Td>
                                </tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </Box>
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
