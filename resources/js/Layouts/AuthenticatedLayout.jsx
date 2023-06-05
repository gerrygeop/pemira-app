import Navbar from "@/Components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Authenticated({ header, children }) {
    return (
        <div className="min-h-screen bg-[#383a59] dark:bg-[#f0f2f5]">
            <Navbar header={header} />

            <main>{children}</main>

            <ToastContainer />
        </div>
    );
}
