// import { useEffect, useState, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import LogoutModal from "./LogoutModal";
// import axios from "axios";

// const Navber = () => {
//     const navigate = useNavigate();
//     const profileRef = useRef(null);

//     const [showProfile, setShowProfile] = useState(false);
//     const [showMobileMenu, setShowMobileMenu] = useState(false);
//     const [search, setSearch] = useState("");
//     const [showLogoutModal, setShowLogoutModal] = useState(false);
//     const [isLoggedIn, setIsLoggedIn] = useState(
//         !!localStorage.getItem("accessToken")
//     );

//     const [user, setUser] = useState(() => {
//         const userData = localStorage.getItem("user");

//         return userData ? JSON.parse(userData) : null;
//     });

//     useEffect(() => {
//         const checkAuthStatus = () => {
//             const token = localStorage.getItem("accessToken");
//             const userData = localStorage.getItem("user");

//             setIsLoggedIn(!!token);
//             setUser(userData ? JSON.parse(userData) : null);
//         };

//         window.addEventListener("authChange", checkAuthStatus);

//         return () => {
//             window.removeEventListener("authChange", checkAuthStatus);
//         };
//     }, []);

//     useEffect(() => {
//         const handleOutsideClick = (event) => {
//             if (
//                 profileRef.current &&
//                 !profileRef.current.contains(event.target)
//             ) {
//                 setShowProfile(false);
//             }
//         };

//         document.addEventListener("mousedown", handleOutsideClick);
//         document.addEventListener("touchstart", handleOutsideClick);

//         return () => {
//             document.removeEventListener("mousedown", handleOutsideClick);
//             document.removeEventListener("touchstart", handleOutsideClick);
//         };
//     }, []);

//     const handleLogout = async () => {
//         try {
//             const token = localStorage.getItem("accessToken");

//             if (!token) {
//                 localStorage.removeItem("accessToken");
//                 localStorage.removeItem("user");

//                 setIsLoggedIn(false);
//                 setUser(null);
//                 setShowProfile(false);
//                 setShowMobileMenu(false);
//                 setShowLogoutModal(false);

//                 window.dispatchEvent(new Event("authChange"));
//                 navigate("/");
//                 return;
//             }

//             const response = await axios.delete(
//                 "http://localhost:9000/user/logout",
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );

//             console.log("Logout Response:", response.data);

//             if (response.data.success) {
//                 localStorage.removeItem("accessToken");
//                 localStorage.removeItem("user");

//                 setIsLoggedIn(false);
//                 setUser(null);
//                 setShowProfile(false);
//                 setShowMobileMenu(false);
//                 setShowLogoutModal(false);

//                 window.dispatchEvent(new Event("authChange"));

//                 navigate("/");
//             }
//         } catch (error) {
//             console.log("Logout Error:", error);

//             setShowLogoutModal(false);

//             alert(
//                 error.response?.data?.message ||
//                 "Logout failed"
//             );
//         }
//     };

//     const handleSearch = (e) => {
//         e.preventDefault();

//         if (!search.trim()) {
//             return;
//         }

//         navigate(
//             `/search-books?search=${encodeURIComponent(search.trim())}`
//         );

//         setSearch("");
//         setShowMobileMenu(false);
//     };

//     const closeMobileMenu = () => {
//         setShowMobileMenu(false);
//     };

//     return (
//         <>
//             <nav className="w-full bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">

//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

//                     <div className="min-h-[72px] flex items-center justify-between gap-4">

//                         <Link
//                             to="/"
//                             onClick={closeMobileMenu}
//                             className="
//                                 text-xl
//                                 sm:text-2xl
//                                 font-bold
//                                 text-fuchsia-600
//                                 whitespace-nowrap
//                             "
//                         >
//                             Online Library
//                         </Link>

//                         <div className="hidden lg:flex items-center gap-6 xl:gap-10">

//                             <Link
//                                 to="/"
//                                 className="
//                                     text-base
//                                     xl:text-lg
//                                     font-semibold
//                                     text-gray-700
//                                     dark:text-gray-200
//                                     hover:text-blue-600
//                                     transition
//                                 "
//                             >
//                                 Home
//                             </Link>

