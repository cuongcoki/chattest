"use client"

import type React from "react"

import { ArrowUpIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { AutoResizeTextarea } from "../ui/AutoResizeTextarea"
import { ImageUploader } from "../ui/ImageUploader"
import { useImageStore } from "@/store/imageStore"
import { ImageDisplay } from "../shared/image-display"
interface ChatInputProps {
    input: string
    setInput: (input: string) => void
    handleSubmit: (e: React.FormEvent) => void
    isLoading: boolean
}

export function ChatInput({ input, setInput, handleSubmit }: ChatInputProps) {
    const { preview } = useImageStore();
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSubmit(e)
        }
    }

    return (


        <div className="w-full max-w-3xl mx-auto  relative dark:bg-slate-700">
            <form
                onSubmit={handleSubmit}
            >
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
                        <div >
                            {!preview && <ImageUploader />}
                        </div>
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
            </form>
        </div>
    )
}

