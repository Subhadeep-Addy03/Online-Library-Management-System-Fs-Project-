import { useEffect, useState } from "react";
import axios from "axios";
import confetti from "canvas-confetti";
import toast from "react-hot-toast";
import BorrowModal from "../components/BorrowModal";
import libraryImage from "../assests/LibraryBooks.jpeg";

const Books = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [borrowLoading, setBorrowLoading] = useState(null);
    const [showBorrowModal, setShowBorrowModal] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    const getAllBooks = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await axios.get(
                "http://localhost:9000/book/getallbook"
            );

            if (response.data.success) {
                setBooks(response.data.data);
            } else {
                setError(
                    response.data.message ||
                    "Failed to fetch books."
                );
            }
        } catch (error) {
            console.log("GET ALL BOOKS ERROR:", error);

            setError(
                error.response?.data?.message ||
                "Failed to fetch books."
            );
        } finally {
            setLoading(false);
        }
    };

    const celebrateBorrow = () => {
        confetti({
            particleCount: 120,
            spread: 75,
            startVelocity: 35,
            origin: {
                x: 0.15,
                y: 0.65
            }
        });

        confetti({
            particleCount: 120,
            spread: 75,
            startVelocity: 35,
            origin: {
                x: 0.85,
                y: 0.65
            }
        });
    };

    const handleBorrow = async (bookId) => {
        const token = localStorage.getItem("accessToken");

        if (!token) {
            toast.error("Please login first to borrow a book.");
            return;
        }

        try {
            setBorrowLoading(bookId);

            const response = await axios.post(
                `http://localhost:9000/borrow/borrow-book/${bookId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.data.success) {
                toast.success("Book Borrowed Successfully!", {
                    duration: 2500
                });

                celebrateBorrow();

                await getAllBooks();
            } else {
                toast.error(
                    response.data.message ||
                    "Failed to borrow book."
                );
            }
        } catch (error) {
            console.log("BORROW ERROR:", error);

            if (error.response?.status === 401) {
                toast.error(
                    "Your session has expired. Please login again."
                );
            } else if (error.response?.status === 403) {
                toast.error(
                    error.response?.data?.message ||
                    "Only students can borrow books."
                );
            } else {
                toast.error(
                    error.response?.data?.message ||
                    "Failed to borrow book."
                );
            }
        } finally {
            setBorrowLoading(null);
        }
    };

    const openBorrowModal = (book) => {
        const token = localStorage.getItem("accessToken");

        if (!token) {
            toast.error("Please Login First To Borrow A Book.");
            return;
        }

        const userData = localStorage.getItem("user");

        if (userData) {
            const user = JSON.parse(userData);

            if (user.role === "admin") {
                toast.error("Only Students Can Borrow Books.");
                return;
            }
        }

        setSelectedBook(book);
        setShowBorrowModal(true);
    };

    const confirmBorrow = async () => {
        if (!selectedBook) {
            return;
        }

        setShowBorrowModal(false);

        await handleBorrow(selectedBook._id);

        setSelectedBook(null);
    };

    useEffect(() => {
        getAllBooks();
    }, []);

    const userData = localStorage.getItem("user");
    const currentUser = userData ? JSON.parse(userData) : null;
    const isAdmin = currentUser?.role === "admin";

    return (
        <>
            <section
                className="min-h-[100dvh] relative bg-cover bg-center bg-no-repeat px-2 min-[375px]:px-3 sm:px-5 md:px-6 lg:px-8 py-5 min-[375px]:py-6 sm:py-8 md:py-10 lg:py-14"
                style={{
                    backgroundImage: `url(${libraryImage})`
                }}
            >
                <div className="absolute inset-0 bg-black/55"></div>

                <div className="relative z-10 max-w-7xl mx-auto">

                    <div className="text-center mb-5 min-[375px]:mb-6 sm:mb-9 md:mb-10 lg:mb-12">

                        <div className="inline-flex items-center gap-2 px-2.5 min-[375px]:px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-2 sm:mb-3">

                            <span className="text-[9px] min-[375px]:text-[10px] sm:text-xs text-blue-200 font-semibold uppercase tracking-wider">
                                Online Library
                            </span>

                        </div>

                        <h1 className="text-2xl min-[375px]:text-[27px] sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                            Explore Our Books
                        </h1>

                        <p className="text-[10px] min-[375px]:text-xs sm:text-sm md:text-base text-gray-200 mt-1.5 sm:mt-3 max-w-xl mx-auto leading-relaxed">
                            Discover and borrow your favorite books from our library.
                        </p>

                    </div>

                    {loading && (
                        <div className="text-center py-12 min-[375px]:py-14 sm:py-16 md:py-20">

                            <div className="w-8 h-8 min-[375px]:w-9 min-[375px]:h-9 sm:w-11 sm:h-11 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>

                            <p className="mt-3 text-white font-semibold text-[10px] min-[375px]:text-xs sm:text-sm">
                                Loading books...
                            </p>

                        </div>
                    )}

                    {!loading && error && (
                        <div className="max-w-xl mx-auto py-8 min-[375px]:py-10 sm:py-16">

                            <div className="bg-white rounded-xl sm:rounded-2xl p-4 min-[375px]:p-5 sm:p-8 text-center shadow-xl">

                                <div className="text-3xl min-[375px]:text-4xl sm:text-5xl mb-2 sm:mb-3">
                                    ⚠️
                                </div>

                                <p className="text-red-500 font-semibold text-[10px] min-[375px]:text-xs sm:text-base">
                                    {error}
                                </p>

                            </div>

                        </div>
                    )}

                    {!loading && !error && books.length === 0 && (
                        <div className="max-w-xl mx-auto py-8 min-[375px]:py-10 sm:py-16">

                            <div className="bg-white rounded-xl sm:rounded-2xl p-5 min-[375px]:p-6 sm:p-10 text-center shadow-xl">

                                <div className="text-4xl min-[375px]:text-5xl sm:text-6xl">
                                    📚
                                </div>

                                <h2 className="text-base min-[375px]:text-lg sm:text-2xl font-bold text-gray-800 mt-3 sm:mt-4">
                                    No Books Available
                                </h2>

                                <p className="text-gray-500 text-[10px] min-[375px]:text-xs sm:text-base mt-1.5 sm:mt-2">
                                    There are currently no books in the library.
                                </p>

                            </div>

                        </div>
                    )}

                    {!loading && !error && books.length > 0 && (
                        <div className="grid grid-cols-2 min-[640px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 min-[375px]:gap-3 sm:gap-4 md:gap-5 lg:gap-6 items-stretch">

                            {books.map((book) => (
                                <div
                                    key={book._id}
                                    className="w-full bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-white/20 shadow-md sm:shadow-lg hover:shadow-2xl hover:-translate-y-1 transition duration-300 flex flex-col"
                                >

                                    <div className="h-28 min-[375px]:h-32 min-[425px]:h-36 sm:h-40 md:h-48 lg:h-52 xl:h-56 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center overflow-hidden">

                                        {book.image ? (
                                            <img
                                                src={book.image}
                                                alt={book.title}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <span className="text-3xl min-[375px]:text-4xl sm:text-5xl md:text-6xl">
                                                📚
                                            </span>
                                        )}

                                    </div>

                                    <div className="p-2.5 min-[375px]:p-3 min-[425px]:p-3.5 sm:p-4 md:p-5 flex flex-col flex-1">

                                        <span className="self-start max-w-full truncate text-[8px] min-[375px]:text-[9px] sm:text-[10px] md:text-xs font-semibold text-blue-600 bg-blue-50 px-1.5 min-[375px]:px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 rounded-full">
                                            {book.category}
                                        </span>

                                        <h2 className="text-xs min-[375px]:text-sm min-[425px]:text-[15px] sm:text-base md:text-lg lg:text-lg xl:text-xl font-bold text-gray-900 mt-1.5 min-[375px]:mt-2 sm:mt-3 leading-snug line-clamp-2">
                                            {book.title}
                                        </h2>

                                        <p className="text-[9px] min-[375px]:text-[10px] sm:text-xs md:text-sm text-gray-500 mt-1 line-clamp-1">
                                            By {book.author}
                                        </p>

                                        <p className="text-[9px] min-[375px]:text-[10px] sm:text-xs md:text-sm text-gray-500 mt-0.5 sm:mt-2">
                                            Published: {book.publishYear}
                                        </p>

                                        <div className="mt-auto pt-2.5 min-[375px]:pt-3 sm:pt-4">

                                            <div className="flex flex-col min-[425px]:flex-row min-[425px]:items-center min-[425px]:justify-between gap-1.5 min-[375px]:gap-2">

                                                <p
                                                    className={
                                                        book.availableCopies > 0
                                                            ? "text-[9px] min-[375px]:text-[10px] sm:text-xs md:text-sm font-semibold text-green-600"
                                                            : "text-[9px] min-[375px]:text-[10px] sm:text-xs md:text-sm font-semibold text-red-500"
                                                    }
                                                >
                                                    {book.availableCopies > 0
                                                        ? `Available: ${book.availableCopies}`
                                                        : "Unavailable"}
                                                </p>

                                                {!isAdmin && (
                                                    <button
                                                        type="button"
                                                        onClick={() => openBorrowModal(book)}
                                                        disabled={
                                                            book.availableCopies <= 0 ||
                                                            borrowLoading === book._id
                                                        }
                                                        className={
                                                            book.availableCopies <= 0
                                                                ? "w-full min-[425px]:w-auto px-2 min-[375px]:px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-gray-400 text-white text-[9px] min-[375px]:text-[10px] sm:text-xs md:text-sm font-semibold rounded-md sm:rounded-lg cursor-not-allowed"
                                                                : borrowLoading === book._id
                                                                    ? "w-full min-[425px]:w-auto px-2 min-[375px]:px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-blue-400 text-white text-[9px] min-[375px]:text-[10px] sm:text-xs md:text-sm font-semibold rounded-md sm:rounded-lg cursor-not-allowed"
                                                                    : "w-full min-[425px]:w-auto px-2 min-[375px]:px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-blue-600 text-white text-[9px] min-[375px]:text-[10px] sm:text-xs md:text-sm font-semibold rounded-md sm:rounded-lg hover:bg-blue-700 active:scale-95 transition cursor-pointer"
                                                        }
                                                    >
                                                        {borrowLoading === book._id
                                                            ? "Borrowing..."
                                                            : book.availableCopies <= 0
                                                                ? "Unavailable"
                                                                : "Borrow"}
                                                    </button>
                                                )}

                                            </div>

                                        </div>

                                    </div>

                                </div>
                            ))}

                        </div>
                    )}

                </div>
            </section>

            {showBorrowModal && (
                <BorrowModal
                    book={selectedBook}
                    onCancel={() => {
                        setShowBorrowModal(false);
                        setSelectedBook(null);
                    }}
                    onConfirm={confirmBorrow}
                    loading={borrowLoading === selectedBook?._id}
                />
            )}
        </>
    );
};

export default Books;
