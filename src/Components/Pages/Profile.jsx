import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import PostCard from "../Main/PostCard";
import LeftSideProfileFriend from "../Follow/Following";
import LeftSideProfilePic from "../LeftSidebar/LeftSideProfilePic";
import background from '../../assets/imgs/IMG_1052.JPG';
import userService from "../serivce/userService";
import Follows from "../Follow/Follows";

const Profile = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState(null);
    const [followerCount, setFollowerCount] = useState(0);
    const [urlAvatar, setUrlAvatar] = useState(' ');
    const [followingCount, setFollowingCount] = useState(0);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        gender: false, // Gender is now a boolean
        phoneNumber: '',
        dateOfBirth: '',
        avatar: '',
        address: '',
        mail: '',
        createAt: '',
    });

    useEffect(() => {
        const fetchFollowerCount = async () => {
            try {
                const accessToken = localStorage.getItem('token');
                console.log("Token:", accessToken);
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
                console.log("Token:", accessToken);
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
            console.log("Token:", accessToken);

            if (!accessToken) {
                console.error('Access token not found');
                return;
            }

            try {
                const userData = await userService.getUserDetails(accessToken);
                setUserInfo(userData);
                setUrlAvatar(userData.avatar.startsWith("http") ? userData.avatar : `http://localhost:9000/${userData.avatar}`);
            } catch (error) {
                setError(error);
            }
        };

        fetchUserProfile();
    }, []);

    if (error) {
        return <div className="text-red-500">Error: {error}</div>;
    }

    if (!userInfo) {
        return <div className="text-gray-500">Loading...</div>;
    }

    return (
        <div className="w-full bg-gray-100">
            <div className="fixed z-10 w-full bg-white">
                <Navbar></Navbar>
            </div>
            <div className="flex mb-6 flex-wrap items-center  justify-center bg-gray-100">
                <div className="container   bg-white  shadow-lg    transform   duration-200 easy-in-out">
                    <div className=" h-80 overflow-hidden" >
                        <img className="w-full" src={background} alt="background" />
                    </div>
                    <div className="flex justify-center px-5  -mt-12">
                        <img
                            className="h-40 w-40 bg-white p-2 rounded-full object-cover"
                            src={urlAvatar}
                            alt="avatar"
                        />
                    </div>
                    <div className=" ">
                        <div className="text-center px-14">
                            <h2 className="text-gray-800 text-3xl font-bold">{userInfo.username}</h2>
                            <a className="text-gray-400 mt-4 hover:text-blue-500" href="" target="BLANK()">@ {userInfo.mail}</a>
                        </div>
                        <hr className="mt-6" />
                        <div className="flex  bg-gray-50 ">
                            <div className="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer">
                                <p><span className="font-semibold"> {followerCount} </span> Followers</p>
                            </div>
                            <div className="border"></div>
                            <div className="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer">
                                <p> <span className="font-semibold"> {followingCount} </span> Following</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div className="w-4/5 mx-auto">
                <div className="bg-white overflow-hidden shadow rounded-lg border">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                            User Profile
                        </h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                            This is some information about the user.
                        </p>
                    </div>
                    <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                        <dl className="sm:divide-y sm:divide-gray-200">
                            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Full name
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {userInfo.lastName} {userInfo.firstName}
                                </dd>
                            </div>
                            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Email address
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {userInfo.mail}
                                </dd>
                            </div>
                            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Phone number
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {userInfo.phoneNumber}
                                </dd>
                            </div>
                            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Address
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {userInfo.address}
                                </dd>
                            </div>
                            <div className="flex justify-between py-3 sm:py-5 sm:grid sm:grid-cols-5 text-center">
                                <div className=" cursor-pointer">
                                    <dt className="text-sm font-medium text-gray-500  cursor-pointer">
                                        menu
                                    </dt>
                                    <dd className="">
                                        {userInfo.address}
                                    </dd>
                                </div>
                                <div className=" cursor-pointer">
                                    <dt className="text-sm font-medium text-gray-500">
                                        All picture
                                    </dt>
                                    <dd className="">
                                        {userInfo.address}
                                    </dd>
                                </div>
                                <div className=" cursor-pointer">
                                    <dt className="text-sm font-medium text-gray-500">
                                        All posts
                                    </dt>
                                    <dd className="">
                                        {userInfo.address}
                                    </dd>
                                </div>
                                <div className=" cursor-pointer">
                                    <dt className="text-sm font-medium text-gray-500">
                                        updateProfile
                                    </dt>
                                    <dd className="">
                                        {userInfo.address}
                                    </dd>
                                </div>
                                <div className=" cursor-pointer">
                                    <dt className="text-sm font-medium text-gray-500">
                                        SignOut
                                    </dt>
                                    <dd className="">
                                        {userInfo.address}
                                    </dd>
                                </div>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>


            <div className="mx-auto bg-gray-100">
                <div class="gap-5 w-4/5 mx-auto flex flex-col md:flex-row">
                    <div class="mt-8 justify-center w-[30%] mx-auto hidden lg:block">
                        <div>
                            <LeftSideProfilePic></LeftSideProfilePic>
                        </div>
                        <div>
                            <Follows></Follows>
                        </div>
                    </div>
                    <div class="w-full lg:w-[70%] mx-auto justify-center mt-8 md:pl-0 md:pr-8">
                        <PostCard></PostCard>
                        <PostCard></PostCard>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;