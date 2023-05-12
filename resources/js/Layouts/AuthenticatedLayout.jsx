import Navbar from "@/Components/Navbar";

export default function Authenticated({ header, children }) {
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar header={header} />

            <main>{children}</main>
        </div>
    );
}
