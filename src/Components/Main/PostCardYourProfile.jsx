import React, { useState, useEffect } from "react";
import axios from "axios";
// import moment from "moment";
import { formatDistanceToNow } from 'date-fns';
import '../../App.css';
import { avatarBaseUrl, Url } from '../service/constants';

const PostCard = ({ reloadPosts, avatar, id }) => {
    const [posts, setPosts] = useState([]);
    const [showCommentsModal, setShowCommentsModal] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [newComment, setNewComment] = useState("");
    const userToken = localStorage.getItem('token');
    const [isMdOrSmaller, setIsMdOrSmaller] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [sharedPosts, setSharedPosts] = useState([]);
    const [deleteSuccess, setDeleteSuccess] = useState(false);

    // ListPosts -------------------------------------------------------------------------------------------

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const accessToken = localStorage.getItem('token');
                const response = await fetch(`${Url}posts/userList?page=0&pageSize=10&sortName=createAt&sortType=DESC`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                const data = await response.json();
                setPosts(data.content);
                // console.log(data);
            } catch (error) {
                // setError(error);
            }
        };

        fetchPosts();
    }, [reloadPosts]);

    const handleOpenCommentsModal = async (post) => {
        setSelectedPost(post);
        setShowCommentsModal(true);
        let comments;
        if (post.postId && post.postId.id) {
            comments = await fetchSharedPostComments(post.postId.id);
        } else {
            comments = await fetchComments(post.id);
        }
        setSelectedPost((prevPost) => ({ ...prevPost, comments: comments.content }));
    };



    const handleCloseCommentsModal = () => {
        setShowCommentsModal(false);
    };

    const handleCommentChange = (event) => {
        const commentContent = event.target.value;
        setNewComment(commentContent);
    };

    // ------------------------------- Delete Posts ---------------------------------------------------------------

    const handleDeletePost = async (postId) => {
        try {
            const userToken = localStorage.getItem('token');
            const response = await axios.delete(`${Url}posts/${postId}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });
            if (response.status === 200) {
                const updatedPosts = posts.filter(post => post.id !== postId);
                setPosts(updatedPosts);
                setDeleteSuccess(true);
                console.log("Bài đăng đã được xóa thành công.");
            } else {
                console.error("Xóa bài đăng không thành công.");
            }
        } catch (error) {
            console.error("Lỗi khi xóa bài đăng:", error);
        }
    };

    const handleDeletePosts = (postId) => {
        if (window.confirm("bạn có thật sự muốn xóa bài đăng này không?")) {
            handleDeletePost(postId);
        }
    };

    // Comments ------------------------------------------------------------------------------------------

    const handleAddComment = async () => {
        if (newComment.trim() !== "") {
            try {
                let postId;
                if (selectedPost.postId && selectedPost.postId.id) {
                    postId = selectedPost.postId.id;
                } else {
                    postId = selectedPost.id;
                }
                const response = await axios.post(`${Url}comments/create`,
                    {
                        postId: postId,
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

    const fetchSharedPostComments = async (postId) => {
        try {
            const response = await axios.get(
                `${Url}comments/post/${postId}?page=0&pageSize=4&sortName=createAt&sortType=DESC`,
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                }
            );
            return response.data;
        } catch (error) {
            console.error("Error fetching comments for shared post:", error);
            return [];
        }
    };

    // -------------------------------------------- deleted comments --------------------------------------------------

    const deleteComment = async (commentId) => {
        try {
            await axios.delete(`${Url}comments/delete/${commentId}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });

            const updatedPost = { ...selectedPost };
            updatedPost.comments = updatedPost.comments.filter(comment => comment.id !== commentId);
            updatedPost.totalComments--;
            setSelectedPost(updatedPost);

            const updatedPosts = posts.map(post => {
                if (post.id === selectedPost.id) {
                    return updatedPost;
                }
                return post;
            });

            setPosts(updatedPosts);
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };

    const handleDeleteComment = (commentId) => {
        if (window.confirm("bạn có thật sự muốn xóa comment này không?")) {
            deleteComment(commentId);
        }
    };

    // -------------------------------------------------------------------------------------------------

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

    // ------------------------------------------------ Share --------------------------------------------------------
    useEffect(() => {
        const fetchSharedPosts = async () => {
            try {
                const response = await axios.get(
                    `${Url}shares/current-user`,
                    {
                        headers: {
                            Authorization: `Bearer ${userToken}`
                        }
                    }
                );
                setSharedPosts(response.data);
            } catch (error) {
                console.error("Error fetching shared posts:", error);
            }
        };

        fetchSharedPosts();
    }, [userToken]);

    const handleDeleteSharedPost = async (postId) => {
        try {
            const response = await axios.delete(`${Url}shares/${postId}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });
            if (response.status === 200) {
                const updatedSharedPosts = sharedPosts.filter(post => post.id !== postId);
                setSharedPosts(updatedSharedPosts);
                setDeleteSuccess(true);
            } else {
                console.error("Xóa bài đăng chia sẻ không thành công.");
            }
        } catch (error) {
            console.error("Lỗi khi xóa bài đăng chia sẻ:", error);
        }
    };



    // --------------------------------------------------------------------------------------------------------

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

    useEffect(() => {
        const timer = setTimeout(() => {
            setDeleteSuccess(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, [deleteSuccess]);

    const combinedPosts = [...posts, ...sharedPosts];

    return (
        <div>
            {deleteSuccess && (
                <div className="bg-green-200 text-green-800 p-2 rounded-md mt-2 md-2">
                    Favorite post deleted successfully.
                </div>
            )}
            {combinedPosts && combinedPosts?.length > 0 && combinedPosts?.map((post, index) => (
                <div key={index} className="mb-4">
                    <div className="flex flex-col py-4 bg-white rounded-xl">
                        <div className="flex justify-start items-center pb-4 pl-4">
                            {post.postId ? (
                                post.postId.userId && post.postId.userId.avatar ? (
                                    <img
                                        className="w-12 h-12 rounded-full object-cover"
                                        src={`${avatarBaseUrl}${post.postId.userId.avatar}`}
                                        alt="avatar"
                                    />
                                ) : (
                                    <div className="w-12 h-12 object-cover rounded-full bg-gray-300"></div>
                                )
                            ) : (
                                post.userId && post.userId.avatar ? (
                                    <img
                                        className="w-12 h-12 rounded-full object-cover"
                                        src={`${avatarBaseUrl}${post.userId.avatar}`}
                                        alt="avatar"
                                    />
                                ) : (
                                    <div className="w-12 h-12 object-cover rounded-full bg-gray-300"></div>
                                ))}
                            <div className="flex flex-col ml-4">
                                <p className="py-2 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none">
                                    {post.postId ? (
                                        post.postId.userId && post.postId.userId.mail ? (
                                            post.postId.userId.mail
                                        ) : (
                                            "Unknown email"
                                        )
                                    ) : (
                                        post.userId && post.userId.mail ? (
                                            post.userId.mail
                                        ) : (
                                            "Unknown email"
                                        )
                                    )}
                                </p>
                                <p className="font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none">
                                    {formatDistanceToNow(new Date(post.createAt), { addSuffix: true })}
                                </p>
                            </div>
                            {post.userId.id === id && (
                                <div className="w-full flex justify-end cursor-pointer mr-10" onClick={() => handleDeletePosts(post.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </div>
                            )}
                        </div>
                        <div className=" h-auto">
                            <p className="ml-4 pb-4 font-roboto font-bold text-sm text-gray-700 no-underline tracking-normal leading-none">
                                {post.title ? post.title : (post.title ? post.postId.title : ' ')}
                            </p>
                            <p className="ml-4 pb-4 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none">
                                {post.body ? post.body : (post.postId ? post.postId.body : 'Unknown body')}
                            </p>
                            <div className="post-media-grid">
                                {post && post.medias && post.medias.length > 0 ? (
                                    post.medias.map((media, index) => (
                                        <div key={index} className={`post-media-item ${media.publicUrl ? (media.publicUrl.endsWith('.mp4') ? 'video' : 'image') : 'unknown'}`}>
                                            {media.publicUrl ? (
                                                media.publicUrl.endsWith('.mp4') ? (
                                                    <video className="w-full h-auto" controls>
                                                        <source src={`${avatarBaseUrl}${media.publicUrl}`} type="video/mp4" />
                                                    </video>
                                                ) : (
                                                    <img className="w-auto h-auto" src={`${avatarBaseUrl}${media.publicUrl}`} alt="postImage" />
                                                )
                                            ) : (
                                                <p>Unknown media</p>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    post && post.postId && post.postId.medias && post.postId.medias.length > 0 && (
                                        post.postId.medias.map((media, index) => (
                                            <div key={index} className={`post-media-item ${media.publicUrl ? (media.publicUrl.endsWith('.mp4') ? 'video' : 'image') : 'unknown'}`}>
                                                {media.publicUrl ? (
                                                    media.publicUrl.endsWith('.mp4') ? (
                                                        <video className="w-full h-auto" controls>
                                                            <source src={`${avatarBaseUrl}${media.publicUrl}`} type="video/mp4" />
                                                        </video>
                                                    ) : (
                                                        <img className="w-auto h-auto" src={`${avatarBaseUrl}${media.publicUrl}`} alt="postImage" />
                                                    )
                                                ) : (
                                                    <p>Unknown media</p>
                                                )}
                                            </div>
                                        ))
                                    )
                                )}
                            </div>
                        </div>
                        {/* Actions */}
                        <div className="flex justify-between items-center px-4 py-2">
                            <div className="flex items-center space-x-4">
                                {/* Your existing code for like, comment, and share */}
                            </div>
                            <div className="flex items-center space-x-4 justify-end">
                                <p className="font-roboto text-sm text-gray-700 no-underline tracking-normal leading-none">
                                    {post.totalLike ? post.totalLike : (post.postId ? post.postId.totalLike : '0 ')} Like
                                </p>
                                <p className="font-roboto text-sm text-gray-700 no-underline tracking-normal leading-none">
                                    {post.totalComment ? post.totalComment : (post.postId ? post.postId.totalComment : '0 ')} Comments
                                </p>
                                <p className="font-roboto text-sm text-gray-700 no-underline tracking-normal leading-none">
                                    {post.totalShare ? post.totalShare : (post.postId ? post.postId.totalShare : '0 ')} Shares
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-around items-center pt-4">
                            {/* Nút "Comments" */}
                            <div className="flex items-center cursor-pointer rounded-lg p-2 hover:bg-gray-100" onClick={() => handleOpenCommentsModal(post)}>
                                <div className="flex items-center cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
                                    </svg>

                                </div>
                            </div>
                            <div className="flex items-center cursor-pointer rounded-lg p-2 hover:bg-gray-100" onClick={() => handleLikeUnlikePost(post.id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 24 24" strokeWidth={1.5}
                                    stroke="currentColor" className="w-6 h-6 mr-4">
                                    <path strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                                </svg>
                            </div>
                            <div className="flex items-center cursor-pointer rounded-lg p-2 hover:bg-gray-100" onClick={() => handleDeleteSharedPost(post.id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            {(showCommentsModal && selectedPost) && (
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
                        {(selectedPost.comments && selectedPost.comments.length > 0) || (selectedPost.postId && selectedPost.postId.comments && selectedPost.postId.comments.length > 0) ? (
                            (selectedPost.comments || selectedPost.postId.comments).map((comment) => (
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
                                                <button className="hover:underline">Like</button>
                                                <button className="hover:underline">Reply</button>
                                            </div>
                                        </div>
                                        <div className="mr-4 flex">
                                            <div className="hover:text-blue-500 text-sm">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
                                                </svg>
                                            </div>
                                            <div onClick={() => handleDeleteComment(comment.id)}
                                                className=" hover:text-red-500 text-sm ml-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                </svg>
                                            </div>
                                        </div>
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
            )}
        </div>
    );

};

export default PostCard;
