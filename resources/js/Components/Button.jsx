import React from "react";

const ButtonAdd = ({ children, className = "", ...props }) => {
    return (
        <button
            {...props}
            className={`inline-flex items-center py-2 px-4 gap-x-1 font-medium text-white text-sm bg-indigo-500 hover:bg-indigo-600 focus:outline-none tracking-wide uppercase shadow rounded ${className}`}
        >
            {children}
        </button>
    );
};

export default ButtonAdd;
