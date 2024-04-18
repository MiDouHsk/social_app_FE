import React from "react";
import Home from "./Home";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Reset from "./Reset";
import Profile from "./Profile";
import Friends from "./Friends";

const Pages = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home></Home>}></Route>
                <Route path="/login" element={<Login></Login>}></Route>
                <Route path="/register" element={<Register></Register>}></Route>
                <Route path="/reset" element={<Reset></Reset>}></Route>
                <Route
                    path="/profile"
                    element={<Profile></Profile>}>
                </Route>
                <Route path="/friend" element={<Friends></Friends>}></Route>
            </Routes>
        </div>
    );
};

export default Pages;