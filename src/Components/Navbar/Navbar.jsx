import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import UserLinks from "./UserLinks";
import userService from '../service/userService';

const Navbar = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        gender: false, // Gender is now a boolean
        phoneNumber: '',
        dateOfBirth: '',
        address: '',
        mail: '',
        createAt: '',
    });

    useEffect(() => {
        const fetchUserProfile = async () => {
            const accessToken = localStorage.getItem('token');
            // console.log("Token:", accessToken);

            if (!accessToken) {
                console.error('Access token not found');
                return;
            }

            try {
                const userData = await userService.getUserDetails(accessToken);
                setUserInfo(userData);
            } catch (error) {
                setError(error);
            }
        };

        fetchUserProfile();
    }, []);

    return (
        <div className="flex justify-between items-center border-b border-gray-100 w-full px-8 py-2 cursor-pointer">
            <div className="text-3xl font-extrabold text-gray-900 dark:text-white font-roboto">
                <span className="text-transparent bg-clip-text bg-gradient-to-r to-red-600 from-blue-400">
                    Social Media
                </span>{" "}
            </div>
            <div className="flex justify-center items-center mx-auto">
                <NavLinks />
            </div>
            <div className="flex justify-center items-center">
                {userInfo && userInfo.username && (
                    <UserLinks name={userInfo.username} avatar={userInfo.avatar} id={userInfo.id} />
                )}
            </div>
        </div>
    );
};

export default Navbar;
