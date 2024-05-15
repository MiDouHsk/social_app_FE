import React, { useState, useEffect } from "react";
import axios from "axios";
import { Url, avatarBaseUrl } from '../service/constants';
import { Link } from 'react-router-dom';

const RightSide = () => {
    const [followingList, setFollowingList] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [page, setPage] = useState(0);

    useEffect(() => {
        fetchFollowingList();
    }, [page]);

    const fetchFollowingList = async () => {
        try {
            const accessToken = localStorage.getItem('token');
            const response = await axios.get(`${Url}follow/ListUsers/notFollowing?page=${page}&pageSize=7&sortName=createAt&sortType=DESC`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            setFollowingList(response.data);
        } catch (error) {
            console.error('Error fetching following list:', error);
        }
    };

    const searchUser = async (query) => {
        try {
            const response = await axios.get(`${Url}user/search?fullName=${query}`);
            setSearchResult(response.data);
            setShowModal(true);
            console.log(response);
        } catch (error) {
            console.error('Error searching users:', error);
        }
    };

    const handleChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchClick = () => {
        setShowModal(true); // Hiển thị modal khi thanh tìm kiếm được nhấn
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        searchUser(searchQuery);
    };

    const handleUsernameClick = (userId) => {
        // console.log(`Clicked user with ID: ${userId}`);
    };

    const handleClearSearch = () => {
        setSearchResult([]);
    };

    return (
        <div className="flex flex-col bg-white rounded-t-lg w-full overflow-y-auto h-auto">
            <div className="mx-2 my-2">
                <form className="pt-2 relative mx-auto text-gray-600 flex items-center" onSubmit={handleSubmit}>
                    <input className="flex-grow border-2 border-gray-300 bg-white h-10 px-5 pr-10 rounded-lg text-sm focus:outline-none"
                        type="search" name="search" placeholder="Search" value={searchQuery} onChange={handleChange} />
                    <button type="submit" className="absolute right-0 top-0 mt-4 mr-4" onClick={handleSearchClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </button>
                </form>
            </div>
            {searchResult.length > 0 && (
                <div className="mx-5 my-2">
                    <button onClick={handleClearSearch} className="text-blue-600 font-sm mb-2">Xóa kết quả tìm kiếm</button>
                    <ul className="mt-2">
                        {searchResult.map(user => (
                            <li key={user.id}>
                                <Link to={`/friendProfile/${user.id}`} onClick={() => handleUsernameClick(user.id)}>
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 flex-shrink-0">
                                            {user.avatar ? (
                                                <img className="w-8 h-8 rounded-full object-cover" src={`${avatarBaseUrl}${user.avatar}`} alt={user.avatar} />
                                            ) : (
                                                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                        <div className="ml-2">
                                            <p className="text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</p>
                                            <p className="text-sm text-gray-500">{user.mail}</p>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default RightSide;
