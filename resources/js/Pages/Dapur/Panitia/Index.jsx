import Container, { Board, Section } from "@/Components/Container";
import Modal from "@/Components/Modal";
import Table from "@/Components/Table";
import DapurLayout from "@/Layouts/DapurLayout";
import { useEffect, useState } from "react";
import { IconPlus } from "@tabler/icons-react";
import PrimaryButton from "@/Components/PrimaryButton";
import Register from "@/Pages/Dapur/Panitia/Partials/Register";
import { toast } from "react-toastify";
import { router } from "@inertiajs/react";

export default function Index({ panitiaList, roles, flash }) {
    const [isShowingForm, setIsShowingForm] = useState(false);

    const handleRowClick = (panitia) => {
        router.visit(route("d.panitia.edit", panitia));
    };

    const closeModal = () => {
        setIsShowingForm(false);
    };

    const toastMessage = (message) => {
        toast.success(message, {
            autoClose: 3000,
            pauseOnHover: false,
        });
    };

    useEffect(() => {
        toastMessage(flash.status);
    }, [flash.status]);

    return (
        <DapurLayout header="Panitia">
            <Container>
                <Board>
                    <Section>
                        <div className="flex items-center justify-end">
                            <PrimaryButton
                                type="button"
                                onClick={() => setIsShowingForm(true)}
                            >
                                <IconPlus className="w-5 h-5 -ml-0.5 mr-1.5" />
                                Panitia baru
                            </PrimaryButton>
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
                                {panitiaList.map((panitia) => (
                                    <tr
                                        key={panitia.id}
                                        role="button"
                                        onClick={() => handleRowClick(panitia)}
                                        className="cursor-pointer hover:bg-slate-50"
                                    >
                                        <Table.Td className="capitalize font-semibold text-gray-800">
                                            {panitia.name}
                                        </Table.Td>
                                        <Table.Td>{panitia.username}</Table.Td>
                                        <Table.Td>
                                            {panitia.roles.length > 0
                                                ? panitia.roles.map((role) => (
                                                      <span
                                                          key={role.id}
                                                          className="px-1 mr-1.5 bg-indigo-50 text-indigo-800 uppercase ring-1 ring-indigo-600/20 rounded"
                                                      >
                                                          {role.name}
                                                      </span>
                                                  ))
                                                : "-"}
                                        </Table.Td>
                                    </tr>
                                ))}
                            </Table.Tbody>
                        </Table>
                    </Section>
                </Board>
            </Container>

            <Modal show={isShowingForm} onClose={closeModal}>
                <div className="p-6">
                    <Register roles={roles} closeModal={closeModal} />
                </div>
            </Modal>
        </DapurLayout>
    );
}
