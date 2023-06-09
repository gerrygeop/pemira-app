import Container, { Board, Section } from "@/Components/Container";
import Modal from "@/Components/Modal";
import Table from "@/Components/Table";
import DapurLayout from "@/Layouts/DapurLayout";
import { useState } from "react";
import { Link } from "@inertiajs/react";
import SecondaryButton from "@/Components/SecondaryButton";
import SearchFilter from "./SearchFilter";
import { DetailUser } from "./DetailUser";
import { Paginator } from "./Paginator";

export default function Index({ users }) {
    const [user, setUser] = useState("");
    const [showUser, setShowUser] = useState(false);

    const handleRowClick = (usr) => {
        setUser(usr);
        openModal();
    };

    const openModal = () => {
        setShowUser(true);
    };

    const closeModal = () => {
        setShowUser(false);
        setUser("");
    };

    return (
        <DapurLayout header="Users">
            <Container>
                <Board>
                    <Section>
                        <SearchFilter />
                        <Table>
                            <Table.Thead>
                                <tr>
                                    <Table.Th scope="col">Nama</Table.Th>
                                    <Table.Th scope="col">Email</Table.Th>
                                    <Table.Th scope="col">Fakultas</Table.Th>
                                    <Table.Th scope="col">Angkatan</Table.Th>
                                </tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {users.data.map((user) => (
                                    <tr
                                        key={user.nim}
                                        role="button"
                                        onClick={() => handleRowClick(user)}
                                        className="cursor-pointer hover:bg-slate-50"
                                    >
                                        <Table.Td className="text-sm">
                                            <span className="capitalize text-gray-800">
                                                {user.name}
                                            </span>
                                        </Table.Td>
                                        <Table.Td className="text-sm">
                                            {user.email}
                                        </Table.Td>
                                        <Table.Td className="text-sm">
                                            {user?.department?.faculty?.name}
                                        </Table.Td>
                                        <Table.Td className="text-sm">
                                            {user.academic_year}
                                        </Table.Td>
                                    </tr>
                                ))}
                            </Table.Tbody>
                        </Table>
                    </Section>
                </Board>

                <Paginator links={users.links} />
            </Container>

            <DetailUser
                user={user}
                showUser={showUser}
                closeModal={closeModal}
            />
        </DapurLayout>
    );
}
