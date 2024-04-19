import React, { useState } from "react";
import axios from "axios";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/user/login', null, {
                params: {
                    username: username,
                    password: password
                }
            });
            
            // Lấy token từ phản hồi
            const token = response.data["token: "];
            console.log("Token:", token);

            
            // Lưu trữ token vào Local Storage hoặc Redux Store
            localStorage.setItem("token", token);
            window.location.href = '/home';
        } catch (error) {
            console.error('Error:', error);
            // Xử lý lỗi
            if (error.response) {
                if (error.response.status === 401) {
                     setError(error.response.data);
                } else if (error.response.status === 404) {
                     setError(error.response.data);
                } else {
                    setError("An unexpected error occurred. Please try again later");
                }
            } else if (error.request) {
                setError("Network error: Please check your internet connection");
            } else {
                setError("An unexpected error occurred. Please try again later");
            }
        }
    };

    return (
        <div className="grid grid-cols-1 h-screen justify-items-center items-center">
            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <h5 className="text-xl font-medium text-gray-900">Sign in to our platform</h5>
                    <div>
                        <label
                            htmlFor="username"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Your username
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Your username"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Your password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="••••••••"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <div className="text-red-500 text-center">{error}</div>}
                    <button
                        type="submit"
                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                        Login to your account
                    </button>
                    <div className="text-sm font-medium text-gray-500">
                        Not registered?{" "}
                        <a href="/register" className="text-blue-700 hover:underline">
                            Create account
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
