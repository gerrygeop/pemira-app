import TextInput from "@/Components/TextInput";
import { router, usePage } from "@inertiajs/react";
import { IconSearch, IconX } from "@tabler/icons-react";
import React, { useState } from "react";

export default function SearchFilter() {
    const { filters } = usePage().props;

    const [values, setValues] = useState({
        search: filters.search || "",
    });

    function reset() {
        setValues({
            search: "",
        });
        router.get(route("d.users.index"));
    }

    function handleOnChange(e) {
        const { name, value } = e.target;

        setValues((values) => ({
            ...values,
            [name]: value,
        }));
    }

    function handleOnSearch(e) {
        router.get(route("d.users.index"), values, {
            replace: true,
            preserveState: true,
        });
    }

    return (
        <div className="flex items-center justify-start mb-6">
            <div className="relative flex items-center w-full md:w-auto">
                <TextInput
                    type="search"
                    name="search"
                    value={values.search}
                    onChange={handleOnChange}
                    className="w-full lg:w-[28rem] pl-2"
                    placeholder="Cari NIM, Nama atau Email"
                    isFocused={true}
                />
                <button
                    onClick={reset}
                    type="button"
                    className={`absolute top-50 right-0 px-3 py-2 bg-transparent hover:bg-gray-200/50 text-gray-700 rounded-xl ${
                        values.search ? "visible" : "invisible"
                    }`}
                >
                    <IconX />
                </button>
            </div>
            <button
                onClick={handleOnSearch}
                type="button"
                className="ml-2 px-4 py-2 bg-slate-700 text-white rounded-md"
            >
                <IconSearch />
            </button>
        </div>
    );
}
