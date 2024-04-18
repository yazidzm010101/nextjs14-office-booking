"use client";

import {
  IconPaperclip,
  IconPhoto,
  IconUpload,
  IconX,
} from "@tabler/icons-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import getURL from "../lib/utils/getURL";
import { fileSize } from "../lib/utils/formatUtils";

function FilePicker({
  onChange,
  name,
}: {
  onChange?: (fileURL: string) => void;
  name: string;
}) {
  const [file, setFile] = useState<any>();
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState<any>(null);
  const [fileURL, setFileURL] = useState("");
  const [total, setTotal] = useState<number>(0);
  const [loaded, setLoaded] = useState<number>(0);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState("");
  const [req, setReq] = useState<XMLHttpRequest | undefined>();
  const inputRef = useRef<HTMLInputElement>(null);

  // this handle process to upload file into the server
  const uploadFile = () => {
    if (inputRef.current) {
      const fileTypeMap = [
        {
          type: "Image",
          extensions: "jpg|jpeg|png",
          icon: <IconPhoto />,
        },
        { type: "Document", extensions: "pdf", icon: <IconPaperclip /> },
      ];

      const files = inputRef?.current?.files || [];
      const file = files[0];

      
      if (!!file) {
        const fileExt = file.name.split(".").slice(-1)[0];
        const fileType = fileTypeMap.find((fileType) =>
          file.name.match(new RegExp(fileType.extensions))
        );
        setFileType(fileType);

        if (!fileType) {
          setStatus("error");
          setMessage(`".${fileExt}" file is not allowed!`);
          return;
        }

        setFile(file);
        setFileName(file.name);
        setTotal(file.size);
        setFile(URL.createObjectURL(file));
        const formData = new FormData();
        formData.append("file", file);

        const xhr = new XMLHttpRequest();

        xhr.open("POST", getURL("/api/upload"));
        xhr.onloadstart = () => setStatus("loading");
        xhr.upload.onprogress = function (e) {
          setLoaded(e.loaded);
          setTotal(e.total);
        };
        xhr.onload = function () {
          const response = JSON.parse(this.responseText);
          if (response.status == 201 || this.status == 201) {
            setFileName(response.data.fileName);
            setFileURL(response.data.urlPath);
            setStatus("idle");
            setMessage("Upload success");
          } else {
            setStatus("error");
            setMessage(response.message);
          }
          setReq(undefined)
        };

        xhr.onerror = function () {
          setStatus("error");
          setMessage(this.statusText);
          setReq(undefined)
        };
        xhr.onabort = function () {
          setStatus("idle");
          setLoaded(0);
          setMessage("");
          setReq(undefined)
        };

        setReq(xhr)
        xhr.send(formData);
      }
    }
  };

  const clearFile = () => {
    if (inputRef?.current) {
      inputRef.current.value = "";
      setStatus("idle");
      setFileName("");
      setFileURL("");
      setFile(null);
      setLoaded(0);
      setMessage("");
      req?.abort()
    }
  };

  useEffect(() => {
    if (fileURL) {
      onChange && onChange(fileURL);
    }
  }, [fileURL]);

  return (
    <div className="relative w-full flex items-center flex-nowrap max-w-sm bg-opacity-50 border border-black rounded-md border-opacity-[0.025] shadow-sm overflow-clip bg-gray-50">
      {!fileURL ? (
        <button
          className="flex items-center self-stretch flex-grow overflow-hidden"
          onClick={() => inputRef.current?.click()}
        >
          {/* DISPLAY FILE-TYPE ICON */}
          {fileType && (
            <div className="flex-shrink-0 flex items-center justify-center self-stretch p-0.5 w-12 bg-green-100 text-green-600 border-r border-green-200">
              {fileType.icon}
            </div>
          )}
          <div className="flex flex-col self-stretch justify-center flex-grow px-3 overflow-hidden text-sm text-gray-600">
          <div className="overflow-hidden text-ellipsis whitespace-nowrap text-start text-nowrap">
              {fileName || "Upload a file"}
            </div>
            <div className="overflow-hidden text-xs text-ellipsis whitespace-nowrap text-start text-nowrap">
            {status == "error" && (
              <span className="text-red-900 ">{message}</span>
            )}
            {status == "loading" && (
              <span className="text-xs text-gray-400 ">{fileSize(loaded)}/{fileSize(total)}</span>
            )}
            {status == "idle" && !fileURL &&  (
              <span className="text-xs text-gray-400 ">Allowed file: .jpg, .jpeg, .png, .pdf</span>
            )}
            {status == "idle" && fileURL && (
              <span className="text-xs text-gray-400 ">{ fileURL }</span>
            )}
            </div>
          </div>
        </button>
      ) : (
        <Link className="flex items-center self-stretch flex-grow overflow-hidden" href={fileURL} target="_blank">
          {/* DISPLAY FILE-TYPE ICON */}
          {fileType && (
            <div className="flex-shrink-0 flex items-center justify-center self-stretch p-0.5 w-12 bg-green-100 text-green-600 border-r border-green-200">
              {fileType.icon}
            </div>
          )}
          <div className="flex flex-col self-stretch justify-center flex-grow px-3 overflow-hidden text-sm text-gray-600">
            <div className="overflow-hidden text-ellipsis whitespace-nowrap text-start text-nowrap">
              {fileName}
            </div>
            <div className="overflow-hidden text-xs text-ellipsis whitespace-nowrap text-start text-nowrap">
            {status == "error" && (
              <span className="text-red-900 ">{message}</span>
            )}
            {status == "loading" && (
              <span className="text-xs text-gray-400 ">{fileSize(loaded)}/{fileSize(total)}</span>
            )}
            {status == "idle" && !fileURL &&  (
              <span className="text-xs text-gray-400 ">Allowed file: .jpg, .jpeg, .png, .pdf</span>
            )}
            {status == "idle" && fileURL && (
              <span className="text-xs text-gray-400 ">{ fileURL }</span>
            )}
            </div>
          </div>
        </Link>
      )}

      {/* UPLOAD BUTTON, IF ERROR WILL RE-UPLOAD INSTEAD PICK A FILE */}
      {status != "loading" && !fileURL && (
        <button
          className="m-2 text-gray-600 flex-shrink-0 w-8 h-8 p-0.5 rounded-full border flex items-center justify-center"
          onClick={() => status != "error" && inputRef?.current?.click() || uploadFile() }
        >
          <IconUpload className="w-full" />
        </button>
      )}
      {/* THIS BUTTON WILL CANCEL THE UPLOAD AND CLEAR IT */}
      {!!fileName && (
        <button
          className="m-2 text-gray-600 flex-shrink-0 w-8 h-8 p-0.5 rounded-full border flex items-center justify-center"
          onClick={clearFile}
        >
          <IconX className="w-full" />
        </button>
      )}
      <div className="absolute bottom-0 left-0 w-full">
        {status == "loading" && (
          <div
            className="h-1 bg-green-900"
            style={{ width: (loaded / total) * 98 + "%" }}
          />
        )}
      </div>
      <input
        style={{ display: "none" }}
        aria-hidden
        type="file"
        name="file"
        ref={inputRef}
        onChange={uploadFile}
      />
      <input
        style={{ display: "none" }}
        aria-hidden
        name={name}
        type="text"
        readOnly
        value={fileName}
      />
    </div>
  );
}

export default FilePicker;
