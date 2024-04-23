import React, { useState, useEffect } from "react";
import axios from "axios";

import live from '../../assets/imgs/live.png';
import smile from '../../assets/imgs/smile.png';
import addImage from '../../assets/imgs/add-image.png';
import PostCard from "./PostCard";
import Notification from "../Notification/Notification";

const Main = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [status, setStatus] = useState("");
    const [error, setError] = useState("");
    const [postStatus, setPostStatus] = useState("");
    const [userInfo, setUserInfo] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [reloadPosts, setReloadPosts] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [submitClicked, setSubmitClicked] = useState(false);

    useEffect(() => {
        const notificationTimeout = setTimeout(() => {
            setShowNotification(false);
            setSubmitClicked(false);
        }, 5000);

        return () => clearTimeout(notificationTimeout);
    }, [showNotification]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('http://localhost:8080/user/profile', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    setUserInfo(response.data.user);
                })
                .catch(error => {
                    console.error('Error fetching user info:', error);
                });
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitClicked(true);
        const token = localStorage.getItem('token');

        if (!token) {
            console.error('User not logged in. Please log in to post.');
            return;
        }

        try {
            // Create post with image URL
            const postResponse = await axios.post('http://localhost:8080/posts/create', {
                title: title,
                body: body,
                status: status,
                imageUrl: imagePreview
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            // Reset form fields
            setTitle("");
            setBody("");
            setStatus("");
            setImagePreview(null); // Reset trước khi hiển thị hình ảnh

            setPostStatus("Post successfully created!");
            setReloadPosts(prevReloadPosts => !prevReloadPosts);
            setError("");

            // Hiện thông báo
            setShowNotification(true);

            // Tự động ẩn thông báo sau 5 giây
            setTimeout(() => {
                setShowNotification(false);
            }, 5000);
        } catch (error) {
            console.error('Error:', error);
            setError("Failed to create post. Please try again later.");
            setPostStatus("");
        }
    };

    const handleImageChange = async (e) => {
        const selectedImage = e.target.files[0];
        try {
            const formData = new FormData();
            formData.append('file', selectedImage);
            const token = localStorage.getItem('token');

            const response = await axios.post('http://localhost:8080/posts/upload', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            // Get the public URL of the uploaded image
            const imageUrl = response.data.publicUrl;
            setImagePreview(imageUrl); // Lưu trữ URL của ảnh xem trước để hiển thị
        } catch (error) {
            console.error('Error:', error);
            // Handle error
            setError("Failed to upload image. Please try again later.");
        }
    };

    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-col py-2 w-full bg-white rounded-3xl shadow-lg">
                <div className="flex items-center border-b-2 border-gray-300 pb-2 pl-4 w-full">
                    {userInfo && userInfo.avatar ? (
                        <img className="w-10 h-10 rounded-full" src={userInfo.avatar} alt="avatar" />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                    )}
                    <form onSubmit={handleSubmit} className="w-full">
                        <div className="flex justify-between items-center">
                            <div className="w-full ml-4">
                                <input
                                    type="text"
                                    name="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Enter title"
                                    className="outline-none w-full bg-white rounded-md" />
                                <textarea
                                    type="text"
                                    name="text"
                                    value={body}
                                    onChange={(e) => setBody(e.target.value)}
                                    placeholder="What's on your mind, User"
                                    className="outline-none w-full bg-white rounded-md mt-2" />
                            </div>
                            <div className="mx-4">
                                {imagePreview && (
                                    <img className="h-24 object-cover" src={imagePreview} alt="preview" />
                                )}
                            </div>
                            <div className="mr-4">
                                <button className="font-bold text-blue-600" variant="text" type="submit">
                                    Share
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="flex justify-around items-center pt-4">
                    <div className="flex items-center hover:bg-gray-100 rounded-xl">
                        <label htmlFor="addImage" className="cursor-pointer">
                            <img className="h-8" src={addImage} alt="addImage" />
                        </label>
                        <input type="file" id="addImage" style={{ display: "none" }} onChange={handleImageChange} />
                    </div>
                    <div className="flex items-center hover:bg-gray-100 rounded-xl">
                        <img className="h-8 mr-4" src={live} alt="live" />
                        <p className="font-roboto font-medium text-md text-gray-700 no-underline tracking-normal leading-none">
                            Live
                        </p>
                    </div>
                    <div className="flex items-center hover:bg-gray-100 rounded-xl">
                        <img className="h-8 mr-4" src={smile} alt="feeling" />
                        <p className="font-roboto font-medium text-md text-gray-700 no-underline tracking-normal leading-none">
                            Feeling
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col py-4 w-full">{/* Hiển thị danh sách bài viết ở đây */}</div>
            <div>
                <PostCard reloadPosts={reloadPosts} />
            </div>
        </div>
    );
};

export default Main;
