import React from "react";
import Navbar from "../Navbar/Navbar";
import LeftSideVideo from "../LeftSidebar/LeftSideVideo";
import PostCard from "../Main/PostCard";

const VideoShow = () => {
	return(
		<div className="w-full">
            <div className="fixed top-0 z-10 w-full bg-white">
                <Navbar></Navbar>
            </div>
            <div className="flex">
                <div className="flex-auto w-[30%] fixed top-16 overflow-y-auto ">
                    <LeftSideVideo></LeftSideVideo>

                </div>
                <div className="flex-auto w-[65%] absolute left-[35%] top-8 rounded-xl">
                    <div className="w-[100%] mx-auto my-8">
                       	<PostCard></PostCard>
                       	<PostCard></PostCard>
                       	<PostCard></PostCard>
                       	<PostCard></PostCard> 
                    </div>
                </div>
            </div>
        </div>
	);
}

export default VideoShow;