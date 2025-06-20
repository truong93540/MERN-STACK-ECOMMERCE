import React from "react";

const Modal = ({
    open,
    onClose,
    onOk,
    onCancel,
    title,
    children,
    width = 500,
}) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center">
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black bg-opacity-30 transition-opacity"
                onClick={onCancel || onClose}
            />
            {/* Modal content */}
            <div
                className="bg-white rounded-lg shadow-lg z-40 relative transition-all"
                style={{ width: width, minWidth: 320 }}>
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <span className="font-semibold text-lg">{title}</span>
                    <button
                        onClick={onCancel || onClose}
                        className="text-2xl leading-none hover:text-red-500"
                        aria-label="Close">
                        &times;
                    </button>
                </div>
                {/* Body */}
                <div className="p-4">{children}</div>
                {/* Footer */}
                <div className="flex justify-end gap-2 p-4 border-t">
                    <button
                        className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                        onClick={onCancel || onClose}>
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                        onClick={onOk}>
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
