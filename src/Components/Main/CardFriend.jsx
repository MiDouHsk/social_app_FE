import React from "react";

const CardFriend = ({ name, img, userId, unfollow }) => {
    const handleUnfollow = () => {
        // Gọi hàm unfollow và truyền userId
        unfollow(userId);
    };

    return (
        <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
            <img
                className="h-60 w-60 group-hover:scale-105 transform-gpu transition-all duration-300 ease-in-out object-cover"
                src={img}
                alt={name}
            />
            <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-75 px-4 py-2">
                <p className="text-sm font-medium text-white mb-2">{name}</p>
                <div className="inline-block justify-center text-center">
                    <button className="text-white mb-4 text-sm font-medium bg-transparent border border-white px-3 py-1 rounded-md mr-2 hover:bg-white hover:text-gray-600 focus:outline-none transition duration-300">Trang cá nhân</button>
                    <button onClick={handleUnfollow} className="text-white text-sm font-medium bg-transparent border border-white px-3 py-1 rounded-md hover:bg-white hover:text-gray-600 focus:outline-none transition duration-300">Hủy theo dõi</button>
                </div>
            </div>
        </div>
    );
};

export default CardFriend;
