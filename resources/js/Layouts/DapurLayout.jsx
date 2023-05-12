import Navbar from "@/Components/Navbar";
import Sidebar from "@/Components/Sidebar";

export default function DapurLayout({ header, children }) {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
            <Sidebar />

            <main className="flex-1 ml-0 md:ml-52 lg:ml-64">
                <Navbar header={header} />
                {children}
            </main>
        </div>
    );
}
