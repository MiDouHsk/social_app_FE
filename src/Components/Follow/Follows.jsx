import React, { useState } from "react";
import Following from "./Following";
import Follower from "./Follower";

const Follows = () => {
    const [currentTab, setCurrentTab] = useState("Following");
    const [isFollowingActive, setIsFollowingActive] = useState(true);

    const handleToggleTab = () => {
        setCurrentTab(currentTab === "Following" ? "Follower" : "Following");
        setIsFollowingActive(!isFollowingActive);
    };

    return (
        <div className="flex flex-col bg-white shadow-lg border-2 rounded-xl w-full h-96">
            <div className="flex justify-center space-x-4 flex-wrap mt-4">
                <button onClick={handleToggleTab} className={`px-4 py-2 ${isFollowingActive ? "bg-blue-500 text-white" : "bg-green-500 text-white"} font-semibold rounded hover:bg-blue-600 hover:text-gray-100 transition`}>{currentTab}</button>
            </div>
            <div className="h-auto overflow-y-auto max-h-80">
                {currentTab === "Following" && <Following />}
                {currentTab === "Follower" && <Follower />}
            </div>
        </div>
    );
};

export default Follows;
