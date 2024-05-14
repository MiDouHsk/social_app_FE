import React, { useState, useEffect } from "react";
import axios from "axios";
import CardFollowing from "./CardFollowing";
import { avatarBaseUrl, Url } from '../service/constants';

const CardListFollower = () => {
    const [followingList, setFollowingList] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const pageSize = 9;

    useEffect(() => {
        const fetchFollowingList = async () => {
            try {
                const accessToken = localStorage.getItem('token');
                const response = await axios.get(`${Url}follow/ListUsers/following?page=${currentPage}&pageSize=${pageSize}&sortName=createAt&sortType=DESC`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                const { content, totalPages } = response.data;
                setFollowingList(content);
                setTotalPages(totalPages);
            } catch (error) {
                console.error('Error fetching following list:', error);
            }
        };
        fetchFollowingList();
    }, [currentPage]); // currentPage cần được đưa vào mảng dependency của useEffect để useEffect được gọi lại khi currentPage thay đổi

    const handleUnfollow = async (followingUserId) => {
        try {
            const accessToken = localStorage.getItem('token');
            await axios.delete(`${Url}follow/user/unfollow/${followingUserId}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            const updatedList = followingList.filter(user => user.id !== followingUserId);
            setFollowingList(updatedList);
        } catch (error) {
            console.error('Error unfollowing user:', error);
        }
    };

    const getAvatarUrl = (following) => {
        if (following.avatar && following.avatar) {
            return following.avatar.startsWith("http") ? following.avatar : `${avatarBaseUrl}${following.avatar}`;
        }
        return '';
    };

    const handleNextPage = () => {
        if (!isLastPage) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (!isFirstPage) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };


    const isFirstPage = currentPage === 0;
    const isLastPage = currentPage === totalPages - 1;

    return (
        <div className="container mx-auto px-4 h-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 justify-center my-12">
                {followingList.map((following) => (
                    <CardFollowing
                        key={following.id}
                        name={following.username}
                        img={getAvatarUrl(following)}
                        onUnfollow={handleUnfollow}
                        id={following.id}
                        username={following.firstName}
                        address={following.address}
                    />
                ))}
            </div>
            <div className="flex justify-center my-4">
                <button
                    onClick={handlePrevPage}
                    disabled={isFirstPage}
                    className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded mr-2"
                >
                    Previous Page
                </button>
                <span className="text-lg font-medium">
                    {currentPage + 1} / {totalPages}
                </span>
                <button
                    onClick={handleNextPage}
                    disabled={isLastPage}
                    className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded ml-2"
                >
                    Next Page
                </button>
            </div>
        </div>
    );
};


export default CardListFollower;

