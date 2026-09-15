import { Link } from "react-router-dom";

const VerifyPage = () => {
    return (
        <div className="min-h-[100dvh] bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 flex items-center justify-center px-2 min-[375px]:px-3 sm:px-5 py-4">

            <div className="w-full max-w-[315px] min-[375px]:max-w-[335px] min-[425px]:max-w-[360px] sm:max-w-[430px]">

                <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden">

                    <div className="h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>

                    <div className="px-4 py-5 min-[375px]:px-5 min-[375px]:py-6 sm:px-8 sm:py-8 text-center">

                        <div className="mx-auto w-12 h-12 min-[375px]:w-14 min-[375px]:h-14 sm:w-18 sm:h-18 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shadow-sm">
                            <span className="text-2xl min-[375px]:text-3xl sm:text-4xl">
                                ✉️
                            </span>
                        </div>

                        <p className="text-[9px] min-[375px]:text-[10px] sm:text-xs uppercase tracking-widest text-blue-600 font-semibold mt-4">
                            Account Verification
                        </p>

                        <h1 className="text-xl min-[375px]:text-2xl sm:text-3xl font-bold text-gray-900 mt-1.5">
                            Check Your Email
                        </h1>

                        <p className="text-[10px] min-[375px]:text-xs sm:text-sm text-gray-500 leading-relaxed mt-3">
                            We've sent a verification link to your registered email address.
                        </p>

                        <p className="text-[10px] min-[375px]:text-xs sm:text-sm text-gray-500 leading-relaxed mt-1.5">
                            Open your inbox and click
                            <span className="font-semibold text-gray-700">
                                {" "}Verify Email{" "}
                            </span>
                            to activate your account.
                        </p>

                        <div className="mt-4 min-[375px]:mt-5 p-3 min-[375px]:p-3.5 bg-blue-50 border border-blue-100 rounded-xl text-left">

                            <div className="flex items-start gap-2.5">

                                <div className="w-7 h-7 min-[375px]:w-8 min-[375px]:h-8 rounded-lg bg-blue-100 flex items-center justify-center shrink-0 text-sm">
                                    💡
                                </div>

                                <div className="min-w-0">
                                    <p className="font-semibold text-[10px] min-[375px]:text-xs sm:text-sm text-blue-800">
                                        Didn't receive the email?
                                    </p>

                                    <p className="text-[9px] min-[375px]:text-[10px] sm:text-xs text-blue-600 mt-0.5 leading-relaxed">
                                        Check your spam or junk folder.
                                    </p>
                                </div>

                            </div>

                        </div>

                        <Link
                            to="/login"
                            className="flex items-center justify-center w-full h-9 min-[375px]:h-10 sm:h-11 mt-4 min-[375px]:mt-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-[11px] min-[375px]:text-xs sm:text-sm font-semibold rounded-lg sm:rounded-xl shadow-md hover:shadow-lg active:scale-[0.98] transition"
                        >
                            Go To Login
                        </Link>

                        <Link
                            to="/"
                            className="inline-block mt-3 min-[375px]:mt-4 text-[10px] min-[375px]:text-xs sm:text-sm text-gray-500 hover:text-blue-600 transition"
                        >
                            ← Back to Home
                        </Link>

                    </div>

                </div>

                <p className="text-center text-[9px] min-[375px]:text-[10px] sm:text-xs text-blue-200/70 mt-3">
                    Please verify your email before signing in.
                </p>

            </div>
        </div>
    );
};

export default VerifyPage;