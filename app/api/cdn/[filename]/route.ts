import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";

export async function GET(
  req: NextApiRequest,
  { params }: { params: { filename: string } },
  res: NextApiResponse
) {
  const fileName = params.filename;
  
  const fileExt = fileName.split(".").slice(-1)[0];
  const filePath = path.join(process.cwd(), "storage/" + fileName);
  const file = fs.readFileSync(filePath);

  if (file) {
    if (["jpg", "jpeg", "png"].includes(fileExt)) {
      return new Response(file, {
        headers: { "Content-Type": "image/" + fileExt },
      });
    } else if (fileExt == "pdf") {
      return new Response(file, {
        headers: { "Content-Type": "application/" + fileExt },
      });
    }
  }
  return Response.json(
    {
      message: "File not found!",
      status: 404,
    },
    { status: 404 }
  );
}
