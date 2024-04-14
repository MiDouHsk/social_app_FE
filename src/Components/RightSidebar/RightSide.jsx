import React, { useState } from "react";

const RightSide = () => {
    return (
        <div className="flex flex-col h-screen bg-white shadow-lg border-2 rounded-l-xl w-full">
            <div className="mx-2 my-2">
                <form className="max-w-md mx-auto">
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-black border border-gray-300 rounded-lg bg-gray-50" placeholder="Search... " required />
                        <button type="submit" className="text-black absolute right-2.5 bottom-2.5 hover:text-white  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Search</button>
                    </div>
                </form>
            </div>
            <div className="mx-5 text">
                <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                    <li className="pb-3 sm:pb-4">
                        <div className="flex items-center space-x-4 rtl:space-x-reverse">
                            <div className="flex-shrink-0">
                                <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Neil image" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    Neil Sims
                                </p>
                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                    email@flowbite.com
                                </p>
                            </div>
                        </div>
                    </li>
                    <li className="py-3 sm:py-4">
                        <div className="flex items-center space-x-4 rtl:space-x-reverse">
                            <div className="flex-shrink-0">
                                <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="Neil image" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    Bonnie Green
                                </p>
                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                    email@flowbite.com
                                </p>
                            </div>
                        </div>
                    </li>
                    <li className="py-3 sm:py-4">
                        <div className="flex items-center space-x-4 rtl:space-x-reverse">
                            <div className="flex-shrink-0">
                                <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-2.jpg" alt="Neil image" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    Michael Gough
                                </p>
                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                    email@flowbite.com
                                </p>
                            </div>
                        </div>
                    </li>
                    <li className="py-3 sm:py-4">
                        <div className="flex items-center space-x-4 rtl:space-x-reverse">
                            <div className="flex-shrink-0">
                                <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-5.jpg" alt="Neil image" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    Thomas Lean
                                </p>
                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                    email@flowbite.com
                                </p>
                            </div>
                        </div>
                    </li>
                    <li className="pt-3 pb-0 sm:pt-4">
                        <div className="flex items-center space-x-4 rtl:space-x-reverse">
                            <div className="flex-shrink-0">
                                <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-4.jpg" alt="Neil image" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    Lana Byrd
                                </p>
                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                    email@flowbite.com
                                </p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <p className="font-roboto font-normal text-sm text-gray-700 max-w-fit no-underline tracking-normal leading-tight py-2 mx-2">
            </p>
        </div>
    );
};

export default RightSide;