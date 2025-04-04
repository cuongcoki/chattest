"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import bgs from "../../../public/image/Back 2.jpg"
import bgs2 from "../../../public/image/test.png"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { guestApi } from "@/api"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { useGuestStore } from "@/store/useGuestStore"
import { useCountdownStore } from "@/store/countdownStore"
interface DataGuest {
  access_token: string;
  message: string;
  role: string;
  session_id: number
}

// Fixed useCountdown hook


const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
};

export default function Home() {
  const [userAgent, setUserAgent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Get auth store methods
  const { setGuestData, clearGuestData } = useGuestStore();

  // Use countdown store instead of the custom hook
  const {
    hasUsedGuestMode,
    getRemainingTime,
    startCountdown,
    resetCountdown,
    isCountdownActive
  } = useCountdownStore();

  // Get and format the remaining time
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    // Set up timer to update countdown every second
    const interval = setInterval(() => {
      const remaining = getRemainingTime();
      setTimeLeft(remaining);

      // If countdown reaches zero, reset guest data
      if (remaining === 0 && hasUsedGuestMode) {
        resetCountdown();
        clearGuestData();
        toast.success("Bạn đã hết thời gian sử dụng vui lòng đăng ký tài khoản");

        setTimeout(function () {
          window.location.href = '/';
        }, 5000);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [getRemainingTime, hasUsedGuestMode, resetCountdown, clearGuestData]);

  // Format time for display
  const formattedCountdown = formatTime(timeLeft);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Get user agent
      const ua = navigator.userAgent;
      console.log("User Agent:", ua);
      setUserAgent(ua);

      // Initial time update
      setTimeLeft(getRemainingTime());

      // Check if countdown has expired on page load
      if (hasUsedGuestMode && !isCountdownActive()) {
        resetCountdown();
        clearGuestData();
      }
    }
  }, [getRemainingTime, hasUsedGuestMode, isCountdownActive, resetCountdown, clearGuestData]);

  const handleGuest = async () => {
    try {
      setIsLoading(true);
      if (!userAgent) throw new Error("Không thể xác định thiết bị");

      const response = await guestApi("123");
      const dataGuest: DataGuest = response as DataGuest;
      console.log("dataGuest", dataGuest);

      // Set guest data in the main store
      setGuestData(dataGuest);

      // Start a 30-minute countdown using the countdown store
      startCountdown(60);

      toast.success(dataGuest.message);
      router.push("/chatbot");
    } catch (error) {
      console.log(error);
      toast.error("Thời gian dùng thử của bạn đã hết ");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChatbot = () => {
    router.push("/chatbot");
  };
  
  return (
    <div className={cn("relative flex flex-col gap-6 min-h-screen")} >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bgs}
          alt="Background"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>

      {/* Content with relative positioning to appear above background */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-6 px-4 py-8">
        <Image
          src={bgs2}
          alt="Background"
          className="w-full max-w-[1000px] h-auto max-h-[230px]"
        />
        <Card className="overflow-hidden max-w-md mx-auto w-full bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg border-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-bold text-center">Chào mừng đến với trợ lý học tập AI GIRC</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4 pb-4">
            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <Button className="w-full bg-white hover:bg-white/90 text-blue-700 font-semibold py-2">
                  <Link href="/sign-up">Đăng ký tài khoản</Link>
                </Button>
                <Button className="w-full bg-white hover:bg-white/90 text-blue-700 font-semibold py-2">
                  <Link href="/sign-in">Đăng nhập tài khoản</Link>
                </Button>
              </div>

              {hasUsedGuestMode ? (
                <div className="flex flex-col justify-center items-center pt-2">
                  <div className="text-center mb-2">Thời gian còn lại: {formattedCountdown}</div>
                  <Button
                    onClick={handleChatbot}
                    className="w-full sm:w-3/4 bg-transparent border border-white hover:bg-white/10 text-white font-medium py-2"
                  >
                    Quay về hệ thống hỗ trợ học tập
                  </Button>
                </div>
              ) : (
                <Button
                  className="w-full bg-transparent border border-white hover:bg-white/10 text-white font-medium py-2 mt-2"
                  onClick={handleGuest}
                  disabled={isLoading || userAgent === null}
                >
                  {isLoading ? "Đang xử lý..." :
                    userAgent === null ? "Đang chuẩn bị..." :
                      "Trải nghiệm ngay với tài khoản dùng thử"}
                </Button>
              )}
            </div>
          </CardContent>

          <CardFooter className="pt-0 pb-4 text-center text-xs text-white/80">
            Tham gia ngay hôm nay ! còn 50 suất dùng thử !!!
          </CardFooter>
        </Card>
        <div className="text-balance text-center text-xs text-white font-medium [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
          © Copyright @GIRC {new Date().getFullYear()}
        </div>
      </div>
    </div>
  )
}