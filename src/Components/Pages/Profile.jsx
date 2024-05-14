import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import LeftSideProfilePic from "../LeftSidebar/LeftSideProfilePic";
import defaultBackground from '../../assets/imgs/IMG_1052.JPG';
import userService from "../service/userService";
import Follows from "../Follow/Follows";
import MainYourProfile from "../Main/PostCardYourProfile";
import { useNavigate, useParams } from 'react-router-dom';
import { Url, avatarBaseUrl } from '../service/constants';
import MainFavorites from '../Main/MainFavories';
import '../css/videocss.css';

const Profile = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState(null);
    const [followerCount, setFollowerCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [favoritePosts, setFavoritePosts] = useState([]);
    const [showFavorites, setShowFavorites] = useState(false);

    const [formData, setFormData] = useState({
        confirmPassword: '',
        mail: '',
        phoneNumber: '',
        firstName: '',
        lastName: '',
        gender: '',
        dateOfBirth: { day: '', month: '', year: '' }
    });

    const accessToken = localStorage.getItem("token");

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
        const fetchUserProfile = async () => {
            const accessToken = localStorage.getItem('token');

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
    }, [file]);

    useEffect(() => {
        const fetchFollowerCount = async () => {
            try {
                const accessToken = localStorage.getItem('token');
                const response = await axios.get(`${Url}follow/followerCount`, {
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
                const response = await axios.get(`${Url}follow/followingCount`, {
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
            } catch (error) {
                setError(error);
            }
        };

        fetchUserProfile();
    }, [userInfo?.id, userInfo?.username]);
    // console.log("ID from URL:", id);

    const handleFileChange = async (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);

        try {
            setUploading(true);

            const formData = new FormData();
            formData.append("file", selectedFile);

            const accessToken = localStorage.getItem("token");

            await axios.post(`${Url}avatar/upload`, formData, {
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "multipart/form-data"
                }
            });

            const updatedUserData = await userService.getUserDetails(accessToken);
            setUserInfo(updatedUserData);
            // console.log("Upload successful");
        } catch (error) {
            console.error("Error uploading file:", error);
        } finally {
            setUploading(false);
        }
    };

    const handleFileBackgroundChange = async (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);

        try {
            setUploading(true);

            const formData = new FormData();
            formData.append("file", selectedFile);

            const accessToken = localStorage.getItem("token");

            await axios.post(`${Url}background/upload`, formData, {
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "multipart/form-data"
                }
            });

            const updatedUserData = await userService.getUserDetails(accessToken);
            setUserInfo(updatedUserData);
            // console.log("Upload successful");
        } catch (error) {
            console.error("Error uploading file:", error);
        } finally {
            setUploading(false);
        }
    };


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleUpdateProfile = async () => {
        try {
            const username = userInfo?.username;
            if (!accessToken || !username) {
                console.error('Access token or username not found');
                return;
            }

            // Thêm username vào formData
            const updatedFormData = { ...formData, username };

            const response = await axios.put(`${Url}user/update`, updatedFormData, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            if (response.status === 200) {
                setShowSuccessModal(true);
                setUserInfo({ ...userInfo, ...formData });
            } else {
                console.error('Failed to update user profile');
            }
        } catch (error) {
            setError(error.response.data.error);
        }
    };

    // favorites ------------------------------------------------------------------------------------------------------

    useEffect(() => {
        const fetchFavoritePosts = async () => {
            try {
                const response = await axios.get(`${Url}favorites/get`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                setFavoritePosts(response.data.content);
                // console.log(response);
            } catch (error) {
                console.error("Error fetching favorite posts:", error);
            }
        };

        fetchFavoritePosts();
    }, [accessToken]);


    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setShowSuccessModal(false)

    };

    const handleSignOut = () => {
        setShowConfirmation(true);
    };

    const handleConfirmYes = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleConfirmNo = () => {
        setShowConfirmation(false);
    };

    if (error) {
        return <div className="text-red-500">Error: {error.message}</div>;
    }

    if (!userInfo) {
        return <div className="text-gray-500">Loading...</div>;
    }

    const handleClick = () => {
        const backgroundUploadInput = document.getElementById("backgroundUploadInput");
        if (backgroundUploadInput) {
            backgroundUploadInput.click();
        } else {
            console.error("Cannot find backgroundUploadInput element in the DOM");
        }
    };

    const handleShowFavorites = () => {
        setShowFavorites(!showFavorites);
    };


    return (
        <div className="w-full bg-gray-100">
            <div className="fixed z-10 w-full bg-white">
                <Navbar />
            </div>
            <div className="flex mb-6 flex-wrap items-center  justify-center bg-gray-100">
                <div className="container   bg-white  shadow-lg    transform   duration-200 easy-in-out">
                    <div className=" h-80 overflow-hidden">
                        {/* Input file */}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileBackgroundChange}
                            style={{ display: "none" }}
                            id="backgroundUploadInput" // Đổi ID thành backgroundUploadInput
                        />
                        {/* Hiển thị ảnh và trạng thái upload */}
                        <div>
                            {uploading ? (
                                <p>Uploading...</p>
                            ) : (
                                <img
                                    className="w-full object-cover"
                                    src={userInfo.background ? `${avatarBaseUrl}${userInfo.background}` : defaultBackground}
                                    alt="background"
                                    onClick={handleClick}
                                    style={{ cursor: "pointer" }}
                                />
                            )}
                        </div>
                    </div>
                    <div className="flex justify-center px-5 -mt-12">
                        {/* Input file */}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{ display: "none" }}
                            id="avatarUploadInput" // Giữ nguyên ID của avatarUploadInput
                        />
                        {/* Hiển thị ảnh và trạng thái upload */}
                        <div>
                            {uploading ? (
                                <p>Uploading...</p>
                            ) : (
                                <img
                                    className="h-40 w-40 bg-white p-2 object-cover rounded-full"
                                    src={`${avatarBaseUrl}${userInfo.avatar}`}
                                    alt="avatar"
                                    onClick={() => document.getElementById("avatarUploadInput").click()} // Sử dụng avatarUploadInput
                                    style={{ cursor: "pointer" }}
                                />
                            )}
                        </div>
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

            <div className="w-5/6 mx-auto">
                <div className="bg-white overflow-hidden shadow rounded-lg border">
                    <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                        <dl className="sm:divide-y sm:divide-gray-200">
                            <div className="flex justify-between py-3 sm:py-5 sm:grid sm:grid-cols-4 text-center">
                                <div className=" cursor-pointer">
                                    <dt className="text-sm font-medium text-gray-500">
                                        Tất cả ảnh
                                    </dt>
                                    <dd className="">
                                    </dd>
                                </div>
                                <div className=" cursor-pointer" onClick={handleShowFavorites}>
                                    <dt className="text-sm font-medium text-gray-500">
                                        {showFavorites ? "Tất cả bài viết" : "bài viết yêu thích"}
                                    </dt>
                                    <dd className="">
                                    </dd>
                                </div>
                                <div className=" cursor-pointer" onClick={openModal}>
                                    <dt className="text-sm font-medium text-gray-500">
                                        Cập nhập thông tin của bạn
                                    </dt>
                                    <dd className="">
                                    </dd>
                                </div>
                                <div className=" cursor-pointer">
                                    <button className="text-sm font-medium text-gray-500 hover:text-red-700 hover:font-bold" onClick={handleSignOut}>
                                        Đăng xuất
                                    </button>
                                </div>
                                {showModal && (
                                    <div className="fixed inset-0 h-auto flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                                        <div className="bg-white w-[40%] h-auto p-8 rounded-lg shadow-xl">
                                            <p className="text-lg text-gray-800 mb-4 font-semibold">Cập nhập thông tin của bạn</p>
                                            {/* Form cập nhật thông tin người dùng */}
                                            <form className="space-y-4">
                                                <div className="flex flex-col rounded-full  border border-gray-300 px-3 py-2">

                                                    <input
                                                        type="text"
                                                        name="firstName"
                                                        placeholder="First Name"
                                                        value={formData.firstName}
                                                        onChange={handleInputChange}
                                                    // className="input-field"
                                                    />
                                                </div>
                                                <div className="flex flex-col  border border-gray-300 rounded-3xl px-3 py-2">

                                                    <input
                                                        type="text"
                                                        name="lastName"
                                                        placeholder="Last Name"
                                                        value={formData.lastName}
                                                        onChange={handleInputChange}
                                                    // className="input-field"
                                                    />
                                                </div>
                                                <div className="flex flex-col  border border-gray-300 rounded-3xl px-3 py-2">

                                                    <input
                                                        type="email"
                                                        name="mail"
                                                        placeholder="Email"
                                                        value={formData.mail}
                                                        onChange={handleInputChange}
                                                    // className="input-field"
                                                    />
                                                </div>
                                                <div className="flex flex-col  border border-gray-300 rounded-3xl px-3 py-2">

                                                    <input
                                                        type="text"
                                                        name="address"
                                                        placeholder="Address"
                                                        value={formData.address}
                                                        onChange={handleInputChange}
                                                    // className="input-field"
                                                    />
                                                </div>
                                                <div className="flex flex-col  border border-gray-300 rounded-3xl px-3 py-2">
                                                    <input
                                                        type="text"
                                                        name="phoneNumber"
                                                        placeholder="Phone Number"
                                                        value={formData.phoneNumber}
                                                        onChange={handleInputChange}
                                                    // className="input-field"
                                                    />
                                                </div>
                                                <div className="flex flex-col  border border-gray-300 rounded-3xl px-3 py-2">
                                                    <select
                                                        name="gender"
                                                        value={formData.gender.toString()}
                                                        onChange={handleInputChange}
                                                    // className="input-field"
                                                    >
                                                        <option value={true}>Nam</option>
                                                        <option value={false}>Nữ</option>
                                                    </select>
                                                </div>
                                                <div className="flex flex-col  border border-gray-300 rounded-3xl px-3 py-2">
                                                    <input
                                                        type="date"
                                                        name="dateOfBirth"
                                                        placeholder="Date of Birth"
                                                        value={formData.dateOfBirth}
                                                        onChange={handleInputChange}
                                                    // className="input-field"
                                                    />
                                                </div>
                                            </form>
                                            <div className="flex justify-end mt-6">
                                                <button
                                                    onClick={closeModal}
                                                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-4"
                                                >
                                                    Thoát
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={handleUpdateProfile}
                                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                                >
                                                    Cập nhập
                                                </button>
                                            </div>
                                            {showSuccessModal && ( // Hiển thị modal thông báo update thành công nếu showSuccessModal là true
                                                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                                                    <div className="bg-white p-8 rounded-lg shadow-xl">
                                                        <p className="mb-4 text-lg text-gray-800">Profile updated successfully!</p>
                                                        <div className="flex justify-center">
                                                            <button
                                                                onClick={() => closeModal(false)}
                                                                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600">Close</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
            <div className="mx-auto bg-gray-100">
                <div class="gap-5 w-4/5 mx-auto flex flex-col md:flex-row">
                    <div className="mt-8 justify-center w-[40%] mx-auto hidden md:block">

                        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                            <div className="sm:divide-y sm:divide-gray-200 bg-white rounded-xl shadow-lg">
                                <div className="px-4 py-5 sm:px-6">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                                        Thông tin người dùng
                                    </h3>
                                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                        Đây là một số thông tin về người dùng.
                                    </p>
                                </div>
                                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                        Họ và tên
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {userInfo.lastName} {userInfo.firstName}
                                    </dd>
                                </div>
                                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                        Giới tính
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {userInfo.gender ? "Male" : "Female"}
                                    </dd>
                                </div>
                                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                        Địa chỉ email
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {userInfo.mail}
                                    </dd>
                                </div>
                                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                        Số điện thoại
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {userInfo.phoneNumber}
                                    </dd>
                                </div>
                                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                        Địa chỉ
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {userInfo.address}
                                    </dd>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <LeftSideProfilePic></LeftSideProfilePic>
                        </div>

                        <div>
                            <Follows></Follows>
                        </div>
                    </div>
                    <div className="w-full lg:w-[60%] mx-auto justify-center mt-8 md:pl-0 md:pr-8">
                        <div className="justify-center items-center">
                            {showFavorites ? (
                                <MainFavorites avatar={userInfo.avatar} />
                            ) : (
                                <MainYourProfile avatar={userInfo.avatar} />
                            )}

                        </div>
                    </div>
                </div>
            </div>
            {/* Hiển thị form thông báo khi showConfirmation là true */}
            {showConfirmation && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg shadow-xl">
                        <p className="mb-4 text-lg text-gray-800">Bạn có muốn đăng xuất không?</p>
                        <div className="flex justify-center space-x-4">
                            <button onClick={handleConfirmYes} className="px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600">Có</button>
                            <button onClick={handleConfirmNo} className="px-4 py-2 bg-gray-400 text-white font-semibold rounded hover:bg-gray-500">Không</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
