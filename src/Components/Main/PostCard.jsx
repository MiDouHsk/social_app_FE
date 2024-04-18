import React from "react";
import avatar from '../../assets/imgs/IMG_0482.PNG';
import like from "../../assets/imgs/like.png";
import comment from "../../assets/imgs/comment.png";
import remove from "../../assets/imgs/delete.png";
import addFriend from "../../assets/imgs/add-friend.png";
import image from "../../assets/imgs/avatar.jpg";

const PostCard = () => {
    return (
        <div className="mb-4">
            <div className="flex flex-col py-4 bg-white rounded-t-3xl">
                <div className="flex justify-start items-center pb-4 pl-4 ">
                    <img
                        className="w-10 h-10 rounded-full"
                        size="sm"
                        variant="circular"
                        src={avatar}
                        alt="avatar"
                    />

                    <div className="flex flex-col ml-4">
                        <p className=" py-2 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none">
                            {/* {username} */}
                            huydung446@gmail.com
                        </p>
                        <p className="font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none">
                            {/* Published: {timestamp} */}
                            10:45 Monday, April 15
                        </p>
                    </div>

                    {/* {user?.uid !== uid && ( */}
                    <div
                        // onClick={addUser}
                        className="w-full flex justify-end cursor-pointer mr-10"
                    >
                        <img
                            className="hover:bg-blue-100 rounded-xl p-2"
                            src={addFriend}
                            alt="addFriend"
                        ></img>
                    </div>
                    {/* )}  */}
                </div>
                <div className="mx-8">
                    <p className="ml-4 pb-4 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none">
                        {/* {text} */}
                    </p>
                    {/* {image && ( */}
                    <img className="h-[500px] w-full rounded-xl" src={image} alt="postImage"></img>
                    {/* )} */}
                </div>
                <div className="flex justify-around items-center pt-4">
                    <button
                        className="flex items-center cursor-pointer rounded-lg p-2 hover:bg-gray-100"
                    // onClick={handleLike}
                    >
                        <img className="h-8 mr-4" src={like} alt=""></img>
                        {/* {state.likes?.length > 0 && state?.likes?.length} */}
                    </button>
                    <div
                        className="flex items-center cursor-pointer rounded-lg p-2 hover:bg-gray-100"
                    // onClick={handleOpen}
                    >
                        <div className="flex items-center cursor-pointer">
                            <img className="h-8 mr-4" src={comment} alt="comment"></img>
                            <p className="font-roboto font-medium text-md text-gray-700 no-underline tracking-normal leading-none">
                                Comments
                            </p>
                        </div>
                    </div>
                    <div
                        className="flex items-center cursor-pointer rounded-lg p-2 hover:bg-gray-100"
                    // onClick={deletePost}
                    >
                        <img className="h-8 mr-4" src={remove} alt="delete"></img>
                        <p className="font-roboto font-medium text-md text-gray-700 no-underline tracking-normal leading-none">
                            Delete
                        </p>
                    </div>
                </div>
            </div>
            {/* {open && <CommentSection postId={id}></CommentSection>} */}
        </div>
    );
};

export default PostCard;