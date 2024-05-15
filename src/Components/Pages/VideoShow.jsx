import { React, useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import PostCardVideo from "../Main/PostCardVideo";
import LeftSide from "../LeftSidebar/LeftSide";
import axios from "axios";
import { Url } from '../service/constants';
import NavRepo from "../Navbar/NavRepo";
import NavLogo from '../Navbar/NavLogo';

const VideoShow = () => {
    const [userInfo, setUserInfo] = useState({});
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1024);

    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth > 1024);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const response = await axios.get(`${Url}user/profile`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setUserInfo(response.data);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="w-full">
            {isLargeScreen ? (
                <div className="fixed top-0 z-10 w-full bg-white">
                    <Navbar />
                </div>
            ) : (
                <div className="fixed bottom-0 z-10 w-full bg-white h-16 shadow-lg">
                    <NavRepo />
                </div>
            )}
            {!isLargeScreen && (
                <div className="fixed top-0 z-10 w-full bg-white h-12 shadow-lg">
                    <NavLogo />
                </div>
            )}
            <div className="flex">
                <div className="flex-auto w-[25%] fixed top-16 hidden lg:block">
                    <LeftSide></LeftSide>
                </div>
                <div className="flex-auto w-full absolute lg:w-[75%] lg:ml-[25%] lg:mt-14 bg-gray-100 rounded-xl mt-10 pb-20">
                    <div className=" w-[90%] lg:w-[60%] mx-auto py-1"> {/* Thay đổi từ w-[70%] thành lg:w-[90%] */}
                        <PostCardVideo avatar={userInfo.avatar}></PostCardVideo>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default VideoShow;