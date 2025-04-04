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

const videoData = [
    {
        id: 1,
        title: "Tích phân - Bài 2 - Toán 12 - Thầy Trần Thế Mạnh (HAY NHẤT)",
        url: "https://www.youtube.com/embed/guVT8b5yMSY",
    },
    {
        id: 2,
        title: "MÔN HÓA HỌC - LỚP 12 | SẮT | 15H15 NGÀY 24.3.2020 | HỌC TRÊN TRUYỀN HÌNH",
        url: "https://www.youtube.com/embed/4MSxsHpIK0w",
    },
    {
        id: 3,
        title: "Điện phân | Hoá 12 (Luyện thi ĐGNL)| GV: Phạm Thanh Tùng",
        url: "https://www.youtube.com/embed/XOJBS0FlHHA",
    },
    {
        id: 4,
        title: "Dạy học trên truyền hình | MÔN TIẾNG ANH LỚP 12 | CHUYÊN ĐỀ 2: Thể chủ động và bị động",
        url: "https://www.youtube.com/embed/2VmVTh5vJ74",
    },
    {
        id: 5,
        title: "TIẾNG ANH - LỚP 12 | COLLOCATIONS | HỌC TRÊN TRUYỀN HÌNH | PTTH Thanh Hóa",
        url: "https://www.youtube.com/embed/iNVldOWN89U",
    },
    {
        id: 6,
        title: "[VẬT LÝ 12] SÁCH CÁNH DIỀU |BÀI 1: SỰ CHUYỂN THỂ CÁC CHẤT | THẦY VŨ TUẤN ANH - VẬT LÝ",
        url: "https://www.youtube.com/embed/vCVZm7VgL2k",
    },
    {
        id: 7,
        title: "Tính Đơn Điệu Của Hàm Số - Toán 12 (Sgk Mới) || Thầy Nguyễn Phan Tiến",
        url: "https://www.youtube.com/embed/zsxktJWNxVI",
    },
];

export default function CardVideo() {

    const [isVisible, setIsVisible] = useState<boolean>(true);

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
    return (
        <div className="px-4">

            {isVisible ? (
                <div className={`w-full max-w-full mx-auto relative `}>
                    <Button
                        onClick={toggleCarousel}
                        size="icon"
                        className=" md:hidden z-10 -top-1 -left-1 absolute bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-full  shadow-md hover:from-blue-600 hover:to-blue-800 hover:shadow-lg active:scale-95 transition-all duration-300 ease-in-out"
                    >
                        {isVisible ? (<X />) : (<PanelTopOpen />)}
                    </Button>

                    {isVisible && (
                        <Carousel
                            opts={{
                                align: "start",
                            }}
                        >
                            <CarouselContent className="flex">
                                {videoData.map((video) => (
                                    <CarouselItem key={video.id} className="w-full xl:basis-1/5 md:basis-1/4">
                                        <div className="bg-white rounded-lg shadow-md p-2  flex flex-col items-center">
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger> <h4 className="text-md font-semibold mb-2">{video.title.substring(0, 20)}...</h4></TooltipTrigger>
                                                    <TooltipContent className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-md shadow-md hover:from-blue-600 hover:to-blue-800 hover:shadow-lg active:scale-95 transition-all duration-300 ease-in-out">
                                                        <p>{video.title}</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                            <iframe
                                                className="w-[290px] h-[150px] aspect-video rounded"
                                                src={video.url}
                                                title={video.title}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            ></iframe>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-blue-700  border-none hover:bg-blue-700 text-white rounded-full p-2 shadow-md">

                                &#8592;
                            </CarouselPrevious>
                            <CarouselNext className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-700 to-blue-500 border-none hover:bg-blue-700 text-white rounded-full p-2 shadow-md">
                                &#8594;
                            </CarouselNext>
                        </Carousel>
                    )}
                </div>
            ) : (
                <div className=" bg-blue-50 h-20 mb-5 p-4  rounded-lg  w-full mx-auto  shadow-md relative">
                    <div className="flex flex-col justify-between items-center mb-4">
                        <Button
                            onClick={toggleCarousel}
                            size="icon"
                            className="absolute -top-1 -left-1 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-full  shadow-md hover:from-blue-600 hover:to-blue-800 hover:shadow-lg active:scale-95 transition-all duration-300 ease-in-out"
                        >
                            {isVisible ? (<X />) : (<PanelTopOpen />)}
                        </Button>
                        <h2 className="text-blue-800 font-bold text-xl mb-2">THAM KHẢO VIDEO HỌC TẬP</h2>
                    </div>
                </div>
            )}
        </div>
    );
}
