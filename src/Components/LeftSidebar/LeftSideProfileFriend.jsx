import React, { useState } from "react";
import { ListDataFriend } from "../../assets/ListDataFriend";

const LeftSideFriend = () => {
    const [startIndex, setStartIndex] = useState(0);
    const itemsToShow = 8;

    const handleNextClick = () => {
        setStartIndex(startIndex + itemsToShow);
    };

    const handlePrevClick = () => {
        setStartIndex(startIndex - itemsToShow);
    };

    return (
        <div className="flex flex-col h-screen bg-white shadow-lg border-2 rounded-r-xl w-full">
            <div className="text-center py-3">
                <h2 className="text-lg font-semibold text-gray-800">Danh sách bạn bè</h2>
            </div>
            <div className="mx-5 text">
                <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                    {ListDataFriend.slice(startIndex, startIndex + itemsToShow).map((friend) => (
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
            {startIndex > 0 && (
                <button onClick={handlePrevClick} className="text-blue-500 hover:text-blue-600 focus:outline-none">
                    Trở lại
                </button>
            )}
            {ListDataFriend.length > startIndex + itemsToShow && (
                <button onClick={handleNextClick} className="text-blue-500 hover:text-blue-600 focus:outline-none">
                    Xem thêm
                </button>
            )}
        </div>
    );
};

export default LeftSideFriend;
