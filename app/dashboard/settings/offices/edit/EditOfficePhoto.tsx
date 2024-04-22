"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { editOfficePhoto } from "~/_lib/actions/office";
import FilePickerAPI from "~/_lib/components/FilePickerAPI";

function EditOfficePhoto({ id, name, photo }: { id: string, name?: string; photo?: string }) {
  const handleUpdate = editOfficePhoto.bind(null, id)
  const [state, dispatch] = useFormState(handleUpdate, undefined)
  const [updating, setUpdating] = useState(false)
  const onChange = (fileURL: string) => {
    const formData = new FormData()
    formData.set("photo", fileURL)
    setUpdating(true)
    dispatch(formData)
  }
  useEffect(() => {
    if (state?.success) {
      setUpdating(false)
    }
  }, [state])
  return (
    <FilePickerAPI name="photo" id="photo" defaultValue={photo} onChange={onChange}>
      {({ fileURL, onFilePickerOpen, status }) => {
        return (
          <>
            {(status != "loading") || updating ? (
              <button
                type="button"
                className="absolute top-0 left-0 flex items-center justify-center w-full h-full p-2 text-transparent transition-all duration-200 bg-transparent rounded-lg hover:text-white hover:bg-black/90"
                onClick={onFilePickerOpen}
              >
                Change Picture
              </button>
            ) : (
              <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full p-2 text-white rounded-lg backdrop-blur-lg bg-black/80">
                Uploading...
              </div>
            )}
            <Image
              width={200}
              height={200}
              alt={name + " photo"}
              className="object-cover w-full h-full rounded-lg"
              src={
                fileURL ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXpYBvB9NK7nv3Bvw__8l9xz0zur9ZwgensBDcw1pDNw&s"
              }
            />
          </>
        )
      }}
    </FilePickerAPI>
  );
}

export default EditOfficePhoto;
