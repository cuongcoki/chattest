import React from "react";
import { X } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { useImageStore } from "@/store/imageStore";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog"


export const ImageDisplay: React.FC = () => {
    const { preview, removeImage } = useImageStore();

    if (!preview) {
        return null;
    }

    return (
        <div>
            <div className="mx-auto md:w-1/2">
                <div className="relative shadow-2xl">
                    <Carousel>
                        <CarouselContent>
                            <CarouselItem >

                                <Dialog>
                                    <DialogTrigger >
                                        <div className="md:max-h-[200px] max-h-[100px] flex aspect-square items-center justify-center">
                                            <img
                                                src={preview as string}
                                                alt="Uploaded image"
                                                className="h-full w-full rounded-lg aspect-square object-cover shadow-xl border-2"
                                            />
                                        </div>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <img
                                                src={preview as string}
                                                alt="Uploaded image"
                                                className="w-full h-full rounded-lg aspect-square object-contain shadow-xl border-2"
                                            />
                                        </DialogHeader>
                                    </DialogContent>
                                </Dialog>

                            </CarouselItem>
                        </CarouselContent>
                    </Carousel>
                    <button
                        type="button"
                        onClick={removeImage}
                        className="absolute -top-2 -right-2 bg-gray-200 text-white   p-2 rounded-full  bg-gradient-to-r from-blue-500 to-blue-700  font-semibold   shadow-md hover:from-blue-600 hover:to-blue-800 hover:shadow-lg active:scale-95 transition-all duration-300 ease-in-outtransition"
                    >
                        <X className="w-3 h-3" />
                    </button>
                </div>
            </div>
        </div>
    );
};   