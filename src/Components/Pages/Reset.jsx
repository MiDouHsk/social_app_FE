import React from "react";

const Reset = () => {

    return (
        <div className="grid grid-cols-1 justify-items-center items-center h-screen">
            <div className="w-96">
                <p variant="h6" color="blue-gray" className="pb-4">
                    Enter the email address associated with your account and we 'll send
                    you a link to reset your password
                </p>
                <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    name="email"
                    type="email"
                    lable="Email"
                    value=""
                ></input>
                <button
                    variant="gradient"
                    fullWidth className="mt-4 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                    Continue
                </button>
            </div>
        </div>
    );
};

export default Reset;