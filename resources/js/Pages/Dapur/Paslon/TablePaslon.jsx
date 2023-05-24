import Table from "@/Components/Table";
import { router, usePage } from "@inertiajs/react";
import { IconPlus } from "@tabler/icons-react";
import PrimaryButton from "@/Components/PrimaryButton";
import { Board, Section } from "@/Components/Container";

export default function TablePaslon({ pemira }) {
    const { auth } = usePage().props;
    const permissions = auth.user?.permission;

    const handleOnCreate = (e) => {
        e.preventDefault();
        router.visit(route("d.pemira.paslon.create", pemira));
    };

    const handleRowClick = (paslon) => {
        if (permissions.includes("read_paslon")) {
            router.visit(route("d.pemira.paslon.edit", paslon));
        }
    };

    return (
        <Board>
            <Section>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl text-gray-800 font-medium">
                        Daftar Paslon
                    </h2>
                    {pemira?.status !== "finished" &&
                        permissions.includes("update_pemira") && (
                            <PrimaryButton
                                type="button"
                                onClick={(e) => handleOnCreate(e)}
                            >
                                <IconPlus className="w-5 h-5 -ml-0.5 mr-2" />
                                Paslon
                            </PrimaryButton>
                        )}
                </div>
                <Table>
                    <Table.Thead>
                        <tr>
                            <Table.Th scope="col" className="w-10 md:w-32">
                                No
                            </Table.Th>
                            <Table.Th scope="col" colSpan="2">
                                Calon
                            </Table.Th>
                        </tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {pemira.paslon.length > 0 ? (
                            pemira.paslon.map((paslon) => (
                                <tr
                                    key={paslon.id}
                                    role="button"
                                    onClick={() => handleRowClick(paslon.id)}
                                    className="cursor-pointer hover:bg-slate-50"
                                >
                                    <Table.Td className="uppercase">
                                        <span className="px-3 py-1 bg-gray-700 text-white rounded">
                                            {paslon.no_urut}
                                        </span>
                                    </Table.Td>
                                    <Table.Td className="w-40">
                                        <div className="flex-shrink-0">
                                            <img
                                                className="h-20 max-w-[150px] mx-auto rounded border"
                                                loading="lazy"
                                                src={
                                                    paslon?.photo_path
                                                        ? "/storage/foto-paslon/" +
                                                          paslon.photo_path
                                                        : "https://i.ibb.co/n1kN7qv/default-paslon-photo.jpg"
                                                }
                                                alt={paslon.no_urut}
                                            />
                                        </div>
                                    </Table.Td>
                                    <Table.Td>
                                        <div className="flex items-center text-lg font-medium">
                                            {paslon.candidate?.name}
                                            <span className="mx-2 text-base font-normal">
                                                &
                                            </span>
                                            {paslon.partner?.name}
                                        </div>
                                    </Table.Td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <Table.Td colSpan="2">
                                    <p className="text-gray-500 text-center italic">
                                        Belum ada Paslon
                                    </p>
                                </Table.Td>
                            </tr>
                        )}
                    </Table.Tbody>
                </Table>
            </Section>
        </Board>
    );
}
