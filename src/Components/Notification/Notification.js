import React from "react";

const Notification = () => {
    return (
        <div class="">
            <div class="bg-white/60 hover:bg-white/80 hover:shadow-lg transition duration-150 ease-linear backdrop-blur-xl z-20 max-w-md absolute right-5 top-36 rounded-lg p-6 shadow">
                <h1 class="text-xl text-slate-700 font-medium">Welcome back, Eduard 👋</h1>
                <div class="flex justify-between items-center">
                    <a href="#" class="text-slate-500 hover:text-indigo-600 text-sm inline-flex space-x-1 items-center">
                        <span>Go to Dashboard</span>
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </a>

                </div>
            </div>
        </div>
    );
};

export default Notification;