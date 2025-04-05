"use client"
import { useEffect, useState } from "react";

interface TrakingData {
    Active_user: number;
    Total_visit: number;
}

export default function Footer() {
    const [tracking, setTracking] = useState<TrakingData>();

    const fetchTracking = async () => {
        try {
            const response = await fetch(`https://aitoan.girc.edu.vn/tracking`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Lá»—i khi láº¥y dá»¯ liá»‡u.");
            }

            const data = await response.json();
            setTracking(data);
        } catch (error) {
            console.error("Lá»—i API:", error);
        }
    };
    console.log("tracking", tracking)
    useEffect(() => {
        fetchTracking();
    }, []);

    return (
        <div className="bg-blue-900 text-white p-2 flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm space-y-2 sm:space-y-0">
            <span className="text-center sm:text-left">© GIRC</span>
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-center sm:text-left space-y-1 sm:space-y-0">
                <span>Đang online: {tracking?.Active_user}</span>
                <span>👥 Tổng lượt truy cập: {tracking?.Total_visit}</span>
            </div>
        </div>

    );
}