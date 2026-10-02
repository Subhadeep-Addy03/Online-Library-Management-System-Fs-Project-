// import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";

// // Library background image
// import libraryHero from "../assests/library-bg.jpg";

// const Hero = () => {
//     const [isLoggedIn, setIsLoggedIn] = useState(
//         !!localStorage.getItem("accessToken")
//     );

//     useEffect(() => {
//         const checkLoginStatus = () => {
//             const token = localStorage.getItem("accessToken");
//             setIsLoggedIn(!!token);
//         };

//         window.addEventListener("authChange", checkLoginStatus);

//         return () => {
//             window.removeEventListener("authChange", checkLoginStatus);
//         };
//     }, []);

//     return (
//         <section
//             className="
//                 w-full
//                 max-w-full
//                 overflow-x-hidden
//                 min-h-[calc(100vh-64px)]
//                 sm:min-h-[calc(100vh-72px)]
//                 flex items-center
//                 relative
//                 bg-cover
//                 bg-center
//                 bg-no-repeat
//             "
//             style={{
//                 backgroundImage: `url(${libraryHero})`,
//             }}
//         >
//             {/* Background Overlay */}
//             <div className="absolute inset-0 bg-black/50"></div>

//             {/* Main Content */}
//             <div
//                 className="
//                     relative z-10
//                     w-full
//                     max-w-7xl
//                     mx-auto
//                     px-4
//                     sm:px-6
//                     lg:px-8
//                     py-16
//                     sm:py-20
//                     lg:py-24
//                 "
//             >
//                 <div
//                     className="
//                         max-w-3xl
//                         text-center
//                         sm:text-left
//                     "
//                 >
//                     {/* Small Heading */}
//                     <p
//                         className="
//                             text-blue-300
//                             font-semibold
//                             text-sm
//                             sm:text-base
//                             md:text-lg
//                             mb-3
//                             sm:mb-4
//                         "
//                     >
//                         Welcome To Our Online Library System
//                     </p>

//                     {/* Main Heading */}
//                     <h1
//                         className="
//                             text-3xl
//                             sm:text-4xl
//                             md:text-5xl
//                             lg:text-6xl
//                             font-bold
//                             text-white
//                             leading-tight
//                         "
//                     >
//                         Your Library,

//                         <span className="text-blue-300">
//                             {" "}Smarter & Simpler.
//                         </span>
//                     </h1>

//                     {/* Description */}
//                     <p
//                         className="
//                             mt-5
//                             sm:mt-6
//                             text-base
//                             sm:text-lg
//                             text-gray-200
//                             leading-relaxed
//                             max-w-2xl
//                             mx-auto
//                             sm:mx-0
//                         "
//                     >
//                         Discover books, borrow what you need, track your
//                         returns, and manage your library activities with ease.
//                     </p>

//                     {/* Buttons */}
//                     <div
//                         className="
//                             mt-7
//                             sm:mt-8
//                             flex
//                             flex-row
//                             flex-wrap
//                             gap-3
//                             sm:gap-4
//                             justify-center
//                             sm:justify-start
//                         "
//                     >
//                         {/* Browse Books */}
//                         <Link
//                             to="/books"
//                             className="
//                                 w-auto
//                                 px-4
//                                 sm:px-6
//                                 py-2.5
//                                 sm:py-3
//                                 text-sm
//                                 sm:text-base
//                                 bg-blue-600
//                                 text-white
//                                 font-semibold
//                                 text-center
//                                 rounded-lg
//                                 hover:bg-blue-700
//                                 transition
//                                 duration-300
//                                 shadow-lg
//                             "
//                         >
//                             Browse Books
//                         </Link>

//                         {/* Get Started */}
//                         {!isLoggedIn && (
//                             <Link
//                                 to="/register"
//                                 className="
//                                     w-auto
//                                     px-4
//                                     sm:px-6
//                                     py-2.5
//                                     sm:py-3
//                                     text-sm
//                                     sm:text-base
//                                     bg-white/90
//                                     border
//                                     border-white
//                                     text-gray-800
//                                     font-semibold
//                                     text-center
//                                     rounded-lg
//                                     hover:bg-white
//                                     transition
//                                     duration-300
//                                     shadow-lg
//                                 "
//                             >
//                                 Get Started
//                             </Link>
//                         )}
//                     </div>

//                     {/* Small Stats */}
//                     <div
//                         className="
//                             mt-10
//                             sm:mt-12
//                             flex
//                             flex-wrap
//                             justify-center
//                             sm:justify-start
//                             gap-x-8
//                             sm:gap-x-10
//                             gap-y-6
//                         "
//                     >
//                         {/* Easy */}
//                         <div className="min-w-[120px]">
//                             <h3
//                                 className="
//                                     text-xl
//                                     sm:text-2xl
//                                     font-bold
//                                     text-white
//                                 "
//                             >
//                                 Easy
//                             </h3>

