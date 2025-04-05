"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import remarkMath from "remark-math";
import { Spinner } from "../providers/spinner";
import { ScrollArea } from "../ui/scroll-area";
import Image from "next/image";
import quyettam from "../../public/image/image2/2k7.jpg";
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

  if (messages.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-center p-4">
        <div className="max-w-full space-y-2">
          <h2 className=" md:text-2xl text-l font-bold">Chào mừng đến với trợ lý học tập AI GIRC</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Bạn hãy đưa ra yêu cầu , để chúng tôi hỗ trợ bạn!
          </p>
          <div >
          <Image src={quyettam} alt="hehe" className="w-full h-[270px] object-contain"/>
        </div>
        </div>
      </div>
    );
  }
  // để không bị giới hạn thời gian sử dụng , bạn nên đăng ký là thành viên của hệ thống
  return (
    <ScrollArea className="flex-1 h-full overflow-y-scroll " type="always">
      <div className="max-w-3xl w-full mx-auto">
        <div className="p-2 space-y-4 ">
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={cn(
                "flex w-full",
                message.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "flex items-start gap-3 max-w-[80%]",
                  message.role === "user" ? "flex-row-reverse" : "flex-row"
                )}
              >
                <div
                  className={cn(
                    "rounded-lg px-4 py-2 w-full text-sm shadow relative",
                    message.role === "user"
                      ? "text-white bg-gradient-to-r from-blue-500 to-blue-700"
                      : "bg-muted dark:bg-black text-muted-foreground"
                  )}
                >
                  <ReactMarkdown
                    remarkPlugins={[remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                  >
                    {formatLatexContent(message.content)}
                  </ReactMarkdown>
                  {loading && index === messages.length - 1 && (
                    <div className="absolute  bottom-2 right-2 flex items-center justify-center z-10">
                      <Spinner className="text-black " size={"small"} />
                    </div>
                  )}

                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} id="end-of-messages" />
        </div>
      </div>
    </ScrollArea>
  );
}