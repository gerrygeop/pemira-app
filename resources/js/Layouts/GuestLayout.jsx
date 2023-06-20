export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
            <div className="flex items-center gap-x-4 mb-6">
                <img
                    src="/image/Logo-UNMUL.png"
                    alt="Logo UNMUL"
                    className="h-14 md:h-16 shrink-0"
                />
                <img
                    src="/image/logo-dpm-km.png"
                    alt="Logo"
                    className="h-14 md:h-16 shrink-0"
                />
                <img
                    src="/image/logo-bawasra.png"
                    alt="Logo"
                    className="h-14 md:h-16 shrink-0"
                />
                <img
                    src="/image/logo-kppr.png"
                    alt="Logo"
                    className="h-14 md:h-16 shrink-0"
                />
                <img
                    src="/image/logo-itp.png"
                    alt="Logo"
                    className="h-14 md:h-16 shrink-0"
                />
            </div>

            <div className="w-full sm:max-w-md mt-6 px-4 md:px-6 py-6 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
