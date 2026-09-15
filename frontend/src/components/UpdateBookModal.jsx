import React from 'react'

const UpdateBookModal = ({ book, onCancel, onConfirm, loading }) => {
    return (
        <>
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-5 sm:p-6">

                    <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-full bg-yellow-100 text-2xl">
                        ✏️
                    </div>

                    <h2 className="mt-4 text-lg sm:text-xl font-bold text-center text-gray-800">
                        Update Book?
                    </h2>

                    <p className="mt-2 text-sm text-center text-gray-500">
                        Are you sure you want to update this book?
                    </p>

                    <div className="mt-4 px-3 py-3 rounded-lg bg-gray-100">
                        <p className="text-sm font-semibold text-gray-800 truncate">
                            {book?.title || "Unknown Book"}
                        </p>

                        <p className="text-xs text-gray-500 mt-1 truncate">
                            By {book?.author || "Unknown Author"}
                        </p>

                        <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                            <span>{book?.category || "No Category"}</span>
                            <span>•</span>
                            <span>Qty: {book?.quantity || 0}</span>
                        </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                        <button
                            onClick={onCancel}
                            disabled={loading}
                            className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition cursor-pointer disabled:opacity-50"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={onConfirm}
                            disabled={loading}
                            className="flex-1 px-4 py-2.5 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white font-semibold transition cursor-pointer disabled:opacity-50"
                        >
                            {loading ? "Updating..." : "Confirm"}
                        </button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default UpdateBookModal