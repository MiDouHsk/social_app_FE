import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import avatar from '../../assets/imgs/IMG_0482.PNG';

const UserLinks = ({ name, avatar }) => {

    return (
        <div className="flex justify-center items-center cursor-pointer">

            <div className="hover:translate-y-1 duration-500 ease-in-out hover:text-blue-500">
                <Link to="/route1">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 mx-4"
                    >
                        <path strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                    </svg>
                </Link>
            </div>
            <div className="hover:translate-y-1 duration-500 ease-in-out hover:text-blue-500">
                <Link to="/route2">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 mx-4"
                    >
                        <path strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                    </svg>
                </Link>
            </div>
            <div className="flex flex-col pl-2">
                <Link to="/profile" className="flex items-center">
                    <img className="w-8 h-8 rounded-full mx-4" src={avatar} alt="avatar" />
                    <div className="font-medium dark:text-gray-900">
                        {name}
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default UserLinks;
