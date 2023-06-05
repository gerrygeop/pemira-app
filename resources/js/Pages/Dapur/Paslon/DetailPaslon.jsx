export default function DetailPaslon({ paslon }) {
    return (
        <div className="border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
                <div className="px-4 py-2 md:p-4 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
                    <dt className="text-sm leading-6 text-gray-600">Nama</dt>
                    <dd className="mt-1 leading-6 text-gray-900 sm:col-span-4 sm:mt-0 capitalize">
                        {paslon.name}
                    </dd>
                </div>
                <div className="px-4 py-2 md:p-4 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
                    <dt className="text-sm leading-6 text-gray-600">
                        Angkatan
                    </dt>
                    <dd className="mt-1 leading-6 text-gray-900 sm:col-span-4 sm:mt-0 capitalize">
                        {JSON.parse(paslon?.profile)?.angkatan}
                    </dd>
                </div>
                <div className="px-4 py-2 md:p-4 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
                    <dt className="text-sm leading-6 text-gray-600">
                        Fakultas
                    </dt>
                    <dd className="mt-1 leading-6 text-gray-900 sm:col-span-4 sm:mt-0 capitalize">
                        {JSON.parse(paslon?.profile)?.fakultas}
                    </dd>
                </div>
                <div className="px-4 py-2 md:p-4 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
                    <dt className="text-sm leading-6 text-gray-600">
                        Organisasi
                    </dt>
                    <dd className="mt-1 leading-6 text-gray-900 sm:col-span-4 sm:mt-0">
                        <p className="whitespace-pre">
                            {JSON.parse(paslon?.profile)?.organisasi}
                        </p>
                    </dd>
                </div>
                <div className="px-4 py-2 md:p-4 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
                    <dt className="text-sm leading-6 text-gray-600">
                        Prestasi
                    </dt>
                    <dd className="mt-1 leading-6 text-gray-900 sm:col-span-4 sm:mt-0">
                        <p className="whitespace-pre">
                            {JSON.parse(paslon?.profile)?.prestasi}
                        </p>
                    </dd>
                </div>
                <div className="px-4 py-2 md:p-4 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
                    <dt className="text-sm leading-6 text-gray-600">
                        Pendidikan
                    </dt>
                    <dd className="mt-1 leading-6 text-gray-900 sm:col-span-4 sm:mt-0">
                        <p className="whitespace-pre">
                            {JSON.parse(paslon?.profile)?.pendidikan}
                        </p>
                    </dd>
                </div>
            </dl>
        </div>
    );
}
