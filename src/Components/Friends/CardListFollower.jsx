import React, { useState, useEffect } from "react";
import axios from "axios";
import CardFollower from "./CardFollower";
import { avatarBaseUrl, Url } from '../service/constants';

const CardListFollower = () => {
    const [followerList, setFollowerList] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const pageSize = 9;

    useEffect(() => {
        fetchFollowerList();
    }, [currentPage]);

    const fetchFollowerList = async () => {
        try {
            const accessToken = localStorage.getItem('token');
            const response = await axios.get(`${Url}follow/ListUsers/follower?page=${currentPage}&pageSize=${pageSize}&sortName=createAt&sortType=DESC`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            const { content, totalPages } = response.data;
            setFollowerList(content);
            setTotalPages(totalPages);
            // console.log(content);
        } catch (error) {
            console.error('Error fetching follower list:', error);
        }
    };


    const getAvatarUrl = (follower) => {
        if (follower.avatar && follower.avatar) {
            return follower.avatar.startsWith("http") ? follower.avatar : `${avatarBaseUrl}${follower.avatar}`;
        }
        return '';
    };

    const handleNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(prevPage => prevPage - 1);
    };

    const isFirstPage = currentPage === 0;
    const isLastPage = currentPage === totalPages - 1;

    return (
        <div className="container mx-auto px-4 h-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 justify-center my-12">
                {followerList && followerList.length > 0 && followerList.map((follower) => (
                    <CardFollower
                        key={follower.id}
                        name={follower.username}
                        img={getAvatarUrl(follower)}
                        address={follower.address}
                        id={follower.id}
                        username={follower.firstName}
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