//                             <Link
//                                 to="/books"
//                                 className="
//                                     text-base
//                                     xl:text-lg
//                                     font-semibold
//                                     text-gray-700
//                                     dark:text-gray-200
//                                     hover:text-blue-600
//                                     transition
//                                 "
//                             >
//                                 Books
//                             </Link>

//                             <Link
//                                 to="/about"
//                                 className="
//                                     text-base
//                                     xl:text-lg
//                                     font-semibold
//                                     text-gray-700
//                                     dark:text-gray-200
//                                     hover:text-blue-600
//                                     transition
//                                 "
//                             >
//                                 About
//                             </Link>

//                         </div>

//                         <div className="flex items-center gap-2 sm:gap-3">

//                             {isLoggedIn &&
//                                 user?.role === "student" && (

//                                     <form
//                                         onSubmit={handleSearch}
//                                         className="hidden lg:flex items-center"
//                                     >

//                                         <div className="relative">

//                                             <input
//                                                 type="text"
//                                                 value={search}
//                                                 onChange={(e) =>
//                                                     setSearch(e.target.value)
//                                                 }
//                                                 placeholder="Search books..."
//                                                 className="
//                                                     w-40
//                                                     xl:w-56
//                                                     px-4
//                                                     py-2
//                                                     pr-10
//                                                     text-sm
//                                                     border
//                                                     border-gray-300
//                                                     rounded-lg
//                                                     bg-white
//                                                     dark:bg-gray-800
//                                                     dark:text-white
//                                                     dark:border-gray-600
//                                                     outline-none
//                                                     focus:ring-2
//                                                     focus:ring-blue-400
//                                                     transition
//                                                 "
//                                             />

//                                             <button
//                                                 type="submit"
//                                                 className="
//                                                     absolute
//                                                     right-1
//                                                     top-1/2
//                                                     -translate-y-1/2
//                                                     w-8
//                                                     h-8
//                                                     flex
//                                                     items-center
//                                                     justify-center
//                                                     text-gray-500
//                                                     hover:text-blue-600
//                                                     transition
//                                                 "
//                                             >
//                                                 🔍
//                                             </button>

//                                         </div>

//                                     </form>

//                                 )}

//                             {!isLoggedIn ? (

//                                 <div className="hidden sm:flex items-center gap-2">

//                                     <Link
//                                         to="/login"
//                                         className="
//                                             px-3
//                                             sm:px-4
//                                             py-2
//                                             text-sm
//                                             sm:text-base
//                                             text-white
//                                             bg-red-500
//                                             border
//                                             border-red-500
//                                             rounded-lg
//                                             hover:bg-red-600
//                                             hover:border-red-600
//                                             transition
//                                             font-semibold
//                                             shadow-sm
//                                             hover:shadow-md
//                                         "
//                                     >
//                                         Login
//                                     </Link>

//                                     <Link
//                                         to="/register"
//                                         className="
//                                             px-3
//                                             sm:px-4
//                                             py-2
//                                             text-sm
//                                             sm:text-base
//                                             text-white
//                                             bg-blue-600
//                                             border
//                                             border-blue-600
//                                             rounded-lg
//                                             hover:bg-blue-700
//                                             hover:border-blue-700
//                                             transition
//                                             font-semibold
//                                             shadow-sm
//                                             hover:shadow-md
//                                         "
//                                     >
//                                         Sign Up
//                                     </Link>

//                                 </div>

//                             ) : (

//                                 <div className="relative" ref={profileRef}>

//                                     <button
//                                         onClick={() =>
//                                             setShowProfile(!showProfile)
//                                         }
//                                         className="
//                                             flex
//                                             items-center
//                                             gap-2
//                                             sm:gap-3
//                                             px-2
//                                             sm:px-3
//                                             lg:px-4
//                                             py-2
//                                             bg-gray-100
//                                             dark:bg-gray-800
//                                             rounded-xl
//                                             hover:bg-gray-200
//                                             dark:hover:bg-gray-700
//                                             transition
//                                             cursor-pointer
//                                         "
//                                     >

