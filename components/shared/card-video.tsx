"use client"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { PanelTopOpen, X } from "lucide-react";

// Thêm đoạn "&loading=lazy" vào URL để tối ưu
const videoData = [
    {
        id: 1,
        title: "Tích phân - Bài 2 - Toán 12 - Thầy Trần Thế Mạnh (HAY NHẤT)",
        url: "https://www.youtube.com/embed/guVT8b5yMSY?loading=lazy",
    },
    {
        id: 2,
        title: "MÔN HÓA HỌC - LỚP 12 | SẮT | 15H15 NGÀY 24.3.2020 | HỌC TRÊN TRUYỀN HÌNH",
        url: "https://www.youtube.com/embed/4MSxsHpIK0w?loading=lazy",
    },
    {
        id: 3,
        title: "Điện phân | Hoá 12 (Luyện thi ĐGNL)| GV: Phạm Thanh Tùng",
        url: "https://www.youtube.com/embed/XOJBS0FlHHA?loading=lazy",
    },
    {
        id: 4,
        title: "Dạy học trên truyền hình | MÔN TIẾNG ANH LỚP 12 | CHUYÊN ĐỀ 2: Thể chủ động và bị động",
        url: "https://www.youtube.com/embed/2VmVTh5vJ74?loading=lazy",
    },
    {
        id: 5,
        title: "TIẾNG ANH - LỚP 12 | COLLOCATIONS | HỌC TRÊN TRUYỀN HÌNH | PTTH Thanh Hóa",
        url: "https://www.youtube.com/embed/iNVldOWN89U?loading=lazy",
    },
    {
        id: 6,
        title: "[VẬT LÝ 12] SÁCH CÁNH DIỀU |BÀI 1: SỰ CHUYỂN THỂ CÁC CHẤT | THẦY VŨ TUẤN ANH - VẬT LÝ",
        url: "https://www.youtube.com/embed/vCVZm7VgL2k?loading=lazy",
    },
    {
        id: 7,
        title: "Tính Đơn Điệu Của Hàm Số - Toán 12 (Sgk Mới) || Thầy Nguyễn Phan Tiến",
        url: "https://www.youtube.com/embed/zsxktJWNxVI?loading=lazy",
    },
];

export default function CardVideo() {
    const [isVisible, setIsVisible] = useState<boolean>(true);
    const [visibleItems, setVisibleItems] = useState<number[]>([]);

    const toggleCarousel = () => {
        setIsVisible((prev) => !prev);
    };

    useEffect(() => {
        const handleResize = () => {
            // Kiểm tra nếu kích thước màn hình từ md trở lên (>= 768px)
            if (window.innerWidth >= 768) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        // Lắng nghe sự thay đổi kích thước cửa sổ
        window.addEventListener("resize", handleResize);

        // Kiểm tra kích thước khi component được render lần đầu
        handleResize();

        // Dọn dẹp sự kiện khi component bị unmount
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Chỉ tải iframe khi carousel hiển thị và đang ở trong viewport
    useEffect(() => {
        if (!isVisible) return;

        // Chỉ tải các iframe đầu tiên ban đầu
        setVisibleItems([1, 2, 3, 4]);
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const videoId = parseInt(entry.target.getAttribute('data-video-id') || '0');
                    if (videoId && !visibleItems.includes(videoId)) {
                        setVisibleItems(prev => [...prev, videoId]);
                    }
                }
            });
        }, { threshold: 0.1 });
        
        // Theo dõi tất cả các phần tử CarouselItem
        document.querySelectorAll('.carousel-video-item').forEach(item => {
            observer.observe(item);
        });
        
        return () => observer.disconnect();
    }, [isVisible]);

    return (
        <div className="px-4">
            {isVisible ? (
                <div className={`w-full max-w-full mx-auto relative`}>
                    <Button
                        onClick={toggleCarousel}
                        size="icon"
                        className="md:hidden z-10 -top-1 -left-1 absolute bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-full shadow-md hover:from-blue-600 hover:to-blue-800 hover:shadow-lg active:scale-95 transition-all duration-300 ease-in-out"
                    >
                        {isVisible ? (<X />) : (<PanelTopOpen />)}
                    </Button>

                    {isVisible && (
                        <Carousel
                            opts={{
                                align: "start",
                            }}
                        >
                            <CarouselContent className="flex dark:bg-white">
                                {videoData.map((video) => (
                                    <CarouselItem 
                                        key={video.id} 
                                        className="w-full xl:basis-1/5 md:basis-1/4 dark:bg-black carousel-video-item"
                                        data-video-id={video.id}
                                    >
                                        <div className="bg-white rounded-lg shadow-md p-2 flex flex-col items-center dark:bg-slate-800 dark:text-white">
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger>
                                                        <h4 className="text-md font-semibold mb-2 dark:text-white truncate w-full">
                                                            {video.title.length > 20 ? `${video.title.substring(0, 20)}...` : video.title}
                                                        </h4>
                                                    </TooltipTrigger>
                                                    <TooltipContent className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-md shadow-md hover:from-blue-600 hover:to-blue-800 hover:shadow-lg active:scale-95 transition-all duration-300 ease-in-out">
                                                        <p>{video.title}</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                            
                                            {/* Chỉ render iframe khi cần thiết */}
                                            {visibleItems.includes(video.id) ? (
                                                <iframe
                                                    className="w-full aspect-video rounded"
                                                    src={video.url}
                                                    title={video.title}
                                                    frameBorder="0"
                                                    loading="lazy" 
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                ></iframe>
                                            ) : (
                                                <div className="w-full aspect-video rounded bg-gray-200 flex items-center justify-center">
                                                    <div className="text-gray-500 text-sm">Loading...</div>
                                                </div>
                                            )}
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-blue-700 border-none hover:bg-blue-700 text-white rounded-full p-2 shadow-md">
                                &#8592;
                            </CarouselPrevious>
                            <CarouselNext className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-700 to-blue-500 border-none hover:bg-blue-700 text-white rounded-full p-2 shadow-md">
                                &#8594;
                            </CarouselNext>
                        </Carousel>
                    )}
                </div>
            ) : (
                <div className="bg-blue-50 h-20 mb-5 p-4 rounded-lg w-full mx-auto shadow-md relative dark:bg-slate-800">
                    <div className="flex flex-col justify-between items-center mb-4">
                        <Button
                            onClick={toggleCarousel}
                            size="icon"
                            className="absolute -top-1 -left-1 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-full shadow-md hover:from-blue-600 hover:to-blue-800 hover:shadow-lg active:scale-95 transition-all duration-300 ease-in-out"
                        >
                            {isVisible ? (<X />) : (<PanelTopOpen />)}
                        </Button>
                        <h2 className="text-blue-800 font-bold text-sm md:text-xl mb-2 dark:text-white">THAM KHẢO VIDEO HỌC TẬP</h2>
                    </div>
                </div>
            )}
        </div>
    );
}