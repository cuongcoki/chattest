"use client"

import type React from "react"

import { ArrowUpIcon, File, Keyboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { AutoResizeTextarea } from "../ui/AutoResizeTextarea"
import { ImageUploader } from "../ui/ImageUploader"
import { useImageStore } from "@/store/imageStore"
import { ImageDisplay } from "../shared/image-display"

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
import { useEffect, useState } from "react"
import { MathField } from "./testinputlatext"
import { useLatexStore } from '@/store/latexStore';
import { Card, CardContent } from "../ui/card"

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


export function ChatInput({ input, setInput, handleSubmit,isLoading }: ChatInputProps) {
    const { preview } = useImageStore();
    const { setLatexValue, latexValue } = useLatexStore();
    const [open, setOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (!isLoading) {
                handleSubmit(e);
            }
        }
    }
    

    useEffect(() => {
        const handleGlobalKeyDown = (e: KeyboardEvent) => {
            const activeElement = document.activeElement;
            const isTypingField = activeElement instanceof HTMLTextAreaElement ||
                activeElement instanceof HTMLInputElement;
    
            if (isTypingField) return;
    
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (!isLoading) {
                    handleSubmit(e as unknown as React.FormEvent);
                }
            }
        };
    
        window.addEventListener('keydown', handleGlobalKeyDown);
        return () => {
            window.removeEventListener('keydown', handleGlobalKeyDown);
        };
    }, [handleSubmit, isLoading]);
    

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


    const toggleKeyboardShortcut = (event: KeyboardEvent) => {
        if (event.ctrlKey && event.key.toLowerCase() === 'k') {
            event.preventDefault();
            toggleKeyboardVisibility();
        }
    };

    const [keyboardVisible, setKeyboardVisible] = useState(false);

    const toggleKeyboardVisibility = () => {
        const vk = (window).mathVirtualKeyboard;
        if (vk) {
            if (vk.visible) {
                vk.hide();
                setKeyboardVisible(false);
            } else {
                vk.show();
                setKeyboardVisible(true);
            }
        }
    };


    useEffect(() => {
        window.addEventListener('keydown', toggleKeyboardShortcut);
        return () => {
            window.removeEventListener('keydown', toggleKeyboardShortcut);
        };
    }, []);


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
                                        <TooltipTrigger asChild >
                                            <div>
                                                {/* <div className='hidden  mr-2 border p-2 rounded-full md:flex justify-center items-center gap-1'>
                                                    <p className="text-xs text-gray-400 ">Xem đoạn chat</p>
                                                    <File size={16} />
                                                </div> */}
                                                <div className=' flex p-2 rounded-full '>
                                                    <File size={18} />
                                                </div>
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent sideOffset={12}>Xem đoạn chat</TooltipContent>
                                    </Tooltip>
                                </DialogTrigger>
                                <DialogContent >
                                    <DialogHeader>
                                        <DialogTitle>Xem đoạn chat</DialogTitle>
                                        <DialogDescription aria-describedby="description1">
                                            <Card className="w-full  ">
                                                <CardContent className="px-4 py-2 w-full text-sm  relative break-words overflow-wrap-anywhere">
                                                    <ReactMarkdown
                                                        remarkPlugins={[remarkMath]}
                                                        rehypePlugins={[rehypeKatex]}
                                                        components={{
                                                            p: ({ ...props }) => <p style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', overflow: 'hidden' }} {...props} />,
                                                            code: ({ ...props }) => <code style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', overflow: 'hidden' }} {...props} />,
                                                            pre: ({ ...props }) => <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', overflow: 'hidden', maxWidth: '100%' }} {...props} />,
                                                        }}
                                                    >
                                                        {formatLatexContent(input)}
                                                    </ReactMarkdown>
                                                </CardContent>
                                            </Card>
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



                            <Dialog open={isOpen} onOpenChange={setIsOpen} modal>
                                <DialogTrigger>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <div>
                                                {/* <div className='hidden mr-2 border p-2 rounded-full md:flex justify-center items-center gap-1'>
                                                    <p className="text-xs text-gray-400">Nhập công thức</p>
                                                    <Keyboard size={16} />
                                                </div> */}
                                                <div className=' flex p-2 rounded-full'>
                                                    <Keyboard size={18} />
                                                </div>
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent sideOffset={12}>Mở công thức</TooltipContent>
                                    </Tooltip>
                                </DialogTrigger>
                                <DialogContent onPointerDownOutside={(e) => {
                                    e.preventDefault();
                                }}>
                                    <DialogHeader>
                                        <DialogTitle>Nhập công thức</DialogTitle>
                                        <DialogDescription aria-describedby="description9">

                                            <div className="w-[370px] sm:w-[470px] md:w-[450px] lg:w-[400px] xl:w-[460px] overflow-hidden">
                                                <MathField
                                                    value={latexValue}
                                                    onChange={(val) => setLatexValue(val)}
                                                    className="w-full border max-w-full overflow-x-auto"
                                                />
                                            </div>

                                        </DialogDescription>
                                    </DialogHeader>
                                    <DialogFooter className="flex justify-between items-center">


                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <button
                                                    onClick={toggleKeyboardVisibility}
                                                    className="md:hidden flex items-center justify-center gap-1 md:text-lg px-2 py-1 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-sm shadow-md hover:from-blue-600 hover:to-blue-800 hover:shadow-lg active:scale-95 transition-all duration-300 ease-in-out"
                                                    type="button"
                                                >
                                                    <Keyboard size={20} />
                                                    {keyboardVisible ? 'Ẩn bàn phím' : 'Hiện bàn phím'}
                                                </button>
                                            </TooltipTrigger>
                                            <TooltipContent sideOffset={12}>Ctrl + K để tắt/ẩn bàn phím</TooltipContent>
                                        </Tooltip>

                                        <button
                                            onClick={() => {
                                                importToMain();
                                                setIsOpen(false);
                                                // Ẩn bàn phím khi đóng dialog
                                                if (keyboardVisible && typeof window !== 'undefined' && window.mathVirtualKeyboard) {
                                                    window.mathVirtualKeyboard.hide();
                                                    setKeyboardVisible(false);
                                                }
                                            }}
                                            className="md:text-lg px-2 py-1 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-sm shadow-md hover:from-blue-600 hover:to-blue-800 hover:shadow-lg active:scale-95 transition-all duration-300 ease-in-out"
                                            type="button"
                                        >
                                            Thêm vào đoạn chat
                                        </button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>





                            {/* <InputLatex importToMain={importToMain} /> */}

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="sm" className=" bottom-1 right-1  rounded-full">
                                        <ArrowUpIcon size={18} />
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

