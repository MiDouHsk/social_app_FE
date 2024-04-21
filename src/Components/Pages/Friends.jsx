import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import LeftSideFriend from "../LeftSidebar/LeftSideFriend";
import Footer from "../Footer/Footer";
import CardListFollower from "../Friends/CardListFollower";
import CardListFollowing from "../Friends/CardListFollowing";

const Friends = () => {
    // Sử dụng state để lưu trạng thái hiện tại của chức năng
    const [currentFunction, setCurrentFunction] = useState("following"); // Mặc định là hiển thị chức năng bạn bè

    return (
        <div className="w-full h-screen">
            <div className="fixed top-0 z-10 w-full bg-white">
                <Navbar></Navbar>
            </div>
            <div className="flex bg-gray-900">
                <div className="flex-auto w-[30%] fixed top-14 overflow-y-auto">
                    <LeftSideFriend setCurrentFunction={setCurrentFunction}></LeftSideFriend>
                </div>
                <div className="flex-auto w-[70%] absolute left-[30%] top-14 rounded-xl bg-gray-100">
                    <div className="w-[80%] mx-auto my-8">
                        {/* Render các chức năng tương ứng dựa trên trạng thái hiện tại */}
                        {currentFunction === "following" && <CardListFollowing></CardListFollowing>}
                        {currentFunction === "follower" && <CardListFollower></CardListFollower>}
                    </div>
                    <Footer></Footer>
                </div>
            </div>
        </div>
    );
};

export default Friends;
