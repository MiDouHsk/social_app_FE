import React, { useState, useEffect } from "react";
import axios from "axios";
import live from '../../assets/imgs/live.png';
import smile from '../../assets/imgs/smile.png';
import addImage from '../../assets/imgs/add-image.png';
import PostCard from "./PostCard";
import { avatarBaseUrl, Url } from '../service/constants';


const Main = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [status, setStatus] = useState("");
    const [userInfo, setUserInfo] = useState({});
    const [reloadPosts, setReloadPosts] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [videoPreview, setVideoPreview] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [showModal, setShowModal] = useState(false);

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

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
        const extension = file.name.split('.').pop().toLowerCase();

        if (['png', 'jpg', 'jpeg'].includes(extension)) {
            setImagePreview(URL.createObjectURL(file));
            setVideoPreview(null);
        } else if (extension === 'mp4') {
            setVideoPreview(URL.createObjectURL(file));
            setImagePreview(null);
        } else {
            console.error("Only images (PNG, JPG) and videos (MP4) are supported.");
            setSelectedImage(null);
            setImagePreview(null);
            setVideoPreview(null);
        }
    };


    const handleImageRemove = () => {
        setSelectedImage(null);
        setImagePreview(null);
        setVideoPreview(null);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            let mediaId = null;
            if (selectedImage) {
                const formData = new FormData();
                formData.append('filePath', selectedImage);

                const mediaResponse = await axios.post(`${Url}posts/upload`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    }
                });
                mediaId = mediaResponse.data;
            }

            const postMediaId = mediaId ? [mediaId] : [];

            const postResponse = await axios.post(`${Url}posts/create`, {
                title: title,
                body: body,
                status: status,
                mediasId: postMediaId
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            setTitle("");
            setBody("");
            setStatus("");
            setImagePreview(null);
            setReloadPosts(prevReloadPosts => !prevReloadPosts);
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    useEffect(() => {
        console.log(selectedImage);
    }, [selectedImage]);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className="flex flex-col items-center">
            <div className="flex-col py-2 w-full bg-white rounded-xl">
                <div className="flex items-center pb-2 pl-4 w-full justify-between px-3">
                    {userInfo && userInfo.avatar && (
                        <img
                            className="h-12 w-12 rounded-full object-cover"
                            src={`${avatarBaseUrl}${userInfo.avatar}`}
                            alt="avatar"
                        />
                    )}
                    <form className="w-full" onClick={openModal}>
                        <div className="flex justify-between items-center">
                            <div className="w-full ml-4 mr-4">
                                <input
                                    type="text"
                                    name="text"
                                    value={body}
                                    onChange={(e) => setStatus(e.target.value)}
                                    placeholder="What's on your mind, User"
                                    onClick={openModal}
                                    className="w-full rounded-xl h-10 bg-gray-200 px-5"
                                />
                            </div>
                        </div>
                    </form>
                </div>
                <div className="flex justify-around items-center pt-4">
                    <div className="flex items-center hover:bg-gray-100 rounded-xl">
                        <label htmlFor="addImage" className="cursor-pointer">
                            <img className="h-8" onClick={openModal} src={addImage} alt="addImage" />
                        </label>
                    </div>
                    <div className="flex items-center hover:bg-gray-100 rounded-xl">
                        {/* <img className="h-8 mr-4" src={live} alt="live" />
                        <p className="font-roboto font-medium text-md text-gray-700 no-underline tracking-normal leading-none">
                            Live
                        </p> */}
                    </div>
                    <div className="flex items-center hover:bg-gray-100 rounded-xl">
                        {/* <img className="h-8 mr-4" src={smile} alt="feeling" />
                        <p className="font-roboto font-medium text-md text-gray-700 no-underline tracking-normal leading-none">
                            Feeling
                        </p> */}
                    </div>
                </div>
            </div>
            {showModal && (
                <div id="crud-modal" tabIndex="-1" aria-hidden="true" className="fixed inset-0 overflow-y-auto z-50">
                    <div className="flex items-center min-h-screen">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                        <div style={{ marginLeft: '30%', width: '40%' }} className="absolute mx-auto p-6 bg-white rounded-lg shadow-md z-50">
                            <form onSubmit={handleSubmit}>
                                <div className='flex justify-between'>
                                    <div className='flex'>
                                        <img style={{ marginRight: '1rem' }} src={`${avatarBaseUrl}${userInfo.avatar}`} alt="User Avatar" className="rounded-full object-cover w-10 h-10" />
                                        <div>
                                            <h1 className="text-sm font-medium">{`${userInfo.firstName} ${userInfo.lastName}`}</h1>
                                            <div className="mb-4">
                                                <select
                                                    id="status"
                                                    value={status}
                                                    onChange={(e) => setStatus(e.target.value)}
                                                    required
                                                    style={{ fontSize: 'small', padding: '1px', paddingLeft: '2px', width: '70px' }}
                                                    className="block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                                                    <option value="public">Public</option>
                                                    <option value="private">Private</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        className="w-4 h-4"
                                        viewBox="0 0 384 512"
                                        onClick={closeModal}>
                                        <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                                    </svg>
                                </div>
                                <div className="mb-4">
                                    <textarea
                                        id="body"
                                        value={body}
                                        onChange={(e) => setBody(e.target.value)}
                                        required
                                        className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                    ></textarea>
                                </div>
                                <button type="submit" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-20 py-3 text-center me-2 mb-2 w-full ">
                                    Created post
                                </button>
                            </form>
                            <div className="relative">
                                {imagePreview && imagePreview.endsWith('.mp4') ? (
                                    <div className="flex items-center justify-center w-full h-full">
                                        <div className="w-full p-4">
                                            <video controls className="max-w-full max-h-52">
                                                <source src={imagePreview} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={handleImageRemove}
                                            className="absolute top-0 right-0 text-blue-500 font-semibold hover:text-blue-700 focus:outline-none z-10"
                                        >
                                            Remove Video
                                        </button>
                                    </div>
                                ) : imagePreview ? (
                                    <div className="flex items-center justify-center w-full h-full">
                                        <div className="w-full p-4 flex items-center justify-center">
                                            <img src={imagePreview} alt="preview" className="max-w-full max-h-52 object-contain" />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={handleImageRemove}
                                            className="absolute top-0 right-0 text-blue-500 font-semibold hover:text-blue-700 focus:outline-none z-10"
                                        >
                                            Remove Image
                                        </button>
                                    </div>
                                ) : videoPreview ? (
                                    <div className="flex items-center justify-center w-full h-full">
                                        <div className="w-full p-4">
                                            <video controls className="max-w-full max-h-52">
                                                <source src={videoPreview} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={handleImageRemove}
                                            className="absolute top-0 right-0 text-blue-500 font-semibold hover:text-blue-700 focus:outline-none z-10"
                                        >
                                            Remove Video
                                        </button>
                                    </div>
                                ) : null}
                            </div>

                            <div className="flex justify-around items-center pt-4">
                                <div className="flex items-center hover:bg-gray-100 rounded-xl">
                                    <label htmlFor="addImage" className="cursor-pointer">
                                        <img className="h-8" src={addImage} alt="addImage" />
                                    </label>
                                    <input type="file" id="addImage" style={{ display: "none" }} onChange={handleImageChange} />
                                </div>
                                <div className="flex items-center hover:bg-gray-100 rounded-xl">
                                    {/* <img className="h-8 mr-4" src={live} alt="live" />
                                    <p className="font-roboto font-medium text-md text-gray-700 no-underline tracking-normal leading-none">
                                        Live
                                    </p> */}
                                </div>
                                <div className="flex items-center hover:bg-gray-100 rounded-xl">
                                    {/* <img className="h-8 mr-4" src={smile} alt="feeling" />
                                    <p className="font-roboto font-medium text-md text-gray-700 no-underline tracking-normal leading-none">
                                        Feeling
                                    </p> */}
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            )}
            <div className="flex flex-col py-4 w-full">
                <PostCard reloadPosts={reloadPosts} avatar={userInfo.avatar} />
            </div>
        </div>
    );
};

export default Main;
