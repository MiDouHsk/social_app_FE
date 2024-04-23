import React, { useState, useEffect } from "react";
import background from '../../assets/imgs/IMG_1052.JPG';
import userService from "../serivce/userService";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const LeftSide = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState(null);
    const [followerCount, setFollowerCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    const [avatarUrl, setAvatarUrl] = useState(' ');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        gender: false, // Gender is now a boolean
        phoneNumber: '',
        dateOfBirth: '',
        address: '',
        mail: '',
        createAt: '',
    });

    useEffect(() => {
        const fetchFollowerCount = async () => {
            try {
                const accessToken = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8080/follow/followerCount', {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                setFollowerCount(response.data);
            } catch (error) {
                console.error('Error fetching follower count:', error);
            }
        };

        const fetchFollowingCount = async () => {
            try {
                const accessToken = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8080/follow/followingCount', {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                setFollowingCount(response.data);
            } catch (error) {
                console.error('Error fetching following count:', error);
            }
        };

        fetchFollowerCount();
        fetchFollowingCount();
    }, []);



    useEffect(() => {
        const fetchUserProfile = async () => {
            const accessToken = localStorage.getItem('token');

            if (!accessToken) {
                console.error('Access token not found');
                return;
            }

            try {
                const userData = await userService.getUserDetails(accessToken);
                setUserInfo(userData);
                const avatarUrl = userData.avatar.startsWith("http") ? userData.avatar : `http://localhost:9000/${userData.avatar}`;
                setAvatarUrl(avatarUrl);
            } catch (error) {
                setError(error);
            }
        };

        fetchUserProfile();
    }, []);

    const handleSignOut = () => {
        localStorage.removeItem('token');
        navigate('/login');

    };

    if (error) {
        return <div className="text-red-500">Error: {error}</div>;
    }

    if (!userInfo) {
        return <div className="text-gray-500">Loading...</div>;
    }

    return (
        <div className="flex flex-col h-screen bg-white pb-4 border-2 rounded-r-xl shadow-lg">
            <div className="flex flex-col items-center relative">
                <div className="relative w-full h-36 rounded-t-xl overflow-hidden">
                    <img
                        className="absolute inset-0 w-full h-full object-cover"
                        src={background}
                        alt="background" />
                    <div className="absolute inset-0 bg-black opacity-25"></div>
                </div>
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                    {/* <img
                        className="h-24 w-24 rounded-full object-cover"
                        src={avatarUrl instanceof Error ? null : avatarUrl || "default-avatar-url"}
                        alt="avatar"
                        onError={() => setAvatarUrl(null)}
                        style={{ backgroundColor: avatarUrl ? "" : "brown" }}
                    /> */}
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
                <div className="flex items-center py-2 mx-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>

                    <p className="font-roboto font-bold text-lg no-underline tracking-normal leading-none">
                        {userInfo.address}
                    </p>
                </div>
            </div>
            <div className="pt-6 cursor-pointer justify-center text-center font-bold text-gray-400 bt-0">
                <div className="mx-4 py-4 block px-4 py-2 hover:translate-y-1 duration-500 ease-in-out hover:text-blue-500">
                    <p className="font-roboto no-underline tracking-normal leading-none">
                        Dashboard
                    </p>
                </div>
                <div className=" mx-4 py-4 block px-4 py-2 hover:translate-y-1 duration-500 ease-in-out hover:text-blue-500">
                    <p className="font-roboto no-underline tracking-normal leading-none">
                        Settings
                    </p>
                </div>
                <div className="mx-4 py-4 block px-4 py-2 hover:translate-y-1 duration-500 ease-in-out hover:text-blue-500">
                    <p className="font-roboto no-underline tracking-normal leading-none">
                        Earnings
                    </p>
                </div>
                <div className="mx-4 py-4  block px-4 py-2 hover:translate-y-1 duration-500 ease-in-out hover:text-blue-500" onClick={handleSignOut}>
                    <p className="font-roboto no-underline tracking-normal leading-none">
                        Sign out
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LeftSide;
