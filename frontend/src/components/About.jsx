import { Link } from "react-router-dom";
import libraryImage from "../assests/about.webp";

const About = () => {
    return (
        <section
            className="
        min-h-screen relative bg-cover bg-center bg-no-repeat
        py-12 sm:py-16 md:py-20 lg:py-24
        px-4 sm:px-6 lg:px-8
      "
            style={{ backgroundImage: `url(${libraryImage})` }}
        >
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-black/50"></div>

            <div className="relative z-10 max-w-7xl mx-auto">
                <div
                    className="
            grid grid-cols-1 lg:grid-cols-2
            gap-10 sm:gap-12 lg:gap-16
            items-center
          "
                >
                    {/* ================= LEFT CONTENT ================= */}
                    <div className="text-center lg:text-left">
                        <p
                            className="
                text-blue-300
                font-semibold
                text-xs sm:text-sm
                uppercase
                tracking-wide
              "
                        >
                            About Our Library
                        </p>

                        <h2
                            className="
                text-3xl sm:text-4xl md:text-5xl lg:text-5xl
                font-bold
                text-white
                mt-3
                leading-tight
              "
                        >
                            A Smarter Way To
                            <span className="text-blue-300">
                                {" "}Manage Your Library.
                            </span>
                        </h2>

                        <p
                            className="
                text-gray-200
                text-sm sm:text-base lg:text-lg
                mt-5
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
                text-gray-200
                text-sm sm:text-base lg:text-lg
                mt-4
                leading-relaxed
                max-w-2xl
                mx-auto lg:mx-0
              "
                        >
                            With a simple and user-friendly interface, users can quickly
                            find the books they need while keeping track of their borrowing
                            history and overdue activities.
                        </p>

                        {/* Explore Books Button */}
                        <Link
                            to="/books"
                            className="
                inline-block
                mt-7
                px-5 sm:px-6
                py-3
                bg-blue-600
                text-white
                font-semibold
                text-sm sm:text-base
                rounded-xl
                hover:bg-blue-700
                transition duration-300
                shadow-lg
              "
                        >
                            Explore Books
                        </Link>
                    </div>

                    {/* ================= RIGHT CARDS ================= */}
                    <div
                        className="
              grid
              grid-cols-1 sm:grid-cols-2
              gap-4 sm:gap-5
              w-full
            "
                    >
                        {/* ================= CARD 1 ================= */}
                        <div
                            className="
                w-full
                max-w-[280px]
                sm:max-w-none
                mx-auto

                h-[135px]
                sm:h-[155px]
                md:h-[165px]
                lg:h-[175px]

                p-4 sm:p-5

                bg-white/90
                backdrop-blur-sm
                rounded-2xl
                shadow-xl

                flex
                flex-col
                justify-center
              "
                        >
                            <div
                                className="
                  text-blue-600
                  text-2xl sm:text-3xl
                  mb-1 sm:mb-2
                "
                            >
                                📚
                            </div>

                            <h3
                                className="
                  text-base sm:text-xl
                  font-bold
                  text-gray-800
                "
                            >
                                Easy Access
                            </h3>

                            <p
                                className="
                  text-gray-600
                  text-xs sm:text-base
                  mt-1
                  leading-relaxed
                "
                            >
                                Find and explore books easily from anywhere.
                            </p>
                        </div>

                        {/* ================= CARD 2 ================= */}
                        <div
                            className="
                w-full
                max-w-[280px]
                sm:max-w-none
                mx-auto

                h-[135px]
                sm:h-[155px]
                md:h-[165px]
                lg:h-[175px]

                p-4 sm:p-5

                bg-white/90
                backdrop-blur-sm
                rounded-2xl
                shadow-xl

                flex
                flex-col
                justify-center

                lg:mt-8
              "
                        >
                            <div
                                className="
                  text-green-600
                  text-2xl sm:text-3xl
                  mb-1 sm:mb-2
                "
                            >
                                🔒
                            </div>

                            <h3
                                className="
                  text-base sm:text-xl
                  font-bold
                  text-gray-800
                "
                            >
                                Secure
                            </h3>

                            <p
                                className="
                  text-gray-600
                  text-xs sm:text-base
                  mt-1
                  leading-relaxed
                "
                            >
                                Your account and library activities stay protected.
                            </p>
                        </div>

                        {/* ================= CARD 3 ================= */}
                        <div
                            className="
                w-full
                max-w-[280px]
                sm:max-w-none
                mx-auto

                h-[135px]
                sm:h-[155px]
                md:h-[165px]
                lg:h-[175px]

                p-4 sm:p-5

                bg-white/90
                backdrop-blur-sm
                rounded-2xl
                shadow-xl

                flex
                flex-col
                justify-center
              "
                        >
                            <div
                                className="
                  text-orange-500
                  text-2xl sm:text-3xl
                  mb-1 sm:mb-2
                "
                            >
                                ⚡
                            </div>

                            <h3
                                className="
                  text-base sm:text-xl
                  font-bold
                  text-gray-800
                "
                            >
                                Fast Management
                            </h3>

                            <p
                                className="
                  text-gray-600
                  text-xs sm:text-base
                  mt-1
                  leading-relaxed
                "
                            >
                                Manage books and borrowing activities quickly.
                            </p>
                        </div>

                        {/* ================= CARD 4 ================= */}
                        <div
                            className="
                w-full
                max-w-[280px]
                sm:max-w-none
                mx-auto

                h-[135px]
                sm:h-[155px]
                md:h-[165px]
                lg:h-[175px]

                p-4 sm:p-5

                bg-white/90
                backdrop-blur-sm
                rounded-2xl
                shadow-xl

                flex
                flex-col
                justify-center

                lg:mt-8
              "
                        >
                            <div
                                className="
                  text-purple-600
                  text-2xl sm:text-3xl
                  mb-1 sm:mb-2
                "
                            >
                                📊
                            </div>

                            <h3
                                className="
                  text-base sm:text-xl
                  font-bold
                  text-gray-800
                "
                            >
                                Track Activity
                            </h3>

                            <p
                                className="
                  text-gray-600
                  text-xs sm:text-base
                  mt-1
                  leading-relaxed
                "
                            >
                                Keep track of borrowed books and return activities.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About