import React from "react";
import NavLinks from "./NavLinks";
import UserLinks from "./UserLinks";

const Navbar = () => {
    return (
        <div className="flex justify-between items-center border-b border-gray-100 w-full px-8 py-2 cursor-pointer">
            <div className="text-3xl font-extrabold text-gray-900 dark:text-white font-roboto">
                <span className="text-transparent bg-clip-text bg-gradient-to-r to-red-600 from-blue-400">
                    Social Media
                </span>{" "}
                App
            </div>
            <div className="flex justify-center items-center mx-auto">
                <NavLinks></NavLinks>
            </div>
            <div className="flex justify-center items-center">
                <UserLinks></UserLinks>
            </div>
        </div>
    );
};

export default Navbar;