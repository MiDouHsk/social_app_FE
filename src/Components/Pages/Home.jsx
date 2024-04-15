import React from "react";
import Navbar from "../Navbar/Navbar";
import LeftSide from "../LeftSidebar/LeftSide";
import RightSide from "../RightSidebar/RightSide";
import CardSelection from "../Main/CardSelection";
import Main from "../Main/Main";
import PostCard from "../Main/PostCard";

const Home = () => {
    return (
        <div className="w-full">
            <div className="fixed top-0 z-10 w-full bg-white">
                <Navbar></Navbar>
            </div>
            <div className="flex bg-gray-900">
                <div className="flex-auto w-[20%] fixed top-14">
                    <LeftSide></LeftSide>
                </div>
                <div className="flex-auto w-[60%] absolute left-[20%] top-14 bg-gray-100 rounded-xl">
                    <div className="w-[80%] mx-auto">
                        <CardSelection></CardSelection>
                        <Main></Main>
                        <PostCard></PostCard>
                    </div>
                </div>
                <div className="flex-auto w-[20%] fixed right-0 top-14">
                    <RightSide></RightSide>
                </div>
            </div>
        </div>
    );
};

export default Home;