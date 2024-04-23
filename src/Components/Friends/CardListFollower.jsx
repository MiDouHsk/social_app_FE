import React, { useState, useEffect } from "react";
import axios from "axios";
import CardFriend from "../Main/CardFriend";

const CardListFollower = () => {
    const [followingList, setFollowingList] = useState([]);

    useEffect(() => {
        const fetchFollowingList = async () => {
            try {
                const accessToken = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8080/follow/ListUsers/follower', {
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


    useEffect(() => {
        const unFollow = async () => {
            try {
                const accessToken = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8080/follow//unfollow/{followingUserId}', {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                setFollowingList(response.data);
            } catch (error) {
                console.error('Error fetching following list:', error);
            }
        };
        unFollow();
    }, []);


    return (
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-4 gap-4 justify-center">
                {followingList.map((follower) => (
                    <CardFriend
                        key={follower.id}
                        name={follower.username}
                        img={follower.avatar ? follower.avatar : "bg-gray-400"}
                    />
                ))}
            </div>

        </div>
    );
};

export default CardListFollower;
