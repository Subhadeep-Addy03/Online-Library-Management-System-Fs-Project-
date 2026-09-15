
import { useEffect, useState } from "react";
import axios from "axios";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const getAllUsers = async () => {
        try {
            setLoading(true);
            setError("");

            const token = localStorage.getItem("accessToken");

            if (!token) {
                setError("Authorization failed. Please login as admin.");
                return;
            }

            const response = await axios.get(
                "http://localhost:9000/user/getallusers",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.success) {
                setUsers(response.data.data);
            } else {
                setError(
                    response.data.message ||
                    "Failed to fetch users."
                );
            }
        } catch (error) {
            console.log("GET USERS ERROR:", error);

            setError(
                error.response?.data?.message ||
                error.message ||
                "Failed to fetch users."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    const handleRefresh = () => {
        getAllUsers();
    };

    const totalStudents = users.filter(
        (user) => user.role === "student"
    ).length;

    const totalAdmins = users.filter(
        (user) => user.role === "admin"
    ).length;

    return (
        <div className="min-h-[100dvh] bg-gradient-to-br from-slate-50 via-white to-blue-50 px-2 min-[375px]:px-3 sm:px-5 md:px-8 lg:px-10 py-4 min-[375px]:py-5 sm:py-8">

            <div className="max-w-7xl mx-auto">

                <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-indigo-900 rounded-2xl shadow-lg px-4 py-4 min-[375px]:px-5 min-[375px]:py-5 sm:px-7 sm:py-6 mb-4 min-[375px]:mb-5 sm:mb-7 text-white">

                    <div className="flex items-center justify-between gap-3">

                        <div className="flex items-center gap-3 min-w-0">

                            <div className="w-9 h-9 min-[375px]:w-10 min-[375px]:h-10 sm:w-12 sm:h-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-lg min-[375px]:text-xl sm:text-2xl shrink-0">
                                👥
                            </div>

                            <div className="min-w-0">

                                <p className="text-[9px] min-[375px]:text-[10px] sm:text-xs uppercase tracking-widest text-blue-200 font-semibold">
                                    Admin Panel
                                </p>

                                <h1 className="text-lg min-[375px]:text-xl sm:text-2xl md:text-3xl font-bold leading-tight truncate">
                                    Manage Users
                                </h1>

                                <p className="hidden sm:block text-xs sm:text-sm text-blue-100 mt-1">
                                    View and monitor all registered users.
                                </p>

                            </div>

                        </div>

                        <button
                            onClick={handleRefresh}
                            disabled={loading}
                            className="shrink-0 h-8 min-[375px]:h-9 sm:h-10 px-2.5 min-[375px]:px-3 sm:px-4 bg-white/10 hover:bg-white/20 border border-white/15 text-white rounded-lg sm:rounded-xl text-[9px] min-[375px]:text-[10px] sm:text-xs font-semibold transition cursor-pointer disabled:opacity-50"
                        >
                            ↻ <span className="hidden min-[375px]:inline">Refresh</span>
                        </button>

                    </div>

                </div>

                {error && (
                    <div className="mb-3 min-[375px]:mb-4 px-3 py-2 min-[375px]:py-2.5 rounded-lg bg-red-50 border border-red-200 text-red-600 text-[10px] min-[375px]:text-xs sm:text-sm font-medium">
                        {error}
                    </div>
                )}

                {!loading && !error && (
                    <div className="grid grid-cols-3 gap-2 min-[375px]:gap-3 sm:gap-5 mb-4 min-[375px]:mb-5 sm:mb-7">

                        <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm p-3 min-[375px]:p-4 sm:p-6">

                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

                                <div className="min-w-0">

                                    <p className="text-[9px] min-[375px]:text-[10px] sm:text-sm text-gray-500 truncate">
                                        Total Users
                                    </p>

                                    <h2 className="text-xl min-[375px]:text-2xl sm:text-3xl font-bold text-gray-900 mt-1 sm:mt-2">
                                        {users.length}
                                    </h2>

                                </div>

                                <div className="hidden min-[375px]:flex w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-blue-50 items-center justify-center text-base sm:text-2xl shrink-0">
                                    👥
                                </div>

                            </div>

                        </div>

                        <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm p-3 min-[375px]:p-4 sm:p-6">

                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

                                <div className="min-w-0">

                                    <p className="text-[9px] min-[375px]:text-[10px] sm:text-sm text-gray-500 truncate">
                                        Students
                                    </p>

                                    <h2 className="text-xl min-[375px]:text-2xl sm:text-3xl font-bold text-gray-900 mt-1 sm:mt-2">
                                        {totalStudents}
                                    </h2>

                                </div>

                                <div className="hidden min-[375px]:flex w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-green-50 items-center justify-center text-base sm:text-2xl shrink-0">
                                    🎓
                                </div>

                            </div>

                        </div>

                        <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm p-3 min-[375px]:p-4 sm:p-6">

                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

                                <div className="min-w-0">

                                    <p className="text-[9px] min-[375px]:text-[10px] sm:text-sm text-gray-500 truncate">
                                        Admins
                                    </p>

                                    <h2 className="text-xl min-[375px]:text-2xl sm:text-3xl font-bold text-gray-900 mt-1 sm:mt-2">
                                        {totalAdmins}
                                    </h2>

                                </div>

                                <div className="hidden min-[375px]:flex w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-purple-50 items-center justify-center text-base sm:text-2xl shrink-0">
                                    🛡️
                                </div>

                            </div>

                        </div>

                    </div>
                )}

                <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

                    <div className="px-3 py-3 min-[375px]:px-4 min-[375px]:py-4 sm:px-6 sm:py-5 border-b border-gray-100 flex items-center justify-between gap-2">

                        <div className="flex items-center gap-2 min-w-0">

                            <div className="w-7 h-7 min-[375px]:w-8 min-[375px]:h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-sm shrink-0">
                                👤
                            </div>

                            <div className="min-w-0">

                                <h2 className="text-base min-[375px]:text-lg sm:text-2xl font-bold text-gray-900">
                                    All Users
                                </h2>

                                <p className="text-[9px] min-[375px]:text-[10px] sm:text-sm text-gray-500 mt-0.5">
                                    Registered users
                                </p>

                            </div>

                        </div>

                        <div className="px-2 min-[375px]:px-2.5 py-1 min-[375px]:py-1.5 rounded-full bg-blue-50 text-blue-600 text-[9px] min-[375px]:text-[10px] sm:text-xs font-bold shrink-0">
                            {users.length}
                        </div>

                    </div>

                    {loading && (
                        <div className="py-12 min-[375px]:py-14 sm:py-20 text-center">

                            <div className="w-8 h-8 min-[375px]:w-9 min-[375px]:h-9 sm:w-12 sm:h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>

                            <p className="mt-3 text-[10px] min-[375px]:text-xs sm:text-sm text-gray-500">
                                Loading users...
                            </p>

                        </div>
                    )}

                    {!loading && !error && users.length === 0 && (
                        <div className="py-12 min-[375px]:py-14 sm:py-20 text-center px-4">

                            <div className="text-4xl min-[375px]:text-5xl sm:text-6xl">
                                👥
                            </div>

                            <p className="text-[10px] min-[375px]:text-xs sm:text-lg text-gray-500 mt-3">
                                No users found.
                            </p>

                        </div>
                    )}

                    {!loading && !error && users.length > 0 && (
                        <>
                            <div className="md:hidden p-2 min-[375px]:p-3">

                                <div className="space-y-2 min-[375px]:space-y-3">

                                    {users.map((user) => (
                                        <div
                                            key={user._id}
                                            className="border border-gray-100 rounded-xl bg-slate-50/70 p-3 min-[375px]:p-4"
                                        >

                                            <div className="flex items-center justify-between gap-2">

                                                <div className="flex items-center gap-2.5 min-[375px]:gap-3 min-w-0">

                                                    <div className="w-9 h-9 min-[375px]:w-11 min-[375px]:h-11 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-sm min-[375px]:text-base shrink-0">
                                                        {user?.userName
                                                            ?.charAt(0)
                                                            ?.toUpperCase() || "U"}
                                                    </div>

                                                    <div className="min-w-0">

                                                        <p className="font-semibold text-gray-900 text-xs min-[375px]:text-sm truncate">
                                                            {user.userName}
                                                        </p>

                                                        <p className="text-[9px] min-[375px]:text-[10px] text-gray-400 truncate max-w-[170px] min-[375px]:max-w-[210px]">
                                                            {user.email}
                                                        </p>

                                                    </div>

                                                </div>

                                                <span
                                                    className={`px-2 py-1 rounded-full text-[8px] min-[375px]:text-[10px] font-bold shrink-0 ${user.role === "admin"
                                                            ? "bg-purple-50 text-purple-600"
                                                            : "bg-blue-50 text-blue-600"
                                                        }`}
                                                >
                                                    {user.role}
                                                </span>

                                            </div>

                                            <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-gray-200">

                                                <div className="min-w-0">

                                                    <p className="text-[8px] min-[375px]:text-[9px] uppercase tracking-wide text-gray-400 font-semibold">
                                                        Verification
                                                    </p>

                                                    {user.isVerified ? (
                                                        <span className="inline-flex mt-1 px-2 py-1 bg-green-50 text-green-600 rounded-full text-[8px] min-[375px]:text-[9px] font-semibold">
                                                            ✓ Verified
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex mt-1 px-2 py-1 bg-yellow-50 text-yellow-600 rounded-full text-[8px] min-[375px]:text-[9px] font-semibold">
                                                            ⚠ Not Verified
                                                        </span>
                                                    )}

                                                </div>

                                                <div>

                                                    <p className="text-[8px] min-[375px]:text-[9px] uppercase tracking-wide text-gray-400 font-semibold">
                                                        Status
                                                    </p>

                                                    {user.isLogIn ? (
                                                        <span className="inline-flex items-center gap-1.5 mt-1 px-2 py-1 bg-green-50 text-green-600 rounded-full text-[8px] min-[375px]:text-[9px] font-semibold">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                                            Online
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1.5 mt-1 px-2 py-1 bg-gray-100 text-gray-500 rounded-full text-[8px] min-[375px]:text-[9px] font-semibold">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                                                            Offline
                                                        </span>
                                                    )}

                                                </div>

                                            </div>

                                        </div>
                                    ))}

                                </div>

                            </div>

                            <div className="hidden md:block overflow-x-auto">

                                <table className="w-full text-left">

                                    <thead className="bg-gray-50">

                                        <tr>

                                            <th className="px-4 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm font-semibold text-gray-600">
                                                User
                                            </th>

                                            <th className="px-4 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm font-semibold text-gray-600">
                                                Email
                                            </th>

                                            <th className="px-4 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm font-semibold text-gray-600">
                                                Role
                                            </th>

                                            <th className="px-4 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm font-semibold text-gray-600">
                                                Verification
                                            </th>

                                            <th className="px-4 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm font-semibold text-gray-600">
                                                Status
                                            </th>

                                        </tr>

                                    </thead>

                                    <tbody className="divide-y divide-gray-100">

                                        {users.map((user) => (
                                            <tr
                                                key={user._id}
                                                className="hover:bg-gray-50 transition"
                                            >

                                                <td className="px-4 lg:px-6 py-3 lg:py-4">

                                                    <div className="flex items-center gap-3">

                                                        <div className="w-10 h-10 lg:w-11 lg:h-11 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-sm lg:text-lg shrink-0">
                                                            {user?.userName
                                                                ?.charAt(0)
                                                                ?.toUpperCase() || "U"}
                                                        </div>

                                                        <div className="min-w-0">

                                                            <p className="font-semibold text-gray-900 text-xs lg:text-sm truncate max-w-[150px]">
                                                                {user.userName}
                                                            </p>

                                                            <p className="text-[10px] text-gray-400 truncate max-w-[150px]">
                                                                ID: {user._id}
                                                            </p>

                                                        </div>

                                                    </div>

                                                </td>

                                                <td className="px-4 lg:px-6 py-3 lg:py-4">

                                                    <p className="text-xs lg:text-sm text-gray-600 truncate max-w-[220px]">
                                                        {user.email}
                                                    </p>

                                                </td>

                                                <td className="px-4 lg:px-6 py-3 lg:py-4">

                                                    <span
                                                        className={`px-2.5 lg:px-3 py-1 text-[10px] lg:text-xs font-semibold rounded-full ${user.role === "admin"
                                                                ? "bg-purple-50 text-purple-600"
                                                                : "bg-blue-50 text-blue-600"
                                                            }`}
                                                    >
                                                        {user.role}
                                                    </span>

                                                </td>

                                                <td className="px-4 lg:px-6 py-3 lg:py-4">

                                                    {user.isVerified ? (
                                                        <span className="px-2.5 lg:px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] lg:text-xs font-semibold whitespace-nowrap">
                                                            ✓ Verified
                                                        </span>
                                                    ) : (
                                                        <span className="px-2.5 lg:px-3 py-1 bg-yellow-50 text-yellow-600 rounded-full text-[10px] lg:text-xs font-semibold whitespace-nowrap">
                                                            ⚠ Not Verified
                                                        </span>
                                                    )}

                                                </td>

                                                <td className="px-4 lg:px-6 py-3 lg:py-4">

                                                    {user.isLogIn ? (
                                                        <span className="inline-flex items-center gap-1.5 px-2.5 lg:px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] lg:text-xs font-semibold">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                                            Online
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1.5 px-2.5 lg:px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-[10px] lg:text-xs font-semibold">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                                                            Offline
                                                        </span>
                                                    )}

                                                </td>

                                            </tr>
                                        ))}

                                    </tbody>

                                </table>

                            </div>
                        </>
                    )}

                </div>

            </div>

        </div>
    );
};

export default ManageUsers