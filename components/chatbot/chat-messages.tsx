"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import remarkMath from "remark-math";
import { Spinner } from "../providers/spinner";

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
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
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
        <div className="max-w-md space-y-2">
          <h2 className="text-2xl font-bold">Welcome to AI Chatbot</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Hãy bắt đầu cuộc trò chuyện nào!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
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
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {/* Nội dung tin nhắn hiển thị Markdown + LaTeX */}
              <ReactMarkdown
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex]}
              >
                {formatLatexContent(message.content)}
              </ReactMarkdown>

              {/* Chỉ hiển thị loading ở tin nhắn cuối cùng */}
              {loading && index === messages.length - 1 && (
                <div className="absolute  inset-0 bg-black rounded-full w-[38px] h-[38px] flex items-center justify-center z-10">
                  <Spinner className="text-white" size={"small"}/>
                </div>
              )}

              {/* Thời gian gửi (nếu có) */}
              {message.createdAt && (
                <div className="mt-1 text-[10px] text-right text-gray-400">
                  {new Date(message.createdAt).toLocaleTimeString("vi-VN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}