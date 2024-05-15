import React, { useState, useEffect } from "react";
import userService from '../service/userService';
import { Link } from "react-router-dom";
import { avatarBaseUrl } from '../service/constants';

const NavRepo = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchUserProfile = async () => {
            const accessToken = localStorage.getItem('token');
            // console.log("Token:", accessToken);

            if (!accessToken) {
                console.error('Access token not found');
                return;
            }

            try {
                const userData = await userService.getUserDetails(accessToken);
                setUserInfo(userData);
            } catch (error) {
                setError(error);
            }
        };

        fetchUserProfile();
    }, []);

    return (
        <div className="flex justify-center items-center cursor-pointer">
            <div className="hover:translate-y-1 duration-500 ease-in-out hover:text-blue-500">
                <Link to={"/home"}>
                    <svg xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 mx-4"
                    >
                        <path strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                </Link>
            </div>
            <div className="hover:translate-y-1 duration-500 ease-in-out hover:text-blue-500">
                <Link to={"/friend"}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24"
                        strokeWidth="1.5" stroke="currentColor"
                        className="w-6 h-6 mx-4"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                    </svg>
                </Link>
            </div>
            <div className="flex items-center justify-center">
                <Link to={`/profile/${userInfo?.id}`} className="flex items-center">
                    <div className="relative rounded-full overflow-hidden w-20 h-20 -translate-y-1/2">
                        <div className="absolute inset-0 flex items-center justify-center bg-white border-4 border-black">
                            <img
                                className="w-full h-full object-cover"
                                src={`${avatarBaseUrl}${userInfo?.avatar}`}
                                alt="avatar"
                            />
                        </div>
                    </div>
                </Link>
            </div>
            <div className="hover:translate-y-1 duration-500 ease-in-out hover:text-blue-500">
                <Link to={'/video'}>
                    <svg xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 mx-4"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
                    </svg>
                </Link>
            </div>
            <div className="hover:translate-y-1 duration-500 ease-in-out hover:text-blue-500">
                <Link to={'/picture'}>
                    <svg xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                        stroke="currentColor" className="w-6 h-6 mx-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                </Link>
            </div>
        </div>
    );
};

export default NavRepo;
