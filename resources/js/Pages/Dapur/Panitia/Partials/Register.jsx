import { useEffect } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import SecondaryButton from "@/Components/SecondaryButton";
import Select from "@/Components/Select";

export default function Register({ pemira, roles, ...props }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        username: "",
        password: "",
        password_confirmation: "",
        role: roles.length > 0 ? roles[0].id : "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route("d.pemira.panitia.store", pemira), {
            onSuccess: () => handleCloseForm(),
        });
    };

    const handleCloseForm = () => {
        reset();
        props.closeModal();
    };

    return (
        <form onSubmit={submit}>
            <div>
                <InputLabel htmlFor="name" value="Name" />

                <TextInput
                    id="name"
                    name="name"
                    value={data.name}
                    className="mt-1 block w-full"
                    autoComplete="name"
                    isFocused={true}
                    onChange={(e) => setData("name", e.target.value)}
                    required
                />

                <InputError message={errors.name} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="username" value="Username" />

                <TextInput
                    id="username"
                    type="text"
                    name="username"
                    value={data.username}
                    className="mt-1 block w-full"
                    autoComplete="username"
                    onChange={(e) => setData("username", e.target.value)}
                    required
                />

                <InputError message={errors.username} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="password" value="Password" />

                <TextInput
                    id="password"
                    type="password"
                    name="password"
                    value={data.password}
                    className="mt-1 block w-full"
                    autoComplete="new-password"
                    onChange={(e) => setData("password", e.target.value)}
                    required
                />

                <InputError message={errors.password} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel
                    htmlFor="password_confirmation"
                    value="Confirm Password"
                />

                <TextInput
                    id="password_confirmation"
                    type="password"
                    name="password_confirmation"
                    value={data.password_confirmation}
                    className="mt-1 block w-full"
                    autoComplete="new-password"
                    onChange={(e) =>
                        setData("password_confirmation", e.target.value)
                    }
                    required
                />

                <InputError
                    message={errors.password_confirmation}
                    className="mt-2"
                />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="role" value="Role" />

                <Select
                    id="role"
                    defaultValue={data?.role}
                    onChange={(e) => setData("role", e.target.value)}
                    className="mt-1 block w-full uppercase"
                >
                    {roles.length > 0 ? (
                        roles.map((role) => (
                            <option key={role.id} value={role.id}>
                                {role.name}
                            </option>
                        ))
                    ) : (
                        <option className="italic" disabled>
                            -
                        </option>
                    )}
                </Select>

                <InputError message={errors.role} className="mt-2" />
            </div>

            <div className="flex items-center justify-end mt-8">
                <SecondaryButton onClick={handleCloseForm}>
                    Batal
                </SecondaryButton>

                <PrimaryButton className="ml-4" disabled={processing}>
                    Simpan
                </PrimaryButton>
            </div>
        </form>
    );
}
