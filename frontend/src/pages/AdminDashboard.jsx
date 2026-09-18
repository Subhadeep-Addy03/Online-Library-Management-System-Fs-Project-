import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axiosInstance";

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalBooks: 0,
        availableBooks: 0,
        borrowedBooks: 0,
        overdueBooks: 0,
        totalStudents: 0,
        totalAdmins: 0
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const getDashboardStats = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await API.get("/user/stats");

            if (response.data.success) {
                setStats(response.data.data);
            } else {
                setError(
                    response.data.message ||
                    "Failed to load dashboard."
                );
            }
        } catch (error) {
            console.log("DASHBOARD ERROR:", error);

            setError(
                error.response?.data?.message ||
                "Failed to load dashboard."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getDashboardStats();
    }, []);

    return (
        <div className="min-h-[100dvh] bg-gradient-to-br from-slate-50 via-white to-blue-50 px-2 min-[375px]:px-3 sm:px-5 md:px-8 lg:px-10 py-4 min-[375px]:py-5 sm:py-8">

            <div className="max-w-7xl mx-auto">

                <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-indigo-900 rounded-2xl sm:rounded-3xl px-4 py-4 min-[375px]:px-5 min-[375px]:py-5 sm:px-7 sm:py-7 text-white shadow-lg mb-4 min-[375px]:mb-5 sm:mb-7">

                    <div className="flex items-center gap-3">

                        <div className="w-10 h-10 min-[375px]:w-11 min-[375px]:h-11 sm:w-14 sm:h-14 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-xl min-[375px]:text-2xl sm:text-3xl shrink-0">
                            🛡️
                        </div>

                        <div className="min-w-0">
                            <p className="text-[9px] min-[375px]:text-[10px] sm:text-xs uppercase tracking-widest text-blue-200 font-semibold">
                                Administration
                            </p>

                            <h1 className="text-xl min-[375px]:text-2xl sm:text-3xl md:text-4xl font-bold leading-tight truncate">
                                Admin Dashboard
                            </h1>

                            <p className="hidden sm:block text-sm text-blue-100 mt-1">
                                Manage your library, books and users from one place.
                            </p>
                        </div>

                    </div>

                </div>

                {error && (
                    <div className="mb-4 min-[375px]:mb-5 px-3 py-2.5 bg-red-50 border border-red-200 text-red-600 rounded-xl text-[10px] min-[375px]:text-xs sm:text-sm">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 min-[375px]:gap-3 sm:gap-5 mb-4 min-[375px]:mb-5 sm:mb-7">

                    <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm p-3 min-[375px]:p-4 sm:p-6">

                        <div className="flex items-center justify-between gap-2">
                            <div className="min-w-0">
                                <p className="text-[9px] min-[375px]:text-[10px] sm:text-sm text-gray-500 truncate">
                                    Total Books
                                </p>

                                <h2 className="text-xl min-[375px]:text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
                                    {loading ? "..." : stats.totalBooks}
                                </h2>
                            </div>

                            <div className="hidden min-[375px]:flex w-8 h-8 sm:w-11 sm:h-11 rounded-lg bg-blue-50 items-center justify-center text-base sm:text-xl shrink-0">
                                📚
                            </div>
                        </div>

                        <p className="text-[9px] min-[375px]:text-[10px] sm:text-xs text-blue-600 mt-1.5 truncate">
                            Library Collection
                        </p>

                    </div>

                    <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm p-3 min-[375px]:p-4 sm:p-6">

                        <div className="flex items-center justify-between gap-2">
                            <div className="min-w-0">
                                <p className="text-[9px] min-[375px]:text-[10px] sm:text-sm text-gray-500 truncate">
                                    Borrowed
                                </p>

                                <h2 className="text-xl min-[375px]:text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
                                    {loading ? "..." : stats.borrowedBooks}
                                </h2>
                            </div>

                            <div className="hidden min-[375px]:flex w-8 h-8 sm:w-11 sm:h-11 rounded-lg bg-orange-50 items-center justify-center text-base sm:text-xl shrink-0">
                                📖
                            </div>
                        </div>

                        <p className="text-[9px] min-[375px]:text-[10px] sm:text-xs text-orange-600 mt-1.5 truncate">
                            Currently Borrowed
                        </p>

                    </div>

                    <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm p-3 min-[375px]:p-4 sm:p-6">

                        <div className="flex items-center justify-between gap-2">
                            <div className="min-w-0">
                                <p className="text-[9px] min-[375px]:text-[10px] sm:text-sm text-gray-500 truncate">
                                    Overdue
                                </p>

                                <h2 className="text-xl min-[375px]:text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
                                    {loading ? "..." : stats.overdueBooks}
                                </h2>
                            </div>

                            <div className="hidden min-[375px]:flex w-8 h-8 sm:w-11 sm:h-11 rounded-lg bg-red-50 items-center justify-center text-base sm:text-xl shrink-0">
                                ⚠️
                            </div>
                        </div>

                        <p className="text-[9px] min-[375px]:text-[10px] sm:text-xs text-red-600 mt-1.5 truncate">
                            Requires Attention
                        </p>

                    </div>

                </div>

                <div className="grid grid-cols-2 gap-2.5 min-[375px]:gap-3 sm:gap-5 mb-4 min-[375px]:mb-5 sm:mb-7">

                    <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm p-3 min-[375px]:p-4 sm:p-6">

                        <div className="flex items-center justify-between gap-2">

                            <div className="min-w-0">
                                <p className="text-[9px] min-[375px]:text-[10px] sm:text-sm text-gray-500 truncate">
                                    Students
                                </p>

                                <h2 className="text-xl min-[375px]:text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
                                    {loading ? "..." : stats.totalStudents}
                                </h2>

                                <p className="text-[9px] min-[375px]:text-[10px] sm:text-xs text-green-600 mt-1.5 truncate">
                                    Registered Students
                                </p>
                            </div>

                            <div className="w-8 h-8 min-[375px]:w-9 min-[375px]:h-9 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-green-50 flex items-center justify-center text-base min-[375px]:text-lg sm:text-xl shrink-0">
                                🎓
                            </div>

                        </div>

                    </div>

                    <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm p-3 min-[375px]:p-4 sm:p-6">

                        <div className="flex items-center justify-between gap-2">

                            <div className="min-w-0">
                                <p className="text-[9px] min-[375px]:text-[10px] sm:text-sm text-gray-500 truncate">
                                    Admins
                                </p>

                                <h2 className="text-xl min-[375px]:text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
                                    {loading ? "..." : stats.totalAdmins}
                                </h2>

                                <p className="text-[9px] min-[375px]:text-[10px] sm:text-xs text-purple-600 mt-1.5 truncate">
                                    Library Administrators
                                </p>
                            </div>

                            <div className="w-8 h-8 min-[375px]:w-9 min-[375px]:h-9 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-purple-50 flex items-center justify-center text-base min-[375px]:text-lg sm:text-xl shrink-0">
                                🛡️
                            </div>

                        </div>

                    </div>

                </div>

                <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm p-3 min-[375px]:p-4 sm:p-6">

                    <div className="flex items-center justify-between mb-3 min-[375px]:mb-4 sm:mb-5">

                        <div>
                            <p className="text-[9px] min-[375px]:text-[10px] sm:text-xs text-blue-600 font-semibold uppercase tracking-wide">
                                Quick Access
                            </p>

                            <h2 className="text-base min-[375px]:text-lg sm:text-2xl font-bold text-gray-900 mt-0.5">
                                Library Management
                            </h2>
                        </div>

                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 min-[375px]:gap-3 sm:gap-4">

                        <Link
                            to="/add-book"
                            className="group p-3 min-[375px]:p-4 sm:p-5 rounded-xl bg-blue-50 border border-blue-100 hover:bg-blue-100 hover:-translate-y-0.5 transition"
                        >
                            <div className="w-8 h-8 min-[375px]:w-9 min-[375px]:h-9 sm:w-11 sm:h-11 rounded-lg bg-white flex items-center justify-center text-base min-[375px]:text-lg sm:text-xl shadow-sm">
                                ➕
                            </div>

                            <h3 className="text-xs min-[375px]:text-sm sm:text-base font-bold text-gray-900 mt-2">
                                Add Book
                            </h3>

                            <p className="hidden sm:block text-xs text-gray-500 mt-1">
                                Add a new book to the library.
                            </p>
                        </Link>

                        <Link
                            to="/manage-books"
                            className="group p-3 min-[375px]:p-4 sm:p-5 rounded-xl bg-purple-50 border border-purple-100 hover:bg-purple-100 hover:-translate-y-0.5 transition"
                        >
                            <div className="w-8 h-8 min-[375px]:w-9 min-[375px]:h-9 sm:w-11 sm:h-11 rounded-lg bg-white flex items-center justify-center text-base min-[375px]:text-lg sm:text-xl shadow-sm">
                                📚
                            </div>

                            <h3 className="text-xs min-[375px]:text-sm sm:text-base font-bold text-gray-900 mt-2">
                                Manage Books
                            </h3>

                            <p className="hidden sm:block text-xs text-gray-500 mt-1">
                                Update or remove existing books.
                            </p>
                        </Link>

                        <Link
                            to="/users"
                            className="group p-3 min-[375px]:p-4 sm:p-5 rounded-xl bg-green-50 border border-green-100 hover:bg-green-100 hover:-translate-y-0.5 transition"
                        >
                            <div className="w-8 h-8 min-[375px]:w-9 min-[375px]:h-9 sm:w-11 sm:h-11 rounded-lg bg-white flex items-center justify-center text-base min-[375px]:text-lg sm:text-xl shadow-sm">
                                👥
                            </div>

                            <h3 className="text-xs min-[375px]:text-sm sm:text-base font-bold text-gray-900 mt-2">
                                Manage Users
                            </h3>

                            <p className="hidden sm:block text-xs text-gray-500 mt-1">
                                View and manage library users.
                            </p>
                        </Link>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default AdminDashboard;