// pages/index.js
"use client"

import React, { useState } from 'react';
import Image from 'next/image';

export default function StudyGuide() {
    const [activeImage, setActiveImage] = useState("");

    const handleImageClick = (imageSrc: string) => {
        setActiveImage(imageSrc);
    };

    const closeFullscreen = () => {
        setActiveImage("");
    };

    return (
        <>
            {/* Fullscreen Image Overlay */}
            {activeImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 bg-opacity-80 cursor-pointer"
                    onClick={closeFullscreen}
                >
                    <div className="relative w-full h-full max-w-6xl max-h-screen p-4">
                        <button
                            className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 z-50"
                            onClick={closeFullscreen}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                        <div className="w-full h-full flex items-center justify-center">
                            <div className="relative w-full h-full">
                                <Image
                                    src={activeImage}
                                    layout="fill"
                                    objectFit="contain"
                                    className="rounded-lg"
                                    alt="Hình ảnh phóng to"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="px-4 sm:px-6 lg:px-8 ">

                <div className="text-center sticky top-0 z-10 border-b bg-white">
                    <h1 className="text-2xl md:text-3xl font-bold text-blue-700 ">
                        Hệ Thống Hỗ Trợ Học Tập Cho 2K7
                    </h1>
                    <p className="text-gray-600 mt-2">Hướng dẫn sử dụng đơn giản và hiệu quả</p>
                </div>

                <div className="mt-5 space-y-8">
                    {/* Cách 1 */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-gray-800  dark:text-white">
                            Cách 1: Nhập văn bản bằng bàn phím và sao chép/dán
                        </h2>
                        <div className="flex justify-center">
                            <div className="relative w-full max-w-md group">
                                <div
                                    className="cursor-pointer transform transition-all duration-300 hover:shadow-xl"
                                    onClick={() => handleImageClick("/userguide/video/cach1.gif")}
                                >
                                    <Image
                                        src="/userguide/video/cach1.gif"
                                        width={400}
                                        height={225}
                                        className="rounded-lg shadow-md group-hover:opacity-95"
                                        alt="Hướng dẫn cách 1"
                                        layout="responsive"
                                    />
                                    <div className="absolute inset-0 bg-black/70 bg-opacity-0 group-hover:bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="48"
                                            height="48"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="white"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="drop-shadow-lg"
                                        >
                                            <path d="M15 3h6v6"></path>
                                            <path d="M10 14L21 3"></path>
                                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Cách 2 */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-gray-800  dark:text-white">
                            Cách 2: Chọn hình ảnh từ máy tính hoặc chụp dán ảnh
                        </h2>
                        <div className="flex justify-center">
                            <div className="relative w-full max-w-md group">
                                <div
                                    className="cursor-pointer transform transition-all duration-300 hover:shadow-xl"
                                    onClick={() => handleImageClick("/userguide/video/cach2.gif")}
                                >
                                    <Image
                                        src="/userguide/video/cach2.gif"
                                        width={400}
                                        height={225}
                                        className="rounded-lg shadow-md group-hover:opacity-95"
                                        alt="Hướng dẫn cách 2"
                                        layout="responsive"
                                    />
                                    <div className="absolute inset-0 bg-black/70 bg-opacity-0 group-hover:bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="48"
                                            height="48"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="white"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="drop-shadow-lg"
                                        >
                                            <path d="M15 3h6v6"></path>
                                            <path d="M10 14L21 3"></path>
                                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Cách 3 */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-gray-800  dark:text-white">
                            Cách 3: Bật ô nhập công thức và xem đoạn chat
                        </h2>

                        <div className="flex flex-col items-center gap-6">
                            <div className="relative w-full max-w-md group">
                                <div
                                    className="cursor-pointer transform transition-all duration-300 hover:shadow-xl"
                                    onClick={() => handleImageClick("/userguide/video/cach3.gif")}
                                >
                                    <Image
                                        src="/userguide/video/cach3.gif"
                                        width={400}
                                        height={225}
                                        className="rounded-lg shadow-md group-hover:opacity-95"
                                        alt="Hướng dẫn cách 3"
                                        layout="responsive"
                                    />
                                    <div className="absolute inset-0 bg-black/70 bg-opacity-0 group-hover:bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="48"
                                            height="48"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="white"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="drop-shadow-lg"
                                        >
                                            <path d="M15 3h6v6"></path>
                                            <path d="M10 14L21 3"></path>
                                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Phần 2 của cách 3 */}
                            <div className="relative w-full max-w-md group">
                                <div
                                    className="cursor-pointer transform transition-all duration-300 hover:shadow-xl"
                                    onClick={() => handleImageClick("/userguide/video/cach33.gif")}
                                >
                                    <Image
                                        src="/userguide/video/cach33.gif"
                                        width={400}
                                        height={225}
                                        className="rounded-lg shadow-md group-hover:opacity-95"
                                        alt="Hướng dẫn cách 3 - phần 2"
                                        layout="responsive"
                                    />
                                    <div className="absolute inset-0 bg-black/70 bg-opacity-0 group-hover:bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="48"
                                            height="48"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="white"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="drop-shadow-lg"
                                        >
                                            <path d="M15 3h6v6"></path>
                                            <path d="M10 14L21 3"></path>
                                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="space-y-6">
                        {/* Lưu ý */}
                        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md">
                            <span className="font-semibold">*Lưu ý:</span>
                            <p>Bấm tổ hợp <kbd className="bg-gray-200 px-1 rounded">Ctrl</kbd> + <kbd className="bg-gray-200 px-1 rounded">K</kbd> để tắt bàn phím nhập công thức</p>
                        </div>

                        {/* Thông tin liên hệ */}
                        <div className="text-center">
                            <h2 className="text-lg font-semibold text-blue-600 mb-4">Thông tin liên hệ</h2>
                            <div className="flex flex-wrap justify-center gap-3">
                                <button className="bg-blue-500 text-white px-4 py-2 rounded-full shadow hover:bg-blue-600 transition">
                                    Nguyễn Tiến Dũng - 0397873471
                                </button>
                                <button className="bg-blue-500 text-white px-4 py-2 rounded-full shadow hover:bg-blue-600 transition">
                                    Trần Đình Cương - 0976994117
                                </button>
                                <button className="bg-blue-500 text-white px-4 py-2 rounded-full shadow hover:bg-blue-600 transition">
                                    Nguyễn Ngọc Minh - 0971244082
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}