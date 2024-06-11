"use client";

import "react-toastify/dist/ReactToastify.css";

import { ToastContainer, toast } from "react-toastify";
import { useCallback, useState } from "react";

import { Exit } from "@/images";
import { Loader } from "@/components";
import { useDropzone } from "react-dropzone";

function hasFiles(files: File[]): boolean {
  if (files.length > 0) return true;
  toast.error("This file type is not allowed");
  return false;
}

function hasCorrectSize(file: File): boolean {
  const MAX_SIZE = 1024 * 1024 * 2;
  if (file.size <= MAX_SIZE) return true;
  toast.info("This file size exceeded 2MB");
  return false;
}

export const Uploader = () => {
  const [isLoadingImage, setIsLoadingImage] = useState<boolean>(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (!hasFiles(acceptedFiles)) return;

    const [image] = acceptedFiles;

    if (!hasCorrectSize(image)) return;

    console.log(image);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png", ".webp", ".gif"],
    },
  });

  if (isLoadingImage) {
    return <Loader />;
  }

  return (
    <>
      <section
        className={`mx-4 w-[540px] h-[400px] p-3 rounded-lg shadow-lg ${
          isDragActive
            ? "bg-slate-100 dark:bg-slate-800"
            : "bg-cc-white dark:bg-cc-midnight-blue"
        }`}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <div className="border-2 dark:border-cc-outer-space-light border-dashed h-full rounded-lg flex justify-center items-center flex-col gap-5">
          <Exit />
          <div className="text-center">
            <p className="dark:text-cc-white">
              Drag & drop file or{" "}
              <span className="text-cc-royal-blue">browse files</span>
            </p>
            <p className="mt-2 dark:text-cc-platinum text-sm">
              JPG, PNG or GIF - Max fle size 2MB
            </p>
          </div>
        </div>
      </section>
      <ToastContainer theme="dark" position="bottom-center" />
    </>
  );
};
