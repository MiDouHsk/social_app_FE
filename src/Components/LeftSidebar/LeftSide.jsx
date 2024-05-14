import React, { useState, useEffect } from "react";
import background from '../../assets/imgs/IMG_1052.JPG';
import userService from "../service/userService";
import axios from "axios";
import { avatarBaseUrl, Url } from '../service/constants';

const LeftSide = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState(null);
    const [followerCount, setFollowerCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            const accessToken = localStorage.getItem('token');

            if (!accessToken) {
                setError('Access token not found');
                return;
            }

            setIsLoading(true);

            try {
                const [userData, followerData, followingData] = await Promise.all([
                    userService.getUserDetails(accessToken),
                    axios.get(`${Url}follow/followerCount`, {
                        headers: {
                            'Authorization': `Bearer ${accessToken}`
                        }
                    }),
                    axios.get(`${Url}follow/followingCount`, {
                        headers: {
                            'Authorization': `Bearer ${accessToken}`
                        }
                    })
                ]);

                setUserInfo(userData);
                setFollowerCount(followerData.data);
                setFollowingCount(followingData.data);
                setIsLoading(false);
            } catch (error) {
                setError(error);
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (error) {
        return <div className="text-red-500">Error: {error}</div>;
    }

    if (!userInfo) {
        return <div className="text-gray-500">No user data available.</div>;
    }

    return (
        <div className="flex flex-col h-screen bg-white pb-4 border-2 rounded-r-xl">
            <div className="flex flex-col items-center relative mb-4">
                <div className="relative w-full h-36 rounded-t-xl overflow-hidden">
                    <img
                        className="absolute inset-0 w-full object-cover h-full"
                        src={`${avatarBaseUrl}${userInfo.background}`}
                        alt="background"
                    />
                    <div className="absolute inset-0 bg-black opacity-25"></div>
                </div>
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                    <div className="bg-white h-28 w-28 rounded-full mr-2 flex justify-center items-center">
                        <img src={`${avatarBaseUrl}${userInfo.avatar}`} className="w-24 h-24 rounded-full object-cover" alt="Avatar" />
                    </div>
                    <div className="absolute inset-0 opacity-25"></div>
                </div>
            </div>
            <div className="flex flex-col items-center pt-12">
                <p className="font-roboto font-medium text-md text-gray-700 no-underline tracking-normal leading-none">
                    User email:
                </p>
                <p className="font-roboto font-medium text-xs text-gray-700 no-underline tracking-normal leading-none">
                    {userInfo.mail}
                </p>
                <p className="font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none py-2">
                    {userInfo.username}
                </p>
            </div>
            <div className="flex flex-col pl-2 text-gray-700 dark:text-gray-500 bg-gray-100">
                <div className="flex space-x-4 items-center justify-center text-center font-extrabold my-4">
                    <p className="font-roboto text-sm text-gray-500">Following: {followingCount}</p>
                    <p className="font-roboto text-sm text-gray-500">Followers: {followerCount}</p>
                </div>
            </div>
        </div>
    );
};

export default LeftSide;
