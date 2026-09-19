// import { Link } from "react-router-dom";

// const VerifyPage = () => {
//     return (
//         <div className="min-h-[100dvh] bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 flex items-center justify-center px-2 min-[375px]:px-3 sm:px-5 py-4">

//             <div className="w-full max-w-[315px] min-[375px]:max-w-[335px] min-[425px]:max-w-[360px] sm:max-w-[430px]">

//                 <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden">

//                     <div className="h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>

//                     <div className="px-4 py-5 min-[375px]:px-5 min-[375px]:py-6 sm:px-8 sm:py-8 text-center">

//                         <div className="mx-auto w-12 h-12 min-[375px]:w-14 min-[375px]:h-14 sm:w-18 sm:h-18 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shadow-sm">
//                             <span className="text-2xl min-[375px]:text-3xl sm:text-4xl">
//                                 ✉️
//                             </span>
//                         </div>

//                         <p className="text-[9px] min-[375px]:text-[10px] sm:text-xs uppercase tracking-widest text-blue-600 font-semibold mt-4">
//                             Account Verification
//                         </p>

//                         <h1 className="text-xl min-[375px]:text-2xl sm:text-3xl font-bold text-gray-900 mt-1.5">
//                             Check Your Email
//                         </h1>

//                         <p className="text-[10px] min-[375px]:text-xs sm:text-sm text-gray-500 leading-relaxed mt-3">
//                             We've sent a verification link to your registered email address.
//                         </p>

//                         <p className="text-[10px] min-[375px]:text-xs sm:text-sm text-gray-500 leading-relaxed mt-1.5">
//                             Open your inbox and click
//                             <span className="font-semibold text-gray-700">
//                                 {" "}Verify Email{" "}
//                             </span>
//                             to activate your account.
//                         </p>

//                         <div className="mt-4 min-[375px]:mt-5 p-3 min-[375px]:p-3.5 bg-blue-50 border border-blue-100 rounded-xl text-left">

//                             <div className="flex items-start gap-2.5">

//                                 <div className="w-7 h-7 min-[375px]:w-8 min-[375px]:h-8 rounded-lg bg-blue-100 flex items-center justify-center shrink-0 text-sm">
//                                     💡
//                                 </div>

//                                 <div className="min-w-0">
//                                     <p className="font-semibold text-[10px] min-[375px]:text-xs sm:text-sm text-blue-800">
//                                         Didn't receive the email?
//                                     </p>

//                                     <p className="text-[9px] min-[375px]:text-[10px] sm:text-xs text-blue-600 mt-0.5 leading-relaxed">
//                                         Check your spam or junk folder.
//                                     </p>
//                                 </div>

//                             </div>

//                         </div>

//                         <Link
//                             to="/login"
//                             className="flex items-center justify-center w-full h-9 min-[375px]:h-10 sm:h-11 mt-4 min-[375px]:mt-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-[11px] min-[375px]:text-xs sm:text-sm font-semibold rounded-lg sm:rounded-xl shadow-md hover:shadow-lg active:scale-[0.98] transition"
//                         >
//                             Go To Login
//                         </Link>

//                         <Link
//                             to="/"
//                             className="inline-block mt-3 min-[375px]:mt-4 text-[10px] min-[375px]:text-xs sm:text-sm text-gray-500 hover:text-blue-600 transition"
//                         >
//                             ← Back to Home
//                         </Link>

//                     </div>

//                 </div>

//                 <p className="text-center text-[9px] min-[375px]:text-[10px] sm:text-xs text-blue-200/70 mt-3">
//                     Please verify your email before signing in.
//                 </p>

//             </div>
//         </div>
//     );
// };

// export default VerifyPage;




import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import API from "../api/axiosInstance";
import { toast } from "react-hot-toast";

const VerifyPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const email = location.state?.email;

    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const [error, setError] = useState("");
    const [countdown, setCountdown] = useState(60);

    useEffect(() => {
        if (!email) {
            navigate("/register");
        }
    }, [email, navigate]);

    useEffect(() => {
        if (countdown <= 0) {
            return;
        }

        const timer = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [countdown]);

    const handleOtpChange = (e) => {
        const value = e.target.value.replace(/\D/g, "");

        if (value.length <= 6) {
            setOtp(value);
            setError("");
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();

        if (otp.length !== 6) {
            setError("Please enter a valid 6-digit OTP.");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const response = await API.post("/user/verify-otp", {
                email,
                otp
            });

            if (response.data.success) {
                toast.success("OTP verified successfully. Redirecting to login...");

                setTimeout(() => {
                    navigate("/login");
                }, 2500);
            }
        } catch (error) {
            console.log("VERIFY OTP ERROR:", error);
            console.log("RESPONSE:", error.response?.data);

            setError(
                error.response?.data?.message ||
                "OTP verification failed."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleResendOtp = async () => {
        try {
            setResendLoading(true);
            setError("");

            const response = await API.post("/user/resend-otp", {
                email
            });

            if (response.data.success) {
                toast.success("New OTP sent successfully.");

                setOtp("");
                setCountdown(60);
            }
        } catch (error) {
            console.log("RESEND OTP ERROR:", error);
            console.log("RESPONSE:", error.response?.data);

            setError(
                error.response?.data?.message ||
                "Failed to resend OTP."
            );
        } finally {
            setResendLoading(false);
        }
    };

    if (!email) {
        return null;
    }

    return (
        <div className="min-h-[100dvh] bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 flex items-center justify-center px-2 min-[375px]:px-3 sm:px-5 py-4">

            <div className="w-full max-w-[315px] min-[375px]:max-w-[335px] min-[425px]:max-w-[360px] sm:max-w-[430px]">

                <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden">

                    <div className="h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>

                    <div className="px-4 py-5 min-[375px]:px-5 min-[375px]:py-6 sm:px-8 sm:py-8 text-center">

                        <div className="mx-auto w-12 h-12 min-[375px]:w-14 min-[375px]:h-14 sm:w-16 sm:h-16 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shadow-sm">
                            <span className="text-2xl min-[375px]:text-3xl sm:text-4xl">
                                🔐
                            </span>
                        </div>

                        <p className="text-[9px] min-[375px]:text-[10px] sm:text-xs uppercase tracking-widest text-blue-600 font-semibold mt-4">
                            Account Verification
                        </p>

                        <h1 className="text-xl min-[375px]:text-2xl sm:text-3xl font-bold text-gray-900 mt-1.5">
                            Verify Your Email
                        </h1>

                        <p className="text-[10px] min-[375px]:text-xs sm:text-sm text-gray-500 leading-relaxed mt-3">
                            Please provide the OTP sent to your email to verify your account.
                        </p>

                        <p className="text-[10px] min-[375px]:text-xs sm:text-sm font-semibold text-blue-600 mt-2 break-all">
                            {email}
                        </p>

                        {error && (
                            <div className="mt-4 px-3 py-2 bg-red-50 border border-red-200 text-red-600 rounded-lg text-[10px] min-[375px]:text-xs">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleVerifyOtp}>

                            <div className="mt-5 min-[375px]:mt-6">

                                <label className="block text-left text-[10px] min-[375px]:text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                                    Enter 6-Digit OTP
                                </label>

                                <input
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={6}
                                    value={otp}
                                    onChange={handleOtpChange}
                                    placeholder="Enter OTP"
                                    className="w-full h-11 min-[375px]:h-12 sm:h-14 px-3 text-center text-lg min-[375px]:text-xl sm:text-2xl font-bold tracking-[0.45em] border border-gray-300 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />

                            </div>

                            <button
                                type="submit"
                                disabled={loading || otp.length !== 6}
                                className="w-full h-9 min-[375px]:h-10 sm:h-11 mt-4 min-[375px]:mt-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-[11px] min-[375px]:text-xs sm:text-sm font-semibold rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? "Verifying..." : "Verify OTP"}
                            </button>

                        </form>

                        <div className="mt-4 min-[375px]:mt-5">

                            {countdown > 0 ? (
                                <p className="text-[10px] min-[375px]:text-xs sm:text-sm text-gray-500">
                                    Resend OTP in{" "}
                                    <span className="font-semibold text-blue-600">
                                        {countdown}s
                                    </span>
                                </p>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleResendOtp}
                                    disabled={resendLoading}
                                    className="text-[10px] min-[375px]:text-xs sm:text-sm text-blue-600 font-semibold hover:underline disabled:opacity-50"
                                >
                                    {resendLoading ? "Sending..." : "Resend OTP"}
                                </button>
                            )}

                        </div>

                        <Link
                            to="/register"
                            className="inline-block mt-4 min-[375px]:mt-5 text-[10px] min-[375px]:text-xs sm:text-sm text-gray-500 hover:text-blue-600 transition"
                        >
                            ← Back to Register
                        </Link>

                    </div>

                </div>

                <p className="text-center text-[9px] min-[375px]:text-[10px] sm:text-xs text-blue-200/70 mt-3">
                    Secure email verification • Online Library
                </p>

            </div>

        </div>
    );
};

export default VerifyPage;