"use client"

import type React from "react"

import { ArrowUpIcon, File } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { AutoResizeTextarea } from "../ui/AutoResizeTextarea"
import { ImageUploader } from "../ui/ImageUploader"
import { useImageStore } from "@/store/imageStore"
import { ImageDisplay } from "../shared/image-display"
import InputLatex from "./input-latex"
import { useLatexStore } from "@/store/latexStore"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"


import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import remarkMath from "remark-math";
import { useState } from "react"

interface ChatInputProps {
    input: string
    setInput: (input: string) => void
    handleSubmit: (e: React.FormEvent) => void
    isLoading: boolean
}

interface ChatInputProps {
    input: string;
    setInput: (input: string) => void; // KHÔNG phải setState kiểu callback
}

export function ChatInput({ input, setInput, handleSubmit }: ChatInputProps) {
    const { preview } = useImageStore();
    const { setLatexValue, latexValue } = useLatexStore();
    const [open, setOpen] = useState(false);
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {

        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSubmit(e)
        }
    }

    const importToMain = () => {
        if (latexValue.trim() !== '') {
            setInput(input + ` $${latexValue}$`);
            setLatexValue('');
        }
    };

    const formatLatexContent = (content: string) => {
        return content
            .replace(/\\\[/g, "$$")
            .replace(/\\\]/g, "$$")
            .replace(/\\\(/g, "$")
            .replace(/\\\)/g, "$");
    };


    return (
        <div className="w-full max-w-3xl mx-auto  relative dark:bg-slate-700">
            <form onSubmit={handleSubmit}>
                <div className="dark:bg-slate-700  bg-background relative mx-6  flex items-center py-1  text-sm" >
                    <AutoResizeTextarea
                        onKeyDown={handleKeyDown}
                        onChange={(v) => setInput(v)}
                        value={input}
                        placeholder="Hỏi bất kỳ điều gì"
                        className="placeholder:text-muted-foreground flex-1 bg-transparent focus:outline-none focus:ring-0"
                    />
                </div>

                <div className="absolute md:-left-10 md:-top-25 -left-2 -top-25">
                    <ImageDisplay />
                </div>

                <div className="mx-6 ">
                    <div className="flex items-center justify-between gap-2 mt-1">

                        <div className="flex items-center">
                            {!preview && <ImageUploader />}
                        </div>

                        <div className="flex items-center justify-center ">

                            <Dialog open={open} onOpenChange={setOpen}>
                                <DialogTrigger>
                                    <Tooltip>
                                        <TooltipTrigger asChild className='hover:bg-gray-100 '>
                                            <div>
                                                <div className='hidden  mr-2 border p-2 rounded-full md:flex justify-center items-center gap-1'>
                                                    <p className="text-xs text-gray-400 ">Xem đoạn chat</p>
                                                    <File size={16} />
                                                </div>
                                                <div className='md:hidden flex p-2 rounded-full '>
                                                    <File size={16} />
                                                </div>
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent sideOffset={12}>Xem đoạn chat</TooltipContent>
                                    </Tooltip>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Xem đoạn chat</DialogTitle>
                                        <DialogDescription aria-describedby="description1">
                                            <div className="mt-4 mb-2 h-[50px] rounded-lg px-4 py-2 w-full text-sm shadow relative break-words">
                                                <ReactMarkdown
                                                    remarkPlugins={[remarkMath]}
                                                    rehypePlugins={[rehypeKatex]}
                                                >
                                                    {`${formatLatexContent(input)}`}
                                                </ReactMarkdown>
                                            </div>
                                        </DialogDescription>
                                    </DialogHeader>
                                    <DialogFooter>
                                        <Button
                                            size="sm"
                                            className="md:text-lg px-2 py-1 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-sm shadow-md hover:from-blue-600 hover:to-blue-800 hover:shadow-lg active:scale-95 transition-all duration-300 ease-in-out"
                                            onClick={(e) => {
                                                handleSubmit(e);
                                                setOpen(false);
                                            }}
                                        >
                                            Gửi tin nhắn <ArrowUpIcon size={16} />
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>

                            <InputLatex importToMain={importToMain} />

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="sm" className=" bottom-1 right-1  rounded-full">
                                        <ArrowUpIcon size={16} />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent sideOffset={12}>Gửi tin nhắn</TooltipContent>
                            </Tooltip>

                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

