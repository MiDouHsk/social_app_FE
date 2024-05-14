import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Reset from "./Reset";
import Profile from "./Profile";
import Friends from "./Friends";
import VideoShow from "./VideoShow";
import Picture from "./Picture";
import UserProfile from './UserProfile';
import Favorites from "../Main/MainFavories";

const Pages = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAuthChecked, setIsAuthChecked] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
        setIsAuthChecked(true);
    }, []);

    if (!isAuthChecked) {
        return null;
    }

    return (
        <Routes>
            {isLoggedIn && <Route path="/" element={<Navigate to="/home" replace />} />}
            {!isLoggedIn && <Route path="*" element={<Navigate to="/login" replace />} />}
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset" element={<Reset />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/friend" element={<Friends />} />
            <Route path="/video" element={<VideoShow />} />
            <Route path="/picture" element={<Picture />} />
            <Route path="/friendProfile/:id" element={<UserProfile />} />
        </Routes>
    );
};

export default Pages;
