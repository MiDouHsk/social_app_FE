import React from "react";
import Navbar from "../Navbar/Navbar";
import LeftSide from "../LeftSidebar/LeftSide";
import RightSide from "../RightSidebar/RightSide";
import CardSelection from "../Main/CardSelection";
import Main from "../Main/Main";
import Notification from "../Notification/Notification";
import RightSideSearch from '../RightSidebar/RightSideSearch';

const Home = () => {
    return (
        <div className="w-full bg-gray-100">
            <div className="fixed top-0 z-10 w-full bg-white">
                <Navbar></Navbar>
            </div>
            <div className="flex bg-gray-100">
                <div className="flex-auto w-[25%] fixed hidden lg:block top-14">
                    <LeftSide></LeftSide>
                </div>
                <div className="flex-auto w-full absolute lg:w-[50%] lg:ml-[25%] lg:mt-14 bg-gray-100 rounded-xl">
                    <div className="w-[80%] mx-auto py-1">
                        {/* <CardSelection /> */}
                        <Main />
                    </div>
                </div>
                <div className="flex-auto w-[25%] fixed lg:w-[25%] lg:block hidden right-0 top-16 bg-gray-100 mr-5">
                    <div>
                        <RightSideSearch></RightSideSearch>
                    </div>
                    <div className="top-8">
                        <RightSide></RightSide>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default Home;