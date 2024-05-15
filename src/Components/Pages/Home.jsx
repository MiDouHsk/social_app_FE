import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import LeftSide from "../LeftSidebar/LeftSide";
import RightSide from "../RightSidebar/RightSide";
import CardSelection from "../Main/CardSelection";
import Main from "../Main/Main";
import Notification from "../Notification/Notification";
import RightSideSearch from '../RightSidebar/RightSideSearch';
import NavRepo from "../Navbar/NavRepo";
import NavLogo from '../Navbar/NavLogo';

const Home = () => {
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1024);

    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth > 1024);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="w-full bg-gray-100">
            {isLargeScreen ? (
                <div className="fixed top-0 z-10 w-full bg-white">
                    <Navbar />
                </div>
            ) : (
                <div className="fixed bottom-0 z-10 w-full bg-white h-16 shadow-lg">
                    <NavRepo />
                </div>
            )}

            {!isLargeScreen && (
                <div className="fixed top-0 z-10 w-full bg-white shadow-lg flex justify-between items-center">
                    <NavLogo />
                    <RightSideSearch />
                </div>
            )}

            <div className="flex bg-gray-100">
                <div className="flex-auto w-[25%] fixed hidden lg:block top-14">
                    <LeftSide />
                </div>
                <div className="flex-auto w-full absolute lg:w-[50%] lg:ml-[25%] lg:mt-14 bg-gray-100 rounded-xl">
                    <div className="w-[80%] mx-auto py-16">
                        {/* <CardSelection /> */}
                        <Main />
                    </div>
                </div>
                <div className="flex-auto w-[25%] fixed lg:w-[25%] lg:block hidden right-0 top-16 bg-gray-100 mr-5 overflow-y-auto max-h-[calc(100vh - 4rem)]">
                    <div>
                        <RightSideSearch />
                    </div>
                    <div className="top-8">
                        <RightSide />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