//                                         <div
//                                             className="
//                                                 w-8
//                                                 h-8
//                                                 sm:w-9
//                                                 sm:h-9
//                                                 rounded-full
//                                                 bg-blue-600
//                                                 text-white
//                                                 flex
//                                                 items-center
//                                                 justify-center
//                                                 font-bold
//                                             "
//                                         >
//                                             {user?.userName
//                                                 ?.charAt(0)
//                                                 ?.toUpperCase()}
//                                         </div>

//                                         <span
//                                             className="
//                                                 hidden
//                                                 sm:block
//                                                 max-w-[100px]
//                                                 lg:max-w-[140px]
//                                                 truncate
//                                                 font-semibold
//                                                 text-gray-800
//                                                 dark:text-white
//                                             "
//                                         >
//                                             {user?.userName}
//                                         </span>

//                                         <span className="text-gray-500 text-xs">
//                                             ▼
//                                         </span>

//                                     </button>

//                                     {showProfile && (

//                                         <div
//                                             className="
//                                                 absolute
//                                                 right-0
//                                                 mt-2
//                                                 sm:mt-3
//                                                 w-56
//                                                 sm:w-64
//                                                 max-w-[calc(100vw-2rem)]
//                                                 bg-white
//                                                 dark:bg-gray-800
//                                                 rounded-xl
//                                                 shadow-2xl
//                                                 border
//                                                 border-gray-200
//                                                 dark:border-gray-700
//                                                 overflow-hidden
//                                                 z-50
//                                             "
//                                         >

//                                             <div
//                                                 className="
//                                                     px-3
//                                                     py-3
//                                                     sm:px-4
//                                                     sm:py-4
//                                                     bg-gray-50
//                                                     dark:bg-gray-900
//                                                     border-b
//                                                     border-gray-200
//                                                     dark:border-gray-700
//                                                 "
//                                             >

//                                                 <p className="text-sm sm:text-base font-semibold text-gray-800 dark:text-white truncate">
//                                                     {user?.userName}
//                                                 </p>

//                                                 <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
//                                                     {user?.email}
//                                                 </p>

//                                                 <p className="text-[11px] sm:text-xs text-blue-600 dark:text-blue-400 mt-1 capitalize font-semibold">
//                                                     {user?.role}
//                                                 </p>

//                                             </div>

//                                             <Link
//                                                 to="/profile"
//                                                 onClick={() =>
//                                                     setShowProfile(false)
//                                                 }
//                                                 className="
//                                                     block
//                                                     px-3
//                                                     py-2
//                                                     sm:px-4
//                                                     sm:py-3
//                                                     text-sm
//                                                     sm:text-base
//                                                     text-gray-700
//                                                     dark:text-gray-200
//                                                     hover:bg-gray-100
//                                                     dark:hover:bg-gray-700
//                                                     transition
//                                                 "
//                                             >
//                                                 👤 My Profile
//                                             </Link>

//                                             {user?.role === "student" && (

//                                                 <>

//                                                     <Link
//                                                         to="/dashboard"
//                                                         onClick={() =>
//                                                             setShowProfile(false)
//                                                         }
//                                                         className="
//                                                             block
//                                                             px-3
//                                                             py-2
//                                                             sm:px-4
//                                                             sm:py-3
//                                                             text-sm
//                                                             sm:text-base
//                                                             text-gray-700
//                                                             dark:text-gray-200
//                                                             hover:bg-gray-100
//                                                             dark:hover:bg-gray-700
//                                                             transition
//                                                         "
//                                                     >
//                                                         📊 Dashboard
//                                                     </Link>

//                                                     <Link
//                                                         to="/my-borrowed-books"
//                                                         onClick={() =>
//                                                             setShowProfile(false)
//                                                         }
//                                                         className="
//                                                             block
//                                                             px-3
//                                                             py-2
//                                                             sm:px-4
//                                                             sm:py-3
//                                                             text-sm
//                                                             sm:text-base
//                                                             text-gray-700
//                                                             dark:text-gray-200
//                                                             hover:bg-gray-100
//                                                             dark:hover:bg-gray-700
//                                                             transition
//                                                         "
//                                                     >
//                                                         📚 My Borrowed Books
//                                                     </Link>

