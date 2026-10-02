import { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LogoutModal from "./LogoutModal";
import API from "../api/axiosInstance";
import toast from "react-hot-toast";

const Navber = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const profileRef = useRef(null);

    const [showProfile, setShowProfile] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [search, setSearch] = useState("");
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const [isLoggedIn, setIsLoggedIn] = useState(
        !!localStorage.getItem("accessToken")
    );

    const [user, setUser] = useState(() => {
        const userData = localStorage.getItem("user");
        return userData ? JSON.parse(userData) : null;
    });

    useEffect(() => {
        const checkAuthStatus = () => {
            const token = localStorage.getItem("accessToken");
            const userData = localStorage.getItem("user");

            setIsLoggedIn(!!token);
            setUser(userData ? JSON.parse(userData) : null);
        };

        window.addEventListener("authChange", checkAuthStatus);

        return () => {
            window.removeEventListener("authChange", checkAuthStatus);
        };
    }, []);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (
                profileRef.current &&
                !profileRef.current.contains(event.target)
            ) {
                setShowProfile(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        document.addEventListener("touchstart", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
            document.removeEventListener("touchstart", handleOutsideClick);
        };
    }, []);

    useEffect(() => {
        setShowMobileMenu(false);
        setShowProfile(false);
    }, [location.pathname]);

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem("accessToken");

            if (!token) {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("user");

                setIsLoggedIn(false);
                setUser(null);
                setShowProfile(false);
                setShowMobileMenu(false);
                setShowLogoutModal(false);

                window.dispatchEvent(new Event("authChange"));
                navigate("/");
                return;
            }

            const response = await API.delete("/user/logout");

            if (response.data.success) {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("user");

                setIsLoggedIn(false);
                setUser(null);
                setShowProfile(false);
                setShowMobileMenu(false);
                setShowLogoutModal(false);

                window.dispatchEvent(new Event("authChange"));

                toast.success("User logged out successfully.");

                navigate("/");
            }
        } catch (error) {
            console.log("Logout Error:", error);

            setShowLogoutModal(false);

            toast.error(
                error.response?.data?.message ||
                "Logout failed"
            );
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();

        if (!search.trim()) {
            return;
        }

        navigate(
            `/search-books?search=${encodeURIComponent(search.trim())}`
        );

        setSearch("");
        setShowMobileMenu(false);
    };

    const closeMobileMenu = () => {
        setShowMobileMenu(false);
    };

    const isActive = (path) => {
        return location.pathname === path;
    };

    const navLinkClass = (path) => `
        relative
        px-3
        py-2
        rounded-lg
        text-sm
        xl:text-[15px]
        font-semibold
        transition-all
        duration-200
        ${isActive(path)
            ? "text-blue-600 bg-blue-50 dark:bg-blue-950/40 dark:text-blue-400"
            : "text-gray-700 dark:text-gray-200 hover:text-blue-600 hover:bg-gray-50 dark:hover:bg-gray-800"
        }
    `;

    const mobileLinkClass = (path) => `
        flex
        items-center
        gap-3
        px-4
        py-3
        rounded-xl
        text-sm
        font-semibold
        transition-all
        duration-200
        ${isActive(path)
            ? "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400"
            : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
        }
    `;

    return (
        <>
            <nav className="w-full bg-black/80 backdrop-blur-lg sticky top-0 z-50">

                <div className="max-w-7xl mx-auto px-3 min-[375px]:px-4 sm:px-6 lg:px-8">

                    <div className="relative min-h-[64px] sm:min-h-[70px] flex items-center justify-between gap-2 sm:gap-4">

                        <Link
                            to="/"
                            onClick={closeMobileMenu}
                            className="flex items-center gap-2.5 sm:gap-3 min-w-0"
                        >

                            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0">
                                <span className="text-lg sm:text-xl">
                                    📚
                                </span>
                            </div>

                            <div className="min-w-0">
                                <p className="text-[15px] sm:text-lg font-bold text-gray-900 dark:text-white leading-tight truncate">
                                    Online Library
                                </p>

                                <p className="hidden min-[375px]:block text-[8px] sm:text-[9px] uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400 font-semibold">
                                    Learn In Deep !
                                </p>
                            </div>

                        </Link>

                        <div className="hidden lg:flex items-center gap-1 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">

                            <Link
                                to="/"
                                className={navLinkClass("/")}
                            >
                                Home
                            </Link>

                            <Link
                                to="/books"
                                className={navLinkClass("/books")}
                            >
                                Books
                            </Link>

                            <Link
                                to="/about"
                                className={navLinkClass("/about")}
                            >
                                About
                            </Link>

                        </div>

                        <div className="flex items-center gap-2 sm:gap-3 ml-auto">

                            {isLoggedIn &&
                                user?.role === "student" && (
                                    <form
                                        onSubmit={handleSearch}
                                        className="hidden lg:block"
                                    >

                                        <div className="relative">

                                            <input
                                                type="text"
                                                value={search}
                                                onChange={(e) =>
                                                    setSearch(e.target.value)
                                                }
                                                placeholder="Search books..."
                                                className="
                                                    w-40
                                                    xl:w-52
                                                    h-10
                                                    pl-4
                                                    pr-10
                                                    text-sm
                                                    border
                                                    border-gray-200
                                                    dark:border-gray-700
                                                    rounded-xl
                                                    bg-gray-50
                                                    dark:bg-gray-900
                                                    text-gray-800
                                                    dark:text-white
                                                    outline-none
                                                    focus:bg-white
                                                    dark:focus:bg-gray-800
                                                    focus:border-blue-500
                                                    focus:ring-2
                                                    focus:ring-blue-100
                                                    dark:focus:ring-blue-950
                                                    transition
                                                "
                                            />

                                            <button
                                                type="submit"
                                                className="
                                                    absolute
                                                    right-1
                                                    top-1/2
                                                    -translate-y-1/2
                                                    w-8
                                                    h-8
                                                    rounded-lg
                                                    flex
                                                    items-center
                                                    justify-center
                                                    text-gray-400
                                                    hover:text-blue-600
                                                    hover:bg-blue-50
                                                    dark:hover:bg-blue-950/40
                                                    transition
                                                    cursor-pointer
                                                "
                                            >
                                                🔍
                                            </button>

                                        </div>

                                    </form>
                                )}

                            {!isLoggedIn ? (

                                <div className="hidden sm:flex items-center gap-2">

                                    <Link
                                        to="/login"
                                        className="
                                            h-9
                                            sm:h-10
                                            px-4
                                            sm:px-5
                                            flex
                                            items-center
                                            justify-center
                                            rounded-xl
                                            border
                                            border-gray-200
                                            dark:border-gray-700
                                            text-gray-700
                                            dark:text-gray-200
                                            bg-white
                                            dark:bg-gray-900
                                            hover:border-blue-300
                                            hover:text-blue-600
                                            hover:bg-blue-50
                                            dark:hover:bg-blue-950/30
                                            text-xs
                                            sm:text-sm
                                            font-semibold
                                            transition
                                            shadow-sm
                                        "
                                    >
                                        Login
                                    </Link>

                                    <Link
                                        to="/register"
                                        className="
                                            h-9
                                            sm:h-10
                                            px-4
                                            sm:px-5
                                            flex
                                            items-center
                                            justify-center
                                            rounded-xl
                                            bg-gradient-to-r
                                            from-blue-600
                                            to-indigo-600
                                            hover:from-blue-700
                                            hover:to-indigo-700
                                            text-white
                                            text-xs
                                            sm:text-sm
                                            font-semibold
                                            transition
                                            shadow-md
                                            shadow-blue-500/20
                                        "
                                    >
                                        Sign Up
                                    </Link>

                                </div>

                            ) : (

                                <div
                                    className="relative"
                                    ref={profileRef}
                                >

                                    <button
                                        onClick={() =>
                                            setShowProfile(!showProfile)
                                        }
                                        className="
                                            flex
                                            items-center
                                            gap-2
                                            sm:gap-2.5
                                            h-10
                                            pl-1.5
                                            pr-2
                                            sm:pr-3
                                            rounded-xl
                                            border
                                            border-gray-200
                                            dark:border-gray-700
                                            bg-white
                                            dark:bg-gray-900
                                            hover:border-blue-200
                                            dark:hover:border-blue-800
                                            hover:bg-gray-50
                                            dark:hover:bg-gray-800
                                            transition
                                            cursor-pointer
                                            shadow-sm
                                        "
                                    >

                                        <div
                                            className="
                                                w-8
                                                h-8
                                                sm:w-8.5
                                                sm:h-8.5
                                                rounded-lg
                                                bg-gradient-to-br
                                                from-blue-600
                                                to-indigo-600
                                                text-white
                                                flex
                                                items-center
                                                justify-center
                                                text-sm
                                                font-bold
                                                shadow-sm
                                            "
                                        >
                                            {user?.userName
                                                ?.charAt(0)
                                                ?.toUpperCase()}
                                        </div>

                                        <span
                                            className="
                                                hidden
                                                sm:block
                                                max-w-[100px]
                                                xl:max-w-[130px]
                                                truncate
                                                text-sm
                                                font-semibold
                                                text-gray-800
                                                dark:text-white
                                            "
                                        >
                                            {user?.userName}
                                        </span>

                                        <span
                                            className={`text-[10px] text-gray-400 transition-transform duration-200 ${showProfile
                                                ? "rotate-180"
                                                : ""
                                                }`}
                                        >
                                            ▼
                                        </span>

                                    </button>

                                    {showProfile && (

                                        <div
                                            className="
                                                absolute
                                                right-0
                                                mt-2.5
                                                w-[270px]
                                                max-w-[calc(100vw-1.5rem)]
                                                bg-white
                                                dark:bg-gray-900
                                                rounded-2xl
                                                shadow-2xl
                                                border
                                                border-gray-200
                                                dark:border-gray-700
                                                overflow-hidden
                                                z-[60]
                                            "
                                        >

                                            <div
                                                className="
                                                    p-4
                                                    bg-gradient-to-br
                                                    from-blue-50
                                                    via-white
                                                    to-indigo-50
                                                    dark:from-blue-950/50
                                                    dark:via-gray-900
                                                    dark:to-indigo-950/40
                                                    border-b
                                                    border-gray-200
                                                    dark:border-gray-700
                                                "
                                            >

                                                <div className="flex items-center gap-3">

                                                    <div
                                                        className="
                                                            w-11
                                                            h-11
                                                            rounded-xl
                                                            bg-gradient-to-br
                                                            from-blue-600
                                                            to-indigo-600
                                                            text-white
                                                            flex
                                                            items-center
                                                            justify-center
                                                            text-lg
                                                            font-bold
                                                            shadow-md
                                                        "
                                                    >
                                                        {user?.userName
                                                            ?.charAt(0)
                                                            ?.toUpperCase()}
                                                    </div>

                                                    <div className="min-w-0 flex-1">

                                                        <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                                                            {user?.userName}
                                                        </p>

                                                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
                                                            {user?.email}
                                                        </p>

                                                        <span className="inline-flex mt-1.5 px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-900/40 text-[10px] text-blue-700 dark:text-blue-300 font-bold capitalize">
                                                            {user?.role}
                                                        </span>

                                                    </div>

                                                </div>

                                            </div>

                                            <div className="p-2">

                                                <Link
                                                    to="/profile"
                                                    onClick={() =>
                                                        setShowProfile(false)
                                                    }
                                                    className="
                                                        flex
                                                        items-center
                                                        gap-3
                                                        px-3
                                                        py-2.5
                                                        rounded-xl
                                                        text-sm
                                                        font-medium
                                                        text-gray-700
                                                        dark:text-gray-200
                                                        hover:bg-gray-100
                                                        dark:hover:bg-gray-800
                                                        transition
                                                    "
                                                >
                                                    <span className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                                        👤
                                                    </span>
                                                    My Profile
                                                </Link>

                                                {user?.role === "student" && (
                                                    <>
                                                        <Link
                                                            to="/dashboard"
                                                            onClick={() =>
                                                                setShowProfile(false)
                                                            }
                                                            className="
                                                                flex
                                                                items-center
                                                                gap-3
                                                                px-3
                                                                py-2.5
                                                                rounded-xl
                                                                text-sm
                                                                font-medium
                                                                text-gray-700
                                                                dark:text-gray-200
                                                                hover:bg-gray-100
                                                                dark:hover:bg-gray-800
                                                                transition
                                                            "
                                                        >
                                                            <span className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center">
                                                                📊
                                                            </span>
                                                            Dashboard
                                                        </Link>

                                                        <Link
                                                            to="/my-borrowed-books"
                                                            onClick={() =>
                                                                setShowProfile(false)
                                                            }
                                                            className="
                                                                flex
                                                                items-center
                                                                gap-3
                                                                px-3
                                                                py-2.5
                                                                rounded-xl
                                                                text-sm
                                                                font-medium
                                                                text-gray-700
                                                                dark:text-gray-200
                                                                hover:bg-gray-100
                                                                dark:hover:bg-gray-800
                                                                transition
                                                            "
                                                        >
                                                            <span className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center">
                                                                📚
                                                            </span>
                                                            My Borrowed Books
                                                        </Link>

                                                        <Link
                                                            to="/change-password"
                                                            onClick={() =>
                                                                setShowProfile(false)
                                                            }
                                                            className="
                                                                flex
                                                                items-center
                                                                gap-3
                                                                px-3
                                                                py-2.5
                                                                rounded-xl
                                                                text-sm
                                                                font-medium
                                                                text-gray-700
                                                                dark:text-gray-200
                                                                hover:bg-gray-100
                                                                dark:hover:bg-gray-800
                                                                transition
                                                            "
                                                        >
                                                            <span className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-950/40 flex items-center justify-center">
                                                                🔐
                                                            </span>
                                                            Change Password
                                                        </Link>
                                                    </>
                                                )}

                                                {user?.role === "admin" && (
                                                    <>
                                                        <Link
                                                            to="/admin-dashboard"
                                                            onClick={() =>
                                                                setShowProfile(false)
                                                            }
                                                            className="
                                                                flex
                                                                items-center
                                                                gap-3
                                                                px-3
                                                                py-2.5
                                                                rounded-xl
                                                                text-sm
                                                                font-medium
                                                                text-gray-700
                                                                dark:text-gray-200
                                                                hover:bg-gray-100
                                                                dark:hover:bg-gray-800
                                                                transition
                                                            "
                                                        >
                                                            <span className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center">
                                                                🛠️
                                                            </span>
                                                            Admin Dashboard
                                                        </Link>

                                                        <Link
                                                            to="/manage-books"
                                                            onClick={() =>
                                                                setShowProfile(false)
                                                            }
                                                            className="
                                                                flex
                                                                items-center
                                                                gap-3
                                                                px-3
                                                                py-2.5
                                                                rounded-xl
                                                                text-sm
                                                                font-medium
                                                                text-gray-700
                                                                dark:text-gray-200
                                                                hover:bg-gray-100
                                                                dark:hover:bg-gray-800
                                                                transition
                                                            "
                                                        >
                                                            <span className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center">
                                                                📖
                                                            </span>
                                                            Manage Books
                                                        </Link>
                                                    </>
                                                )}

                                            </div>

                                            <div className="px-2 pb-2">

                                                <button
                                                    onClick={() =>
                                                        setShowLogoutModal(true)
                                                    }
                                                    className="
                                                        w-full
                                                        flex
                                                        items-center
                                                        gap-3
                                                        px-3
                                                        py-2.5
                                                        rounded-xl
                                                        text-sm
                                                        font-semibold
                                                        text-red-600
                                                        hover:bg-red-50
                                                        dark:hover:bg-red-950/30
                                                        transition
                                                        cursor-pointer
                                                    "
                                                >
                                                    <span className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-950/30 flex items-center justify-center">
                                                        🚪
                                                    </span>
                                                    Logout
                                                </button>

                                            </div>

                                        </div>

                                    )}

                                </div>

                            )}

                            <button
                                onClick={() =>
                                    setShowMobileMenu(!showMobileMenu)
                                }
                                className="
                                    lg:hidden
                                    w-10
                                    h-10
                                    rounded-xl
                                    border
                                    border-gray-200
                                    dark:border-gray-700
                                    bg-white
                                    dark:bg-gray-900
                                    text-gray-700
                                    dark:text-gray-200
                                    flex
                                    items-center
                                    justify-center
                                    text-lg
                                    hover:bg-gray-50
                                    dark:hover:bg-gray-800
                                    transition
                                    cursor-pointer
                                    shadow-sm
                                "
                                aria-label="Toggle menu"
                            >
                                {showMobileMenu ? "✕" : "☰"}
                            </button>

                        </div>

                    </div>

                    {showMobileMenu && (

                        <div
                            className="
                                lg:hidden
                                border-t
                                border-gray-100
                                dark:border-gray-800
                                py-3
                            "
                        >

                            <div className="flex flex-col gap-1">

                                <Link
                                    to="/"
                                    onClick={closeMobileMenu}
                                    className={mobileLinkClass("/")}
                                >
                                    <span className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                        🏠
                                    </span>
                                    Home
                                </Link>

                                <Link
                                    to="/books"
                                    onClick={closeMobileMenu}
                                    className={mobileLinkClass("/books")}
                                >
                                    <span className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center">
                                        📚
                                    </span>
                                    Books
                                </Link>

                                <Link
                                    to="/about"
                                    onClick={closeMobileMenu}
                                    className={mobileLinkClass("/about")}
                                >
                                    <span className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center">
                                        ℹ️
                                    </span>
                                    About
                                </Link>

                            </div>

                            {isLoggedIn &&
                                user?.role === "student" && (

                                    <form
                                        onSubmit={handleSearch}
                                        className="mt-3"
                                    >

                                        <div className="relative">

                                            <input
                                                type="text"
                                                value={search}
                                                onChange={(e) =>
                                                    setSearch(e.target.value)
                                                }
                                                placeholder="Search books..."
                                                className="
                                                    w-full
                                                    h-11
                                                    pl-4
                                                    pr-12
                                                    text-sm
                                                    border
                                                    border-gray-200
                                                    dark:border-gray-700
                                                    rounded-xl
                                                    bg-gray-50
                                                    dark:bg-gray-900
                                                    text-gray-800
                                                    dark:text-white
                                                    outline-none
                                                    focus:bg-white
                                                    dark:focus:bg-gray-800
                                                    focus:border-blue-500
                                                    focus:ring-2
                                                    focus:ring-blue-100
                                                    dark:focus:ring-blue-950
                                                "
                                            />

                                            <button
                                                type="submit"
                                                className="
                                                    absolute
                                                    right-1
                                                    top-1/2
                                                    -translate-y-1/2
                                                    w-9
                                                    h-9
                                                    rounded-lg
                                                    flex
                                                    items-center
                                                    justify-center
                                                    text-gray-400
                                                    hover:text-blue-600
                                                    hover:bg-blue-50
                                                    dark:hover:bg-blue-950/40
                                                    transition
                                                    cursor-pointer
                                                "
                                            >
                                                🔍
                                            </button>

                                        </div>

                                    </form>

                                )}

                            {!isLoggedIn && (

                                <div className="sm:hidden grid grid-cols-2 gap-2.5 mt-3">

                                    <Link
                                        to="/login"
                                        onClick={closeMobileMenu}
                                        className="
                                            h-10
                                            flex
                                            items-center
                                            justify-center
                                            rounded-xl
                                            border
                                            border-gray-200
                                            dark:border-gray-700
                                            bg-white
                                            dark:bg-gray-900
                                            text-gray-700
                                            dark:text-gray-200
                                            text-sm
                                            font-semibold
                                            hover:border-blue-300
                                            hover:text-blue-600
                                            transition
                                        "
                                    >
                                        Login
                                    </Link>

                                    <Link
                                        to="/register"
                                        onClick={closeMobileMenu}
                                        className="
                                            h-10
                                            flex
                                            items-center
                                            justify-center
                                            rounded-xl
                                            bg-gradient-to-r
                                            from-blue-600
                                            to-indigo-600
                                            text-white
                                            text-sm
                                            font-semibold
                                            hover:from-blue-700
                                            hover:to-indigo-700
                                            transition
                                            shadow-md
                                        "
                                    >
                                        Sign Up
                                    </Link>

                                </div>

                            )}

                        </div>

                    )}

                </div>

            </nav>

            {showLogoutModal && (
                <LogoutModal
                    onCancel={() => setShowLogoutModal(false)}
                    onConfirm={handleLogout}
                />
            )}
        </>
    );
};

export default Navber;