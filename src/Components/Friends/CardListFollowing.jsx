import React, { useState, useEffect } from "react";
import axios from "axios";
import CardFriend from "../Main/CardFriend";

const CardListFollowing = () => {
    const [followingList, setFollowingList] = useState([]);

    useEffect(() => {
        const fetchFollowingList = async () => {
            try {
                const accessToken = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8080/follows/ListUsers/following', {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                setFollowingList(response.data);
            } catch (error) {
                console.error('Error fetching following list:', error);
            }
        };
        fetchFollowingList();
    }, []);

    const handleUnfollow = async (userId) => {
        try {
            const accessToken = localStorage.getItem('token');
            console.log('accessToken:', accessToken);
            if (!accessToken) {
                console.error('Access token is missing.');
                return;
            }

            console.log('userId:', userId);
            if (!userId) {
                console.error('User ID is missing.');
                return;
            }

            // Tiếp tục gửi yêu cầu unfollow với token và userId đã được xác thực
            await axios.delete(`http://localhost:8080/follows/unfollow/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            // Sau khi unfollow thành công, cập nhật lại danh sách người theo dõi
            const updatedList = followingList.filter(follower => follower.id !== userId);
            setFollowingList(updatedList);
        } catch (error) {
            console.error('Error unfollowing user:', error);
        }
    };


    return (
        <div className="container mx-auto px-4 h-auto grid">
            <div className="grid gap-4 grid-cols-4 justify-center">
                {followingList.map((follower) => (
                    <CardFriend
                        key={follower.id}
                        name={follower.username}
                        img={follower.avatar ? follower.avatar : "bg-gray-400"}
                        unfollow={() => handleUnfollow(follower.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default CardListFollowing;
