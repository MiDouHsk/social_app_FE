import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import CardListFollower from "../Friends/CardListFollower";
import CardListFollowing from "../Friends/CardListFollowing";
import LeftSide from "../LeftSidebar/LeftSide";

const Friends = () => {
    const [currentFunction, setCurrentFunction] = useState("following");

    const toggleFunction = () => {
        setCurrentFunction(prevFunction => prevFunction === "following" ? "follower" : "following");
    };

    return (
        <div className="w-full h-screen">
            <div className="fixed top-0 z-10 w-full bg-white">
                <Navbar></Navbar>
            </div>
            <div className="flex bg-gray-900">
                <div className="flex-auto w-[25%] fixed hidden lg:block top-14">
                    <LeftSide></LeftSide>
                </div>
                <div className="flex-auto w-full absolute lg:w-[70%] lg:ml-[25%] lg:mt-14 bg-gray-100 rounded-xl">
                    <div className="w-[80%] mx-auto my-8">
                        <div className="flex justify-end mb-4 mr-12">
                            <button onClick={toggleFunction} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ">
                                {currentFunction === "following" ? "Followers" : "Following"}
                            </button>
                        </div>
                        {currentFunction === "following" ? <CardListFollowing /> : <CardListFollower />}
                    </div>
                    <Footer></Footer>
                </div>
            </div>
        </div>
    );
};

export default Friends;
