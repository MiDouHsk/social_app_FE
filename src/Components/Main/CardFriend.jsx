import React from "react";

const CardFriend = ({ name, img }) => {
    return (
        <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
            <img
                className="h-80 w-60 group-hover:scale-105 transform-gpu transition-all duration-300 ease-in-out object-cover"
                src={img}
                alt={name}
            />
            <div className="absolute text-center bottom-0 left-0 w-full bg-black bg-opacity-50 px-4 py-2 justify-between items-center">
                <p className="text-sm font-medium text-white">{name}</p>
                <div className="justify-center items-center text-center">
                    <button className="mt-4 text-white text-sm font-medium bg-transparent border border-white px-3 py-1 rounded-md hover:bg-white hover:text-gray-600 focus:outline-none transition duration-300">Trang cá nhân</button>
                    <button className="mt-4 text-white text-sm font-medium bg-transparent border border-white px-3 py-1 rounded-md hover:bg-white hover:text-gray-600 focus:outline-none transition duration-300">Hủy kết bạn</button>
                </div>
            </div>
        </div>
    );
};

export default CardFriend;
