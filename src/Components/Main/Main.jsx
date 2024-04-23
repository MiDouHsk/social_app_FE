import React, { useState } from "react";
import axios from "axios";

import live from '../../assets/imgs/live.png';
import smile from '../../assets/imgs/smile.png';
import addImage from '../../assets/imgs/add-image.png';
import PostCard from "./PostCard";

const Main = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [status, setStatus] = useState("");
    const [error, setError] = useState("");
    const [postStatus, setPostStatus] = useState("");
    const [userInfo, setUserInfo] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
           const response = await axios.post('http://localhost:8080/posts/create', {
               title: title,
               body: body,
               status: status
           });

           setUserInfo(response);

            // Reset form fields
            setTitle("");
            setBody("");
            setStatus("");
            setError("");

            setPostStatus("Post successfully created!");
            setError("");

        } catch (error) {
            console.error('Error:', error);
            // Xử lý lỗi
            setError("Failed to create post. Please try again later.");
            setPostStatus("");
        }
    };

    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-col py-2 w-full bg-white rounded-3xl shadow-lg">
                <div className="flex items-center border-b-2 border-gray-300 pb-2 pl-4 w-full">
                    <img className="w-10 h-10 rounded-full"
//                         src={userInfo.avatar}
                        alt="avatar" />
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
                                <input
                                    type="text"
                                    name="text"
                                    value={body}
                                    onChange={(e) => setBody(e.target.value)}
                                    placeholder="What's on your mind, User"
                                    className="outline-none w-full bg-white rounded-md mt-2" />
                            </div>
                            <div className="mx-4"> { /* put previewImage */}</div>
                            <div className="mr-4">
                                <button className="font-bold text-blue-600" variant="text" type="submit">
                                    Share
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <span>{/* put progressBar */}</span>
                <div className="flex justify-around items-center pt-4">
                    <div className="flex items-center hover:bg-gray-100 rounded-xl">
                        <label
                            htmlFor="addImage"
                            className="cursor-pointer flex items-center">
                            <img className="h-8 mr-4" src={addImage} alt="addImage" />
                            <input type="file" id="addImage" style={{ display: "none" }} />
                        </label>
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
            <div className="flex flex-col py-4 w-full">{/* posts */}</div>
            <div>
                {/* Truyền thông tin người tạo bài post xuống PostCard component */}
                <PostCard ></PostCard>
            </div>
        </div>
    );
};

export default Main;
