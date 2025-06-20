import React from "react";

const Drawer = ({ open, onClose, title, children, width = "40%" }) => {
    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity duration-300 ${
                    open
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                }`}
                onClick={onClose}
            />
            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-[${width}px] bg-white shadow-lg z-50 transform transition-transform duration-300
                    ${open ? "translate-x-0" : "translate-x-full"}`}
                style={{ width }}>
                <div className="flex items-center justify-between p-4 border-b">
                    <span className="font-semibold text-lg">{title}</span>
                    <button
                        onClick={onClose}
                        className="text-2xl leading-none hover:text-red-500"
                        aria-label="Close">
                        &times;
                    </button>
                </div>
                <div className="p-4 overflow-y-auto h-[calc(100%-64px)]">
                    {children}
                </div>
            </div>
        </>
    );
};

export default Drawer;
