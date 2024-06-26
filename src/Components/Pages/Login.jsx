import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Url } from '../service/constants';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${Url}user/auth/login`, null, {
                params: {
                    username: username,
                    password: password
                }
            });

            const token = response.data["token: "];
            // console.log("Token:", token);

            localStorage.setItem("token", token);

            navigate('/home');

        } catch (error) {
            // console.error('Error:', error);
            let errorMessage = "không tìm thấy thông tin tài khoản hoặc mật khẩu.";

            if (error.response) {
                if (error.response.status === 401) {
                    errorMessage = error.response.data;
                } else if (error.response.status === 404) {
                    errorMessage = error.response.data;
                } else if (error.response.status === 500) {
                    errorMessage = "Internal Server Error: Please try again later";
                }
            } else if (error.request) {
                errorMessage = "Network error: Please check your internet connection";
            }

            setError(errorMessage);
        }

    };


    return (
        <div class="container mx-auto">
            <div class="flex justify-center px-6 my-12">
                <div class="w-full xl:w-3/4 lg:w-11/12 flex">
                    <img
                        src="https://source.unsplash.com/K4mSJ7kc0As/600x800"
                        class="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
                        alt=""
                    ></img>

                    <div class="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
                        <h3 class="pt-4 text-2xl text-center">Welcome Back!</h3>
                        <form onSubmit={handleSubmit} class="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                            <div class="mb-4">
                                <label class="block mb-2 text-sm font-bold text-gray-700" for="username">
                                    Username
                                </label>
                                <input
                                    class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="username"
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                            <div class="mb-4">
                                <label class="block mb-2 text-sm font-bold text-gray-700" for="password">
                                    Password
                                </label>
                                <input
                                    class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <div class="mb-4">
                                <input class="mr-2 leading-tight" type="checkbox" id="checkbox_id" />
                                <label class="text-sm" for="checkbox_id">
                                    Remember Me
                                </label>
                            </div>
                            <div class="mb-6 text-center">
                                <button
                                    class="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                                    type="submit"
                                >
                                    Sign In
                                </button>
                            </div>
                            {error && <p class="text-red-500 text-center">{error}</p>}
                            <hr class="mb-6 border-t" />
                            <div class="text-center">
                                <a
                                    class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                                    href="/register"
                                >
                                    Create an Account!
                                </a>
                            </div>
                            <div class="text-center">
                                <a
                                    class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                                    href="/reset"
                                >
                                    Forgot Password?
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
