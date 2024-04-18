import React from "react";
import CardFriend from "./CardFriend";
import { ListDataFriend } from "../../assets/ListDataFriend";

const CardListFriend = () => {
    return (
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-4 gap-4 justify-center">
                {ListDataFriend.map((card) => (
                    <CardFriend key={card.id} name={card.name} img={card.image} />
                ))}
            </div>
        </div>
    );
};

export default CardListFriend;
