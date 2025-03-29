"use client"

import { useEffect, useState, type FormEvent } from "react"
import { ChatMessages, type Message } from "./chat-messages"
import { Card } from "../ui/card"
import { ChatInput } from "./chat-input"
import { useChatStore } from "@/store/chatStore"
import { useAuthStore } from "@/store/authStore"
import { chatMessagesApi, sendMessagesApi } from "@/api/chatbotApi"
import toast from "react-hot-toast"
import { useImageStore } from "@/store/imageStore"
import { Spinner } from "../providers/spinner"



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

    // console.log(sessionId)
    const fetchMessages = async () => {
        if (!accessToken) {
            toast.error("đăng nhập hết hạn");
            return;
        }
        if (!sessionId) {
            toast.error("ko thấy sessionId");
            return;
        }
        const response = await chatMessagesApi(accessToken, sessionId);
        const chatSession: ChatSession = response as ChatSession;
        setMessages(chatSession.messages);

        console.log(response)
    };
    useEffect(() => {
        fetchMessages();
    }, [sessionId]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        if (!input.trim()) return

        if (!accessToken) {
            toast.error("Đăng nhập hết hạn")
            return
        }
        if (!sessionId) {
            toast.error("Không thấy sessionId")
            return
        }

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

    // console.log("imageFile", imageFile)

    return (

        <div className="flex flex-col h-screen relative">
            {/* Chat messages container */}
            <div className="flex-1 w-full overflow-y-auto p-4 flex flex-col-reverse ">
                <div className="max-w-3xl w-full mx-auto relative">
                    <ChatMessages messages={messages} loading={isLoading} />
                </div>
            </div>

            {/* Chat input area */}
            <div className="p-4 w-full relative">
                <div className="max-w-3xl mx-auto relative">
                    <Card className="rounded-3xl relative">
                        <ChatInput
                            input={input}
                            setInput={setInput}
                            handleSubmit={handleSubmit}
                            isLoading={isLoading}
                        />

                        {/* Overlay khi isLoading */}
                        {isLoading && (
                            <div className="absolute  rounded-3xl inset-0  bg-black/10  flex items-center justify-center z-10">
                                <Spinner />
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </div>


    )
}

