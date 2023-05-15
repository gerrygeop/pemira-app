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

const Box = ({ children, classFirst = "", classSecond = "" }) => {
    return (
        <div
            className={`bg-white overflow-hidden shadow-sm sm:rounded-lg ${classFirst}`}
        >
            <div
                className={`p-6 bg-white border-b border-gray-200 ${classSecond}`}
            >
                {children}
            </div>
        </div>
    );
};

Container.Box = Box;

export default Container;
