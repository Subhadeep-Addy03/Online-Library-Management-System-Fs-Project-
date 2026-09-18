import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axiosInstance";
import toast from "react-hot-toast";

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // HANDLE INPUT CHANGE

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (error) {
            setError("");
        }
    };

    // HANDLE LOGIN

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        const { email, password } = formData;

        if (!email || !password) {
            setError("Please fill all the fields.");
            return;
        }

        try {
            setLoading(true);

            const response = await API.post(
                "/user/login",
                {
                    email,
                    password,
                }
            );

            console.log("LOGIN RESPONSE:", response.data);

            if (response.data.success) {
                const user = response.data.user;

                localStorage.setItem(
                    "accessToken",
                    response.data.accessToken
                );

                localStorage.setItem(
                    "refreshToken",
                    response.data.refreshToken
                );

                localStorage.setItem(
                    "user",
                    JSON.stringify(user)
                );

                window.dispatchEvent(
                    new Event("authChange")
                );

                toast.success("Login Successfull !")
                navigate("/");
            }
        } catch (error) {
            console.log("LOGIN ERROR:", error);

            setError(
                error.response?.data?.message ||
                "Login Failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="
                relative
                w-full
                h-[100dvh]
                overflow-hidden
                flex
                items-center
                justify-center
                bg-gradient-to-br
                from-slate-950
                via-blue-950
                to-indigo-950
                px-2
                min-[375px]:px-3
                sm:px-5
            "
        >

            {/* ==========================================
                BACKGROUND EFFECTS
            ========================================== */}

            <div
                className="
                    absolute
                    -top-24
                    -left-24
                    w-60
                    h-60
                    bg-blue-500/20
                    rounded-full
                    blur-3xl
                "
            />

            <div
                className="
                    absolute
                    -bottom-24
                    -right-24
                    w-60
                    h-60
                    bg-indigo-500/20
                    rounded-full
                    blur-3xl
                "
            />

            {/* ==========================================
                LOGIN CARD
            ========================================== */}

            <div
                className="
                    relative
                    z-10
                    w-full
                    max-w-[330px]
                    min-[375px]:max-w-[345px]
                    min-[420px]:max-w-[365px]
                    sm:max-w-[410px]

                    bg-white
                    rounded-xl
                    min-[375px]:rounded-2xl
                    sm:rounded-3xl

                    shadow-2xl

                    px-4
                    py-4

                    min-[375px]:px-5
                    min-[375px]:py-5

                    min-[420px]:px-6
                    min-[420px]:py-5

                    sm:px-8
                    sm:py-7
                "
            >

                {/* ==========================================
                    LOGO
                ========================================== */}

                <div
                    className="
                        flex
                        justify-center
                        mb-2.5
                        min-[375px]:mb-3
                        sm:mb-4
                    "
                >

                    <Link
                        to="/"
                        className="
                            flex
                            items-center
                            gap-1.5
                            text-base
                            min-[375px]:text-lg
                            min-[420px]:text-xl
                            sm:text-2xl
                            font-bold
                            text-blue-600
                            hover:text-indigo-600
                            transition
                            duration-300
                        "
                    >
                        <span
                            className="
                                text-lg
                                min-[375px]:text-xl
                                min-[420px]:text-2xl
                                sm:text-3xl
                            "
                        >
                            📚
                        </span>

                        Online Library
                    </Link>

                </div>

                {/* ==========================================
                    HEADING
                ========================================== */}

                <div
                    className="
                        text-center
                        mb-4
                        min-[375px]:mb-5
                        min-[420px]:mb-5
                        sm:mb-6
                    "
                >

                    <h1
                        className="
                            text-xl
                            min-[375px]:text-2xl
                            min-[420px]:text-2xl
                            sm:text-3xl
                            font-bold
                            text-slate-800
                        "
                    >
                        Welcome Back!
                    </h1>

                    <p
                        className="
                            mt-1
                            text-[10px]
                            min-[375px]:text-xs
                            min-[420px]:text-sm
                            sm:text-sm
                            text-slate-500
                        "
                    >
                        Sign in to continue your library access.
                    </p>

                </div>

                {/* ==========================================
                    LOGIN FORM
                ========================================== */}

                <form
                    onSubmit={handleSubmit}
                    className="
                        space-y-3
                        min-[375px]:space-y-3.5
                        min-[420px]:space-y-4
                        sm:space-y-4
                    "
                >

                    {/* ==========================================
                        EMAIL
                    ========================================== */}

                    <div>

                        <label
                            htmlFor="email"
                            className="
                                block
                                text-[11px]
                                min-[375px]:text-xs
                                min-[420px]:text-sm
                                font-semibold
                                text-slate-700
                                mb-1
                            "
                        >
                            Email Address
                        </label>

                        <div className="relative">

                            <span
                                className="
                                    absolute
                                    left-3
                                    top-1/2
                                    -translate-y-1/2
                                    text-xs
                                    min-[375px]:text-sm
                                    text-slate-400
                                    pointer-events-none
                                "
                            >
                                ✉
                            </span>

                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                autoComplete="email"
                                className="
                                    w-full
                                    h-9
                                    min-[375px]:h-10
                                    min-[420px]:h-11
                                    sm:h-11

                                    pl-9
                                    pr-3

                                    text-xs
                                    min-[375px]:text-sm
                                    sm:text-base

                                    bg-slate-50
                                    border
                                    border-slate-200
                                    rounded-lg

                                    outline-none
                                    transition
                                    duration-200

                                    placeholder:text-slate-400

                                    focus:bg-white
                                    focus:border-blue-500
                                    focus:ring-2
                                    focus:ring-blue-100
                                "
                            />

                        </div>

                    </div>

                    {/* ==========================================
                        PASSWORD
                    ========================================== */}

                    <div>

                        <div
                            className="
                                flex
                                items-center
                                justify-between
                                gap-2
                                mb-1
                            "
                        >

                            <label
                                htmlFor="password"
                                className="
                                    text-[11px]
                                    min-[375px]:text-xs
                                    min-[420px]:text-sm
                                    font-semibold
                                    text-slate-700
                                "
                            >
                                Password
                            </label>

                            <Link
                                to="/forgot-password"
                                className="
                                    text-[9px]
                                    min-[375px]:text-[10px]
                                    min-[420px]:text-xs
                                    font-semibold
                                    text-blue-600
                                    hover:text-indigo-600
                                    whitespace-nowrap
                                "
                            >
                                Forgot Password?
                            </Link>

                        </div>

                        <div className="relative">

                            <span
                                className="
                                    absolute
                                    left-3
                                    top-1/2
                                    -translate-y-1/2
                                    text-xs
                                    min-[375px]:text-sm
                                    pointer-events-none
                                "
                            >
                                🔒
                            </span>

                            <input
                                id="password"
                                name="password"
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                autoComplete="current-password"
                                className="
                                    w-full
                                    h-9
                                    min-[375px]:h-10
                                    min-[420px]:h-11
                                    sm:h-11

                                    pl-9
                                    pr-10

                                    text-xs
                                    min-[375px]:text-sm
                                    sm:text-base

                                    bg-slate-50
                                    border
                                    border-slate-200
                                    rounded-lg

                                    outline-none
                                    transition
                                    duration-200

                                    placeholder:text-slate-400

                                    focus:bg-white
                                    focus:border-blue-500
                                    focus:ring-2
                                    focus:ring-blue-100
                                "
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(
                                        !showPassword
                                    )
                                }
                                className="
                                    absolute
                                    right-3
                                    top-1/2
                                    -translate-y-1/2
                                    text-xs
                                    text-slate-400
                                    hover:text-blue-600
                                    transition
                                "
                            >
                                {showPassword ? "🙈" : "👁"}
                            </button>

                        </div>

                    </div>

                    {/* ==========================================
                        ERROR
                    ========================================== */}

                    {error && (
                        <div
                            className="
                                bg-red-50
                                border
                                border-red-200
                                rounded-lg
                                px-2.5
                                py-2
                            "
                        >
                            <p
                                className="
                                    text-red-600
                                    text-[10px]
                                    min-[375px]:text-xs
                                    text-center
                                "
                            >
                                {error}
                            </p>
                        </div>
                    )}

                    {/* ==========================================
                        LOGIN BUTTON
                    ========================================== */}

                    <button
                        type="submit"
                        disabled={loading}
                        className="
                            w-full
                            h-9
                            min-[375px]:h-10
                            min-[420px]:h-11
                            sm:h-11

                            bg-gradient-to-r
                            from-blue-600
                            to-indigo-600

                            hover:from-blue-700
                            hover:to-indigo-700

                            text-white

                            text-xs
                            min-[375px]:text-sm
                            sm:text-base

                            font-semibold
                            rounded-lg

                            shadow-md
                            shadow-blue-600/20

                            active:scale-[0.98]

                            transition-all
                            duration-200

                            disabled:opacity-60
                            disabled:cursor-not-allowed
                        "
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">

                                <span
                                    className="
                                        w-3
                                        h-3
                                        min-[375px]:w-3.5
                                        min-[375px]:h-3.5
                                        border-2
                                        border-white/40
                                        border-t-white
                                        rounded-full
                                        animate-spin
                                    "
                                />

                                Signing In...

                            </span>
                        ) : (
                            "Sign In"
                        )}
                    </button>

                </form>

                {/* ==========================================
                    DIVIDER
                ========================================== */}

                <div
                    className="
                        flex
                        items-center
                        gap-2
                        my-3
                        min-[375px]:my-4
                        sm:my-5
                    "
                >

                    <div className="h-px flex-1 bg-slate-200" />

                    <span
                        className="
                            text-[9px]
                            min-[375px]:text-[10px]
                            text-slate-400
                        "
                    >
                        OR
                    </span>

                    <div className="h-px flex-1 bg-slate-200" />

                </div>

                {/* ==========================================
                    REGISTER
                ========================================== */}

                <p
                    className="
                        text-center
                        text-[10px]
                        min-[375px]:text-xs
                        min-[420px]:text-sm
                        text-slate-500
                    "
                >
                    Don't have an account?{" "}

                    <Link
                        to="/register"
                        className="
                            text-blue-600
                            font-semibold
                            hover:text-indigo-600
                        "
                    >
                        Create Account
                    </Link>
                </p>

                {/* ==========================================
                    BACK HOME
                ========================================== */}

                <div
                    className="
                        text-center
                        mt-2
                        min-[375px]:mt-2.5
                        sm:mt-3
                    "
                >

                    <Link
                        to="/"
                        className="
                            text-[9px]
                            min-[375px]:text-[10px]
                            min-[420px]:text-xs
                            text-slate-400
                            hover:text-blue-600
                            transition
                        "
                    >
                        ← Back to Home
                    </Link>

                </div>

            </div>
        </div>
    );
};

export default Login