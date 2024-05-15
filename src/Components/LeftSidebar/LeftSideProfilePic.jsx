import React, { useEffect, useState } from "react";
import axios from "axios";
import { Url, avatarBaseUrl } from "../service/constants";

const LeftSideProfilePic = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`${Url}posts/userList`, {
                    params: {
                        page: 0,
                        pageSize: 10,
                        sortName: "createAt",
                        sortType: "DESC"
                    },
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setPosts(response.data.content);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPosts();
    }, []);

    const isImage = (url) => {
        const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
        const extension = url.split('.').pop().toLowerCase();
        return imageExtensions.includes(extension);
    };

    return (
        <div className="flex flex-col bg-white pb-4 border-2 rounded-xl shadow-lg mb-4">
            <div className="flex flex-col font-bold items-center pt-10 mb-10">
                <p className="font-roboto font-medium text-md no-underline tracking-normal leading-none">
                    Hình ảnh
                </p>
            </div>
            <div className="flex flex-col mx-1">
                <div className="grid grid-cols-3 gap-2">
                    {posts.map((post) =>
                        post.medias.map((media) =>
                            isImage(media.publicUrl) && (
                                <div key={media.id}>
                                    <img
                                        src={`${avatarBaseUrl}${media.publicUrl}`}
                                        alt={`Picture ${post.id}`}
                                        className="w-28 h-28 object-cover"
                                    />
                                </div>
                            )
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default LeftSideProfilePic;
