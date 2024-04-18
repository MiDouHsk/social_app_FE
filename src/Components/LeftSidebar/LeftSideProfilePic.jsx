import React from "react";
import { ListPic } from "../../assets/ListPic";

const LeftSideProfilePic = () => {
    return (
        <div class="flex flex-col bg-white pb-4 border-2 rounded-r-xl shadow-lg mb-4">
            <div class="flex flex-col font-bold items-center pt-10 mb-10">
                <p class="font-roboto font-medium text-md no-underline tracking-normal leading-none">
                    Picture:
                </p>
            </div>
            <div className="flex flex-col mx-1 ">
                <div div className="grid grid-cols-3 gap-2" >
                    {
                        ListPic.map((card) => {
                            return (
                                <div key={card.id}>
                                    <img
                                        src={card.image}
                                        alt={`Picture ${card.id}`}
                                        className="w-28 h-28 object-cover"
                                    />
                                </div>
                            );
                        })
                    }
                </div >
            </div >
        </div >
    );
};

export default LeftSideProfilePic;
