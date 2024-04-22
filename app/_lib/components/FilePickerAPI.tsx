"use client";

import getURL from "@/utils/text-utils";
import {
  IconPaperclip,
  IconPhoto
} from "@tabler/icons-react";
import React, { ReactNode, useEffect, useRef, useState } from "react";

interface RenderProps {
  status?: "idle" | "loading" | "error";
  total?: number,
  loaded?: number,
  message?: string;
  fileURL?: string;
  fileName?: string;
  req?: XMLHttpRequest;
  uploadFile: () => void;
  onFilePickerOpen: () => void;
  clearFile: () => void;
}

function FilePickerAPI({
  defaultValue,
  name,
  id,
  children,
  onChange,
}: {
  defaultValue?: string;
  name: string;
  id: string;
  onChange: (fileURL: string) => void;
  children: (renderProps: RenderProps) => ReactNode;
}) {
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState<any>(null);
  const [fileURL, setFileURL] = useState(defaultValue || "");
  const [total, setTotal] = useState<number>(0);
  const [loaded, setLoaded] = useState<number>(0);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState("");
  const [req, setReq] = useState<XMLHttpRequest | undefined>();
  const inputRef = useRef<HTMLInputElement>(null);

  // console.log({inputRef})

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
        setFileName(file.name);
        setTotal(file.size);
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
            onChange(response.data.urlPath)
            setStatus("idle");
            setMessage("Upload success");
          } else {
            setStatus("error");
            setMessage(response.message);
          }
          setReq(undefined);
        };

        xhr.onerror = function () {
          setStatus("error");
          setMessage(this.statusText);
          setReq(undefined);
        };
        xhr.onabort = function () {
          setStatus("idle");
          setLoaded(0);
          setMessage("");
          setReq(undefined);
        };

        setReq(xhr);
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
      setLoaded(0);
      setMessage("");
      req?.abort();
    }
  };

  const onFilePickerOpen = () => {
    inputRef?.current?.click()
  }

  return (
    <React.Fragment>
      <input
        id={id}
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
        value={fileURL}
      />
      {children({ status, fileName, message, fileURL, req, total, loaded, uploadFile, clearFile, onFilePickerOpen })}
    </React.Fragment>
  );
}

export default FilePickerAPI;
