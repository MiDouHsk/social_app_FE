import React from "react";

const LeftSideProfile = () => {
    return (
        <div class="flex flex-col bg-white pb-4 border-2 rounded-r-xl shadow-lg mb-4">
            <div class="flex flex-col font-bold items-center pt-10 mb-10">
                <p class="font-roboto font-medium text-md no-underline tracking-normal leading-none">
                    Giới thiệu:
                </p>
            </div>
            <div class="flex flex-col pl-2 text-gray-700 font-roboto text-xs">
                <div class="flex space-x-4 items-center justify-center text-center my-4">
                    <p class="text-sm">Following: 0</p>
                    <p class="text-sm">Followers: 0</p>
                </div>
                <div class="flex items-center py-2 mx-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        class="w-6 h-6 mr-2">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                    </svg>
                    <p class="text-lg no-underline tracking-normal leading-none">
                        Join Date: 01/01/2022
                    </p>
                </div>
                <div class="flex items-center py-2 mx-4">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        class="w-6 h-6 mr-2">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
                    </svg>
                    <p class="text-lg no-underline tracking-normal leading-none">
                        Đăk Lăk - Việt Nam
                    </p>
                </div>
                <div class="flex items-center py-2 mx-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        class="w-6 h-6 mr-2">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <p class="text-lg no-underline tracking-normal leading-none">
                        Join Date: 01/01/2022
                    </p>
                </div>
            </div>
        </div>

    );
};

export default LeftSideProfile;