//                                                     <Link
//                                                         to="/change-password"
//                                                         onClick={() =>
//                                                             setShowProfile(false)
//                                                         }
//                                                         className="
//                                                             block
//                                                             px-3
//                                                             py-2
//                                                             sm:px-4
//                                                             sm:py-3
//                                                             text-sm
//                                                             sm:text-base
//                                                             text-gray-700
//                                                             dark:text-gray-200
//                                                             hover:bg-gray-100
//                                                             dark:hover:bg-gray-700
//                                                             transition
//                                                         "
//                                                     >
//                                                         🔐 Change Password
//                                                     </Link>

//                                                 </>

//                                             )}

//                                             {user?.role === "admin" && (

//                                                 <>

//                                                     <Link
//                                                         to="/admin-dashboard"
//                                                         onClick={() =>
//                                                             setShowProfile(false)
//                                                         }
//                                                         className="
//                                                             block
//                                                             px-3
//                                                             py-2
//                                                             sm:px-4
//                                                             sm:py-3
//                                                             text-sm
//                                                             sm:text-base
//                                                             text-gray-700
//                                                             dark:text-gray-200
//                                                             hover:bg-gray-100
//                                                             dark:hover:bg-gray-700
//                                                             transition
//                                                         "
//                                                     >
//                                                         🛠️ Admin Dashboard
//                                                     </Link>

//                                                     <Link
//                                                         to="/manage-books"
//                                                         onClick={() =>
//                                                             setShowProfile(false)
//                                                         }
//                                                         className="
//                                                             block
//                                                             px-3
//                                                             py-2
//                                                             sm:px-4
//                                                             sm:py-3
//                                                             text-sm
//                                                             sm:text-base
//                                                             text-gray-700
//                                                             dark:text-gray-200
//                                                             hover:bg-gray-100
//                                                             dark:hover:bg-gray-700
//                                                             transition
//                                                         "
//                                                     >
//                                                         📖 Manage Books
//                                                     </Link>

//                                                 </>

//                                             )}

//                                             <div
//                                                 className="
//                                                     border-t
//                                                     border-gray-200
//                                                     dark:border-gray-700
//                                                 "
//                                             >

//                                                 <button
//                                                     onClick={() =>
//                                                         setShowLogoutModal(true)
//                                                     }
//                                                     className="
//                                                         w-full
//                                                         text-left
//                                                         px-3
//                                                         py-2
//                                                         sm:px-4
//                                                         sm:py-3
//                                                         text-sm
//                                                         sm:text-base
//                                                         text-red-600
//                                                         hover:bg-red-50
//                                                         dark:hover:bg-red-900/20
//                                                         transition
//                                                         font-semibold
//                                                         cursor-pointer
//                                                     "
//                                                 >
//                                                     🚪 Logout
//                                                 </button>

//                                             </div>

//                                         </div>

//                                     )}

//                                 </div>

//                             )}

//                             <button
//                                 onClick={() =>
//                                     setShowMobileMenu(!showMobileMenu)
//                                 }
//                                 className="
//                                     lg:hidden
//                                     w-10
//                                     h-10
//                                     flex
//                                     items-center
//                                     justify-center
//                                     rounded-lg
//                                     bg-gray-100
//                                     dark:bg-gray-800
//                                     text-gray-700
//                                     dark:text-gray-200
//                                     text-xl
//                                     hover:bg-gray-200
//                                     dark:hover:bg-gray-700
//                                     transition
//                                     cursor-pointer
//                                 "
//                                 aria-label="Toggle menu"
//                             >
//                                 {showMobileMenu ? "✕" : "☰"}
//                             </button>

//                         </div>

//                     </div>

//                     {showMobileMenu && (

//                         <div
//                             className="
//                                 lg:hidden
//                                 border-t
//                                 border-gray-200
//                                 dark:border-gray-700
//                                 py-4
//                             "
//                         >

//                             <div className="flex flex-col gap-1">

//                                 <Link
//                                     to="/"
//                                     onClick={closeMobileMenu}
//                                     className="
//                                         px-4
//                                         py-3
//                                         rounded-lg
//                                         text-gray-700
//                                         dark:text-gray-200
//                                         font-semibold
//                                         hover:bg-gray-100
//                                         dark:hover:bg-gray-800
//                                         transition
//                                     "
//                                 >
//                                     🏠 Home
//                                 </Link>

