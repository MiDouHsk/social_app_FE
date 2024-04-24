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
    const [selectedFile, setSelectedFile] = useState("");
    const [mediaIds, setMediaIds] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const response = await axios.get('http://localhost:8080/user/profile', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setUserInfo(response.data);
                }
            } catch (error) {
                setError(error.response.data);
            }
        };

        fetchData();
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
            let mediaId = null;
            const selectedFile = e.target.files && e.target.files.length > 0 ? e.target.files[0] : null;
            if (selectedFile) {
                mediaId = await handleImageChange();
            }


            // Create post with image URL
            const postResponse = await axios.post('http://localhost:8080/posts/create', {
                title: title,
                body: body,
                status: status,
                mediasId: mediaId ? [mediaId] : null
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(postResponse.data);

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

            const response = await axios.post('http://localhost:8080/posts/upload/Media', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            setSelectedFile(response.data);
            const mediaId = response.data;
            console.log('File uploaded successfully:', mediaId);

            setMediaIds([...mediaIds, mediaId]);

            return mediaId;
        } catch (error) {
            console.error('Error uploading file:', error);
            setError("Failed to upload image. Please try again later.");
        }
    };


    useEffect(() => {
        console.log(selectedFile);
    }, [selectedFile]);

    return (
        <div className="flex flex-col items-center">
            <div className=" flex-col py-2 w-full bg-white rounded-3xl shadow-lg">
                <div className="flex items-center  pb-2 pl-4 w-full justify-between px-3">
                    {userInfo && userInfo.avatar && (
                        <img
                            className="h-12 w-12 rounded-full object-cover"
                            src={`http://localhost:9000/${userInfo.avatar}`}
                            alt="avatar"
                        />
                    )}
                    <form onSubmit={handleSubmit} className="w-full">
                        <div className="flex justify-between items-center">
                            <div className="w-full ml-4 mr-4">
                                {/*
                                <input
                                    type="text"
                                    name="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Enter title"
                                    className="outline-none w-full bg-white rounded-md" />
                                */}
                                <textarea
                                    type="text"
                                    name="text"
                                    value={body}
                                    onChange={(e) => setBody(e.target.value)}
                                    placeholder="What's on your mind, User"
                                    className="w-full rounded-xl h-10 bg-gray-200 px-5" />
                            </div>
                            
                            <div className="mr-4">
                                <button className="font-bold text-blue-600" variant="text" type="submit">
                                    Share
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div>
                    {/*{postResponse.data && postResponse.data.medias && (
                        <div className="flex items-center justify-center w-full h-full">
                            <div className="w-full p-4 flex items-center justify-center">
                                {postResponse.data.medias.map(media => (
                                    <img key={media.publicUrl} className="w-auto h-52 object-cover" src={media.publicUrl} alt="preview" />
                                ))}
                            </div>
                        </div>
                    )}*/}
                </div>
                <div>
                    {selectedFile && ( // Hiển thị URL của hình ảnh nếu có
                        <div className="flex items-center justify-center w-full h-full">
                            <div className="w-full p-4 flex items-center justify-center">
                                <p>{selectedFile}</p>
                            </div>
                        </div>
                    )}
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
