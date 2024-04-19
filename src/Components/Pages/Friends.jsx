import React from "react";
import Navbar from "../Navbar/Navbar";
import LeftSideFriend from "../LeftSidebar/LeftSideFriend";
import CardListFriend from "../Main/CardListFriend";
import Footer from "../Footer/Footer";

const Friends = () => {
    return (
        <div className="w-full">
            <div className="fixed top-0 z-10 w-full bg-white">
                <Navbar></Navbar>
            </div>
            <div className="flex bg-gray-900">
                <div className="flex-auto w-[30%] fixed top-14 overflow-y-auto">
                    <LeftSideFriend></LeftSideFriend>

                </div>
                <div className="flex-auto w-[70%] absolute left-[30%] top-14 rounded-xl bg-gray-100">
                    <div className="w-[80%] mx-auto my-8">
                        <CardListFriend></CardListFriend>
                    </div>
                    <Footer></Footer>
                </div>
            </div>
        </div>
    );
};

export default Friends;