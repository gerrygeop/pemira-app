import { IconDotsVertical } from "@tabler/icons-react";

export default function CardPaslon({
    paslon,
    detailPaslon = () => {},
    ...props
}) {
    const { data, setData } = props;

    return (
        <div className="w-96 md:w-84 lg:w-96 mx-0 md:mx-2 mb-10">
            <div className="w-full text-center bg-white border border-gray-100 hover:border-amber-300 overflow-hidden shadow rounded-md">
                <div className="flex justify-end py-3">
                    <button
                        className="px-3"
                        onClick={(e) => detailPaslon(e, paslon)}
                    >
                        <IconDotsVertical className="w-5 h-5 text-gray-500 hover:text-gray-700" />
                    </button>
                </div>

                <div className="h-52 border-b overflow-hidden">
                    <img
                        className="object-cover object-center h-full w-auto mx-auto"
                        loading="lazy"
                        src={
                            paslon?.photo_path
                                ? "/storage/foto-paslon/" + paslon.photo_path
                                : "https://i.ibb.co/n1kN7qv/default-paslon-photo.jpg"
                        }
                        alt={paslon.no_urut}
                    />
                </div>

                <div className="p-4 flex justify-around">
                    <h3 className="text-sm md:text-base lg:text-lg font-medium text-gray-800">
                        {paslon?.candidate?.name}
                    </h3>
                    <h3 className="text-sm md:text-base lg:text-lg font-medium text-gray-800">
                        {paslon?.partner?.name}
                    </h3>
                </div>

                <div className="uppercase border-t relative">
                    <label
                        htmlFor={`paslon_${paslon.id}`}
                        className="flex items-center justify-center p-4 overflow-hidden hover:bg-amber-100 hover:cursor-pointer"
                    >
                        <input
                            type="radio"
                            id={`paslon_${paslon.id}`}
                            name={`pemira.${paslon.pemira_id}`}
                            value={paslon.id}
                            onChange={(e) =>
                                setData("pemira", {
                                    ...data.pemira,
                                    [paslon.pemira_id]: e.target.value,
                                })
                            }
                            className="p-4 border-2 border-gray-300 hover:border-amber-400"
                        />

                        <span className="absolute w-full h-full flex items-center justify-center font-semibold text-xl">
                            <div className="no-urut">{paslon.no_urut}</div>

                            <div className="icon-check hidden">
                                <svg
                                    className="w-8 h-8"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="3"
                                        d="M5 13l4 4L19 7"
                                    ></path>
                                </svg>
                            </div>
                        </span>
                    </label>
                </div>
            </div>
        </div>
    );
}
