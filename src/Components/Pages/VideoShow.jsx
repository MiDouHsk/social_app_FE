import { React, useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import PostCardVideo from "../Main/PostCardVideo";
import LeftSide from "../LeftSidebar/LeftSide";
import axios from "axios";
import { avatarBaseUrl, Url } from '../service/constants';

const VideoShow = () => {
    const [userInfo, setUserInfo] = useState({});

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
            <div className="fixed top-0 z-10 w-full bg-white">
                <Navbar></Navbar>
            </div>
            <div className="flex">
                <div className="flex-auto w-[25%] fixed top-16 hidden lg:block">
                    <LeftSide></LeftSide>
                </div>
                <div className="flex-auto w-full absolute lg:w-[75%] lg:ml-[25%] lg:mt-14 bg-gray-100 rounded-xl">
                    <div className="w-[60%] mx-auto py-1">
                        <PostCardVideo avatar={userInfo.avatar}></PostCardVideo>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VideoShow;