"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import remarkMath from "remark-math";
import { ScrollArea } from "../ui/scroll-area";
import Image from "next/image";
import quyettam from "../../public/image/image2/2k7.jpg";
import { Copy } from "lucide-react";
import toast from "react-hot-toast";
export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt?: string;
};

interface ChatMessagesProps {
  messages: Message[];
  loading: boolean
}

export function ChatMessages({ messages, loading }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Tự động scroll xuống cuối khi messages thay đổi
  useEffect(() => {
    const element = document.getElementById("end-of-messages");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  // Format LaTeX khi người dùng nhập thủ công dạng \( \)
  const formatLatexContent = (content: string) => {
    return content
      .replace(/\\\[/g, "$$")
      .replace(/\\\]/g, "$$")
      .replace(/\\\(/g, "$")
      .replace(/\\\)/g, "$");
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Copy nội dung thành công!");
    }).catch(err => {
      toast.error("Copy nội dung không thành công!", err);
    });
  };


  if (messages.length === 0) {
    return (
      <div className="relative flex items-center justify-center h-full text-center p-4">
        <div className="max-w-full space-y-2">
          <h2 className=" md:text-2xl text-l font-bold">Chào mừng đến với trợ lý học tập AI GIRC</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Bạn hãy đưa ra yêu cầu , để chúng tôi hỗ trợ bạn!
          </p>
          <div className="md:absolute left-0 right-0">
            <Image src={quyettam} alt="ảnh chúc 2k7 thi tốt" className="w-full h-[270px] object-contain" />
          </div>
        </div>
      </div>
    );
  }
  // để không bị giới hạn thời gian sử dụng , bạn nên đăng ký là thành viên của hệ thống
  return (
    <ScrollArea className="flex-1 h-full overflow-y-scroll " type="always">
      <div className="max-w-3xl w-full mx-auto">
        <div className=" p-2 space-y-4">
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={cn(
                "group relative flex w-full",
                message.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  " flex items-end gap-2 max-w-[80%] sm:max-w-[70%] md:max-w-[60%] lg:max-w-[80%]",
                  message.role === "user" ? "flex-row-reverse" : "flex-row"
                )}
              >
                {/* Nội dung tin nhắn */}
                <div
                  className={cn(
                    "rounded-lg px-4 py-2 w-full text-sm shadow relative break-words overflow-wrap-anywhere",
                    message.role === "user"
                      ? "text-white bg-gradient-to-r from-blue-500 to-blue-700"
                      : "bg-muted dark:bg-black text-muted-foreground"
                  )}
                >
                  <ReactMarkdown
                    remarkPlugins={[remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                    components={{
                      p: ({ ...props }) => <p style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', overflow: 'hidden' }} {...props} />,
                      code: ({ ...props }) => <code style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', overflow: 'hidden' }} {...props} />,
                      pre: ({ ...props }) => <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', overflow: 'hidden', maxWidth: '100%' }} {...props} />,
                    }}
                  >
                    {formatLatexContent(message.content)}
                  </ReactMarkdown>

                  {/* Loading animation */}
                  {loading && index === messages.length - 1 && (
                    <div className="w-full bottom-2 right-2 flex items-center justify-center z-10">
                      <div className="flex items-center justify-center">
                        <div className="flex space-x-2">
                          <div className="w-1 h-1 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-1 h-1 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-1 h-1 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Copy icon - ẩn mặc định, hiện khi hover cha */}
                {!loading || index !== messages.length - 1 ? (
                  <div
                    onClick={() => handleCopy(message.content)}
                    className={cn(
                      message.role === "user" ? "left-2" : "right-2",
                      " bottom-2 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer text-muted-foreground hover:text-blue-600"
                    )}
                  >
                    <Copy size={16} />
                  </div>
                ) : null}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} id="end-of-messages" />
        </div>

      </div>
    </ScrollArea>
  );
}