//                             <p
//                                 className="
//                                     text-sm
//                                     sm:text-base
//                                     text-gray-200
//                                     mt-1
//                                 "
//                             >
//                                 Book Management
//                             </p>
//                         </div>

//                         {/* Fast */}
//                         <div className="min-w-[120px]">
//                             <h3
//                                 className="
//                                     text-xl
//                                     sm:text-2xl
//                                     font-bold
//                                     text-white
//                                 "
//                             >
//                                 Fast
//                             </h3>

//                             <p
//                                 className="
//                                     text-sm
//                                     sm:text-base
//                                     text-gray-200
//                                     mt-1
//                                 "
//                             >
//                                 Borrow & Return
//                             </p>
//                         </div>

//                         {/* Secure */}
//                         <div className="min-w-[120px]">
//                             <h3
//                                 className="
//                                     text-xl
//                                     sm:text-2xl
//                                     font-bold
//                                     text-white
//                                 "
//                             >
//                                 Secure
//                             </h3>

//                             <p
//                                 className="
//                                     text-sm
//                                     sm:text-base
//                                     text-gray-200
//                                     mt-1
//                                 "
//                             >
//                                 User Authentication
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default Hero;

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import libraryHero from "../assests/library-bg.jpg";

const Hero = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(
        !!localStorage.getItem("accessToken")
    );

    useEffect(() => {
        const checkLoginStatus = () => {
            const token = localStorage.getItem("accessToken");
            setIsLoggedIn(!!token);
        };

        window.addEventListener("authChange", checkLoginStatus);

        return () => {
            window.removeEventListener("authChange", checkLoginStatus);
        };
    }, []);

    return (
        <section
            className="
                w-full
                max-w-full
                overflow-hidden
                min-h-[calc(100dvh-64px)]
                sm:min-h-[calc(100dvh-70px)]
                relative
                flex items-center
                bg-cover
                bg-center
                bg-no-repeat
            "
            style={{
                backgroundImage: `url(${libraryHero})`,
            }}
        >
            <div className="absolute inset-0 bg-black/70"></div>

            <div className="absolute -top-32 -left-32 w-72 h-72 sm:w-96 sm:h-96 bg-blue-600/15 rounded-full blur-3xl"></div>

            <div className="absolute -bottom-32 -right-32 w-72 h-72 sm:w-96 sm:h-96 bg-indigo-600/15 rounded-full blur-3xl"></div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-2 min-[375px]:px-3 sm:px-5 md:px-8 lg:px-10 py-8 min-[375px]:py-10 sm:py-14 lg:py-16">

                <div className="max-w-4xl mx-auto lg:mx-0 text-center lg:text-left">

                    <div
                        className="
                            inline-flex
                            items-center
                            gap-2
                            px-3
                            py-1.5
                            rounded-full
                            bg-white/5
                            border
                            border-white/15
                            backdrop-blur-xl
                            shadow-lg
                            mb-4
                            sm:mb-5
                        "
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.9)]"></span>

                        <span className="text-[9px] min-[375px]:text-[10px] sm:text-xs text-blue-200 font-semibold uppercase tracking-widest">
                            Welcome To Our Online Library
                        </span>
                    </div>

                    <h1
                        className="
                            text-3xl
                            min-[375px]:text-[34px]
                            sm:text-5xl
                            md:text-6xl
                            lg:text-6xl
                            xl:text-7xl
                            font-bold
                            text-white
                            leading-[1.08]
                            tracking-tight
                        "
                    >
                        Your Library,

                        <span
                            className="
                                block
                                text-transparent
                                bg-clip-text
                                bg-gradient-to-r
                                from-blue-400
                                via-cyan-300
                                to-indigo-400
                            "
                        >
                            Smarter & Simpler.
                        </span>
                    </h1>

                    <p
                        className="
                            mt-4
                            sm:mt-5
                            text-[11px]
                            min-[375px]:text-xs
                            sm:text-sm
                            md:text-base
                            lg:text-lg
                            text-gray-300
                            leading-relaxed
                            max-w-2xl
                            mx-auto
                            lg:mx-0
                        "
                    >
                        Discover books, borrow what you need, track your
                        returns, and manage your library activities with ease
                        through one simple and powerful platform.
                    </p>

                    <div
                        className="
                            mt-6
                            sm:mt-7
                            flex
                            flex-wrap
                            items-center
                            justify-center
                            lg:justify-start
                            gap-2.5
                            sm:gap-3
                        "
                    >
                        <Link
                            to="/books"
                            className="
                                inline-flex
                                items-center
                                justify-center
                                gap-2
                                px-4
                                min-[375px]:px-5
                                sm:px-6
                                py-2.5
                                sm:py-3
                                bg-gradient-to-r
                                from-blue-600
                                to-indigo-600
                                hover:from-blue-500
                                hover:to-indigo-500
                                text-white
                                font-semibold
                                text-[11px]
                                min-[375px]:text-xs
                                sm:text-sm
                                rounded-xl
                                border
                                border-blue-400/20
                                shadow-lg
                                shadow-blue-900/30
                                hover:shadow-blue-500/30
                                hover:-translate-y-0.5
                                active:scale-95
                                transition-all
                                duration-300
                            "
                        >
                            <span>Browse Books</span>
                            <span>→</span>
                        </Link>

                        {!isLoggedIn && (
                            <Link
                                to="/register"
                                className="
                                    inline-flex
                                    items-center
                                    justify-center
                                    gap-2
                                    px-4
                                    min-[375px]:px-5
                                    sm:px-6
                                    py-2.5
                                    sm:py-3
                                    bg-white/5
                                    hover:bg-white/10
                                    backdrop-blur-xl
                                    border
                                    border-white/20
                                    hover:border-white/30
                                    text-white
                                    font-semibold
                                    text-[11px]
                                    min-[375px]:text-xs
                                    sm:text-sm
                                    rounded-xl
                                    shadow-lg
                                    hover:-translate-y-0.5
                                    active:scale-95
                                    transition-all
                                    duration-300
                                "
                            >
                                <span>Get Started</span>
                                <span>↗</span>
                            </Link>
                        )}
                    </div>

                    <div
                        className="
                            mt-7
                            sm:mt-9
                            flex
                            flex-wrap
                            justify-center
                            lg:justify-start
                            gap-2
                            sm:gap-3
                        "
                    >
                        <div className="flex items-center gap-2 px-3 py-2 bg-black/30 backdrop-blur-md border border-white/10 rounded-lg">
                            <span className="text-green-400 text-xs sm:text-sm">
                                ✓
                            </span>

                            <span className="text-[9px] min-[375px]:text-[10px] sm:text-xs text-gray-300">
                                Easy Management
                            </span>
                        </div>

                        <div className="flex items-center gap-2 px-3 py-2 bg-black/30 backdrop-blur-md border border-white/10 rounded-lg">
                            <span className="text-blue-400 text-xs sm:text-sm">
                                ⚡
                            </span>

                            <span className="text-[9px] min-[375px]:text-[10px] sm:text-xs text-gray-300">
                                Fast Borrowing
                            </span>
                        </div>

                        <div className="flex items-center gap-2 px-3 py-2 bg-black/30 backdrop-blur-md border border-white/10 rounded-lg">
                            <span className="text-purple-400 text-xs sm:text-sm">
                                🔒
                            </span>

                            <span className="text-[9px] min-[375px]:text-[10px] sm:text-xs text-gray-300">
                                Secure Access
                            </span>
                        </div>
                    </div>

                </div>

                <div
                    className="
                        mt-8
                        sm:mt-10
                        lg:mt-12
                        pt-5
                        sm:pt-6
                        border-t
                        border-white/10
                        grid
                        grid-cols-3
                        gap-2
                        sm:gap-5
                        max-w-2xl
                    "
                >

                    <div className="text-center lg:text-left">

                        <h3 className="text-lg min-[375px]:text-xl sm:text-2xl font-bold text-white">
                            Easy
                        </h3>

                        <p className="text-[8px] min-[375px]:text-[9px] sm:text-xs text-gray-400 mt-1">
                            Book Management
                        </p>

                    </div>

                    <div className="text-center lg:text-left border-x border-white/10">

                        <h3 className="text-lg min-[375px]:text-xl sm:text-2xl font-bold text-white">
                            Fast
                        </h3>

                        <p className="text-[8px] min-[375px]:text-[9px] sm:text-xs text-gray-400 mt-1">
                            Borrow & Return
                        </p>

                    </div>

                    <div className="text-center lg:text-left">

                        <h3 className="text-lg min-[375px]:text-xl sm:text-2xl font-bold text-white">
                            Secure
                        </h3>

                        <p className="text-[8px] min-[375px]:text-[9px] sm:text-xs text-gray-400 mt-1">
                            User Authentication
                        </p>

                    </div>

                </div>

            </div>
        </section>
    );
};

export default Hero;