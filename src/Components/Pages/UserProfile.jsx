import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import LeftSideProfilePicUser from "../LeftSidebar/LeftSideProfilePicUser";
import defaultBackground from '../../assets/imgs/IMG_1052.JPG';
import PostCardUserProfile from '../Main/PostCardUserProfile';
import { Url, avatarBaseUrl } from '../service/constants';
import { useParams } from "react-router-dom";

const UserProfile = () => {
    const [friendInfo, setFriendInfo] = useState(null);
    const [followerCount, setFollowerCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    const [followerList, setFollowerList] = useState([]);
    const [followingList, setFollowingList] = useState([]);
    const [showFollowerModal, setShowFollowerModal] = useState(false);
    const [showFollowingModal, setShowFollowingModal] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const { id } = useParams();

    // console.log(id);

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

    useEffect(() => {
        const fetchFriendInfo = async () => {
            try {
                const response = await axios.get(`${Url}user/${id}`);
                setFriendInfo(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        const fetchFollowerCount = async () => {
            try {
                const response = await axios.get(`${Url}follow/followerCount/${id}`);
                setFollowerCount(response.data);
            } catch (error) {
                console.error('Error fetching follower count:', error);
            }
        };

        const fetchFollowingCount = async () => {
            try {
                const response = await axios.get(`${Url}follow/followingCount/${id}?page=0&pageSize=1000&sortName=createAt&sortType=DESC`);
                setFollowingCount(response.data);
            } catch (error) {
                console.error('Error fetching following count:', error);
            }
        };

        const fetchListFollowing = async () => {
            try {
                const response = await axios.get(`${Url}follow/ListUsers/following/${id}?page=0&pageSize=1000&sortName=createAt&sortType=DESC`);
                setFollowingList(response.data);
                // console.log(response.data);
            } catch (error) {
                console.error('Error fetching following list:', error);
            }
        };

        const fetchListFollower = async () => {
            try {
                const response = await axios.get(`${Url}follow/ListUsers/follower/${id}`);
                setFollowerList(response.data);
                // console.log(response.data);
            } catch (error) {
                console.error('Error fetching follower list:', error);
            }
        };

        fetchFriendInfo();
        fetchFollowerCount();
        fetchFollowingCount();
        fetchListFollower();
        fetchListFollowing();
    }, [id]);

    const handleFollowerClick = () => {
        setShowFollowerModal(true);
    };

    const handleFollowingClick = () => {
        setShowFollowingModal(true);
    };
    const handleCloseModal = () => {
        setShowFollowingModal(false);
        setShowFollowerModal(false);
    };

    return (
        <div className="w-full bg-gray-100">
            <div className="fixed z-10 w-full bg-white">
                <Navbar />
            </div>
            <div className="flex mb-6 flex-wrap items-center  justify-center bg-gray-100">
                <div className="container   bg-white  shadow-lg    transform   duration-200 easy-in-out">
                    <div className=" h-80 overflow-hidden">
                        <img
                            className="w-full object-cover"
                            src={friendInfo?.background ? `${avatarBaseUrl}${friendInfo.background}` : defaultBackground}
                            alt="background"
                        />
                    </div>
                    <div className="flex justify-center px-5 -mt-12">
                        <img
                            className="h-40 w-40 bg-white p-2 object-cover rounded-full"
                            src={`${avatarBaseUrl}${friendInfo?.avatar}`}
                            alt="avatar"
                        />
                    </div>
                    <div className=" ">
                        <div className="text-center px-14">
                            <h2 className="text-gray-800 text-3xl font-bold">{friendInfo?.username}</h2>
                            <a className="text-gray-400 mt-4 hover:text-blue-500" href="" target="_blank">@ {friendInfo?.mail}</a>
                        </div>
                        <hr className="mt-6" />
                        <div className="flex bg-gray-50">
                            <div className="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer" onClick={handleFollowerClick}>
                                <p><span className="font-semibold">{followerCount}</span> Followers</p>
                            </div>
                            <div className="border"></div>
                            <div className="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer" onClick={handleFollowingClick}>
                                <p><span className="font-semibold">{followingCount}</span> Following</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mx-auto bg-gray-100">
                <div className="gap-5 w-4/5 mx-auto flex flex-col md:flex-row">
                    <div className="mt-8 justify-center w-[40%] mx-auto hidden md:block">
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
                                            {friendInfo?.lastName} {friendInfo?.firstName}
                                        </dd>
                                    </div>
                                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">
                                            Gender
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            {friendInfo?.gender ? "Male" : "Female"}
                                        </dd>
                                    </div>
                                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">
                                            Email address
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            {friendInfo?.mail}
                                        </dd>
                                    </div>
                                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">
                                            Phone number
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            {friendInfo?.phoneNumber}
                                        </dd>
                                    </div>
                                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">
                                            Address
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            {friendInfo?.address}
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                        <div className="mt-8">
                            <LeftSideProfilePicUser userId={id} />

                        </div>
                    </div>
                    <div className="w-full lg:w-[60%] mx-auto justify-center mt-8 md:pl-0 md:pr-8">
                        <div className="justify-center items-center">
                            <PostCardUserProfile userId={id} />
                        </div>
                    </div>
                </div>
            </div>
            {showFollowerModal && (
                <div className="fixed z-10 inset-0 flex items-center justify-center overflow-auto">
                    <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

                    <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 max-h-[50%] overflow-y-auto">
                        <div className="modal-content py-4 text-left px-6">
                            <div className="flex justify-between items-center pb-3">
                                <h2 className="text-sm font-bold">Follower List</h2>
                                <span className="close cursor-pointer font-bold hover:text-red-500" onClick={handleCloseModal}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                </span>
                            </div>
                            <ul>
                                {Array.isArray(followerList) && followerList.map((follower) => (
                                    <li key={follower.id} className="py-3 sm:py-4 border-b border-gray-200">
                                        <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                            <div className="flex-shrink-0">
                                                {follower.avatar ? (
                                                    <img
                                                        className="w-12 h-12 rounded-full object-cover"
                                                        src={`${avatarBaseUrl}${follower.avatar}`}
                                                        alt={follower.avatar}
                                                    />
                                                ) : (
                                                    <div className="w-12 h-12 rounded-full bg-gray-200"></div>
                                                )}
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
                </div>
            )}
            {showFollowingModal && (
                <div className="fixed z-10 inset-0 flex items-center justify-center overflow-auto">
                    <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

                    <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 max-h-[50%] overflow-y-auto">
                        <div className="modal-content py-4 text-left px-6">
                            <div className="flex justify-between items-center pb-3">
                                <h2 className="text-sm font-bold">Following List</h2>
                                <span className="close cursor-pointer font-bold hover:text-red-500" onClick={handleCloseModal}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                </span>
                            </div>
                            <ul>
                                {Array.isArray(followerList) && followingList.map((following) => (
                                    <li key={following.id} className="py-3 sm:py-4 border-b border-gray-200">
                                        <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                            <div className="flex-shrink-0">
                                                {following.avatar ? (
                                                    <img
                                                        className="w-12 h-12 rounded-full object-cover"
                                                        src={`${avatarBaseUrl}${following.avatar}`}
                                                        alt={following.avatar}
                                                    />
                                                ) : (
                                                    <div className="w-12 h-12 rounded-full bg-gray-200"></div>
                                                )}
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
                </div>
            )}

        </div>
    );
};

export default UserProfile;

