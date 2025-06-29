import React from "react";

const Table = ({ children }) => {
    return (
        <div className="flex flex-col">
            <div className="-mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="min-w-full">{children}</table>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Thead = ({ children, className }) => {
    return (
        <thead className={`bg-white border-b border-gray-300 ${className}`}>
            {children}
        </thead>
    );
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
            className={`px-4 py-3 text-gray-900 text-left text-xs font-semibold uppercase tracking-wider ${className}`}
        >
            {children}
        </th>
    );
};
const Td = ({ children, className, ...props }) => {
    return (
        <td
            {...props}
            className={`px-4 py-4 whitespace-nowrap text-gray-600 ${className}`}
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
