import { useEffect, useState } from "react";
import API from "../api/axiosInstance";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    const user = JSON.parse(localStorage.getItem("user"));

    const getBorrowedBooks = async () => {
        try {
            const response = await API.get("/borrow/my-borrowed-books");

            if (response.data.success) {
                setBorrowedBooks(response.data.data);
            }
        } catch (error) {
            console.log("DASHBOARD ERROR:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getBorrowedBooks();
    }, []);

    const totalBorrowed = borrowedBooks.length;

    const activeBooks = borrowedBooks.filter(
        (book) => book.status === "borrowed"
    ).length;

    const returnedBooks = borrowedBooks.filter(
        (book) => book.status === "returned"
    ).length;

    const overdueBooks = borrowedBooks.filter(
        (book) => book.status === "overdue"
    ).length;

    const totalFine = borrowedBooks.reduce(
        (total, book) => total + (book.fineAmmount || 0),
        0
    );

    return (
        <div className="min-h-[100dvh] bg-slate-50 dark:bg-gray-950 px-2 min-[375px]:px-3 sm:px-5 md:px-8 lg:px-10 py-4 min-[375px]:py-5 sm:py-8">
            <div className="max-w-7xl mx-auto">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl sm:rounded-3xl p-4 min-[375px]:p-5 sm:p-7 md:p-9 text-white shadow-lg">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="min-w-0">
                            <p className="text-blue-100 text-xs min-[375px]:text-sm font-medium">
                                Welcome Back 👋
                            </p>

                            <h1 className="text-xl min-[375px]:text-2xl sm:text-3xl md:text-4xl font-bold mt-1 truncate">
                                {user?.userName || "Library User"}
                            </h1>

                            <p className="text-blue-100 text-xs sm:text-sm mt-2 max-w-xl leading-relaxed">
                                Manage your books, borrowing activity and library account.
                            </p>
                        </div>

                        <Link
                            to="/books"
                            className="w-full sm:w-auto text-center px-4 min-[375px]:px-5 py-2 min-[375px]:py-2.5 bg-white text-blue-600 text-xs min-[375px]:text-sm font-semibold rounded-lg sm:rounded-xl hover:bg-blue-50 transition"
                        >
                            Browse Books
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 min-[375px]:gap-3 sm:gap-4 mt-4 sm:mt-6">
                    <div className="bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl p-3 min-[375px]:p-4 sm:p-5 border border-gray-100 dark:border-gray-800 shadow-sm">
                        <div className="flex items-center justify-between gap-2">
                            <div>
                                <p className="text-[10px] min-[375px]:text-xs sm:text-sm text-gray-500">
                                    Total Borrowed
                                </p>
                                <h2 className="text-xl min-[375px]:text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-1">
                                    {totalBorrowed}
                                </h2>
                            </div>

                            <div className="w-8 h-8 min-[375px]:w-9 min-[375px]:h-9 sm:w-11 sm:h-11 bg-blue-100 rounded-lg sm:rounded-xl flex items-center justify-center text-base min-[375px]:text-lg sm:text-xl shrink-0">
                                📚
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl p-3 min-[375px]:p-4 sm:p-5 border border-gray-100 dark:border-gray-800 shadow-sm">
                        <div className="flex items-center justify-between gap-2">
                            <div>
                                <p className="text-[10px] min-[375px]:text-xs sm:text-sm text-gray-500">
                                    Active Books
                                </p>
                                <h2 className="text-xl min-[375px]:text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-1">
                                    {activeBooks}
                                </h2>
                            </div>

                            <div className="w-8 h-8 min-[375px]:w-9 min-[375px]:h-9 sm:w-11 sm:h-11 bg-green-100 rounded-lg sm:rounded-xl flex items-center justify-center text-base min-[375px]:text-lg sm:text-xl shrink-0">
                                📖
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl p-3 min-[375px]:p-4 sm:p-5 border border-gray-100 dark:border-gray-800 shadow-sm">
                        <div className="flex items-center justify-between gap-2">
                            <div>
                                <p className="text-[10px] min-[375px]:text-xs sm:text-sm text-gray-500">
                                    Returned
                                </p>
                                <h2 className="text-xl min-[375px]:text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-1">
                                    {returnedBooks}
                                </h2>
                            </div>

                            <div className="w-8 h-8 min-[375px]:w-9 min-[375px]:h-9 sm:w-11 sm:h-11 bg-purple-100 rounded-lg sm:rounded-xl flex items-center justify-center text-base min-[375px]:text-lg sm:text-xl shrink-0">
                                ✓
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl p-3 min-[375px]:p-4 sm:p-5 border border-gray-100 dark:border-gray-800 shadow-sm">
                        <div className="flex items-center justify-between gap-2">
                            <div>
                                <p className="text-[10px] min-[375px]:text-xs sm:text-sm text-gray-500">
                                    Outstanding Fine
                                </p>
                                <h2 className="text-xl min-[375px]:text-2xl sm:text-3xl font-bold text-red-600 mt-1">
                                    ₹{totalFine}
                                </h2>
                            </div>

                            <div className="w-8 h-8 min-[375px]:w-9 min-[375px]:h-9 sm:w-11 sm:h-11 bg-red-100 rounded-lg sm:rounded-xl flex items-center justify-center text-base min-[375px]:text-lg sm:text-xl shrink-0">
                                💰
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mt-4 sm:mt-6">
                    <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                        <div className="flex items-center justify-between gap-3 px-3 min-[375px]:px-4 sm:px-5 py-3 min-[375px]:py-4 border-b border-gray-100 dark:border-gray-800">
                            <div className="min-w-0">
                                <h2 className="text-sm min-[375px]:text-base sm:text-xl font-bold text-gray-900 dark:text-white">
                                    Recent Borrowed Books
                                </h2>

                                <p className="text-[10px] min-[375px]:text-xs sm:text-sm text-gray-500 mt-0.5">
                                    Latest library activity
                                </p>
                            </div>

                            <Link
                                to="/my-borrowed-books"
                                className="text-[10px] min-[375px]:text-xs sm:text-sm text-blue-600 font-semibold whitespace-nowrap hover:text-blue-700"
                            >
                                View All
                            </Link>
                        </div>

                        {loading && (
                            <div className="p-8 text-center">
                                <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto" />
                                <p className="text-xs text-gray-500 mt-2">
                                    Loading...
                                </p>
                            </div>
                        )}

                        {!loading && borrowedBooks.length === 0 && (
                            <div className="p-7 text-center">
                                <div className="text-4xl">📚</div>

                                <p className="text-xs sm:text-sm text-gray-500 mt-2">
                                    You haven't borrowed any books yet.
                                </p>

                                <Link
                                    to="/books"
                                    className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white text-xs sm:text-sm rounded-lg hover:bg-blue-700 transition"
                                >
                                    Browse Books
                                </Link>
                            </div>
                        )}

                        {!loading && borrowedBooks.length > 0 && (
                            <div className="divide-y divide-gray-100 dark:divide-gray-800">
                                {borrowedBooks.slice(0, 5).map((borrow) => {
                                    const book = borrow.bookId;

                                    return (
                                        <div
                                            key={borrow._id}
                                            className="flex items-center gap-2 min-[375px]:gap-3 sm:gap-4 p-3 min-[375px]:p-4 sm:p-5"
                                        >
                                            <div className="w-10 h-12 min-[375px]:w-11 min-[375px]:h-14 sm:w-14 sm:h-16 bg-blue-100 rounded-lg overflow-hidden flex items-center justify-center shrink-0">
                                                {book?.image ? (
                                                    <img
                                                        src={book.image}
                                                        alt={book.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <span className="text-lg sm:text-2xl">
                                                        📚
                                                    </span>
                                                )}
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-xs min-[375px]:text-sm sm:text-base font-semibold text-gray-900 dark:text-white truncate">
                                                    {book?.title || "Unknown Book"}
                                                </h3>

                                                <p className="text-[10px] min-[375px]:text-xs sm:text-sm text-gray-500 truncate">
                                                    {book?.author || "Unknown Author"}
                                                </p>

                                                <p className="text-[9px] min-[375px]:text-[10px] sm:text-xs text-gray-400 mt-0.5">
                                                    Due:{" "}
                                                    {new Date(
                                                        borrow.dueDate
                                                    ).toLocaleDateString()}
                                                </p>
                                            </div>

                                            <span
                                                className={`px-2 min-[375px]:px-2.5 sm:px-3 py-1 text-[9px] min-[375px]:text-[10px] sm:text-xs font-semibold rounded-full capitalize shrink-0 ${borrow.status === "borrowed"
                                                    ? "bg-green-100 text-green-600"
                                                    : borrow.status === "returned"
                                                        ? "bg-gray-100 text-gray-600"
                                                        : "bg-red-100 text-red-600"
                                                    }`}
                                            >
                                                {borrow.status}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-3 min-[375px]:p-4 sm:p-5">
                        <h2 className="text-sm min-[375px]:text-base sm:text-xl font-bold text-gray-900 dark:text-white">
                            Quick Actions
                        </h2>

                        <p className="text-[10px] min-[375px]:text-xs sm:text-sm text-gray-500 mt-1">
                            Quickly access your library features.
                        </p>

                        <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 min-[375px]:gap-3 mt-4">
                            <Link
                                to="/books"
                                className="flex items-center gap-2 min-[375px]:gap-3 p-2 min-[375px]:p-3 sm:p-4 bg-blue-50 hover:bg-blue-100 rounded-lg sm:rounded-xl transition"
                            >
                                <div className="w-8 h-8 min-[375px]:w-9 min-[375px]:h-9 sm:w-11 sm:h-11 bg-blue-600 text-white rounded-lg flex items-center justify-center text-sm min-[375px]:text-base sm:text-xl shrink-0">
                                    📚
                                </div>

                                <div className="min-w-0">
                                    <h3 className="text-[10px] min-[375px]:text-xs sm:text-sm font-semibold text-gray-800 truncate">
                                        Browse Books
                                    </h3>

                                    <p className="hidden sm:block text-xs text-gray-500 truncate">
                                        Explore available books
                                    </p>
                                </div>
                            </Link>

                            <Link
                                to="/my-borrowed-books"
                                className="flex items-center gap-2 min-[375px]:gap-3 p-2 min-[375px]:p-3 sm:p-4 bg-green-50 hover:bg-green-100 rounded-lg sm:rounded-xl transition"
                            >
                                <div className="w-8 h-8 min-[375px]:w-9 min-[375px]:h-9 sm:w-11 sm:h-11 bg-green-600 text-white rounded-lg flex items-center justify-center text-sm min-[375px]:text-base sm:text-xl shrink-0">
                                    📖
                                </div>

                                <div className="min-w-0">
                                    <h3 className="text-[10px] min-[375px]:text-xs sm:text-sm font-semibold text-gray-800 truncate">
                                        My Borrowed Books
                                    </h3>

                                    <p className="hidden sm:block text-xs text-gray-500 truncate">
                                        Manage borrowed books
                                    </p>
                                </div>
                            </Link>

                            <Link
                                to="/fine"
                                className="flex items-center gap-2 min-[375px]:gap-3 p-2 min-[375px]:p-3 sm:p-4 bg-red-50 hover:bg-red-100 rounded-lg sm:rounded-xl transition"
                            >
                                <div className="w-8 h-8 min-[375px]:w-9 min-[375px]:h-9 sm:w-11 sm:h-11 bg-red-600 text-white rounded-lg flex items-center justify-center text-sm min-[375px]:text-base sm:text-xl shrink-0">
                                    💰
                                </div>

                                <div className="min-w-0">
                                    <h3 className="text-[10px] min-[375px]:text-xs sm:text-sm font-semibold text-gray-800 truncate">
                                        My Fines
                                    </h3>

                                    <p className="hidden sm:block text-xs text-gray-500 truncate">
                                        Check outstanding fines
                                    </p>
                                </div>
                            </Link>

                            <Link
                                to="/profile"
                                className="flex items-center gap-2 min-[375px]:gap-3 p-2 min-[375px]:p-3 sm:p-4 bg-purple-50 hover:bg-purple-100 rounded-lg sm:rounded-xl transition"
                            >
                                <div className="w-8 h-8 min-[375px]:w-9 min-[375px]:h-9 sm:w-11 sm:h-11 bg-purple-600 text-white rounded-lg flex items-center justify-center text-sm min-[375px]:text-base sm:text-xl shrink-0">
                                    👤
                                </div>

                                <div className="min-w-0">
                                    <h3 className="text-[10px] min-[375px]:text-xs sm:text-sm font-semibold text-gray-800 truncate">
                                        My Profile
                                    </h3>

                                    <p className="hidden sm:block text-xs text-gray-500 truncate">
                                        Manage your account
                                    </p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>

                {overdueBooks > 0 && (
                    <div className="mt-4 sm:mt-6 bg-red-50 border border-red-200 rounded-xl sm:rounded-2xl p-3 min-[375px]:p-4 sm:p-5">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <div>
                                <h3 className="text-xs min-[375px]:text-sm sm:text-base font-bold text-red-700">
                                    ⚠️ You have {overdueBooks} overdue{" "}
                                    {overdueBooks === 1 ? "book" : "books"}
                                </h3>

                                <p className="text-[10px] min-[375px]:text-xs sm:text-sm text-red-600 mt-1">
                                    Please return the overdue books or check your fine details.
                                </p>
                            </div>

                            <Link
                                to="/fine"
                                className="w-full sm:w-auto text-center px-4 py-2 sm:px-5 sm:py-2.5 bg-red-600 text-white text-xs sm:text-sm font-semibold rounded-lg sm:rounded-xl hover:bg-red-700 transition"
                            >
                                Check Fine
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;