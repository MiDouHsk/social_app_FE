import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import { Url } from '../service/constants';

const PostForm = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [image, setImage] = useState(null);
    const [status, setStatus] = useState('draft'); // Mặc định là "draft"

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            let mediaId = null;

            // Kiểm tra xem có hình ảnh được chọn hay không
            if (image) {
                // Nếu có hình ảnh, tải lên media trước
                const formData = new FormData();
                formData.append('filePath', image);

                // Gửi yêu cầu tải lên media
                const mediaResponse = await axios.post(`${Url}posts/upload/Media`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    }
                });

                mediaId = mediaResponse.data; // Lấy mediaId từ phản hồi
                console.log('Media ID:', mediaId); // Kiểm tra xem mediaId có giá trị hay không
            }

            // Tạo dữ liệu bài viết với thông tin về media
            const postData = {
                title: title,
                body: body,
                status: status,
                medias: mediaId ? [{
                    id: mediaId // Thay image.name bằng tên thực của file hình ảnh
                }] : []
            };

            // Gửi yêu cầu tạo bài viết, bao gồm thông tin về media
            const postResponse = await axios.post(`${Url}posts/create`, postData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log(postResponse.data);
            // Xử lý phản hồi, hiển thị thông báo thành công hoặc thực hiện các thao tác khác
        } catch (error) {
            console.error('Error creating post:', error);
            // Xử lý lỗi, hiển thị thông báo lỗi cho người dùng
        }
    };


    return (
        <div>
            <div>
                <Navbar></Navbar>
            </div>
            <div>
                <h2>Create a New Post</h2>
                <form onSubmit={handleFormSubmit}>
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    <br />
                    <label htmlFor="body">Body:</label><br />
                    <textarea id="body" value={body} onChange={(e) => setBody(e.target.value)} required></textarea>
                    <br />
                    <label htmlFor="image">Image:</label>
                    <input type="file" id="image" onChange={(e) => setImage(e.target.files[0])} />
                    <br />
                    <label htmlFor="status">Status:</label><br />
                    <select id="status" value={status} onChange={(e) => setStatus(e.target.value)} required>
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="archived">Archived</option>
                    </select>
                    <br />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default PostForm;
