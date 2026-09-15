import { Link } from "react-router-dom";

const Profile = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const isAdmin = user?.role === "admin";

    return (
        <div className="min-h-[100dvh] bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 px-2 py-4 min-[375px]:px-3 min-[375px]:py-5 sm:px-6 sm:py-10">

            <div className="w-full max-w-3xl mx-auto">

                <div className="mb-3 min-[375px]:mb-4 sm:mb-7">
                    <p className="text-blue-400 font-semibold text-[9px] min-[375px]:text-[10px] sm:text-xs uppercase tracking-wider">
                        Account
                    </p>

                    <h1 className="text-xl min-[375px]:text-2xl sm:text-4xl font-bold text-white mt-1">
                        My Profile
                    </h1>

                    <p className="text-slate-400 text-[10px] min-[375px]:text-xs sm:text-sm mt-1">
                        Manage your library account information.
                    </p>
                </div>

                <div className="bg-white rounded-xl min-[375px]:rounded-2xl shadow-xl overflow-hidden">

                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-3 min-[375px]:px-4 sm:px-7 py-3.5 min-[375px]:py-4 sm:py-7">

                        <div className="flex items-center gap-2.5 min-[375px]:gap-3 sm:gap-4">

                            <div className="w-11 h-11 min-[375px]:w-13 min-[375px]:h-13 sm:w-16 sm:h-16 shrink-0 rounded-full bg-white flex items-center justify-center text-lg min-[375px]:text-xl sm:text-2xl font-bold text-blue-600 shadow-md">
                                {user?.userName?.charAt(0)?.toUpperCase() || "U"}
                            </div>

                            <div className="min-w-0">
                                <h2 className="text-base min-[375px]:text-lg sm:text-xl font-bold text-white truncate">
                                    {user?.userName || "User"}
                                </h2>

                                <p className="text-blue-100 text-[9px] min-[375px]:text-[10px] sm:text-xs mt-0.5 break-all">
                                    {user?.email || "No email available"}
                                </p>

                                <span className="inline-block mt-1 px-1.5 min-[375px]:px-2 py-0.5 bg-white/20 rounded-full text-[8px] min-[375px]:text-[9px] sm:text-[10px] text-white capitalize">
                                    {user?.role || "student"}
                                </span>
                            </div>

                        </div>

                    </div>

                    <div className="p-3 min-[375px]:p-4 sm:p-7">

                        <h3 className="text-sm min-[375px]:text-base sm:text-lg font-bold text-gray-900 mb-2.5 min-[375px]:mb-3 sm:mb-5">
                            Account Information
                        </h3>

                        <div className="grid grid-cols-2 gap-2 min-[375px]:gap-2.5 sm:gap-4">

                            <div className="bg-slate-50 border border-slate-100 rounded-lg min-[375px]:rounded-xl p-2.5 min-[375px]:p-3 sm:p-4">
                                <p className="text-[8px] min-[375px]:text-[9px] sm:text-xs text-gray-500">
                                    Username
                                </p>

                                <p className="font-semibold text-[10px] min-[375px]:text-xs sm:text-sm text-gray-800 mt-0.5 break-words">
                                    {user?.userName || "N/A"}
                                </p>
                            </div>

                            <div className="bg-slate-50 border border-slate-100 rounded-lg min-[375px]:rounded-xl p-2.5 min-[375px]:p-3 sm:p-4">
                                <p className="text-[8px] min-[375px]:text-[9px] sm:text-xs text-gray-500">
                                    Email Address
                                </p>

                                <p className="font-semibold text-[10px] min-[375px]:text-xs sm:text-sm text-gray-800 mt-0.5 break-all">
                                    {user?.email || "N/A"}
                                </p>
                            </div>

                            <div className="bg-slate-50 border border-slate-100 rounded-lg min-[375px]:rounded-xl p-2.5 min-[375px]:p-3 sm:p-4">
                                <p className="text-[8px] min-[375px]:text-[9px] sm:text-xs text-gray-500">
                                    Account Role
                                </p>

                                <p
                                    className={`font-semibold text-[10px] min-[375px]:text-xs sm:text-sm mt-0.5 capitalize ${isAdmin
                                        ? "text-purple-600"
                                        : "text-blue-600"
                                        }`}
                                >
                                    {user?.role || "student"}
                                </p>
                            </div>

                            <div className="bg-slate-50 border border-slate-100 rounded-lg min-[375px]:rounded-xl p-2.5 min-[375px]:p-3 sm:p-4">
                                <p className="text-[8px] min-[375px]:text-[9px] sm:text-xs text-gray-500">
                                    Account Status
                                </p>

                                <p className="font-semibold text-[10px] min-[375px]:text-xs sm:text-sm text-green-600 mt-0.5">
                                    ✓ Active
                                </p>
                            </div>

                        </div>

                        {!isAdmin && (
                            <div className="flex gap-2 min-[375px]:gap-2.5 sm:gap-3 mt-3 min-[375px]:mt-4 sm:mt-6">

                                <Link
                                    to="/my-borrowed-books"
                                    className="flex-1 px-2 min-[375px]:px-3 sm:px-5 py-2 min-[375px]:py-2.5 sm:py-3 bg-blue-600 text-white text-[9px] min-[375px]:text-[10px] sm:text-sm font-semibold rounded-lg sm:rounded-xl hover:bg-blue-700 transition text-center shadow-sm"
                                >
                                    📚 Borrowed Books
                                </Link>

                                <Link
                                    to="/books"
                                    className="flex-1 px-2 min-[375px]:px-3 sm:px-5 py-2 min-[375px]:py-2.5 sm:py-3 border border-gray-300 text-gray-700 text-[9px] min-[375px]:text-[10px] sm:text-sm font-semibold rounded-lg sm:rounded-xl hover:bg-gray-50 transition text-center"
                                >
                                    📖 Browse Books
                                </Link>

                            </div>
                        )}

                        {isAdmin && (
                            <div className="mt-3 min-[375px]:mt-4 sm:mt-6 bg-purple-50 border border-purple-100 rounded-lg sm:rounded-xl p-2.5 min-[375px]:p-3 sm:p-4">

                                <div className="flex items-start gap-2 min-[375px]:gap-3">

                                    <div className="w-8 h-8 min-[375px]:w-9 min-[375px]:h-9 shrink-0 bg-purple-100 rounded-lg flex items-center justify-center text-sm">
                                        🛡️
                                    </div>

                                    <div className="min-w-0">
                                        <h4 className="font-bold text-purple-800 text-[10px] min-[375px]:text-xs sm:text-sm">
                                            Administrator Account
                                        </h4>

                                        <p className="text-[8px] min-[375px]:text-[10px] sm:text-xs text-purple-600 mt-0.5 leading-relaxed">
                                            You have administrator access to manage books and users.
                                        </p>

                                        <Link
                                            to="/admin-dashboard"
                                            className="inline-block mt-1.5 min-[375px]:mt-2 px-2.5 min-[375px]:px-3 py-1.5 bg-purple-600 text-white text-[8px] min-[375px]:text-[10px] sm:text-xs font-semibold rounded-md sm:rounded-lg hover:bg-purple-700 transition"
                                        >
                                            Admin Dashboard
                                        </Link>
                                    </div>

                                </div>

                            </div>
                        )}

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Profile;