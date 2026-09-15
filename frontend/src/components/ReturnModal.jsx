import React from 'react'

const ReturnModal = ({ book, onCancel, onConfirm, loading }) => {
    return (
        <>
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
                <div className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-5 sm:p-6">

                    <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-full bg-green-100 dark:bg-green-900/30 text-2xl">
                        🔄
                    </div>

                    <h2 className="mt-4 text-lg sm:text-xl font-bold text-center text-gray-800 dark:text-white">
                        Return Book?
                    </h2>

                    <p className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
                        Are you sure you want to return this book?
                    </p>

                    <div className="mt-4 px-3 py-3 rounded-lg bg-gray-100 dark:bg-gray-700">
                        <p className="text-sm font-semibold text-gray-800 dark:text-white truncate">
                            {book?.title}
                        </p>

                        <p className="text-xs text-gray-500 dark:text-gray-300 mt-1 truncate">
                            By {book?.author}
                        </p>
                    </div>

                    <div className="flex gap-3 mt-6">
                        <button
                            onClick={onCancel}
                            disabled={loading}
                            className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer disabled:opacity-50"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={onConfirm}
                            disabled={loading}
                            className="flex-1 px-4 py-2.5 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold transition cursor-pointer disabled:opacity-50"
                        >
                            {loading ? "Returning..." : "Confirm"}
                        </button>
                    </div>

                </div>
            </div>


        </>
    )
}

export default ReturnModal