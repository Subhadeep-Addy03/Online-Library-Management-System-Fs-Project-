import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axiosInstance";

const ResetPassword = () => {

    const { token } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        newPassword: "",
        confirmPassword: ""
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        if (!formData.newPassword || !formData.confirmPassword) {
            setError("Please fill in all fields.");
            return;
        }

        if (formData.newPassword.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        if (formData.newPassword !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {

            setLoading(true);

            const response = await API.post(
                `/user/reset-password/${token}`,
                {
                    newPassword: formData.newPassword,
                    confirmPassword: formData.confirmPassword
                }
            );

            setMessage(response.data.message);

            setFormData({
                newPassword: "",
                confirmPassword: ""
            });

            setTimeout(() => {
                navigate("/login");
            }, 2000);

        }

        catch (error) {
            console.log("RESET PASSWORD ERROR:", error);
            console.log("RESPONSE:", error.response?.data);

            setError(
                error.response?.data?.message ||
                error.message ||
                "Something went wrong. Please try again."
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 via-white to-blue-100 px-4">

            <div className="w-full max-w-md">

                {/* Card */}
                <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">

                    {/* Icon */}
                    <div className="flex justify-center mb-5">
                        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-cyan-100">
                            <span className="text-3xl">
                                🔐
                            </span>
                        </div>
                    </div>

                    {/* Heading */}
                    <div className="text-center mb-7">
                        <h1 className="text-2xl font-bold text-gray-800">
                            Reset Your Password
                        </h1>

                        <p className="text-sm text-gray-500 mt-2">
                            Create a new password for your account.
                        </p>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="mb-5 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm text-center">
                            {error}
                        </div>
                    )}

                    {/* Success */}
                    {message && (
                        <div className="mb-5 p-3 rounded-lg bg-green-50 border border-green-200 text-green-600 text-sm text-center">
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>

                        {/* New Password */}
                        <div className="mb-5">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                New Password
                            </label>

                            <input
                                type="password"
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleChange}
                                placeholder="Enter new password"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition duration-300"
                            />
                        </div>

                        {/* Confirm Password */}
                        <div className="mb-6">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Confirm Password
                            </label>

                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm your password"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition duration-300"
                            />
                        </div>

                        {/* Reset Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-lg transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {loading ? "Resetting Password..." : "Reset Password"}
                        </button>

                    </form>

                    {/* Back Login */}
                    <div className="text-center mt-6">
                        <button
                            onClick={() => navigate("/login")}
                            className="text-sm text-cyan-600 hover:text-cyan-700 font-medium"
                        >
                            ← Back to Login
                        </button>
                    </div>

                </div>

                {/* Footer text */}
                <p className="text-center text-xs text-gray-500 mt-5">
                    Online Library System • Secure Password Recovery
                </p>

            </div>
        </div>
    );
};

export default ResetPassword;