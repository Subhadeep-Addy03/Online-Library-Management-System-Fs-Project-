import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setMessage("");
        setError("");

        try {
            const response = await axios.post(
                "http://localhost:9000/user/forgot-password",
                {
                    email,
                }
            );

            if (response.data.success) {
                setMessage(
                    response.data.message ||
                    "Reset password link has been sent to your email."
                );
            }
        } catch (error) {
            console.log("FORGOT PASSWORD ERROR:", error);

            setError(
                error.response?.data?.message ||
                "Something went wrong."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full min-h-[100dvh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 px-2 py-3 sm:px-5 sm:py-6">

            <div className="w-[300px] min-[375px]:w-[320px] min-[425px]:w-[340px] sm:w-full sm:max-w-[430px] bg-white rounded-2xl shadow-2xl overflow-hidden">

                <div className="px-4 py-5 min-[375px]:px-5 min-[375px]:py-6 min-[425px]:px-6 sm:px-8 sm:py-8">

                    <div className="text-center mb-4 min-[375px]:mb-5 sm:mb-7">

                        <div className="mx-auto w-11 h-11 min-[375px]:w-12 min-[375px]:h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg mb-3 min-[375px]:mb-4">
                            <span className="text-xl min-[375px]:text-2xl sm:text-3xl">
                                🔐
                            </span>
                        </div>

                        <h1 className="text-xl min-[375px]:text-2xl sm:text-3xl font-bold text-slate-900">
                            Forgot Password?
                        </h1>

                        <p className="text-[10px] min-[375px]:text-xs sm:text-sm text-slate-500 leading-relaxed mt-1.5 min-[375px]:mt-2 sm:mt-3">
                            Enter your registered email and we will send you a
                            password reset link.
                        </p>
                    </div>

                    {message && (
                        <div className="mb-3 min-[375px]:mb-4 p-2.5 min-[375px]:p-3 bg-green-50 border border-green-200 text-green-600 rounded-lg text-[10px] min-[375px]:text-xs sm:text-sm leading-relaxed">
                            {message}
                        </div>
                    )}

                    {error && (
                        <div className="mb-3 min-[375px]:mb-4 p-2.5 min-[375px]:p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-[10px] min-[375px]:text-xs sm:text-sm leading-relaxed">
                            {error}
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-3 min-[375px]:space-y-3.5 sm:space-y-5"
                    >

                        <div>
                            <label className="block text-[10px] min-[375px]:text-xs sm:text-sm font-semibold text-slate-700 mb-1.5 min-[375px]:mb-2">
                                Email Address
                            </label>

                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your registered email"
                                required
                                className="w-full h-9 min-[375px]:h-10 min-[425px]:h-11 sm:h-12 px-2.5 min-[375px]:px-3 sm:px-4 bg-slate-50 border border-slate-200 rounded-lg sm:rounded-xl outline-none text-xs min-[375px]:text-sm focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-9 min-[375px]:h-10 min-[425px]:h-11 sm:h-12 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs min-[375px]:text-sm font-semibold rounded-lg sm:rounded-xl hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 transition duration-300 cursor-pointer shadow-md"
                        >
                            {loading ? "Sending..." : "Send Reset Link"}
                        </button>

                    </form>

                    <div className="text-center mt-4 min-[375px]:mt-5 sm:mt-6">

                        <Link
                            to="/login"
                            className="text-blue-600 text-[10px] min-[375px]:text-xs sm:text-sm font-semibold hover:text-blue-700 transition"
                        >
                            ← Back To Login
                        </Link>

                    </div>

                </div>

                <div className="h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>

            </div>
        </div>
    );
};

export default ForgotPassword;