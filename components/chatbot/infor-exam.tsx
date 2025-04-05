"use client";

import React, { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { CheckIcon, PanelTopOpen, X } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";


import { ChuyenNganh1 ,ChuyenNganh2 ,ChuyenNganh3 } from "../../public/image/image2/index"

import Autoplay from "embla-carousel-autoplay"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"


export default function InforExam() {
    const [selectedYear, setSelectedYear] = useState("");


    useEffect(() => {
        setSelectedYear("2024");
    }, [setSelectedYear]);

    const examPdfs: Record<string, { name: string; link: string }[]> = {
        "2024": [
            { name: "Môn toán", link: "Toan - 2024.pdf" },
            { name: "Môn vật lý", link: "VL - 2024.pdf" },
            { name: "Môn hóa học", link: "Hoa - 2024.pdf" },
            { name: "Môn ngữ văn", link: "Van - 2024.pdf" },
            { name: "Môn tiếng anh", link: "TA - 2024.pdf" },
            { name: "Môn lịch sử", link: "Su - 2024.pdf" },
            { name: "Môn địa lý", link: "Dia - 2024.pdf" },
            { name: "Môn sinh học", link: "Sinh - 2024.pdf" },
        ],
        "2023": [
            { name: "Môn toán", link: "Toan - 2023.pdf" },
            { name: "Môn vật lý", link: "VL - 2023.pdf" },
            { name: "Môn hóa học", link: "Hoa - 2023.pdf" },
            { name: "Môn ngữ văn", link: "Van - 2023.pdf" },
            { name: "Môn tiếng anh", link: "TA - 2023.pdf" },
            { name: "Môn lịch sử", link: "Su - 2023.pdf" },
            { name: "Môn địa lý", link: "Dia - 2023.pdf" },
            { name: "Môn sinh học", link: "Sinh - 2023.pdf" },
        ],
        "2022": [
            { name: "Môn toán", link: "Toan - 2022.pdf" },
            { name: "Môn vật lý", link: "VL - 2022.pdf" },
            { name: "Môn hóa học", link: "Hoa - 2022.pdf" },
            { name: "Môn ngữ văn", link: "Van - 2022.pdf" },
            { name: "Môn tiếng anh", link: "TA - 2022.pdf" },
            { name: "Môn lịch sử", link: "Su - 2022.pdf" },
            { name: "Môn địa lý", link: "Dia - 2022.pdf" },
            { name: "Môn sinh học", link: "Sinh - 2022.pdf" },
        ],
    };
    

    const dataImage = [
        {
            id: 1,
            url: ChuyenNganh1,
        },
        {
            id: 2,
            url: ChuyenNganh2,
        },
        {
            id: 3,
            url: ChuyenNganh3,
        }
    ]

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
        <div className="w-full md:w-1/4 bg-blue-50 rounded-lg p-4 shadow-md flex flex-col gap-2 relative dark:bg-slate-800">
            <Button
                onClick={toggleCarousel}
                size="icon"
                className=" md:hidden  absolute -top-1 -left-1 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-full  shadow-md hover:from-blue-600 hover:to-blue-800 hover:shadow-lg active:scale-95 transition-all duration-300 ease-in-out"
            >
                {isVisible ? (<X />) : (<PanelTopOpen />)}
            </Button>
            <div className="flex flex-col justify-between items-center mb-4">
                <h2 className="text-blue-800 font-bold text-xl mb-2 dark:text-white">THAM KHẢO ĐỀ THI TỐT NGHIỆP THPT</h2>
                {isVisible && (
                    <div className={`relative flex items-center gap-2 ${isVisible}`}>
                        <div className="font-bold text-xl">Chọn năm:</div>
                        <Select
                            defaultValue="2024"
                            onValueChange={(value) => {
                                setSelectedYear(value);
                            }}
                        >
                            <SelectTrigger className="md:w-[150px] w-[100px] text-2xl  border-none  text-black rounded-md shadow-md hover:from-blue-600 hover:to-blue-800">
                                <SelectValue
                                    placeholder="năm"
                                />
                            </SelectTrigger>
                            <SelectContent className=" text-black rounded-md shadow-md">
                                <SelectGroup>
                                    <SelectItem value="2024" >2024</SelectItem>
                                    <SelectItem value="2023" >2023</SelectItem>
                                    <SelectItem value="2022" >2022</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                )}
            </div>

            {/* Khu vực hiển thị danh sách PDF */}
            {isVisible && (
                <>
                    <div className="flex justify-center items-center ">
                        <div className=" flex justify-center items-center">
                            <div className="min-h-40 grid grid-cols-2 gap-2 space-x-5 justify-center items-center">
                                {selectedYear && examPdfs[selectedYear]?.length > 0 ? (
                                    examPdfs[selectedYear].every(pdfFile => pdfFile.link === "") ? (
                                        <p className="text-gray-700 text-center">Chưa có đề thi cho năm {selectedYear}.</p>
                                    ) : (
                                        examPdfs[selectedYear].map((pdfFile, index) => (
                                            <div key={index} className="mb-2 w-full ">
                                                {pdfFile.link ? (
                                                    <a
                                                        href={`/mon/${pdfFile.link}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-green-600 hover:underline flex justify-center items-center "
                                                    >
                                                        <div className="flex w-[170px] dark:text-white">
                                                            <CheckIcon className="mr-3" /> <span className="text-xl">{pdfFile.name}</span>
                                                        </div>
                                                    </a>
                                                ) : (
                                                    <span className="text-gray-500">Môn: {pdfFile.name} - chưa có</span>
                                                )}
                                            </div>
                                        ))
                                    )
                                ) : (
                                    <p className="text-gray-700 text-center">
                                        Vui lòng chọn năm để xem đề thi.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>





                    <div className="w-full h-[5px] bg-blue-500 rounded-full" ></div>
                    <Carousel
                        plugins={[
                            Autoplay({
                                delay: 3000,
                            }),
                        ]}
                        opts={{
                            loop: true
                        }}
                    >
                        <CarouselContent>
                            {
                                dataImage.map((Item) => {
                                    return (
                                        <CarouselItem key={Item.id}>
                                            <div className="link-container w-full">
                                                <a href="https://tuyensinh.girc.edu.vn/" target="_blank" rel="noopener noreferrer">
                                                    <Image
                                                        src={Item.url}
                                                        alt="Header Background"
                                                        layout="responsive"
                                                        className="image-hover"
                                                    />
                                                </a>
                                            </div>
                                        </CarouselItem>
                                    );
                                })
                            }

                        </CarouselContent>
                    </Carousel>
                </>
            )}
            
        </div>
    );
}
