import React, { useState, useEffect } from "react";
import userService from "../service/userService";
import axios from "axios";
import { avatarBaseUrl, Url } from '../service/constants';
import { Link, useNavigate } from "react-router-dom";


const LeftSide = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState(null);
    const [followerCount, setFollowerCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

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

    const handleLogout = () => {
        setShowLogoutModal(true);
    };

    const confirmLogout = () => {
        localStorage.removeItem('token');
        setShowLogoutModal(false);
        navigate('/login');
    };

    const cancelLogout = () => {
        setShowLogoutModal(false);
    };

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
            <div class="flex flex-col mt-4 px-5">
                <div class="hover:scale-105 transform transition duration-300 ease-in-out">
                    <Link to="/home" class="flex items-center justify-center space-x-2 w-full h-12 bg-gray-200 rounded-full hover:bg-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6 mx-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                        <p class="text-sm font-medium">Trang chủ</p>
                    </Link>
                </div>
                <div class="hover:scale-105 transform transition duration-300 ease-in-out mt-2">
                    <Link to="/friend" class="flex items-center justify-center space-x-2 w-full h-12 bg-gray-200 rounded-full hover:bg-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6 mx-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                        </svg>
                        <p class="text-sm font-medium">Danh sách bạn bè</p>
                    </Link>
                </div>
                <div class="hover:scale-105 transform transition duration-300 ease-in-out mt-2">
                    <Link to="/video" class="flex items-center justify-center space-x-2 w-full h-12 bg-gray-200 rounded-full hover:bg-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6 mx-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
                        </svg>
                        <p class="text-sm font-medium">Video</p>
                    </Link>
                </div>
                <div class="hover:scale-105 transform transition duration-300 ease-in-out mt-2">
                    <Link to="/picture" class="flex items-center justify-center space-x-2 w-full h-12 bg-gray-200 rounded-full hover:bg-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6 mx-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>
                        <p class="text-sm font-medium">Hình ảnh</p>
                    </Link>
                </div>
                {/* Container cho nút đăng xuất */}
                <div className="absolute bottom-0 -right-8 mb-4 w-full pb-14">
                    <div className=" transform transition duration-300 ease-in-out relative">
                        <button onClick={() => setShowLogoutModal(true)} className="flex items-center justify-center space-x-2 w-24 h-12 bg-gray-200 rounded-full hover:bg-gray-300">
                            <p className="text-sm font-medium">Đăng xuất</p>
                        </button>
                        {showLogoutModal && (
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-2 bg-white rounded-lg p-8 z-50 shadow-xl">
                                <h2 className="text-lg font-semibold mb-4">Xác nhận</h2>
                                <p className="text-gray-600 mb-4">Bạn có chắc chắn muốn đăng xuất không?</p>
                                <div className="flex justify-end">
                                    <button onClick={confirmLogout} className="px-4 py-2 bg-red-500 text-white rounded mr-2">Thoát</button>
                                    <button onClick={cancelLogout} className="px-4 py-2 bg-gray-300 text-gray-700 rounded">Hủy</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default LeftSide;
