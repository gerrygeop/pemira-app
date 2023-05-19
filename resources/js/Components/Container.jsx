import React from "react";

const Container = ({ children, classFirst = "", classSecond = "" }) => {
    return (
        <div className={`py-12 ${classFirst}`}>
            <div className={`max-w-7xl mx-auto sm:px-6 lg:px-8 ${classSecond}`}>
                {children}
            </div>
        </div>
    );
};

export const Board = ({ children, className }) => {
    return (
        <div
            className={`bg-white overflow-hidden divide-y shadow sm:rounded-lg ${className}`}
        >
            {children}
        </div>
    );
};

export const Section = ({ children, className }) => {
    return (
        <div className={`py-5 px-4 sm:px-6 sm:py-8 ${className}`}>
            {children}
        </div>
    );
};

export const SectionTitle = ({ children, title, description }) => {
    return (
        <div className="grid grid-cols-8">
            <header className="col-span-full lg:col-span-2">
                <h2 className="font-medium text-xl text-gray-700">{title}</h2>
                {description && (
                    <p className="mt-1 text-sm text-gray-600">{description}</p>
                )}
            </header>
            <div className="col-span-full lg:col-span-4 space-y-6">
                {children}
            </div>
        </div>
    );
};

export default Container;
