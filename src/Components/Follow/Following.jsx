import React, { useState, useEffect } from "react";
import axios from "axios";
import { avatarBaseUrl, Url } from '../service/constants';

const LeftSideFriend = () => {
    const [followingList, setFollowingList] = useState([]);

    useEffect(() => {
        const fetchFollowingList = async () => {
            try {
                const accessToken = localStorage.getItem('token');
                const response = await axios.get(`${Url}follow/ListUsers/following?page=0&pageSize=10000&sortName=createAt&sortType=DESC`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                setFollowingList(response.data.content);
            } catch (error) {
                console.error('Error fetching following list:', error);
            }
        };
        fetchFollowingList();
    }, []);

    const getAvatarUrl = (following) => {
        if (following.avatar && following.avatar) {
            return following.avatar.startsWith("http") ? following.avatar : `${avatarBaseUrl}${following.avatar}`;
        }
        return '';
    };

    return (
        <div className="flex flex-col overflow-y-auto">
            <div className="text-center py-3">
                <h2 className="text-lg font-semibold text-gray-800">ListFollowing:</h2>
            </div>
            <div className="mx-5 text">
                <ul className="max-w-md">
                    {followingList.map((following) => (
                        <li key={following.id} className="pb-3 sm:pb-4">
                            <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                <div className="flex-shrink-0">
                                    <img
                                        className="w-8 h-8 rounded-full object-cover"
                                        src={getAvatarUrl(following)}
                                        alt="avatar"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-400">
                                        {following.username}
                                    </p>
                                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                        {following.mail}
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
