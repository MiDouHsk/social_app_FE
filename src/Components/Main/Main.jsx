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
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [reloadPosts, setReloadPosts] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null); // Change from selectedFile to selectedImage

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

    const handleImageChange = (e) => {
        setSelectedImage(e.target.files[0]); // Set selected image when user selects a file
        setImagePreview(URL.createObjectURL(e.target.files[0])); // Set image preview
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            let mediaId = null;

            // gửi yêu cầu lên media
            if (selectedImage) {
                const formData = new FormData();
                formData.append('file', selectedImage);

                const mediaResponse = await axios.post('http://localhost:8080/posts/upload/Media', formData, {
                     headers: {
                          'Content-Type': 'multipart/form-data',
                          'Authorization': `Bearer ${token}`
                      }
                });
                mediaId = mediaResponse.data;
                console.log('File uploaded successfully:', mediaId);
            }

            if (!mediaId) {
                console.error('No media uploaded. Post creation aborted.');
                return;
            }

            // gửi tập tin theo media nếu có
            const postResponse = await axios.post('http://localhost:8080/posts/create', {
                  title: title,
                  body: body,
                  status: status,
                  mediasId: mediaId ? [mediaId] : [] // Truyền mediaId nếu có, nếu không truyền mảng rỗng
             }, {
                  headers: {
                      'Authorization': `Bearer ${token}`
                  }
              });
            console.log(postResponse.data);

            setTitle("");
            setBody("");
            setStatus("");
            setImagePreview(null);
            setReloadPosts(prevReloadPosts => !prevReloadPosts);
            setError("");
            setShowNotification(true);

        } catch (error) {
            console.error('Error creating post:', error);
            setPostStatus("");
        }
    };

    useEffect(() => {
        console.log(selectedImage);
    }, [selectedImage]);

    return (
        <div className="flex flex-col items-center">
            <div className="flex-col py-2 w-full bg-white rounded-3xl shadow-lg">
                <div className="flex items-center pb-2 pl-4 w-full justify-between px-3">
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
                                <textarea
                                    type="text"
                                    name="text"
                                    value={body}
                                    onChange={(e) => setBody(e.target.value)}
                                    placeholder="What's on your mind, User"
                                    className="w-full rounded-xl h-10 bg-gray-200 px-5"
                                />
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
                    {imagePreview && ( // Display image preview if available
                        <div className="flex items-center justify-center w-full h-full">
                            <div className="w-full p-4 flex items-center justify-center">
                                <img src={imagePreview} alt="preview" className="max-w-full max-h-52 object-contain" />
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
            <div className="flex flex-col py-4 w-full">{/* Display list of posts here */}</div>
            <div>
                <PostCard reloadPosts={reloadPosts} />
            </div>
        </div>
    );
};

export default Main;
