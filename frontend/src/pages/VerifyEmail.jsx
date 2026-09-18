import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API from "../api/axiosInstance";

const VerifyEmail = () => {
    const { token } = useParams();

    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await API.get(
                    "/user/verify",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.data.success) {
                    setSuccess(true);
                }
            } catch (error) {
                console.log("VERIFY ERROR:", error);
                console.log("RESPONSE:", error.response?.data);

                setError(
                    error.response?.data?.message ||
                    "Email verification failed."
                );
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            verifyEmail();
        } else {
            setError("Verification token not found.");
            setLoading(false);
        }
    }, [token]);

    return (
        <div className="min-h-[100dvh] bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 flex items-center justify-center px-2 min-[375px]:px-3 sm:px-5 py-4">

            <div className="w-full max-w-[315px] min-[375px]:max-w-[335px] min-[425px]:max-w-[360px] sm:max-w-[430px]">

                <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden">

                    <div className="h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>

                    <div className="px-4 py-5 min-[375px]:px-5 min-[375px]:py-6 sm:px-8 sm:py-7 text-center">

                        <Link
                            to="/"
                            className="inline-block text-lg min-[375px]:text-xl sm:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"
                        >
                            Online Library
                        </Link>

                        {loading && (
                            <div className="mt-6 min-[375px]:mt-7 sm:mt-9">

                                <div className="w-10 h-10 min-[375px]:w-11 min-[375px]:h-11 sm:w-14 sm:h-14 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mx-auto"></div>

                                <h2 className="text-base min-[375px]:text-lg sm:text-2xl font-bold text-gray-800 mt-4 min-[375px]:mt-5">
                                    Verifying Your Email
                                </h2>

                                <p className="text-[10px] min-[375px]:text-xs sm:text-sm text-gray-500 mt-1.5 min-[375px]:mt-2 leading-relaxed">
                                    Please wait while we verify your account.
                                </p>

                            </div>
                        )}

                        {!loading && success && (
                            <div className="mt-6 min-[375px]:mt-7 sm:mt-9">

                                <div className="w-12 h-12 min-[375px]:w-14 min-[375px]:h-14 sm:w-16 sm:h-16 bg-green-50 border border-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-2xl min-[375px]:text-3xl sm:text-4xl font-bold shadow-sm">
                                    ✓
                                </div>

                                <h2 className="text-lg min-[375px]:text-xl sm:text-2xl font-bold text-gray-800 mt-4 min-[375px]:mt-5">
                                    Email Verified!
                                </h2>

                                <p className="text-[10px] min-[375px]:text-xs sm:text-sm text-gray-500 mt-2 leading-relaxed">
                                    Your email has been successfully verified.
                                    You can now login to your account.
                                </p>

                                <Link
                                    to="/login"
                                    className="flex items-center justify-center w-full h-9 min-[375px]:h-10 sm:h-11 mt-5 min-[375px]:mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-[11px] min-[375px]:text-xs sm:text-sm font-semibold rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition"
                                >
                                    Go To Login
                                </Link>

                            </div>
                        )}

                        {!loading && !success && error && (
                            <div className="mt-6 min-[375px]:mt-7 sm:mt-9">

                                <div className="w-12 h-12 min-[375px]:w-14 min-[375px]:h-14 sm:w-16 sm:h-16 bg-red-50 border border-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto text-xl min-[375px]:text-2xl sm:text-3xl font-bold shadow-sm">
                                    ✕
                                </div>

                                <h2 className="text-lg min-[375px]:text-xl sm:text-2xl font-bold text-gray-800 mt-4 min-[375px]:mt-5">
                                    Verification Failed
                                </h2>

                                <p className="text-[10px] min-[375px]:text-xs sm:text-sm text-red-500 mt-2 leading-relaxed break-words">
                                    {error}
                                </p>

                                <Link
                                    to="/register"
                                    className="flex items-center justify-center w-full h-9 min-[375px]:h-10 sm:h-11 mt-5 min-[375px]:mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-[11px] min-[375px]:text-xs sm:text-sm font-semibold rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition"
                                >
                                    Back To Register
                                </Link>

                            </div>
                        )}

                    </div>

                </div>

                <p className="text-center text-[9px] min-[375px]:text-[10px] sm:text-xs text-blue-200/70 mt-3">
                    Secure email verification • Online Library
                </p>

            </div>

        </div>
    );
};

export default VerifyEmail;