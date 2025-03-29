import React from "react";
import { useDropzone } from "react-dropzone";
import { ImagePlus, Trash2 } from "lucide-react";
import { Input } from "./input";
import { Carousel, CarouselContent, CarouselItem } from "./carousel";
import { useImageStore } from "@/store/imageStore";

export const ImageUploader: React.FC = () => {
    const {  setImageFile, preview, setPreview, removeImage } = useImageStore();

    const onDrop = React.useCallback((acceptedFiles: File[]) => {
        const reader = new FileReader();
        reader.onload = () => {
            setPreview(reader.result);
        };
        reader.readAsDataURL(acceptedFiles[0]);
        setImageFile(acceptedFiles[0]);
    }, [setImageFile, setPreview]);

    const { getRootProps, getInputProps, fileRejections } = useDropzone({
        onDrop,
        maxFiles: 1,
        maxSize: 5000000,
        accept: { "image/png": [], "image/jpg": [], "image/jpeg": [] },
    });

    const handleRemoveImage = () => {
        removeImage(); 
    };

    return (
        <div className="space-y-4">
            <div className="mx-auto md:w-1/2">
                <div {...getRootProps()} className="relative">
                    {preview ? (
                        <div className="relative shadow-2xl">
                            <Carousel>
                                <CarouselContent>
                                    <CarouselItem>
                                        <img
                                            src={preview as string}
                                            alt="Uploaded image"
                                            className="max-h-[200px] rounded-lg aspect-square object-cover"
                                        />
                                    </CarouselItem>
                                </CarouselContent>
                            </Carousel>
                            <button
                                type="button"
                                onClick={handleRemoveImage}
                                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition"
                            >
                                <Trash2 className="w-3 h-3" />
                            </button>
                        </div>
                    ) : (
                        <ImagePlus className="block" />
                    )}
                    <Input {...getInputProps()} type="file" />
                </div>
                {fileRejections.length !== 0 && (
                    <p className="text-destructive">Hình ảnh phải nhỏ hơn 5MB và có định dạng png, jpg hoặc jpeg</p>
                )}
            </div>
        </div>
    );
};
