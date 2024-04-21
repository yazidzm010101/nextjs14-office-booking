import getURL from "@/utils/text-utils";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.getAll("file")[0] as File;
  const fileName = new Date().getTime() + "_" + file.name.replace(/\s+/g, "_");
  const allowedFiles = ["jpg", "png", "jpeg", "pdf"];
  const fileExtension = file.name.split(".").slice(-1)[0];

  if (!allowedFiles.includes(fileExtension)) {
    return Response.json(
      {
        status: 400,
        message: `Sorry, uploading with filetype "${fileExtension}" is not allowed!`,
      },
      {
        status: 400,
      }
    );
  }

  const filePath = path.join(process.cwd(), "storage", fileName);
  const urlPath = getURL(path.join("api/cdn", fileName));
  const buffer = Buffer.from(await file.arrayBuffer());

  try {
    await writeFile(filePath, buffer);
    return NextResponse.json(
      { data: { urlPath, fileName }, message: "success", status: 201 },
      { status: 201 }
    );
  } catch (error) {
    return Response.json({ message: "failed", status: 500 }, { status: 500 });
  }
}
