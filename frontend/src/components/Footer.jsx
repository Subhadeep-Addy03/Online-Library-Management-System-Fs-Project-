
import React from "react";

const Footer = () => {
    return (
        <footer className="bg-slate-700 w-full">
            <div
                className="
                    max-w-7xl
                    mx-auto
                    px-4
                    sm:px-6
                    lg:px-8
                    py-4
                    sm:py-5
                "
            >
                <p
                    className="
                        text-gray-400
                        text-xs
                        sm:text-sm
                        md:text-base
                        text-center
                        leading-relaxed
                    "
                >
                    &copy; Online Library System, All Rights Reserved.
                    <span className="block sm:inline">
                        {" "}Designed & Developed by{" "}
                    </span>

                    <span className="text-cyan-400 font-semibold">
                        Subhadeep Addy
                    </span>
                </p>
            </div>
        </footer>
    );
};

export default Footer