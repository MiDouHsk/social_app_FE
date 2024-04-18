import React from "react";
import Navbar from "../Navbar/Navbar";
import background from '../../assets/imgs/IMG_1052.JPG';
import avatar from '../../assets/imgs/IMG_0482.PNG';
import PostCard from "../Main/PostCard";
import LeftSideProfile from "../LeftSidebar/LeftSideProfile";
import LeftSideProfileFriend from "../LeftSidebar/LeftSideProfileFriend";
import LeftSideProfilePic from "../LeftSidebar/LeftSideProfilePic";

const FriendProfile = () => {

    return (
        <div className="w-full ">
            <div className="fixed top-0 z-10 w-full bg-white">
                <Navbar></Navbar>
            </div>
            <div class="flex mb-28 bg-white">
                <div class="flex-auto w-4/5 mx-auto relative">
                    <div className="flex flex-col items-center relative bg-white">
                        <div className="relative w-[80%] h-96 overflow-hidden rounded-xl">
                            <img className="absolute inset-0 w-full h-full object-cover" src={background} alt="background" />
                            <div className="absolute inset-0 bg-black opacity-25"></div>
                        </div>
                        <div class="absolute bottom-1 left-[20%] transform -translate-x-1/2 translate-y-1/2">
                            <div class="h-36 w-36 rounded-full bg-white flex items-center justify-center">
                                <img class="h-32 w-32 rounded-full"
                                    sizes="md"
                                    src={avatar}
                                    alt="avatar" />
                            </div>
                            <p class="mt-2 text-lg font-semibold text-gray-900 text-center justify-center items-center">midouHsk</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="w-4/5 mx-auto bg-gray-100">
                <div class=" gap-5 flex">
                    <div class="w-[40%] mt-8">
                        <div>
                            <LeftSideProfile></LeftSideProfile>
                        </div>
                        <div>
                            <LeftSideProfilePic></LeftSideProfilePic>
                        </div>
                        <div>
                            <LeftSideProfileFriend></LeftSideProfileFriend>
                        </div>
                    </div>
                    <div class="w-[60%] mx-auto justify-center mt-8">
                        <PostCard></PostCard>
                        <PostCard></PostCard>
                        <PostCard></PostCard>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default FriendProfile;