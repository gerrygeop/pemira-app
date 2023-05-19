import Navbar from "@/Components/Navbar";
import Sidebar from "@/Components/Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DapurLayout({ header, children }) {
    return (
        <div className="min-h-screen bg-[#f0f2f5] flex flex-col lg:flex-row">
            <Sidebar />

            <main className="flex-1 ml-0 lg:ml-64">
                <Navbar header={header} />
                {children}
            </main>

            <ToastContainer />
        </div>
    );
}
