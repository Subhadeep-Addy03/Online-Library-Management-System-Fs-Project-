import { useEffect, useState } from "react";
import axios from "axios";
import confetti from "canvas-confetti";
import toast from "react-hot-toast";
import ReturnModal from "../components/ReturnModal";

const MyBorrowedBooks = () => {
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [returningId, setReturningId] = useState(null);
    const [showReturnModal, setShowReturnModal] = useState(false);
    const [selectedBorrow, setSelectedBorrow] = useState(null)

    const getMyBorrowedBooks = async () => {
        try {
            setLoading(true);
            setError("");

            const token = localStorage.getItem("accessToken");

            if (!token) {
                setError("Please login first.");
                return;
            }

            const response = await axios.get(
                "http://localhost:9000/borrow/my-borrowed-books",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.success) {
                setBorrowedBooks(response.data.data);
            }
        } catch (error) {
            console.log("BORROWED BOOK ERROR:", error);
            console.log("STATUS:", error.response?.status);
            console.log("DATA:", error.response?.data);

            setError(
                error.response?.data?.message ||
                "Failed to fetch borrowed books."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getMyBorrowedBooks();
    }, []);

    const openReturnModal = (borrow) => {
        setSelectedBorrow(borrow);
        setShowReturnModal(true);
    }

    const confirmReturn = async () => {
        if (!selectedBorrow) {
            return;
        }

        setShowReturnModal(false);

        await handleReturn(selectedBorrow._id);

        setSelectedBorrow(null);
    };

    const handleReturn = async (borrowId) => {
        try {
            setReturningId(borrowId);

            const token = localStorage.getItem("accessToken");

            if (!token) {
                toast.error("Please login first.");
                return;
            }

            const response = await axios.put(
                `http://localhost:9000/borrow/return-book/${borrowId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("RETURN RESPONSE:", response.data);

            if (response.data.success) {
                toast.success("Book Returned Successfully");

                confetti({
                    particleCount: 150,
                    spread: 80,
                    origin: {
                        y: 0.6,
                    },
                });

                await getMyBorrowedBooks();
            }
        } catch (error) {
            console.log("RETURN BOOK ERROR:", error);
            console.log("STATUS:", error.response?.status);
            console.log("DATA:", error.response?.data);

            toast.error(
                error.response?.data?.message ||
                "Failed to return book."
            );
        } finally {
            setReturningId(null);
        }
    };

    return (
        <>
            <div className="min-h-[100dvh] bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 px-2 min-[375px]:px-3 sm:px-6 md:px-8 lg:px-10 py-4 min-[375px]:py-5 sm:py-10">

                <div className="w-full max-w-6xl mx-auto">

                    <div className="mb-4 min-[375px]:mb-5 sm:mb-8">
                        <p className="text-blue-400 font-semibold text-[9px] min-[375px]:text-[10px] sm:text-xs uppercase tracking-wider">
                            My Library
                        </p>

                        <h1 className="text-xl min-[375px]:text-2xl sm:text-4xl font-bold text-white mt-1">
                            My Borrowed Books
                        </h1>

                        <p className="text-slate-400 text-[10px] min-[375px]:text-xs sm:text-sm mt-1 leading-relaxed">
                            Track your borrowed books and return them when you are done.
                        </p>
                    </div>

                    {loading && (
                        <div className="bg-white rounded-xl sm:rounded-2xl p-8 min-[375px]:p-10 sm:p-16 text-center shadow-xl">
                            <div className="w-9 h-9 min-[375px]:w-10 min-[375px]:h-10 sm:w-12 sm:h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>

                            <p className="mt-3 text-gray-500 text-xs min-[375px]:text-sm">
                                Loading your books...
                            </p>
                        </div>
                    )}

                    {!loading && error && (
                        <div className="bg-red-50 border border-red-200 rounded-xl p-3 min-[375px]:p-4 sm:p-5 text-red-600 text-xs min-[375px]:text-sm">
                            {error}
                        </div>
                    )}

                    {!loading && !error && borrowedBooks.length === 0 && (
                        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 p-6 min-[375px]:p-8 sm:p-12 text-center">

                            <div className="text-4xl min-[375px]:text-5xl sm:text-6xl">
                                📚
                            </div>

                            <h2 className="text-base min-[375px]:text-lg sm:text-2xl font-bold text-gray-800 mt-3 sm:mt-5">
                                No Borrowed Books
                            </h2>

                            <p className="text-gray-500 text-[10px] min-[375px]:text-xs sm:text-sm mt-1.5 sm:mt-2">
                                You haven't borrowed any books yet.
                            </p>
                        </div>
                    )}

                    {!loading && !error && borrowedBooks.length > 0 && (
                        <div className="grid grid-cols-2 min-[640px]:grid-cols-2 lg:grid-cols-3 gap-2 min-[375px]:gap-3 sm:gap-5 lg:gap-6">

                            {borrowedBooks.map((borrow) => {
                                const book = borrow.bookId;

                                return (
                                    <div
                                        key={borrow._id}
                                        className="bg-white rounded-xl min-[375px]:rounded-2xl overflow-hidden border border-gray-100 shadow-md hover:shadow-xl transition duration-300"
                                    >

                                        <div className="h-28 min-[375px]:h-32 sm:h-44 md:h-48 lg:h-52 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center overflow-hidden">

                                            {book?.image ? (
                                                <img
                                                    src={book.image}
                                                    alt={book.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <span className="text-4xl min-[375px]:text-5xl sm:text-6xl">
                                                    📚
                                                </span>
                                            )}

                                        </div>

                                        <div className="p-2 min-[375px]:p-2.5 sm:p-4 lg:p-5">

                                            <span className="inline-block max-w-full truncate text-[7px] min-[375px]:text-[8px] sm:text-xs font-semibold text-blue-600 bg-blue-50 px-1.5 min-[375px]:px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                                                {book?.category || "Book"}
                                            </span>

                                            <h2 className="text-[11px] min-[375px]:text-xs sm:text-base lg:text-xl font-bold text-gray-900 mt-1.5 min-[375px]:mt-2 sm:mt-3 line-clamp-2 leading-tight">
                                                {book?.title || "Unknown Book"}
                                            </h2>

                                            <p className="text-[8px] min-[375px]:text-[9px] sm:text-xs lg:text-sm text-gray-500 mt-0.5 sm:mt-1 truncate">
                                                By {book?.author || "Unknown Author"}
                                            </p>

                                            <div className="mt-2 min-[375px]:mt-2.5 sm:mt-4 space-y-1 sm:space-y-2 text-[8px] min-[375px]:text-[9px] sm:text-xs lg:text-sm">

                                                <p className="text-gray-600">
                                                    Borrowed:{" "}
                                                    <span className="font-medium text-gray-800">
                                                        {borrow.borrowDate
                                                            ? new Date(
                                                                borrow.borrowDate
                                                            ).toLocaleDateString()
                                                            : "N/A"}
                                                    </span>
                                                </p>

                                                <p className="text-gray-600">
                                                    Due:{" "}
                                                    <span className="font-medium text-gray-800">
                                                        {borrow.dueDate
                                                            ? new Date(
                                                                borrow.dueDate
                                                            ).toLocaleDateString()
                                                            : "N/A"}
                                                    </span>
                                                </p>

                                                <p>
                                                    Status:{" "}
                                                    <span className="text-green-600 font-semibold capitalize">
                                                        {borrow.status}
                                                    </span>
                                                </p>

                                                {borrow.fineAmmount > 0 && (
                                                    <p className="text-red-600 font-semibold">
                                                        Fine: ₹{borrow.fineAmmount}
                                                    </p>
                                                )}

                                            </div>

                                            {borrow.status === "borrowed" && (
                                                <button
                                                    onClick={() => openReturnModal(borrow)}
                                                    disabled={
                                                        returningId === borrow._id
                                                    }
                                                    className="w-full mt-2.5 min-[375px]:mt-3 sm:mt-5 h-8 min-[375px]:h-9 sm:h-11 bg-blue-600 text-white text-[9px] min-[375px]:text-[10px] sm:text-sm font-semibold rounded-lg sm:rounded-xl hover:bg-blue-700 disabled:opacity-50 transition cursor-pointer"
                                                >
                                                    {returningId === borrow._id
                                                        ? "Returning..."
                                                        : "Return Book"}
                                                </button>
                                            )}

                                            {borrow.status === "returned" && (
                                                <div className="w-full mt-2.5 min-[375px]:mt-3 sm:mt-5 h-8 min-[375px]:h-9 sm:h-11 flex items-center justify-center bg-green-50 text-green-600 text-[9px] min-[375px]:text-[10px] sm:text-sm font-semibold rounded-lg sm:rounded-xl">
                                                    ✓ Book Returned
                                                </div>
                                            )}

                                        </div>
                                    </div>
                                );
                            })}

                        </div>
                    )}

                </div>
            </div>
            {showReturnModal && (
                <ReturnModal
                    book={selectedBorrow?.bookId}
                    onCancel={() => {
                        setShowReturnModal(false);
                        setSelectedBorrow(null);
                    }}
                    onConfirm={confirmReturn}
                    loading={returningId === selectedBorrow?._id}
                />
            )}

        </>
    );
};

export default MyBorrowedBooks