import React, { useState } from "react";
import { ListDataFriend } from "../../assets/ListDataFriend";

const LeftSideFriend = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredFriends = ListDataFriend.filter((friend) =>
        friend.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col bg-white shadow-lg border-2 rounded-r-xl w-full">
            <div className="text-center py-3">
                <h2 className="text-lg font-semibold text-gray-800">Danh sách bạn bè</h2>
            </div>
            <div className="mx-2 my-2">
                <form className="max-w-md mx-auto">
                    <label htmlFor="default-search" className="block text-sm font-medium text-gray-900 mb-2">Tìm kiếm</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input
                            type="search"
                            id="default-search"
                            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Tìm kiếm..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            required
                        />
                        <button
                            type="submit"
                            className="absolute right-2.5 bottom-2.5 text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
                        >
                            Tìm kiếm
                        </button>
                    </div>
                    <hr className="my-4 border-gray-200 dark:border-gray-700" />
                </form>
            </div>

            <div className="mx-5 text">
                <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredFriends.map((friend) => (
                        <li key={friend.id} className="pb-3 sm:pb-4">
                            <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                <div className="flex-shrink-0">
                                    <img className="w-8 h-8 rounded-full object-cover" src={friend.image} alt={friend.name} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-400">
                                        {friend.name}
                                    </p>
                                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                        {friend.email}
                                    </p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <p className="font-roboto font-normal text-sm text-gray-700 max-w-fit no-underline tracking-normal leading-tight py-2 mx-2"></p>
        </div>
    );
};

export default LeftSideFriend;
