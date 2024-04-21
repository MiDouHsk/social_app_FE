import React, { useState } from "react";
import { Link } from "react-router-dom";
import Following from "./Following";
import Follower from "./Follower";

const Follows = () => {
    const [currentTab, setCurrentTab] = useState("Following");

    const handleTabChange = (tab) => {
        setCurrentTab(tab);
    };

    return (
        <div className="flex flex-col bg-white shadow-lg border-2 rounded-xl w-full h-96">
            <h1 className="my-6 font-bold mb-4 text-center">Danh sách theo dõi</h1>
            <div className="flex justify-center space-x-4 flex-wrap">
                <button onClick={() => handleTabChange("Following")} className={`px-4 py-2 ${currentTab === "Following" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"} font-semibold rounded hover:bg-blue-600 transition`}>Following</button>
                <button onClick={() => handleTabChange("Follower")} className={`px-4 py-2 ${currentTab === "Follower" ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700"} font-semibold rounded hover:bg-green-600 transition`}>Follower</button>
            </div>
            <div className="h-auto h-36">
                {currentTab === "Following" && <Following />}
                {currentTab === "Follower" && <Follower />}
            </div>
        </div>


    );
};

export default Follows;
