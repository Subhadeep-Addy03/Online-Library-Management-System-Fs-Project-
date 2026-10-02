import React from "react";

const Footer = () => {
    return (
        <footer className="w-full bg-black border-t border-gray-800">

            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-3.5">

                <div className="flex flex-col min-[400px]:flex-row items-center justify-center gap-1.5 min-[400px]:gap-3">

                    <div className="flex items-center gap-2">

                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0">
                            <span className="text-sm sm:text-base">
                                📚
                            </span>
                        </div>

                        <span className="text-white text-xs sm:text-sm font-semibold">
                            Online Library
                        </span>

                    </div>

                    <span className="hidden min-[400px]:block text-gray-700">
                        •
                    </span>

                    <p className="text-gray-500 text-[9px] sm:text-xs text-center leading-relaxed">

                        &copy; Online Library System, All Rights Reserved.

                        <span className="mx-1.5 text-gray-700">
                            |
                        </span>

                        Designed & Developed by{" "}

                        <span className="text-cyan-400 font-semibold">
                            Subhadeep Addy
                        </span>

                    </p>

                </div>

            </div>

        </footer>
    );
};

export default Footer;