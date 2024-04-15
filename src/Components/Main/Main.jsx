import React from "react";
import avatar from '../../assets/imgs/IMG_0482.PNG';
import live from '../../assets/imgs/live.png';
import smile from '../../assets/imgs/smile.png';
import addImage from '../../assets/imgs/add-image.png';

const Main = () => {
    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-col py-2 w-full bg-white rounded-3xl shadow-lg">
                <div className="flex items-center border-b-2 border-gray-300 pb-2 pl-4 w-full">
                    <img className="w-10 h-10 rounded-full"
                        src={avatar}
                        alt="avatar" />
                    <form action="" className="w-full">
                        <div className="flex justify-between items-center">
                            <div className="w-full ml-4">
                                <input
                                    type="text"
                                    name="text"
                                    id=""
                                    placeholder="What on your mine User"
                                    className="outline-none w-full bg-white rounded-md" />
                            </div>
                            <div className="mx-4"> { /* put previewImage */}</div>
                            <div className="mr-4">
                                <button className="font-bold text-blue-600" variant="text" type="submit">
                                    Share
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <span>{/* put progressBar */}</span>
                <div className="flex justify-around items-center pt-4">
                    <div className="flex items-center hover:bg-gray-100 rounded-xl">
                        <label
                            htmlFor="addImage"
                            className="cursor-pointer flex items-center">
                            <img className="h-8 mr-4" src={addImage} alt="addImage" />
                            <input type="file" id="addImage" style={{ display: "none" }} />
                        </label>
                    </div>
                    <div className="flex items-center hover:bg-gray-100 rounded-xl">
                        <img className="h-8 mr-4" src={live} alt="live" />
                        <p className="font-roboto font-medium text-md text-gray-700 no-underline tracking-normal leading-none">
                            Live
                        </p>
                    </div>
                    <div className="flex items-center hover:bg-gray-100 rounded-xl">
                        <img className="h-8 mr-4" src={smile} alt="feeling" />
                        <p className="font-roboto font-medium text-md text-gray-700 no-underline tracking-normal leading-none">
                            Feeling
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col py-4 w-full">{/* posts */}</div>
            <div>
                {/* reference for later */}
            </div>
        </div>
    );
};

export default Main;