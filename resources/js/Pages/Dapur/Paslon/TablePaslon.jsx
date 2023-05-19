import Table from "@/Components/Table";
import { router } from "@inertiajs/react";
import { IconPlus } from "@tabler/icons-react";
import PrimaryButton from "@/Components/PrimaryButton";

export default function TablePaslon({ pemira, can }) {
    const handleOnCreate = (e) => {
        e.preventDefault();
        router.visit(route("d.pemira.paslon.create", pemira.id));
    };

    const handleOnShow = (paslonId) => {
        if (can.read_paslon) {
            router.visit(route("d.pemira.paslon.show", paslonId));
        }
    };

    return (
        <>
            {pemira?.status !== "finished" && can.update_pemira && (
                <div className="flex items-center justify-end">
                    <PrimaryButton
                        type="button"
                        onClick={(e) => handleOnCreate(e)}
                    >
                        <IconPlus className="w-5 h-5 -ml-0.5 mr-2" />
                        Paslon
                    </PrimaryButton>
                </div>
            )}
            <Table>
                <Table.Thead>
                    <tr>
                        <Table.Th scope="col" className="w-10 md:w-32">
                            No
                        </Table.Th>
                        <Table.Th scope="col">Calon</Table.Th>
                    </tr>
                </Table.Thead>
                <Table.Tbody>
                    {pemira.paslon.length > 0 ? (
                        pemira.paslon.map((paslon) => (
                            <tr
                                key={paslon.id}
                                role="button"
                                onClick={() => handleOnShow(paslon.id)}
                                className="cursor-pointer hover:bg-slate-50"
                            >
                                <Table.Td className="uppercase">
                                    <span className="px-3 py-1 bg-gray-700 text-white rounded">
                                        {paslon.no_urut}
                                    </span>
                                </Table.Td>
                                <Table.Td>
                                    <div className="flex items-center gap-x-4">
                                        <div className="flex-shrink-0">
                                            <img
                                                className="h-auto w-32 rounded"
                                                loading="lazy"
                                                src="https://i.ibb.co/n1kN7qv/default-paslon-photo.jpg"
                                                alt={paslon.no_urut}
                                            />
                                        </div>
                                        <div className="flex items-center text-lg font-semibold">
                                            {paslon.candidate?.name}
                                            <span className="mx-2 text-base font-normal">
                                                &
                                            </span>
                                            {paslon.partner?.name}
                                        </div>
                                    </div>
                                </Table.Td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <Table.Td colSpan="2">
                                <p className="text-gray-500 text-center italic">
                                    Tidak ada data
                                </p>
                            </Table.Td>
                        </tr>
                    )}
                </Table.Tbody>
            </Table>
        </>
    );
}
