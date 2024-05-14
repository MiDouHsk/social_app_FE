import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Url } from '../service/constants';

const CardFriend = ({ name, img, onUnfollow, id, address, username }) => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [friendInfo, setFriendInfo] = useState(null);
    const [followerCount, setFollowerCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    const [postsCount, setPostsCount] = useState(0);

    const handleUnfollowClick = () => {
        setShowConfirmation(true);
    };

    const handleConfirmYes = () => {
        setShowConfirmation(false);
        onUnfollow(id);
    };

    const handleConfirmNo = () => {
        setShowConfirmation(false);
    };

    const handleUsernameClick = async () => {
        try {
            const response = await axios.get(`${Url}user/${id}`);
            setFriendInfo(response.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        const fetchFollowerCount = async () => {
            try {
                const response = await axios.get(`${Url}follow/followerCount/${id}`);
                setFollowerCount(response.data);
            } catch (error) {
                console.error('Error fetching follower count:', error);
            }
        };
        const fetchFollowingCount = async () => {
            try {
                const response = await axios.get(`${Url}follow/followingCount/${id}`);
                setFollowingCount(response.data);
            } catch (error) {
                console.error('Error fetching follower count:', error);
            }
        };
        const fetchPostsCount = async () => {
            try {
                const response = await axios.get(`${Url}posts/userCount/${id}`);
                setPostsCount(response.data);
            } catch (error) {
                console.error('Error fetching follower count:', error);
            }
        };

        fetchPostsCount();
        fetchFollowingCount();
        fetchFollowerCount();
    }, [id]);


    return (
        <div className="relative max-w-md mx-auto md:max-w-2xl min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl mt-16">
            <Link to={`/friendProfile/${id}`} className="px-6 cursor-pointer" onClick={handleUsernameClick}>
                <div className="flex flex-wrap justify-center">
                    <div className="w-full flex justify-center">
                        <div className="relative">
                            {img ? (
                                <img src={img} className="h-36 w-36 object-cover shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]" alt={name} />
                            ) : (
                                <div className="h-36 w-36 flex items-center justify-center bg-gray-300 rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]">
                                    <span className="text-gray-700 font-bold">{username}</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="w-full text-center mt-20">
                        <div className="flex justify-center lg:pt-4 pt-8 pb-0">
                            <div className="p-3 text-center">
                                <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">{postsCount}</span>
                                <span className="text-sm text-slate-400">Posts</span>
                            </div>
                            <div className="p-3 text-center">
                                <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">{followerCount}</span>
                                <span className="text-sm text-slate-400">Followers</span>
                            </div>
                            <div className="p-3 text-center">
                                <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">{followingCount}</span>
                                <span className="text-sm text-slate-400">Following</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-2">
                    <h3 className="text-2xl text-slate-700 font-bold leading-normal mb-1">{name}</h3>
                    <div className="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
                        <i className="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"></i>{address}
                    </div>
                </div>
            </Link>
            <div className="mt-6 py-6 border-t border-slate-200 text-center">
                <div className="flex flex-wrap justify-center">
                    <div className="w-full px-4">
                        <button onClick={handleUnfollowClick} className="font-normal text-slate-700 hover:text-red-700 hover:font-bold">Unfollow Account</button>
                    </div>
                </div>
            </div>
            {showConfirmation && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg shadow-xl">
                        <p className="mb-4 text-lg text-gray-800">Bạn có muốn xóa {name} không?</p>
                        <div className="flex justify-center space-x-4">
                            <button onClick={handleConfirmYes} className="px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600">Yes</button>
                            <button onClick={handleConfirmNo} className="px-4 py-2 bg-gray-400 text-white font-semibold rounded hover:bg-gray-500">No</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CardFriend;
