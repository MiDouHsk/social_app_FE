import React from "react";
import background from '../../assets/imgs/IMG_1052.JPG';
import avatar from '../../assets/imgs/IMG_0482.PNG';
import map from '../../assets/imgs/map.png';
import job from '../../assets/imgs/school-bag.png';

const LeftSide = () => {
    return (
        <div className="flex flex-col h-screen bg-white pb-4 border-2 rounded-r-xl shadow-lg">
            <div className="flex flex-col items-center relative">
                {/* Phần tử chứa hình ảnh trên */}
                <div className="relative w-full h-36 rounded-t-xl overflow-hidden">
                    <img className="absolute inset-0 w-full h-full object-cover" src={background} alt="background" />
                    {/* Hiệu ứng overlay */}
                    <div className="absolute inset-0 bg-black opacity-25"></div>
                </div>
                {/* Hình ảnh dưới */}
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                    <img className="h-24 w-24 rounded-full" sizes="md" src={avatar} alt="avatar" />
                    <div className="absolute inset-0 opacity-25"></div>
                </div>
            </div>
            <div className="flex flex-col items-center pt-12">
                <p className="font-roboto font-medium text-md text-gray-700 no-underline tracking-normal leading-none">
                    User email:
                </p>
                <p className="font-roboto font-medium text-xs text-gray-700 no-underline tracking-normal leading-none">
                    huydung446@gmail.com
                </p>
                <p className="font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none py-2">
                    Try premium for free
                </p>
            </div>
            <div className="flex flex-col pl-2 text-gray-700 dark:text-gray-500 bg-gray-100">
                <div className="flex space-x-4 items-center justify-center text-center font-extrabold my-4">
                    <p className="font-roboto text-sm text-gray-500">Following: 100</p>
                    <p className="font-roboto text-sm text-gray-500">Followers: 200</p>
                </div>
                <div className="flex items-center py-2 mx-4">
                    <img className="h-10" src={map} alt="map" />
                    <p className="font-roboto font-bold text-lg no-underline tracking-normal leading-none">
                        DakLak-VietNam
                    </p>
                </div>
                <div className="flex items-center py-2 mx-4">
                    <img className="h-10 " src={job} alt="job" />
                    <p className="font-roboto font-bold text-lg no-underline tracking-normal leading-none">
                        Java Developer
                    </p>
                </div>
            </div>
            <div className="pt-6 cursor-pointer justify-center text-center font-bold text-gray-400 ">
                <div className="mx-4 py-4 block px-4 py-2 hover:translate-y-1 duration-500 ease-in-out hover:text-blue-500">
                    <p className="font-roboto no-underline tracking-normal leading-none">
                        Dashboard
                    </p>
                </div>
                <div className=" mx-4 py-4 block px-4 py-2 hover:translate-y-1 duration-500 ease-in-out hover:text-blue-500">
                    <p className="font-roboto no-underline tracking-normal leading-none">
                        Settings
                    </p>
                </div>
                <div className="mx-4 py-4 block px-4 py-2 hover:translate-y-1 duration-500 ease-in-out hover:text-blue-500">
                    <p className="font-roboto no-underline tracking-normal leading-none">
                        Earnings
                    </p>
                </div>
                <div className="mx-4 py-4  block px-4 py-2 hover:translate-y-1 duration-500 ease-in-out hover:text-blue-500">
                    <p className="font-roboto no-underline tracking-normal leading-none">
                        Sign out
                    </p>
                </div>
            </div>
        </div>

    );
};

export default LeftSide;