//                                 <Link
//                                     to="/books"
//                                     onClick={closeMobileMenu}
//                                     className="
//                                         px-4
//                                         py-3
//                                         rounded-lg
//                                         text-gray-700
//                                         dark:text-gray-200
//                                         font-semibold
//                                         hover:bg-gray-100
//                                         dark:hover:bg-gray-800
//                                         transition
//                                     "
//                                 >
//                                     📚 Books
//                                 </Link>

//                                 <Link
//                                     to="/about"
//                                     onClick={closeMobileMenu}
//                                     className="
//                                         px-4
//                                         py-3
//                                         rounded-lg
//                                         text-gray-700
//                                         dark:text-gray-200
//                                         font-semibold
//                                         hover:bg-gray-100
//                                         dark:hover:bg-gray-800
//                                         transition
//                                     "
//                                 >
//                                     ℹ️ About
//                                 </Link>

//                             </div>

//                             {isLoggedIn &&
//                                 user?.role === "student" && (

//                                     <form
//                                         onSubmit={handleSearch}
//                                         className="mt-3"
//                                     >

//                                         <div className="relative">

//                                             <input
//                                                 type="text"
//                                                 value={search}
//                                                 onChange={(e) =>
//                                                     setSearch(e.target.value)
//                                                 }
//                                                 placeholder="Search books..."
//                                                 className="
//                                                     w-full
//                                                     px-4
//                                                     py-3
//                                                     pr-12
//                                                     text-sm
//                                                     border
//                                                     border-gray-300
//                                                     dark:border-gray-600
//                                                     rounded-lg
//                                                     bg-white
//                                                     dark:bg-gray-800
//                                                     dark:text-white
//                                                     outline-none
//                                                     focus:ring-2
//                                                     focus:ring-blue-400
//                                                 "
//                                             />

//                                             <button
//                                                 type="submit"
//                                                 className="
//                                                     absolute
//                                                     right-2
//                                                     top-1/2
//                                                     -translate-y-1/2
//                                                     w-9
//                                                     h-9
//                                                     flex
//                                                     items-center
//                                                     justify-center
//                                                     text-gray-500
//                                                     hover:text-blue-600
//                                                 "
//                                             >
//                                                 🔍
//                                             </button>

//                                         </div>

//                                     </form>

//                                 )}

//                             {!isLoggedIn && (

//                                 <div className="sm:hidden grid grid-cols-2 gap-3 mt-4">

//                                     <Link
//                                         to="/login"
//                                         onClick={closeMobileMenu}
//                                         className="
//                                             text-center
//                                             px-4
//                                             py-3
//                                             bg-red-500
//                                             border
//                                             border-red-500
//                                             rounded-lg
//                                             text-white
//                                             font-semibold
//                                             hover:bg-red-600
//                                             hover:border-red-600
//                                             transition
//                                             shadow-sm
//                                         "
//                                     >
//                                         Login
//                                     </Link>

//                                     <Link
//                                         to="/register"
//                                         onClick={closeMobileMenu}
//                                         className="
//                                             text-center
//                                             px-4
//                                             py-3
//                                             bg-blue-600
//                                             border
//                                             border-blue-600
//                                             rounded-lg
//                                             text-white
//                                             font-semibold
//                                             hover:bg-blue-700
//                                             hover:border-blue-700
//                                             transition
//                                             shadow-sm
//                                         "
//                                     >
//                                         Sign Up
//                                     </Link>

//                                 </div>

//                             )}

//                         </div>

//                     )}

//                 </div>

//             </nav>

//             {showLogoutModal && (
//                 <LogoutModal
//                     onCancel={() => setShowLogoutModal(false)}
//                     onConfirm={handleLogout}
//                 />
//             )}
//         </>
//     );
// };

// export default Navber;

import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoutModal from "./LogoutModal";
import axios from "axios";
import toast from "react-hot-toast";

