import React from "react";

interface ConfirmProps {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    open: boolean;
}

const Confirm: React.FC<ConfirmProps> = ({ message, onConfirm, onCancel, open }) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <div className="mb-4 text-center text-gray-800">{message}</div>
                <div className="flex justify-center space-x-3">
                    <button
                        className="px-4 py-2 bg-primary text-white rounded hover:bg-blue-700 cursor-pointer"
                        onClick={onConfirm}
                    >
                        Confirm
                    </button>
                    <button
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 cursor-pointer"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Confirm;