import React, { useState, useEffect } from "react";
import axios from 'axios';
import moment from "moment";
import like from "../../assets/imgs/like.png";
import comment from "../../assets/imgs/comment.png";
import remove from "../../assets/imgs/delete.png";

const PostCard = () => {
    const [posts, setPosts] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        gender: false, // Gender is now a boolean
        phoneNumber: '',
        dateOfBirth: '',
        address: '',
        mail: '',
        createAt: '',
    });

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch("http://localhost:8080/posts/allList?page=0&pageSize=10&sortName=createAt&sortType=DESC");
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                setError(error);
            }
        };

        fetchPosts(0, 5);
    }, []);

    return (
        <div>
            {posts.map(post => (
                <div key={post.id} className="mb-4">
                    <div className="flex flex-col py-4 bg-white rounded-3xl">
                        <div className="flex justify-start items-center pb-4 pl-4 ">
                            {post.userId && post.userId.avatar !== null ? (
                                <img
                                    className="w-10 h-10 rounded-full"
                                    src={post.userId.avatar}
                                    alt="avatar"
                                />
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                            )}

                            <div className="flex flex-col ml-4">
                                <p className="py-2 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none">
                                    {post.userId && post.userId.mail ? post.userId.mail : "Unknown email"}
                                </p>
                                <p className="font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none">
                                    {moment(post.createAt).format('DD/MM/YYYY')}
                                </p>
                            </div>

                            <div className="w-full flex justify-end cursor-pointer mr-10">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    fill="none" viewBox="0 0 24 24"
                                    strokeWidth={1.5} stroke="currentColor" className="h-10 w-10 hover:bg-blue-100 rounded-xl p-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                                </svg>

                            </div>
                        </div>
                        <div className="mx-8">
                            <p className="ml-4 pb-4 font-roboto font-bold text-sm text-gray-700 no-underline tracking-normal leading-none">
                                {post.title}
                            </p>
                            <p className="ml-4 pb-4 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none">
                                {post.body}
                            </p>
                            {post.image && ( // Kiểm tra xem trường dữ liệu ảnh có giá trị không
                                <img className="h-[500px] w-full rounded-xl" src={post.image} alt="postImage" />
                            )}
                        </div>
                        <div className="flex justify-around items-center pt-4">
                            <button className="flex items-center cursor-pointer rounded-lg p-2 hover:bg-gray-100">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                                </svg>

                            </button>
                            <div className="flex items-center cursor-pointer rounded-lg p-2 hover:bg-gray-100">
                                <div className="flex items-center cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
                                    </svg>
                                    <p className="font-roboto font-medium text-md text-gray-700 no-underline tracking-normal leading-none">
                                        Comments
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center cursor-pointer rounded-lg p-2 hover:bg-gray-100">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                                </svg>
                                <p className="font-roboto font-medium text-md text-gray-700 no-underline tracking-normal leading-none">
                                    Delete
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PostCard;
