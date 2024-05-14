import React, { useState, useEffect } from "react";
import axios from "axios";
// import moment from "moment";
import { formatDistanceToNow } from 'date-fns';
import '../../App.css';
import { avatarBaseUrl, Url } from '../service/constants';
import { Link } from 'react-router-dom';

const PostCard = ({ reloadPosts, avatar }) => {
    const [posts, setPosts] = useState([]);
    const [avatarUrl, setAvatarUrl] = useState(' ');
    const [showCommentsModal, setShowCommentsModal] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [newComment, setNewComment] = useState([]);
    const userToken = localStorage.getItem('token');
    const [isMdOrSmaller, setIsMdOrSmaller] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [favoritePosts, setFavoritePosts] = useState([]);

    // ListPosts -------------------------------------------------------------------------------------------

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`${Url}posts/allList?page=0&pageSize=10&sortName=createAt&sortType=DESC`);
                const data = await response.json();
                setPosts(data.content);
                data.forEach(post => {
                    if (post.userId && post.userId.avatar) {
                        setAvatarUrl(post.userId.avatar.startsWith("http") ? post.userId.avatar : `${avatarBaseUrl}${post.userId.avatar}`);
                    }
                });
            } catch (error) {
                // setError(error);
            }
        };

        fetchPosts();
    }, [reloadPosts]);
    // console.log(posts);

    const handleOpenCommentsModal = async (post) => {
        setSelectedPost(post);
        setShowCommentsModal(true);
        const comments = await fetchComments(post.id);
        setSelectedPost((prevPost) => ({ ...prevPost, comments: comments.content }));
        setSelectedPost((prevPost) => ({ ...prevPost, totalComment: comments.content.length }));
    };

    const handleCloseCommentsModal = () => {
        setShowCommentsModal(false);
    };

    const handleCommentChange = (event) => {
        const commentContent = event.target.value;
        setNewComment(commentContent);
    };

    // Comments ------------------------------------------------------------------------------------------

    const handleAddComment = async () => {
        if (newComment.trim() !== "") {
            try {
                const response = await axios.post(`${Url}comments/create`,
                    {
                        postId: selectedPost.id,
                        content: newComment,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${userToken}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                const newCommentObj = response.data;
                const updatedPost = { ...selectedPost };

                updatedPost.comments.push(newCommentObj);
                const updatedPosts = posts.map(post => {
                    if (post.id === selectedPost.id) {
                        return {
                            ...post,
                            totalComment: post.totalComment + 1
                        };
                    }
                    return post;
                });
                setPosts(updatedPosts);
                setNewComment("");
            } catch (error) {
                console.error("Error adding comment:", error);
            }
        }
    };

    const fetchComments = async (postId) => {
        try {
            const response = await axios.get(`${Url}comments/post/${postId}?page=0&pageSize=10000&sortName=createAt&sortType=DESC`, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });
            const comments = response.data;
            // console.log(comments);
            return comments;
        } catch (error) {
            console.error("Error fetching comments:", error);
            return [];
        }
    };

    // favorites ------------------------------------------------------------------------------------------------------

    useEffect(() => {
        const fetchFavoritePosts = async () => {
            try {
                const response = await axios.get(`${Url}favorites/get`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                });
                setFavoritePosts(response.data.content);
                // console.log(response);
            } catch (error) {
                console.error("Error fetching favorite posts:", error);
            }
        };

        fetchFavoritePosts();
    }, [userToken]);

    const isPostFavorite = (postId) => {
        return favoritePosts.some((post) => post.id === postId);
    };

    const handleSavePost = async (postId) => {
        try {
            const response = await axios.post(`${Url}favorites/${postId}`, null, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });
            // successfully
            // console.log("Post saved successfully:", response.data);
            setFavoritePosts([...favoritePosts, { id: postId }]);
        } catch (error) {
            console.error("Error saving post:", error);
        }
    };

    // ------------------------------------ SharePost ----------------------------------------------------

    const handleSharePost = async (postId) => {
        try {
            const response = await axios.post(`${Url}shares/post/${postId}`, null, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });

            const updatedPosts = posts.map(post => {
                if (post.id === postId) {
                    return {
                        ...post,
                        totalShare: post.totalShare + 1
                    };
                }
                return post;
            });

            setPosts(updatedPosts);

            console.log("Bài viết đã được chia sẻ thành công:", response.data);
        } catch (error) {
            console.error("Lỗi khi chia sẻ bài viết:", error);
        }
    };

    // ------------------------------------------------- like ------------------------------------------------
    const [likedPosts, setLikedPosts] = useState({});

    useEffect(() => {
        const likedPostsFromCookie = JSON.parse(localStorage.getItem('likedPosts')) || {};
        setLikedPosts(likedPostsFromCookie);
    }, []);

    const handleLike = async (objectId, objectType) => {
        try {
            const response = await axios.post(
                `${Url}reactions/${objectType}/${objectId}?type=LIKE`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("Like action successful:", response.data);

            const updatedData = posts.map(data => {
                if (data.id === objectId) {
                    return {
                        ...data,
                        totalLike: data.totalLike + 1
                    };
                }
                return data;
            });
            setPosts(updatedData);
        } catch (error) {
            console.error("Error when liking:", error);
        }
    };

    useEffect(() => {
        const likedPostsFromCookie = JSON.parse(localStorage.getItem('likedPosts')) || {};
        setLikedPosts(likedPostsFromCookie);
    }, []);
    useEffect(() => {
        localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
    }, [likedPosts]);

    const handleUnlikePost = async (postId) => {
        try {
            const response = await axios.delete(`${Url}reactions/${postId}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });

            console.log("Unlike action successful:", response.data);

            const updatedData = posts.map(data => {
                if (data.id === postId) {
                    return {
                        ...data,
                        totalLike: data.totalLike - 1
                    };
                }
                return data;
            });
            setPosts(updatedData);
        } catch (error) {
            console.error("Error when unliking:", error);
        }
    };


    const handleLikePost = (postId) => {
        handleLike(postId, "Posts");
    };

    const handleLikeComment = (commentId) => {
        handleLike(commentId, "Comments");
    };

    const handleLikeUnlikePost = async (postId) => {
        try {
            if (likedPosts[postId]) {
                await handleUnlikePost(postId);
                setLikedPosts(prevLikedPosts => ({ ...prevLikedPosts, [postId]: false }));
            } else {
                await handleLikePost(postId);
                setLikedPosts(prevLikedPosts => ({ ...prevLikedPosts, [postId]: true }));
            }

            localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
        } catch (error) {
            console.error("Error when liking/unliking post:", error);
        }
    };

    useEffect(() => {
        const likedPostsFromCookie = JSON.parse(localStorage.getItem('likedPosts')) || {};
        setLikedPosts(likedPostsFromCookie);
    }, []);



    // --------------------------------------------------------------------------------------------------

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        const handleMediaChange = (e) => {
            setIsMdOrSmaller(e.matches);
        };

        mediaQuery.addListener(handleMediaChange);

        setIsMdOrSmaller(mediaQuery.matches);

        return () => {
            mediaQuery.removeListener(handleMediaChange);
        };
    }, []);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleUpdate = () => {
    };

    const handleDelete = () => {
    };
    const handleUsernameClick = (userId) => {
        console.log(`Clicked user with ID: ${userId}`);
    };

    return (
        <div>
            {posts && posts.length > 0 && posts.map(post => (
                <div key={post.id} className="mb-4">
                    <div className="flex flex-col py-4 bg-white rounded-xl">
                        <div className="flex">
                            <Link to={`/friendProfile/${post.userId.id}`} className="cursor-pointer" onClick={() => handleUsernameClick(post.userId.id)}>
                                <div className="flex justify-start items-center pb-4 pl-4">
                                    {post.userId && typeof post.userId === 'object' && post.userId.avatar !== null ? (
                                        <img
                                            className="w-12 h-12 rounded-full object-cover"
                                            src={`${avatarBaseUrl}${post.userId.avatar}`}
                                            alt="avatar"
                                        />

                                    ) : (
                                        <div className="w-12 h-12 object-cover rounded-full bg-gray-300"></div>
                                    )}
                                    <div className="flex flex-col ml-4">
                                        <p className="py-2 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none">
                                            {post.userId && post.userId.mail ? post.userId.mail : "Unknown email"}
                                        </p>
                                        <p className="text-gray-700 text-xs no-underline tracking-normal leading-none">
                                            {formatDistanceToNow(new Date(post.createAt), { addSuffix: true })}
                                        </p>
                                    </div>


                                </div>
                            </Link>
                            <div className="w-full flex justify-end cursor-pointer mr-10">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    fill="none" viewBox="0 0 24 24"
                                    strokeWidth={1.5} stroke="currentColor" className="h-10 w-10 hover:bg-blue-100 rounded-xl p-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                                </svg>
                            </div>
                        </div>
                        <div className=" h-auto">
                            <p className="ml-4 pb-4 font-roboto font-bold text-sm text-gray-700 no-underline tracking-normal leading-none">
                                {post.title}
                            </p>
                            <p className="ml-4 pb-4 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none">
                                {post.body}
                            </p>
                            <div className="post-media-grid">
                                {post.medias.map((media, index) => (
                                    <div key={index} className={`post-media-item ${media.publicUrl.endsWith('.mp4') ? 'video' : 'image'}`}>
                                        {media.publicUrl.endsWith('.mp4') ? (
                                            <video className="w-full h-auto" controls>
                                                <source src={`${avatarBaseUrl}${media.publicUrl}`} type="video/mp4" />
                                            </video>
                                        ) : (
                                            <img className="w-auto h-auto" src={`${avatarBaseUrl}${media.publicUrl}`} alt="postImage" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-around items-center pt-4">
                            {/* Nút "Comments" */}
                            <div className="flex items-center cursor-pointer rounded-lg p-2 hover:bg-gray-100" onClick={() => handleOpenCommentsModal(post)}>
                                <div className="flex items-center cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
                                    </svg>
                                    <p className="font-roboto  text-md text-gray-700 no-underline tracking-normal leading-none">
                                        {post.totalComment} Comments
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center cursor-pointer rounded-lg p-2 hover:bg-gray-100" onClick={() => handleLikeUnlikePost(post.id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke={likedPosts[post.id] ? "red" : "currentColor"} // Thay đổi màu sắc thành đỏ nếu bài viết đã được like
                                    className="w-6 h-6 mr-4">
                                    <path strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                                </svg>
                                <p className="font-roboto text-md text-gray-700 no-underline tracking-normal leading-none">
                                    {post.totalLike} Like
                                </p>
                            </div>

                            <button
                                className="flex items-center cursor-pointer rounded-lg p-2 hover:bg-gray-100"
                                onClick={() => handleSharePost(post.id)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                                </svg>
                                <p className="font-roboto  text-md text-gray-700 no-underline tracking-normal leading-none">
                                    {post.totalShare} Share
                                </p>
                            </button>
                            <div className="flex items-center cursor-pointer rounded-lg p-2 hover:bg-gray-100" onClick={() => handleSavePost(post.id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                                    className="w-6 h-6 mr-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                                </svg>
                                <p className="font-roboto  text-md text-gray-700 no-underline tracking-normal leading-none">
                                    Saved
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ))
            }
            {
                showCommentsModal && selectedPost && (
                    <div className={`fixed inset-0 ${showCommentsModal ? 'flex' : 'hidden'} ${isMdOrSmaller ? 'md:flex' : ''} items-center justify-center bg-black bg-opacity-50 z-20`}>
                        <div className={`bg-white p-4 rounded-lg ${isMdOrSmaller ? 'w-full h-full' : 'w-[42%]'} relative max-h-[80%] overflow-y-auto`}>
                            <div className="mb-12">
                                <div className="justify-between">
                                    <div className="flex items-center">
                                        <p className="font-bold text-xl mr-8 relative">Comments</p>
                                        <div className="absolute top-16 left-0 w-full h-1 bg-gray-300" />
                                    </div>
                                    <button className="absolute top-4 right-4 text-black px-4 py-2 rounded-xl z-30 bg-transparent hover:bg-red-600 hover:text-white transition-colors duration-300" onClick={handleCloseCommentsModal}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            {selectedPost.comments && selectedPost.comments.length > 0 ? (
                                selectedPost.comments.map((comment) => (
                                    <div key={comment.id} className="mb-4 bg-gray-100 rounded-xl">
                                        <div className="flex items-center space-x-4">
                                            {/* Avatar */}
                                            <div className="flex-shrink-0">
                                                <img src={`${avatarBaseUrl}${comment.createBy.avatar}`}
                                                    className="w-12 h-12 ml-2 rounded-full object-cover" alt="Avatar" />
                                            </div>
                                            <div className="flex flex-col flex-1 p-1">
                                                {/* Name */}
                                                <div className="text-sm font-semibold text-gray-700">
                                                    {comment.createBy.firstName} {comment.createBy.lastName}
                                                </div>
                                                {/* Content */}
                                                <div className="text-sm text-gray-800">
                                                    {comment.content}
                                                </div>
                                                {/* Like, Reply, Time */}
                                                <div className="flex items-center text-xs text-gray-500 space-x-4 mt-1">
                                                    <span className="hover:underline cursor-pointer">{formatDistanceToNow(new Date(comment.createAt), { addSuffix: true })}</span>
                                                    <button className="hover:underline" onClick={() => handleLikeComment(comment.id)}>{comment.totalLike} Like</button>
                                                    <button className="hover:underline">Reply</button>
                                                </div>
                                            </div>
                                            <div className="mr-2" onClick={openModal}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-4 cursor-pointer">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                                                </svg>
                                            </div>
                                            {showModal && (
                                                <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
                                                    <div className="bg-white rounded-lg p-8">
                                                        <div className="flex justify-between">
                                                            <h2 className="text-lg font-bold mb-4">Options</h2>
                                                            <div className="cursor-pointer" onClick={closeModal}>X</div>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4">Update</button>
                                                            <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded-md">Delete</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center font-bold text-gray-500">No comments yet.</p>
                            )}
                            <div className="mt-4 flex justify-center items-center">
                                <div className="bg-blue-600 h-12 w-12 rounded-full mr-2 flex justify-center items-center">
                                    <img src={`${avatarBaseUrl}${avatar}`} className="w-10 h-10 rounded-full object-cover" alt="Avatar" />
                                </div>
                                <div className="flex-grow items-center border border-gray-300 rounded-3xl px-3 py-2">
                                    <input
                                        type="text"
                                        placeholder="Write your comment..."
                                        className="w-full px-2 py-1 focus:outline-none"
                                        onChange={handleCommentChange}
                                        value={newComment}
                                    />
                                </div>
                                <button
                                    className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-tl-xl rounded-br-xl ml-2"
                                    onClick={handleAddComment}
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );

};

export default PostCard;
