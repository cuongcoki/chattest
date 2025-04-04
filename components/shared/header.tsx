"use client";
import Image from "next/image";
import headerbg from "../../public/image/Header2.jpg";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { useCountdownStore } from "@/store/countdownStore";
import { useState, useEffect } from "react";

export default function Header() {
    const { userData, clearAccessToken } = useAuthStore();
    const [checkRed, setCheckRed] = useState(false);

    const {
        hasUsedGuestMode,
        getRemainingTime,
        isCountdownActive,
    } = useCountdownStore();

    const router = useRouter();

    // Thêm state cho thời gian đếm ngược
    const [timeLeft, setTimeLeft] = useState(0);

    // Hàm định dạng thời gian
    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, "0");
        const s = (seconds % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    };

    useEffect(() => {

        setTimeLeft(getRemainingTime());

        const interval = setInterval(() => {
            const remainingTime = getRemainingTime();
            setTimeLeft(remainingTime);
            console.log("remainingTime", remainingTime);

            if (remainingTime === 300 && userData === null) {
                toast.error("Để không bị giới hạn thời gian sử dụng, bạn nên đăng ký là thành viên của hệ thống");
                setCheckRed(true)
            }

            if (remainingTime <= 0 && userData === null) {
                clearInterval(interval);
                toast.error("Bạn đã hết hạn thời gian sử dụng");

                setTimeout(() => {
                    window.location.href = '/';
                }, 2000);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [getRemainingTime]);



    const handleLogout = () => {
        clearAccessToken();
        toast.success("Đăng xuất thành công!");
        router.push("/sign-in");
    };

    const handleSignUp = () => {
        router.push("/sign-up");
    };

    const handleSignIn = () => {
        router.push("/sign-in");
    };

    console.log(checkRed)

    return (
        <div className="w-full h-auto">
            <Image src={headerbg} alt="Header Background" layout="responsive" />
            <div className="bg-gradient-to-r px-4 py-2 from-green-600 to-green-800 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 justify-between items-center">
                <h1 className="text-xl text-white">
                    {`Họ và tên học sinh: ${userData?.firstName === undefined ? "..." : userData?.firstName} 
   - Tỉnh: ${userData?.address === undefined ? "..." : userData?.address} `}

                    {/* Hiển thị "Thời gian còn lại" chỉ khi chưa có userData (tức là guest) */}
                    {!userData && hasUsedGuestMode && isCountdownActive() && timeLeft >= 0 && (
                        <>- Thời gian còn lại: <span className={`${checkRed ? "text-red-500 bg-accent items-center mx-2 rounded-full px-2" : ""}`}>{`${formatTime(timeLeft)}`}</span></>

                    )}
                </h1>

                    <a
                        href={`/userguide/Hướng dẫn sử dụng.pdf`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:underline flex justify-center items-center "
                    >
                             <span className="text-xl">Hướng dẫn sử dụng ?</span>
                    </a>

                {userData === null ? (
                    <div className="flex gap-2">
                        <Button
                            onClick={handleSignUp}
                            className="w-[120px] bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-md px-6 py-2 shadow-md hover:from-blue-600 hover:to-blue-800 hover:shadow-lg active:scale-95 transition-all duration-300 ease-in-out"
                        >
                            ĐĂNG KÝ
                        </Button>
                        <Button
                            onClick={handleSignIn}
                            className="w-[120px] bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-md px-6 py-2 shadow-md hover:from-blue-600 hover:to-blue-800 hover:shadow-lg active:scale-95 transition-all duration-300 ease-in-out"
                        >
                            ĐĂNG NHẬP
                        </Button>
                    </div>
                ) : (
                    <Button
                        onClick={handleLogout}
                        className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-md px-6 py-2 shadow-md hover:from-blue-600 hover:to-blue-800 hover:shadow-lg active:scale-95 transition-all duration-300 ease-in-out"
                    >
                        ĐĂNG XUẤT
                    </Button>
                )}
            </div>
        </div>
    );
}
