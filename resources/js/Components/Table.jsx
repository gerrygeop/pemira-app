import React from "react";

const Table = ({ children }) => {
    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow-sm overflow-hidden border border-gray-200 sm:rounded-md">
                        <table className="min-w-full divide-y divide-gray-200">
                            {children}
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Thead = ({ children, className }) => {
    return <thead className={`bg-gray-50 ${className}`}>{children}</thead>;
};

const Tbody = ({ children, className }) => {
    return (
        <tbody className={`bg-white divide-y divide-gray-200 ${className}`}>
            {children}
        </tbody>
    );
};

const Th = ({ children, className, ...props }) => {
    return (
        <th
            {...props}
            className={`px-6 py-3 text-gray-500 text-left text-xs font-medium uppercase tracking-wider ${className}`}
        >
            {children}
        </th>
    );
};
const Td = ({ children, className, ...props }) => {
    return (
        <td
            {...props}
            className={`px-6 py-4 whitespace-nowrap text-base font-medium text-gray-800 ${className}`}
        >
            {children}
        </td>
    );
};

Table.Thead = Thead;
Table.Tbody = Tbody;
Table.Th = Th;
Table.Td = Td;

export default Table;
