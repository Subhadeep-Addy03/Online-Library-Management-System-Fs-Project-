import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { userName, email, password, confirmPassword } = formData;

        if (!userName || !email || !password || !confirmPassword) {
            setError("Please fill all fields.");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const response = await axios.post(
                "http://localhost:9000/user/register",
                {
                    userName,
                    email,
                    password,
                    role: "student",
                }
            );

            if (response.data.success) {
                alert("Registration successful! Please verify your email.");
                navigate("/verify");
            }
        } catch (error) {
            console.error(error);

            setError(
                error.response?.data?.message ||
                error.message ||
                "Registration failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full min-h-[100dvh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 px-2 py-2 sm:px-5 sm:py-6">
            <div className="w-[300px] min-[375px]:w-[320px] min-[425px]:w-[335px] sm:w-full sm:max-w-[430px] md:max-w-4xl lg:max-w-5xl bg-white rounded-xl shadow-2xl overflow-hidden md:grid md:grid-cols-2">
                <div className="hidden md:flex flex-col justify-center items-center text-center p-8 lg:p-10 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
                    <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-white flex items-center justify-center shadow-lg mb-5">
                        <span className="text-3xl lg:text-4xl">📚</span>
                    </div>

                    <h1 className="text-2xl lg:text-3xl font-bold mb-3">
                        Online Library
                    </h1>

                    <p className="text-blue-100 text-sm lg:text-base leading-relaxed max-w-sm">
                        Create your account and get access to our online library
                        management system.
                    </p>

                    <div className="mt-7 space-y-3 text-left">
                        <div className="flex items-center gap-3">
                            <span className="text-lg">✓</span>
                            <span className="text-sm">Browse thousands of books</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-lg">✓</span>
                            <span className="text-sm">Borrow books easily</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-lg">✓</span>
                            <span className="text-sm">Manage your library account</span>
                        </div>
                    </div>
                </div>

                <div className="p-3 min-[375px]:p-4 min-[425px]:p-4 sm:p-7 md:p-8 lg:p-10">
                    <div className="flex md:hidden justify-center mb-2">
                        <div className="w-9 h-9 min-[375px]:w-10 min-[375px]:h-10 rounded-full bg-blue-600 flex items-center justify-center shadow-md">
                            <span className="text-lg min-[375px]:text-xl">📚</span>
                        </div>
                    </div>

                    <div className="text-center mb-3 min-[375px]:mb-4 sm:mb-6">
                        <h2 className="text-lg min-[375px]:text-xl sm:text-2xl md:text-3xl font-bold text-slate-800">
                            Create Account
                        </h2>

                        <p className="text-[10px] min-[375px]:text-xs sm:text-sm text-slate-500 mt-0.5">
                            Join our online library today
                        </p>
                    </div>

                    {error && (
                        <div className="mb-2 min-[375px]:mb-3 px-2 py-1.5 bg-red-50 border border-red-200 text-red-600 rounded-md text-[10px] min-[375px]:text-xs text-center">
                            {error}
                        </div>
                    )}

                    <form className="space-y-2 min-[375px]:space-y-2.5 sm:space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-[10px] min-[375px]:text-xs sm:text-sm font-semibold text-slate-700 mb-1">
                                User Name
                            </label>

                            <input
                                type="text"
                                name="userName"
                                value={formData.userName}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                className="w-full h-8 min-[375px]:h-9 sm:h-11 px-2.5 sm:px-3 border border-slate-300 rounded-md outline-none text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-[10px] min-[375px]:text-xs sm:text-sm font-semibold text-slate-700 mb-1">
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className="w-full h-8 min-[375px]:h-9 sm:h-11 px-2.5 sm:px-3 border border-slate-300 rounded-md outline-none text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div className="grid grid-cols-1 min-[425px]:grid-cols-2 gap-2 sm:gap-3">
                            <div>
                                <label className="block text-[10px] min-[375px]:text-xs sm:text-sm font-semibold text-slate-700 mb-1">
                                    Password
                                </label>

                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Password"
                                        className="w-full h-8 min-[375px]:h-9 sm:h-11 px-2.5 pr-8 sm:px-3 sm:pr-10 border border-slate-300 rounded-md outline-none text-xs sm:text-sm focus:ring-2 focus:ring-blue-500"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] sm:text-xs text-slate-500"
                                    >
                                        {showPassword ? "Hide" : "Show"}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] min-[375px]:text-xs sm:text-sm font-semibold text-slate-700 mb-1">
                                    Confirm
                                </label>

                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Confirm"
                                        className="w-full h-8 min-[375px]:h-9 sm:h-11 px-2.5 pr-8 sm:px-3 sm:pr-10 border border-slate-300 rounded-md outline-none text-xs sm:text-sm focus:ring-2 focus:ring-blue-500"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowConfirmPassword(!showConfirmPassword)
                                        }
                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] sm:text-xs text-slate-500"
                                    >
                                        {showConfirmPassword ? "Hide" : "Show"}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start gap-1.5">
                            <input
                                type="checkbox"
                                required
                                className="mt-0.5 w-3 h-3 sm:w-4 sm:h-4 accent-blue-600"
                            />

                            <p className="text-[9px] min-[375px]:text-[10px] sm:text-xs text-slate-500 leading-tight">
                                I agree to the Terms & Conditions and Privacy Policy.
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-8 min-[375px]:h-9 sm:h-11 rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs sm:text-sm font-semibold shadow-md hover:from-blue-700 hover:to-indigo-700 transition duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading ? "Creating Account..." : "Create Account"}
                        </button>
                    </form>

                    <p className="text-center text-[10px] min-[375px]:text-xs sm:text-sm text-slate-500 mt-2.5 min-[375px]:mt-3 sm:mt-5">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-blue-600 font-semibold hover:underline"
                        >
                            Login
                        </Link>
                    </p>

                    <div className="text-center mt-1.5 sm:mt-3">
                        <Link
                            to="/"
                            className="text-[9px] min-[375px]:text-[10px] sm:text-xs text-slate-400 hover:text-blue-600"
                        >
                            ← Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;