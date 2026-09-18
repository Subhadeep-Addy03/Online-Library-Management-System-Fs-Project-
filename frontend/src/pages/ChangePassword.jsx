import { useState } from "react";
import API from "../api/axiosInstance";

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        if (newPassword.length < 6) {
            setError("New password must be at least 6 characters.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("New password and confirm password do not match.");
            return;
        }

        try {
            setLoading(true);

            const response = await API.put(
                "/user/change-password",
                {
                    oldPassword,
                    newPassword
                }
            );

            if (response.data.success) {
                setMessage(
                    response.data.message ||
                    "Password changed successfully."
                );

                setOldPassword("");
                setNewPassword("");
                setConfirmPassword("");
            }
        } catch (error) {
            console.log("CHANGE PASSWORD ERROR:", error);

            setError(
                error.response?.data?.message ||
                "Failed to change password."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[100dvh] bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 flex items-center justify-center px-2 min-[375px]:px-3 sm:px-5 py-4">

            <div className="w-full max-w-[340px] min-[375px]:max-w-[355px] min-[425px]:max-w-[380px] sm:max-w-[440px]">

                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">

                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-4 min-[375px]:px-5 min-[375px]:py-5 sm:px-7 sm:py-6 text-white">

                        <div className="flex items-center gap-3">

                            <div className="w-9 h-9 min-[375px]:w-10 min-[375px]:h-10 sm:w-12 sm:h-12 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center text-lg min-[375px]:text-xl sm:text-2xl shrink-0">
                                🔐
                            </div>

                            <div className="min-w-0">
                                <p className="text-[9px] min-[375px]:text-[10px] sm:text-xs uppercase tracking-widest text-blue-100 font-semibold">
                                    Account Security
                                </p>

                                <h1 className="text-lg min-[375px]:text-xl sm:text-2xl font-bold leading-tight">
                                    Change Password
                                </h1>
                            </div>

                        </div>

                        <p className="text-[10px] min-[375px]:text-xs sm:text-sm text-blue-100 mt-2 ml-12 min-[375px]:ml-[52px]">
                            Keep your account safe with a strong password.
                        </p>

                    </div>

                    <div className="px-4 py-4 min-[375px]:px-5 min-[375px]:py-5 sm:px-7 sm:py-6">

                        {message && (
                            <div className="mb-3 px-3 py-2 bg-green-50 border border-green-200 text-green-700 rounded-lg text-[10px] min-[375px]:text-xs sm:text-sm">
                                {message}
                            </div>
                        )}

                        {error && (
                            <div className="mb-3 px-3 py-2 bg-red-50 border border-red-200 text-red-600 rounded-lg text-[10px] min-[375px]:text-xs sm:text-sm">
                                {error}
                            </div>
                        )}

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-3 min-[375px]:space-y-3.5 sm:space-y-5"
                        >

                            <div>
                                <label className="block text-[10px] min-[375px]:text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                                    Current Password
                                </label>

                                <input
                                    type="password"
                                    value={oldPassword}
                                    onChange={(e) =>
                                        setOldPassword(e.target.value)
                                    }
                                    placeholder="Enter current password"
                                    required
                                    className="w-full h-9 min-[375px]:h-10 sm:h-11 px-3 min-[375px]:px-3.5 bg-gray-50 border border-gray-200 rounded-lg text-[11px] min-[375px]:text-xs sm:text-sm text-gray-800 outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] min-[375px]:text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                                    New Password
                                </label>

                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) =>
                                        setNewPassword(e.target.value)
                                    }
                                    placeholder="Enter new password"
                                    required
                                    className="w-full h-9 min-[375px]:h-10 sm:h-11 px-3 min-[375px]:px-3.5 bg-gray-50 border border-gray-200 rounded-lg text-[11px] min-[375px]:text-xs sm:text-sm text-gray-800 outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] min-[375px]:text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                                    Confirm New Password
                                </label>

                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                    placeholder="Confirm new password"
                                    required
                                    className="w-full h-9 min-[375px]:h-10 sm:h-11 px-3 min-[375px]:px-3.5 bg-gray-50 border border-gray-200 rounded-lg text-[11px] min-[375px]:text-xs sm:text-sm text-gray-800 outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full h-9 min-[375px]:h-10 sm:h-11 mt-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-[11px] min-[375px]:text-xs sm:text-sm font-semibold rounded-lg shadow-md hover:shadow-lg disabled:opacity-50 transition cursor-pointer"
                            >
                                {loading
                                    ? "Updating..."
                                    : "Update Password"}
                            </button>

                        </form>

                        <p className="text-center text-[9px] min-[375px]:text-[10px] sm:text-xs text-gray-400 mt-3 sm:mt-5">
                            Use at least 6 characters for your new password.
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default ChangePassword;