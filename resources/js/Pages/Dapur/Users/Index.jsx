import Container, { Board, Section } from "@/Components/Container";
import Modal from "@/Components/Modal";
import Table from "@/Components/Table";
import DapurLayout from "@/Layouts/DapurLayout";
import { useState } from "react";
import { Link, router } from "@inertiajs/react";
import SecondaryButton from "@/Components/SecondaryButton";
import { IconSearch } from "@tabler/icons-react";
import TextInput from "@/Components/TextInput";

export default function Index({ users }) {
    const [user, setUser] = useState("");
    const [showUser, setShowUser] = useState(false);
    const [search, setSearch] = useState("");

    console.log(search);

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route("d.users.index"), {
            search: search,
        });
    };

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
                        <div className="flex items-center justify-start mb-6">
                            <div className="relative flex items-center w-full md:w-auto">
                                <TextInput
                                    type="search"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full lg:w-[28rem] pl-2"
                                    placeholder="Cari NIM, Nama atau Email"
                                />
                                <button
                                    onClick={(e) => handleSearch(e)}
                                    className="ml-2 px-4 py-2 bg-slate-700 text-white rounded-md"
                                >
                                    <IconSearch />
                                </button>
                            </div>
                        </div>
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

                <div className="hidden md:flex md:justify-end mt-8">
                    {users.links.map((link) => (
                        <Link
                            key={link.label}
                            href={link.url}
                            className={`py-2 px-4 border ${
                                link.active
                                    ? "bg-indigo-500 text-white"
                                    : "bg-white"
                            }`}
                        >
                            <span
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            ></span>
                        </Link>
                    ))}
                </div>

                <div className="flex justify-between mt-8 md:hidden">
                    <Link
                        href={users.links[0].url}
                        className={`py-2 px-4 border shadow-sm ${
                            users.links[0].active
                                ? "bg-indigo-500 text-white"
                                : "bg-white"
                        }`}
                    >
                        <span
                            dangerouslySetInnerHTML={{
                                __html: users.links[0].label,
                            }}
                        ></span>
                    </Link>
                    <Link
                        href={users.links[users.links.length - 1].url}
                        className={`py-2 px-4 border shadow-sm ${
                            users.links[users.links.length - 1].active
                                ? "bg-indigo-500 text-white"
                                : "bg-white"
                        }`}
                    >
                        <span
                            dangerouslySetInnerHTML={{
                                __html: users.links[users.links.length - 1]
                                    .label,
                            }}
                        ></span>
                    </Link>
                </div>
            </Container>

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
        </DapurLayout>
    );
}
