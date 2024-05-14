import React from "react";
import { cardData } from "../../assets/cardData";
import Card from "./Card";

const CardSelection = () => {
    return (
        <div>
            <div className="relative">
                <div className="grid grid-cols-5 gap-2 pt-2 mb-10 mx-1 rounded-lg">
                    {cardData.map((card) => {
                        return (
                            <div key={card.id}>
                                <Card
                                    id={card.id}
                                    name={card.name}
                                    img={card.image}
                                // status={card.status}
                                ></Card>
                            </div>
                        );
                    })}
                </div>
                <button className="absolute top-1/2 transform -translate-y-1/2 translate-x-1/2 right-0 shadow-md md:block md:w-12 lg:w-16 md:h-12 lg:h-16 rounded-full focus:outline-none bg-white">
                    <svg className="w-12 mx-1" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#b0b0b0" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round"><path d="M5 12h13M12 5l7 7-7 7" /></svg>
                </button>
            </div>
        </div>
    );

};

export default CardSelection;