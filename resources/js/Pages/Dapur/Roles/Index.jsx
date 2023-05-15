import ButtonAdd from "@/Components/Button";
import Container from "@/Components/Container";
import Modal from "@/Components/Modal";
import Table from "@/Components/Table";
import DapurLayout from "@/Layouts/DapurLayout";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { IconPlus } from "@tabler/icons-react";
import FormRole from "./FormRole";
import { toast } from "react-toastify";

export default function Index({ roles, permissions, flash }) {
    const [role, setRole] = useState(null);
    const [isShowingForm, setIsShowingForm] = useState(false);
    console.log(flash.status);

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

    useEffect(() => {
        toast.success(flash.status, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }, [flash.status]);

    return (
        <DapurLayout header="Roles & Permissions">
            <Head title="Roles & Permissions" />

            <Container>
                <div className="py-4 flex items-center justify-end">
                    <ButtonAdd type="button" onClick={openModal}>
                        <IconPlus />
                        Role baru
                    </ButtonAdd>
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
                                onClick={() => handleRowClickOpenModal(role)}
                                className="cursor-pointer hover:bg-slate-50"
                            >
                                <Table.Td className="uppercase">
                                    {role.name}
                                </Table.Td>
                                <Table.Td className="">
                                    {role.permissions.map(
                                        (permission, iteration) => (
                                            <span
                                                key={permission.id}
                                                className=""
                                            >
                                                {permission.name}
                                                {iteration <
                                                    role.permissions.length -
                                                        1 && ", "}
                                            </span>
                                        )
                                    )}
                                </Table.Td>
                            </tr>
                        ))}
                    </Table.Tbody>
                </Table>
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
