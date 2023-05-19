import React from "react";

export default function TextArea({ className, rows = "3", ...props }) {
    return (
        <textarea
            rows={rows}
            {...props}
            className={`focus:bg-slate-50 border-slate-300 focus:border-slate-500 focus:ring-slate-500 rounded-md shadow-sm ${className}`}
        ></textarea>
    );
}