const Navber = () => {
    const navigate = useNavigate();
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

            const response = await axios.delete(
                "http://localhost:9000/user/logout",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("Logout Response:", response.data);

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

    return (
        <>
            <nav className="w-full bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="min-h-[72px] flex items-center justify-between gap-4">

                        <Link
                            to="/"
                            onClick={closeMobileMenu}
                            className="
                                text-xl
                                sm:text-2xl
                                font-bold
                                text-fuchsia-600
                                whitespace-nowrap
                            "
                        >
                            Online Library
                        </Link>

                        <div className="hidden lg:flex items-center gap-6 xl:gap-10">

                            <Link
                                to="/"
                                className="
                                    text-base
                                    xl:text-lg
                                    font-semibold
                                    text-gray-700
                                    dark:text-gray-200
                                    hover:text-blue-600
                                    transition
                                "
                            >
                                Home
                            </Link>

                            <Link
                                to="/books"
                                className="
                                    text-base
                                    xl:text-lg
                                    font-semibold
                                    text-gray-700
                                    dark:text-gray-200
                                    hover:text-blue-600
                                    transition
                                "
                            >
                                Books
                            </Link>

                            <Link
                                to="/about"
                                className="
                                    text-base
                                    xl:text-lg
                                    font-semibold
                                    text-gray-700
                                    dark:text-gray-200
                                    hover:text-blue-600
                                    transition
                                "
                            >
                                About
                            </Link>

                        </div>

                        <div className="flex items-center gap-2 sm:gap-3">

                            {isLoggedIn &&
                                user?.role === "student" && (

                                    <form
                                        onSubmit={handleSearch}
                                        className="hidden lg:flex items-center"
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
                                                    xl:w-56
                                                    px-4
                                                    py-2
                                                    pr-10
                                                    text-sm
                                                    border
                                                    border-gray-300
                                                    rounded-lg
                                                    bg-white
                                                    dark:bg-gray-800
                                                    dark:text-white
                                                    dark:border-gray-600
                                                    outline-none
                                                    focus:ring-2
                                                    focus:ring-blue-400
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
                                                    flex
                                                    items-center
                                                    justify-center
                                                    text-gray-500
                                                    hover:text-blue-600
                                                    transition
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
                                            px-3
                                            sm:px-4
                                            py-2
                                            text-sm
                                            sm:text-base
                                            text-white
                                            bg-red-500
                                            border
                                            border-red-500
                                            rounded-lg
                                            hover:bg-red-600
                                            hover:border-red-600
                                            transition
                                            font-semibold
                                            shadow-sm
                                            hover:shadow-md
                                        "
                                    >
                                        Login
                                    </Link>

                                    <Link
                                        to="/register"
                                        className="
                                            px-3
                                            sm:px-4
                                            py-2
                                            text-sm
                                            sm:text-base
                                            text-white
                                            bg-blue-600
                                            border
                                            border-blue-600
                                            rounded-lg
                                            hover:bg-blue-700
                                            hover:border-blue-700
                                            transition
                                            font-semibold
                                            shadow-sm
                                            hover:shadow-md
                                        "
                                    >
                                        Sign Up
                                    </Link>

                                </div>

                            ) : (

                                <div className="relative" ref={profileRef}>

                                    <button
                                        onClick={() =>
                                            setShowProfile(!showProfile)
                                        }
                                        className="
                                            flex
                                            items-center
                                            gap-2
                                            sm:gap-3
                                            px-2
                                            sm:px-3
                                            lg:px-4
                                            py-2
                                            bg-gray-100
                                            dark:bg-gray-800
                                            rounded-xl
                                            hover:bg-gray-200
                                            dark:hover:bg-gray-700
                                            transition
                                            cursor-pointer
                                        "
                                    >

                                        <div
                                            className="
                                                w-8
                                                h-8
                                                sm:w-9
                                                sm:h-9
                                                rounded-full
                                                bg-blue-600
                                                text-white
                                                flex
                                                items-center
                                                justify-center
                                                font-bold
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
                                                lg:max-w-[140px]
                                                truncate
                                                font-semibold
                                                text-gray-800
                                                dark:text-white
                                            "
                                        >
                                            {user?.userName}
                                        </span>

                                        <span className="text-gray-500 text-xs">
                                            ▼
                                        </span>

                                    </button>

                                    {showProfile && (

                                        <div
                                            className="
                                                absolute
                                                right-0
                                                mt-2
                                                sm:mt-3
                                                w-56
                                                sm:w-64
                                                max-w-[calc(100vw-2rem)]
                                                bg-white
                                                dark:bg-gray-800
                                                rounded-xl
                                                shadow-2xl
                                                border
                                                border-gray-200
                                                dark:border-gray-700
                                                overflow-hidden
                                                z-50
                                            "
                                        >

                                            <div
                                                className="
                                                    px-3
                                                    py-3
                                                    sm:px-4
                                                    sm:py-4
                                                    bg-gray-50
                                                    dark:bg-gray-900
                                                    border-b
                                                    border-gray-200
                                                    dark:border-gray-700
                                                "
                                            >

                                                <p className="text-sm sm:text-base font-semibold text-gray-800 dark:text-white truncate">
                                                    {user?.userName}
                                                </p>

                                                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
                                                    {user?.email}
                                                </p>

                                                <p className="text-[11px] sm:text-xs text-blue-600 dark:text-blue-400 mt-1 capitalize font-semibold">
                                                    {user?.role}
                                                </p>

                                            </div>

                                            <Link
                                                to="/profile"
                                                onClick={() =>
                                                    setShowProfile(false)
                                                }
                                                className="
                                                    block
                                                    px-3
                                                    py-2
                                                    sm:px-4
                                                    sm:py-3
                                                    text-sm
                                                    sm:text-base
                                                    text-gray-700
                                                    dark:text-gray-200
                                                    hover:bg-gray-100
                                                    dark:hover:bg-gray-700
                                                    transition
                                                "
                                            >
                                                👤 My Profile
                                            </Link>

                                            {user?.role === "student" && (

                                                <>

                                                    <Link
                                                        to="/dashboard"
                                                        onClick={() =>
                                                            setShowProfile(false)
                                                        }
                                                        className="
                                                            block
                                                            px-3
                                                            py-2
                                                            sm:px-4
                                                            sm:py-3
                                                            text-sm
                                                            sm:text-base
                                                            text-gray-700
                                                            dark:text-gray-200
                                                            hover:bg-gray-100
                                                            dark:hover:bg-gray-700
                                                            transition
                                                        "
                                                    >
                                                        📊 Dashboard
                                                    </Link>

                                                    <Link
                                                        to="/my-borrowed-books"
                                                        onClick={() =>
                                                            setShowProfile(false)
                                                        }
                                                        className="
                                                            block
                                                            px-3
                                                            py-2
                                                            sm:px-4
                                                            sm:py-3
                                                            text-sm
                                                            sm:text-base
                                                            text-gray-700
                                                            dark:text-gray-200
                                                            hover:bg-gray-100
                                                            dark:hover:bg-gray-700
                                                            transition
                                                        "
                                                    >
                                                        📚 My Borrowed Books
                                                    </Link>

                                                    <Link
                                                        to="/change-password"
                                                        onClick={() =>
                                                            setShowProfile(false)
                                                        }
                                                        className="
                                                            block
                                                            px-3
                                                            py-2
                                                            sm:px-4
                                                            sm:py-3
                                                            text-sm
                                                            sm:text-base
                                                            text-gray-700
                                                            dark:text-gray-200
                                                            hover:bg-gray-100
                                                            dark:hover:bg-gray-700
                                                            transition
                                                        "
                                                    >
                                                        🔐 Change Password
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
                                                            block
                                                            px-3
                                                            py-2
                                                            sm:px-4
                                                            sm:py-3
                                                            text-sm
                                                            sm:text-base
                                                            text-gray-700
                                                            dark:text-gray-200
                                                            hover:bg-gray-100
                                                            dark:hover:bg-gray-700
                                                            transition
                                                        "
                                                    >
                                                        🛠️ Admin Dashboard
                                                    </Link>

                                                    <Link
                                                        to="/manage-books"
                                                        onClick={() =>
                                                            setShowProfile(false)
                                                        }
                                                        className="
                                                            block
                                                            px-3
                                                            py-2
                                                            sm:px-4
                                                            sm:py-3
                                                            text-sm
                                                            sm:text-base
                                                            text-gray-700
                                                            dark:text-gray-200
                                                            hover:bg-gray-100
                                                            dark:hover:bg-gray-700
                                                            transition
                                                        "
                                                    >
                                                        📖 Manage Books
                                                    </Link>

                                                </>

                                            )}

                                            <div
                                                className="
                                                    border-t
                                                    border-gray-200
                                                    dark:border-gray-700
                                                "
                                            >

                                                <button
                                                    onClick={() =>
                                                        setShowLogoutModal(true)
                                                    }
                                                    className="
                                                        w-full
                                                        text-left
                                                        px-3
                                                        py-2
                                                        sm:px-4
                                                        sm:py-3
                                                        text-sm
                                                        sm:text-base
                                                        text-red-600
                                                        hover:bg-red-50
                                                        dark:hover:bg-red-900/20
                                                        transition
                                                        font-semibold
                                                        cursor-pointer
                                                    "
                                                >
                                                    🚪 Logout
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
                                    flex
                                    items-center
                                    justify-center
                                    rounded-lg
                                    bg-gray-100
                                    dark:bg-gray-800
                                    text-gray-700
                                    dark:text-gray-200
                                    text-xl
                                    hover:bg-gray-200
                                    dark:hover:bg-gray-700
                                    transition
                                    cursor-pointer
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
                                border-gray-200
                                dark:border-gray-700
                                py-4
                            "
                        >

                            <div className="flex flex-col gap-1">

                                <Link
                                    to="/"
                                    onClick={closeMobileMenu}
                                    className="
                                        px-4
                                        py-3
                                        rounded-lg
                                        text-gray-700
                                        dark:text-gray-200
                                        font-semibold
                                        hover:bg-gray-100
                                        dark:hover:bg-gray-800
                                        transition
                                    "
                                >
                                    🏠 Home
                                </Link>

                                <Link
                                    to="/books"
                                    onClick={closeMobileMenu}
                                    className="
                                        px-4
                                        py-3
                                        rounded-lg
                                        text-gray-700
                                        dark:text-gray-200
                                        font-semibold
                                        hover:bg-gray-100
                                        dark:hover:bg-gray-800
                                        transition
                                    "
                                >
                                    📚 Books
                                </Link>

                                <Link
                                    to="/about"
                                    onClick={closeMobileMenu}
                                    className="
                                        px-4
                                        py-3
                                        rounded-lg
                                        text-gray-700
                                        dark:text-gray-200
                                        font-semibold
                                        hover:bg-gray-100
                                        dark:hover:bg-gray-800
                                        transition
                                    "
                                >
                                    ℹ️ About
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
                                                    px-4
                                                    py-3
                                                    pr-12
                                                    text-sm
                                                    border
                                                    border-gray-300
                                                    dark:border-gray-600
                                                    rounded-lg
                                                    bg-white
                                                    dark:bg-gray-800
                                                    dark:text-white
                                                    outline-none
                                                    focus:ring-2
                                                    focus:ring-blue-400
                                                "
                                            />

                                            <button
                                                type="submit"
                                                className="
                                                    absolute
                                                    right-2
                                                    top-1/2
                                                    -translate-y-1/2
                                                    w-9
                                                    h-9
                                                    flex
                                                    items-center
                                                    justify-center
                                                    text-gray-500
                                                    hover:text-blue-600
                                                "
                                            >
                                                🔍
                                            </button>

                                        </div>

                                    </form>

                                )}

                            {!isLoggedIn && (

                                <div className="sm:hidden grid grid-cols-2 gap-3 mt-4">

                                    <Link
                                        to="/login"
                                        onClick={closeMobileMenu}
                                        className="
                                            text-center
                                            px-4
                                            py-3
                                            bg-red-500
                                            border
                                            border-red-500
                                            rounded-lg
                                            text-white
                                            font-semibold
                                            hover:bg-red-600
                                            hover:border-red-600
                                            transition
                                            shadow-sm
                                        "
                                    >
                                        Login
                                    </Link>

                                    <Link
                                        to="/register"
                                        onClick={closeMobileMenu}
                                        className="
                                            text-center
                                            px-4
                                            py-3
                                            bg-blue-600
                                            border
                                            border-blue-600
                                            rounded-lg
                                            text-white
                                            font-semibold
                                            hover:bg-blue-700
                                            hover:border-blue-700
                                            transition
                                            shadow-sm
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