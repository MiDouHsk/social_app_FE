import React, { useState, useEffect } from "react";
import axios from "axios";
import { Url, avatarBaseUrl } from '../service/constants';
import { Link } from 'react-router-dom';

const RightSide = () => {
    const [followingList, setFollowingList] = useState([]);
    const [page, setPage] = useState(0);

    useEffect(() => {
        fetchFollowingList();
    }, [page]);

    const fetchFollowingList = async () => {
        try {
            const accessToken = localStorage.getItem('token');
            const response = await axios.get(`${Url}follow/ListUsers/notFollowing?page=${page}&pageSize=7&sortName=createAt&sortType=DESC`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            setFollowingList(response.data);
        } catch (error) {
            console.error('Error fetching following list:', error);
        }
    };

    const followUser = async (followingUserId) => {
        try {
            const accessToken = localStorage.getItem('token');
            await axios.post(`${Url}follow/user/${followingUserId}`, null, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            fetchFollowingList();
        } catch (error) {
            console.error('Error following user:', error);
        }
    };

    const handleUsernameClick = (userId) => {
        // console.log(`Clicked user with ID: ${userId}`);
    };

    return (
        <div className="flex flex-col bg-white rounded-b-xl w-full overflow-y-auto max-h-[calc(100vh - 10rem)]">
            <div className="mx-5 text">
                <div className="text my-2 text-blue-600 font-sm">
                    Những người có thể bạn biết!
                </div>
                <div className="max-w-md">
                    <table className="w-full">
                        <tbody className="text-sm divide-y divide-gray-100">
                            {followingList.map((follower) => (
                                <tr key={follower.id} className="py-3 sm:py-4">
                                    <Link to={`/friendProfile/${follower.id}`} className="cursor-pointer" onClick={() => handleUsernameClick(follower.id)}>
                                        <td className="pr-4">
                                            <div className="w-10 h-10 flex-shrink-0">
                                                {follower.avatar ? (
                                                    <img className="w-8 h-8 rounded-full object-cover" src={`${avatarBaseUrl}${follower.avatar}`} alt={follower.avatar} />
                                                ) : (
                                                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="pr-4">
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate">
                                                    {follower.firstName} {follower.lastName}
                                                </p>
                                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                    {/* {follower.mail} */}
                                                </p>
                                            </div>
                                        </td>
                                    </Link>
                                    <td>
                                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                            <button className="bg-green-200 hover:bg-green-600 text-white font-bold py-1 px-3 rounded focus:outline-none focus:ring focus:ring-green-300" onClick={() => followUser(follower.id)}>
                                                Follow
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default RightSide;
