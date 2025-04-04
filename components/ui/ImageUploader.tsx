import React, { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { ImagePlus, Clipboard } from "lucide-react";
import { Input } from "./input";
import { useImageStore } from "@/store/imageStore";

export const ImageUploader: React.FC = () => {
  const { setImageFile, setPreview } = useImageStore();

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
    setImageFile(file);
  };

  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        processFile(acceptedFiles[0]);
      }
    },
    [setImageFile, setPreview]
  );

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    onDrop,
    maxFiles: 1,
    maxSize: 5000000,
    accept: { "image/png": [], "image/jpg": [], "image/jpeg": [] },
  });

  // Handle clipboard paste event
  useEffect(() => {
    const handlePaste = (event: ClipboardEvent) => {
      const items = event.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          const file = items[i].getAsFile();
          if (file) {
            // Check file size
            if (file.size > 5000000) {
              alert("Hình ảnh phải nhỏ hơn 5MB");
              return;
            }
            
            // Process the pasted image
            processFile(file);
            break;
          }
        }
      }
    };

    // Add the event listener
    document.addEventListener("paste", handlePaste);

    // Remove the event listener on cleanup
    return () => {
      document.removeEventListener("paste", handlePaste);
    };
  }, [setImageFile, setPreview]);

  return (
    <div className="w-full">
      <div className="relative">
        <div
          {...getRootProps()}
          className="border-2 border-dashed border-gray-300 rounded-lg p-2 hover:border-blue-500 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <ImagePlus className="w-6 h-6 text-gray-400" />
              <Clipboard className="w-6 h-6 text-gray-400" />
            </div>
            <div className="flex flex-col">
              <p className="text-xs text-gray-500">
                Kéo thả, nhấp hoặc <span className="font-medium">dán (Ctrl+V)</span> để chọn ảnh
              </p>
              <p className="text-xs text-gray-400 mt-1">
                PNG, JPG hoặc JPEG (tối đa 5MB)
              </p>
            </div>
          </div>
          <Input {...getInputProps()} type="file" />
        </div>
        {fileRejections.length !== 0 && (
          <p className="text-destructive text-xs ">
            Hình ảnh phải nhỏ hơn 5MB và có định dạng png, jpg hoặc jpeg
          </p>
        )}
      </div>
    </div>
  );
};