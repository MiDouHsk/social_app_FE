import React, { useEffect } from 'react';
import Masonry from 'masonry-layout';

const Script = () => {
    useEffect(() => {
        // Khởi tạo Masonry sau khi DOM đã được render
        const grid = document.querySelector('.post-media-grid');
        const masonry = new Masonry(grid, {
            itemSelector: '.post-media-item',
            columnWidth: '.post-media-sizer',
            percentPosition: true
        });

        // Làm sạch Masonry khi unmount
        return () => {
            masonry.destroy();
        };
    }, []);

    return (
        <div className="post-media-grid">
            {/* Một số mã JSX để hiển thị ảnh */}
            {/* Sử dụng class 'post-media-item' cho mỗi ảnh */}
            {/* Sử dụng class 'post-media-sizer' cho mỗi cột trong Masonry Layout */}
        </div>
    );
};

export default Script;
