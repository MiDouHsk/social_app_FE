import React, { useState, useEffect } from "react";
import axios from "axios";
import { avatarBaseUrl, Url } from '../service/constants';

const LeftSideFriend = () => {
    const [followerList, setFollowerList] = useState([]);

    useEffect(() => {
        const fetchFollowerList = async () => {
            try {
                const accessToken = localStorage.getItem('token');
                const response = await axios.get(`${Url}follow/ListUsers/follower?page=0&pageSize=10000&sortName=createAt&sortType=DESC`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                setFollowerList(response.data.content);
                // console.log(response.data);
            } catch (error) {
                console.error('Error fetching following list:', error);
            }
        };
        fetchFollowerList();
    }, []);

    const getAvatarUrl = (follower) => {
        if (follower.avatar && follower.avatar) {
            return follower.avatar.startsWith("http") ? follower.avatar : `${avatarBaseUrl}${follower.avatar}`;
        }
        return '';
    };

    return (
        <div className="flex flex-col">
            <div className="text-center">
                <h2 className="text-lg font-semibold text-gray-800">ListFollowing:</h2>
            </div>
            <div className="mx-5 text">
                <ul className="max-w-md">
                    {followerList.map((follower) => (
                        <li key={follower.id} className="pb-3 sm:pb-4">
                            <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                <div className="flex-shrink-0">
                                    <img
                                        className="w-8 h-8 rounded-full object-cover"
                                        src={getAvatarUrl(follower)}
                                        alt="avatar"
                                    />
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
