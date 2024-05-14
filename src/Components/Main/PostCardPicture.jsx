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
            const response = await axios.get(`${Url}comments/post/${postId}?page=0&pageSize=4&sortName=createAt&sortType=DESC`, {
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
        <div className="flex flex-wrap -mx-4">
            {posts && posts.length > 0 && posts.map(post =>
                post.medias.some(media => {
                    const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.webp', '.PNG', '.JPG', '.JPEG', '.GIF', '.BMP', '.WEBP'];
                    const mediaExtension = media.publicUrl.substr(media.publicUrl.lastIndexOf('.')).toLowerCase();
                    return imageExtensions.includes(mediaExtension);
                }) && (
                    <div key={post.id} className="w-full max-w-md relative">
                        <div class="bg-gray-100 p-1">
                            <div class="bg-white ">
                                <Link to={`/friendProfile/${post.userId.id}`} className="cursor-pointer" onClick={() => handleUsernameClick(post.userId.id)}>
                                    <div class="flex items-center px-4 py-3">
                                        {post.userId && typeof post.userId === 'object' && post.userId.avatar !== null ? (
                                            <img
                                                className="h-8 w-8 rounded-full"
                                                src={`${avatarBaseUrl}${post.userId.avatar}`}
                                                alt="avatar"
                                            />
                                        ) : (
                                            <div className="w-12 h-12 object-cover rounded-full bg-gray-300"></div>
                                        )}
                                        <div class="ml-3 ">
                                            <span class="text-sm font-semibold antialiased block leading-tight">
                                                {post.userId && post.userId.mail ? post.userId.mail : "Unknown email"}
                                            </span>
                                            <span class="text-gray-600 text-xs block">
                                                {post.userId && post.userId.address ? post.userId.address : "Unknown address"}
                                            </span>
                                            <span class="text-gray-600 text-xs block">{formatDistanceToNow(new Date(post.createAt), { addSuffix: true })}</span>

                                        </div>
                                    </div>
                                </Link>
                                <div className="relative">
                                    <div className="post-media-grid">
                                        {post.medias.map((media) => (
                                            <img
                                                src={`${avatarBaseUrl}${media.publicUrl}`}
                                                alt="img"
                                                className="w-full max-h-[400px] min-h-[400px] object-contain"
                                            />
                                        ))}
                                        <div className="absolute inset-0 grid grid-rows-4">
                                            <div className="row-span-1 flex items-center justify-center" />
                                            <div className="row-span-1 flex items-center justify-center" />
                                            <div className="row-span-1 flex items-center justify-center" />
                                            <div className="row-span-1 px-4 py-2 bg-black bg-opacity-50 text-white hover:hidden transition-opacity duration-300 hover:bg-opacity-0">
                                                <p className="text-xs ">{post.body}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mx-4 mt-3 mb-2">
                                    <div className="flex gap-5">
                                        <div className="cursor-pointer" onClick={handleLikePost}>
                                            <svg fill="#262626" height="24" viewBox="0 0 48 48" width="24">
                                                <path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>

                                            </svg>
                                        </div>
                                        <div className="cursor-pointer" onClick={() => handleOpenCommentsModal(post)}>
                                            <svg fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path clip-rule="evenodd" d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z" fill-rule="evenodd"></path> </svg>
                                        </div>
                                        <div className="cursor-pointer" onClick={() => handleSharePost(post.id)}>
                                            <svg fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path>

                                            </svg>
                                        </div>
                                    </div>
                                    <div className="flex cursor-pointer" onClick={() => handleSavePost(post.id)}>
                                        <div>
                                            <svg fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path d="M43.5 48c-.4 0-.8-.2-1.1-.4L24 29 5.6 47.6c-.4.4-1.1.6-1.6.3-.6-.2-1-.8-1-1.4v-45C3 .7 3.7 0 4.5 0h39c.8 0 1.5.7 1.5 1.5v45c0 .6-.4 1.2-.9 1.4-.2.1-.4.1-.6.1zM24 26c.8 0 1.6.3 2.2.9l15.8 16V3H6v39.9l15.8-16c.6-.6 1.4-.9 2.2-.9z"></path></svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="font-semibold text-sm mx-4 mt-2 mb-4"

                                    >{post.totalLike} like</div>
                                    <div className="font-semibold text-sm mx-4 mt-2 mb-4">{post.totalComment} comments</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            {showCommentsModal && selectedPost && (
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
                                                <button className="hover:underline" onClick={handleLikeComment}>Like</button>
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
