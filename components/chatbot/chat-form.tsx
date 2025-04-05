"use client"

import { useEffect, useState, type FormEvent } from "react"
import { ChatMessages, type Message } from "./chat-messages"
import { ChatInput } from "./chat-input"
import { useChatStore } from "@/store/chatStore"
import { useAuthStore } from "@/store/authStore"
import { chatMessagesApi, sendMessagesApi } from "@/api/chatbotApi"
import toast from "react-hot-toast"
import { useImageStore } from "@/store/imageStore"
import { Spinner } from "../providers/spinner"
import { useGuestStore } from "@/store/useGuestStore"


interface ChatSession {
    id: number;
    title: string;
    created_at: string;
    messages: Message[];
}


export default function ChatForm() {
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const { accessToken } = useAuthStore();
    const { imageFile, removeImage, setPreview } = useImageStore();
    const { sessionId } = useChatStore();
    const { guestData } = useGuestStore();
    const { userData } = useAuthStore();
    console.log("guestData",guestData)
    console.log("userData",userData)
    const fetchMessages = async () => {
        if (guestData?.role === "guest" && userData === null) {
            const response = await chatMessagesApi(guestData.guest_token, guestData.session_id);
            const chatSession = response as ChatSession;
            setMessages(chatSession.messages);
        } else {
            if (!accessToken) {
                toast.error("đăng nhập hết hạn");
                return;
            }
            if (!sessionId) {
                // toast.error("ko thấy sessionId");
                return;
            }
            const response = await chatMessagesApi(accessToken, sessionId);
            const chatSession = response as ChatSession;
            setMessages(chatSession.messages);

            console.log(response);
        }
    };
    useEffect(() => {
        fetchMessages();
    }, [sessionId]);


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        if (guestData?.role === "guest" && userData === null) {
            if (!input.trim()) return toast.error("Vui lòng nhập câu hỏi")

            if (!guestData.guest_token) {
                toast.error("Đăng nhập hết hạn")
                return
            }
            if (!guestData.session_id) {
                return
            }


            setPreview(null);
            // Thêm tin nhắn của người dùng vào danh sách
            const userMessage: Message = {
                id: Date.now().toString(),
                role: "user",
                content: input,
            }

            const placeholderAssistantMessage: Message = {
                id: (Date.now() + 1).toString(), // Đảm bảo ID khác với user message
                role: "assistant",
                content: "",
            }

            setMessages((prev) => [...prev, userMessage, placeholderAssistantMessage])
            setInput("")
            setIsLoading(true)

            try {
                // Gửi tin nhắn lên API
                const response = await sendMessagesApi(guestData.session_id, imageFile, input, guestData.guest_token)

                // console.log(response);
                if (response.status === 401) {
                    toast.error("Hãy đăng nhập lại , tài khoản đã hết hạn ")
                    window.location.href = "/sign-in";
                }
                removeImage();
                setPreview(null);
                await fetchMessages()

            } catch (error) {
                console.error("Lỗi khi gửi tin nhắn:", error)
                toast.error("Gửi tin nhắn thất bại, thử lại sau!")
            } finally {
                setIsLoading(false)
            }
        } else {
            if (!input.trim()) return toast.error("Vui lòng nhập câu hỏi")

            if (!accessToken) {
                toast.error("Đăng nhập hết hạn")
                return
            }
            if (!sessionId) {
                return
            }


            setPreview(null);
            // Thêm tin nhắn của người dùng vào danh sách
            const userMessage: Message = {
                id: Date.now().toString(),
                role: "user",
                content: input,
            }

            const placeholderAssistantMessage: Message = {
                id: (Date.now() + 1).toString(), // Đảm bảo ID khác với user message
                role: "assistant",
                content: "",
            }

            setMessages((prev) => [...prev, userMessage, placeholderAssistantMessage])
            setInput("")
            setIsLoading(true)

            try {
                // Gửi tin nhắn lên API
                const response = await sendMessagesApi(sessionId, imageFile, input, accessToken)

                // console.log(response);
                if (response.status === 401) {
                    toast.error("Hãy đăng nhập lại , tài khoản đã hết hạn ")
                    window.location.href = "/sign-in";
                }
                removeImage();
                setPreview(null);
                await fetchMessages()

            } catch (error) {
                console.error("Lỗi khi gửi tin nhắn:", error)
                toast.error("Gửi tin nhắn thất bại, thử lại sau!")
            } finally {
                setIsLoading(false)
            }
        }


    }



    // console.log("imageFile", imageFile)

    return (


        <div className="dark:bg-slate-800 flex flex-col md:max-h-[490px] max-h-[600px] md:min-h-[490px] overflow-hidden relative justify-between">


            <ChatMessages messages={messages} loading={isLoading} />


            <div className="w-full relative ">
                <div className="max-w-3xl mx-auto relative ">
                    <div className="rounded-3xl p-2 bg-white border border-gray-200 shadow-sm dark:bg-gray-700 dark:border-gray-700">
                        <ChatInput
                            input={input}
                            setInput={setInput}
                            handleSubmit={handleSubmit}
                            isLoading={isLoading}
                        />
                        {/* Overlay when isLoading */}
                        {isLoading && (
                            <div className="absolute rounded-3xl inset-0 bg-black/10 flex items-center justify-center z-10">
                                <Spinner />
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </div>



    )
}

