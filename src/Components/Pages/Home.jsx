import React from "react";
import Navbar from "../Navbar/Navbar";
import LeftSide from "../LeftSidebar/LeftSide";
import RightSide from "../RightSidebar/RightSide";
import CardSelection from "../Main/CardSelection";
import Main from "../Main/Main";
import Notification from "../Notification/Notification";

const Home = () => {
    return (
        <div className="w-full">
            <div className="fixed top-0 z-10 w-full bg-white">
                <Navbar></Navbar>
            </div>
            <div className="flex bg-gray-100">
                <div className="flex-auto w-[30%] fixed hidden lg:block top-14">
                    <LeftSide></LeftSide>
                </div>
                <div className="flex-auto w-full lg:w-[70%] lg:ml-[30%] lg:mt-14 bg-gray-100 rounded-xl">
                    <div className="w-[80%] mx-auto py-1">
                        <CardSelection />
                        <Main />
                    </div>
                </div>

            </div>
        </div>


    );
};

export default Home;