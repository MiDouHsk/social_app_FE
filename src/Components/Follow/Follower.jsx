import React, { useState, useEffect } from "react";
import axios from "axios";

const LeftSideFriend = () => {
    const [followingList, setFollowingList] = useState([]);

    useEffect(() => {
        const fetchFollowingList = async () => {
            try {
                const accessToken = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8080/follow/ListUsers/follower', {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                setFollowingList(response.data);
            } catch (error) {
                console.error('Error fetching following list:', error);
            }
        };
        fetchFollowingList();
    }, []);

    return (
        <div className="flex flex-col">
            <div className="text-center py-3">
                <h2 className="text-lg font-semibold text-gray-800">Danh sách người theo dõi:</h2>
            </div>
            <div className="mx-5 text">
                <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                    {followingList.map((follower) => (
                        <li key={follower.id} className="pb-3 sm:pb-4">
                            <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                <div className="flex-shrink-0">
                                    <img className="w-8 h-8 rounded-full object-cover" src={follower.avatar} alt={follower.username} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-400">
                                        {follower.username}
                                    </p>
                                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                        {follower.mail}
                                    </p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default LeftSideFriend;
