import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Reset from "./Reset";
import Profile from "./Profile";
import Friends from "./Friends";
import VideoShow from "./VideoShow";
import Picture from "./Picture";
import PostForm from './PostForm';

const Pages = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            setIsLoggedIn(true);
        }
//         else {
//             setIsLoggedIn(false);
//             navigate("/login");
//         }
    }, [navigate]);

    return (
        <div>
            <Routes>
                {isLoggedIn && (
                    <>
                        <Route path="/home" element={<Home />} />
                        <Route path="/form" element={<PostForm />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/friend" element={<Friends />} />
                        <Route path="/video" element={<VideoShow />} />
                        <Route path="/picture" element={<Picture />} />
                    </>
                )}
                <Route path="/reset" element={<Reset />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </div>
    );
};

export default Pages;
