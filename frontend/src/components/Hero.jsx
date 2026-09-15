import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

// Library background image
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
                overflow-x-hidden
                min-h-[calc(100vh-64px)]
                sm:min-h-[calc(100vh-72px)]
                flex items-center
                relative
                bg-cover
                bg-center
                bg-no-repeat
            "
            style={{
                backgroundImage: `url(${libraryHero})`,
            }}
        >
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Main Content */}
            <div
                className="
                    relative z-10
                    w-full
                    max-w-7xl
                    mx-auto
                    px-4
                    sm:px-6
                    lg:px-8
                    py-16
                    sm:py-20
                    lg:py-24
                "
            >
                <div
                    className="
                        max-w-3xl
                        text-center
                        sm:text-left
                    "
                >
                    {/* Small Heading */}
                    <p
                        className="
                            text-blue-300
                            font-semibold
                            text-sm
                            sm:text-base
                            md:text-lg
                            mb-3
                            sm:mb-4
                        "
                    >
                        Welcome To Our Online Library System
                    </p>

                    {/* Main Heading */}
                    <h1
                        className="
                            text-3xl
                            sm:text-4xl
                            md:text-5xl
                            lg:text-6xl
                            font-bold
                            text-white
                            leading-tight
                        "
                    >
                        Your Library,

                        <span className="text-blue-300">
                            {" "}Smarter & Simpler.
                        </span>
                    </h1>

                    {/* Description */}
                    <p
                        className="
                            mt-5
                            sm:mt-6
                            text-base
                            sm:text-lg
                            text-gray-200
                            leading-relaxed
                            max-w-2xl
                            mx-auto
                            sm:mx-0
                        "
                    >
                        Discover books, borrow what you need, track your
                        returns, and manage your library activities with ease.
                    </p>

                    {/* Buttons */}
                    <div
                        className="
                            mt-7
                            sm:mt-8
                            flex
                            flex-row
                            flex-wrap
                            gap-3
                            sm:gap-4
                            justify-center
                            sm:justify-start
                        "
                    >
                        {/* Browse Books */}
                        <Link
                            to="/books"
                            className="
                                w-auto
                                px-4
                                sm:px-6
                                py-2.5
                                sm:py-3
                                text-sm
                                sm:text-base
                                bg-blue-600
                                text-white
                                font-semibold
                                text-center
                                rounded-lg
                                hover:bg-blue-700
                                transition
                                duration-300
                                shadow-lg
                            "
                        >
                            Browse Books
                        </Link>

                        {/* Get Started */}
                        {!isLoggedIn && (
                            <Link
                                to="/register"
                                className="
                                    w-auto
                                    px-4
                                    sm:px-6
                                    py-2.5
                                    sm:py-3
                                    text-sm
                                    sm:text-base
                                    bg-white/90
                                    border
                                    border-white
                                    text-gray-800
                                    font-semibold
                                    text-center
                                    rounded-lg
                                    hover:bg-white
                                    transition
                                    duration-300
                                    shadow-lg
                                "
                            >
                                Get Started
                            </Link>
                        )}
                    </div>

                    {/* Small Stats */}
                    <div
                        className="
                            mt-10
                            sm:mt-12
                            flex
                            flex-wrap
                            justify-center
                            sm:justify-start
                            gap-x-8
                            sm:gap-x-10
                            gap-y-6
                        "
                    >
                        {/* Easy */}
                        <div className="min-w-[120px]">
                            <h3
                                className="
                                    text-xl
                                    sm:text-2xl
                                    font-bold
                                    text-white
                                "
                            >
                                Easy
                            </h3>

                            <p
                                className="
                                    text-sm
                                    sm:text-base
                                    text-gray-200
                                    mt-1
                                "
                            >
                                Book Management
                            </p>
                        </div>

                        {/* Fast */}
                        <div className="min-w-[120px]">
                            <h3
                                className="
                                    text-xl
                                    sm:text-2xl
                                    font-bold
                                    text-white
                                "
                            >
                                Fast
                            </h3>

                            <p
                                className="
                                    text-sm
                                    sm:text-base
                                    text-gray-200
                                    mt-1
                                "
                            >
                                Borrow & Return
                            </p>
                        </div>

                        {/* Secure */}
                        <div className="min-w-[120px]">
                            <h3
                                className="
                                    text-xl
                                    sm:text-2xl
                                    font-bold
                                    text-white
                                "
                            >
                                Secure
                            </h3>

                            <p
                                className="
                                    text-sm
                                    sm:text-base
                                    text-gray-200
                                    mt-1
                                "
                            >
                                User Authentication
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;