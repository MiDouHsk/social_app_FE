import React, { useState } from "react";
import { Url } from "../service/constants";

const Reset = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleResetPassword = async () => {
        try {
            const response = await fetch(`${Url}reset-password/send-mail?email=${email}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                console.log("Reset password email sent successfully!");
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message);
            }
        } catch (error) {
            setErrorMessage("có lỗi khi gửi email, vui lòng thử lại sau !");
        }
    };

    const handleConfirmPassword = async () => {
        try {
            const response = await fetch(`${Url}reset-password/confirm-password?mail=${email}&otp=${otp}&newPassword=${newPassword}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                setShowSuccessModal(true);
                console.log("Password confirmed successfully!");
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message);
            }
        } catch (error) {
            console.error("Error confirming password:", error);
            setErrorMessage("có lỗi sảy ra khi nhập mật khẩu, vui lòng thử lại sau !");
        }
    };
    const handleModalClose = () => {
        setShowSuccessModal(false); // Ẩn modal khi người dùng đóng nó
    };

    const handleLoginRedirect = () => {
        // Chuyển hướng sang trang login
        window.location.href = "/login";
    };


    return (
        <div className="container mx-auto">
            <div className="flex justify-center px-6 my-12">
                <div className="w-full xl:w-3/4 lg:w-11/12 flex">
                    <img
                        src="https://source.unsplash.com/oWTW-jNGl9I/600x800"
                        className="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
                        alt=""
                    />
                    <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
                        <div className="px-8 mb-4 text-center">
                            <h3 className="pt-4 mb-2 text-2xl">Forgot Your Password?</h3>
                            <p className="mb-4 text-sm text-gray-700">
                                Chúng tôi hiểu rồi, mọi thứ sẽ xảy ra. Chỉ cần nhập địa chỉ email của bạn bên dưới
                                và chúng tôi sẽ gửi cho bạn một mã Otp để bạn có thể tạo lại mật mã của bạn.
                            </p>
                        </div>
                        <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
                                Email
                            </label>
                            <div className="mb-4 flex items-center">
                                <input
                                    className="flex-grow px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="email"
                                    type="email"
                                    placeholder="Enter Email Address..."
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} // Fixed
                                />
                                <button
                                    className="ml-4 px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
                                    type="button"
                                    onClick={handleResetPassword}
                                >
                                    Send Mail
                                </button>
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
                                    New Password
                                </label>
                                <input
                                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password..."
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="otp">
                                    OTP
                                </label>
                                <input
                                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="otp"
                                    type="text"
                                    placeholder="Enter OTP..."
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                />
                            </div>
                            {errorMessage && (
                                <div className="mb-4 text-red-500 text-center">{errorMessage}</div>
                            )}
                            <div className="mb-6 text-center">
                                <button
                                    className="w-full px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
                                    type="button"
                                    onClick={handleConfirmPassword}
                                >
                                    Reset Password
                                </button>
                            </div>
                            <hr className="mb-6 border-t" />
                            <div className="text-center">
                                <a
                                    className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                                    href="/register"
                                >
                                    Create an Account!
                                </a>
                            </div>
                            <div className="text-center">
                                <a
                                    className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                                    href="/login"
                                >
                                    Already have an account? Login!
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {showSuccessModal && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg font-medium text-gray-900">Reset Password Successful</h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">Your password has been reset successfully!</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button onClick={handleLoginRedirect} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                                    Login
                                </button>
                                <button onClick={handleModalClose} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Reset;