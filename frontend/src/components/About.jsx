import { Link } from "react-router-dom";
import libraryImage from "../assests/about.webp";

const About = () => {
    return (
        <section
            className="
                min-h-[100dvh]
                relative
                bg-cover bg-center bg-no-repeat
                px-2 min-[375px]:px-3 sm:px-5 md:px-8 lg:px-10
                py-6 min-[375px]:py-8 sm:py-12 md:py-16 lg:py-20
                overflow-hidden
            "
            style={{ backgroundImage: `url(${libraryImage})` }}
        >
            <div className="absolute inset-0 bg-black/75"></div>

            <div className="absolute -top-20 -left-20 w-64 h-64 sm:w-80 sm:h-80 bg-blue-600/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 sm:w-80 sm:h-80 bg-indigo-600/10 rounded-full blur-3xl"></div>

            <div className="relative z-10 max-w-7xl mx-auto">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-[375px]:gap-10 sm:gap-12 lg:gap-16 items-center">

                    <div className="text-center lg:text-left">

                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/15 backdrop-blur-md mb-4 sm:mb-5">

                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.9)]"></span>

                            <span className="text-[9px] min-[375px]:text-[10px] sm:text-xs text-blue-200 font-semibold uppercase tracking-widest">
                                About Our Library
                            </span>

                        </div>

                        <h2
                            className="
                                text-2xl
                                min-[375px]:text-[28px]
                                sm:text-4xl
                                md:text-5xl
                                lg:text-5xl
                                xl:text-6xl
                                font-bold
                                text-white
                                leading-tight
                            "
                        >
                            A Smarter Way To
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400">
                                Manage Your Library.
                            </span>
                        </h2>

                        <p
                            className="
                                text-gray-300
                                text-[11px]
                                min-[375px]:text-xs
                                sm:text-sm
                                md:text-base
                                lg:text-lg
                                mt-4 sm:mt-5
                                leading-relaxed
                                max-w-2xl
                                mx-auto lg:mx-0
                            "
                        >
                            Our Online Library Management System makes it easier for
                            students to discover books, borrow books, track returns and
                            manage their library activities from one convenient platform.
                        </p>

                        <p
                            className="
                                text-gray-400
                                text-[11px]
                                min-[375px]:text-xs
                                sm:text-sm
                                md:text-base
                                mt-3 sm:mt-4
                                leading-relaxed
                                max-w-2xl
                                mx-auto lg:mx-0
                            "
                        >
                            With a simple and user-friendly interface, users can quickly
                            find the books they need while keeping track of their borrowing
                            history and overdue activities.
                        </p>

                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mt-6 sm:mt-7">

                            <Link
                                to="/books"
                                className="
                                    inline-flex
                                    items-center
                                    justify-center
                                    gap-2
                                    px-4 min-[375px]:px-5 sm:px-6
                                    py-2.5 sm:py-3
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
                                    border border-blue-400/20
                                    shadow-lg shadow-blue-900/30
                                    hover:shadow-blue-500/30
                                    hover:-translate-y-0.5
                                    active:scale-95
                                    transition-all
                                    duration-300
                                "
                            >
                                <span>Explore Books</span>
                                <span>→</span>
                            </Link>

                            <div className="hidden min-[425px]:flex items-center gap-2 text-gray-400 text-[10px] sm:text-xs">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                                Easy & Secure
                            </div>

                        </div>

                    </div>

                    <div className="grid grid-cols-2 gap-2.5 min-[375px]:gap-3 sm:gap-4 md:gap-5 w-full max-w-xl mx-auto">

                        <div
                            className="
                                group
                                w-full
                                min-h-[145px]
                                min-[375px]:min-h-[155px]
                                sm:min-h-[175px]
                                md:min-h-[190px]
                                p-3
                                min-[375px]:p-4
                                sm:p-5
                                bg-black/40
                                backdrop-blur-xl
                                border border-white/10
                                hover:border-blue-400/30
                                rounded-xl
                                sm:rounded-2xl
                                shadow-xl
                                shadow-black/30
                                hover:bg-black/55
                                hover:-translate-y-1
                                transition-all
                                duration-300
                                flex flex-col justify-center
                            "
                        >
                            <div
                                className="
                                    w-9 h-9
                                    min-[375px]:w-10 min-[375px]:h-10
                                    sm:w-12 sm:h-12
                                    rounded-xl
                                    bg-blue-500/10
                                    border border-blue-400/20
                                    flex items-center justify-center
                                    text-lg
                                    min-[375px]:text-xl
                                    sm:text-2xl
                                    mb-2 sm:mb-3
                                    group-hover:scale-105
                                    transition-transform
                                "
                            >
                                📚
                            </div>

                            <h3 className="text-xs min-[375px]:text-sm sm:text-lg font-bold text-white">
                                Easy Access
                            </h3>

                            <p className="text-[9px] min-[375px]:text-[10px] sm:text-xs md:text-sm text-gray-400 mt-1.5 leading-relaxed">
                                Find and explore books easily from anywhere.
                            </p>
                        </div>

                        <div
                            className="
                                group
                                w-full
                                min-h-[145px]
                                min-[375px]:min-h-[155px]
                                sm:min-h-[175px]
                                md:min-h-[190px]
                                p-3
                                min-[375px]:p-4
                                sm:p-5
                                bg-black/40
                                backdrop-blur-xl
                                border border-white/10
                                hover:border-green-400/30
                                rounded-xl
                                sm:rounded-2xl
                                shadow-xl
                                shadow-black/30
                                hover:bg-black/55
                                hover:-translate-y-1
                                transition-all
                                duration-300
                                flex flex-col justify-center
                                lg:mt-8
                            "
                        >
                            <div
                                className="
                                    w-9 h-9
                                    min-[375px]:w-10 min-[375px]:h-10
                                    sm:w-12 sm:h-12
                                    rounded-xl
                                    bg-green-500/10
                                    border border-green-400/20
                                    flex items-center justify-center
                                    text-lg
                                    min-[375px]:text-xl
                                    sm:text-2xl
                                    mb-2 sm:mb-3
                                    group-hover:scale-105
                                    transition-transform
                                "
                            >
                                🔒
                            </div>

                            <h3 className="text-xs min-[375px]:text-sm sm:text-lg font-bold text-white">
                                Secure
                            </h3>

                            <p className="text-[9px] min-[375px]:text-[10px] sm:text-xs md:text-sm text-gray-400 mt-1.5 leading-relaxed">
                                Your account and library activities stay protected.
                            </p>
                        </div>

                        <div
                            className="
                                group
                                w-full
                                min-h-[145px]
                                min-[375px]:min-h-[155px]
                                sm:min-h-[175px]
                                md:min-h-[190px]
                                p-3
                                min-[375px]:p-4
                                sm:p-5
                                bg-black/40
                                backdrop-blur-xl
                                border border-white/10
                                hover:border-orange-400/30
                                rounded-xl
                                sm:rounded-2xl
                                shadow-xl
                                shadow-black/30
                                hover:bg-black/55
                                hover:-translate-y-1
                                transition-all
                                duration-300
                                flex flex-col justify-center
                            "
                        >
                            <div
                                className="
                                    w-9 h-9
                                    min-[375px]:w-10 min-[375px]:h-10
                                    sm:w-12 sm:h-12
                                    rounded-xl
                                    bg-orange-500/10
                                    border border-orange-400/20
                                    flex items-center justify-center
                                    text-lg
                                    min-[375px]:text-xl
                                    sm:text-2xl
                                    mb-2 sm:mb-3
                                    group-hover:scale-105
                                    transition-transform
                                "
                            >
                                ⚡
                            </div>

                            <h3 className="text-xs min-[375px]:text-sm sm:text-lg font-bold text-white">
                                Fast Management
                            </h3>

                            <p className="text-[9px] min-[375px]:text-[10px] sm:text-xs md:text-sm text-gray-400 mt-1.5 leading-relaxed">
                                Manage books and borrowing activities quickly.
                            </p>
                        </div>

                        <div
                            className="
                                group
                                w-full
                                min-h-[145px]
                                min-[375px]:min-h-[155px]
                                sm:min-h-[175px]
                                md:min-h-[190px]
                                p-3
                                min-[375px]:p-4
                                sm:p-5
                                bg-black/40
                                backdrop-blur-xl
                                border border-white/10
                                hover:border-purple-400/30
                                rounded-xl
                                sm:rounded-2xl
                                shadow-xl
                                shadow-black/30
                                hover:bg-black/55
                                hover:-translate-y-1
                                transition-all
                                duration-300
                                flex flex-col justify-center
                                lg:mt-8
                            "
                        >
                            <div
                                className="
                                    w-9 h-9
                                    min-[375px]:w-10 min-[375px]:h-10
                                    sm:w-12 sm:h-12
                                    rounded-xl
                                    bg-purple-500/10
                                    border border-purple-400/20
                                    flex items-center justify-center
                                    text-lg
                                    min-[375px]:text-xl
                                    sm:text-2xl
                                    mb-2 sm:mb-3
                                    group-hover:scale-105
                                    transition-transform
                                "
                            >
                                📊
                            </div>

                            <h3 className="text-xs min-[375px]:text-sm sm:text-lg font-bold text-white">
                                Track Activity
                            </h3>

                            <p className="text-[9px] min-[375px]:text-[10px] sm:text-xs md:text-sm text-gray-400 mt-1.5 leading-relaxed">
                                Keep track of borrowed books and return activities.
                            </p>
                        </div>

                    </div>

                </div>

                <div className="mt-8 sm:mt-12 lg:mt-16 flex items-center justify-center gap-3">

                    <span className="w-12 sm:w-16 h-px bg-white/10"></span>

                    <span className="text-[9px] sm:text-xs text-gray-500 uppercase tracking-[0.25em]">
                        Read • Borrow • Manage
                    </span>

                    <span className="w-12 sm:w-16 h-px bg-white/10"></span>

                </div>

            </div>
        </section>
    );
};

export default About;