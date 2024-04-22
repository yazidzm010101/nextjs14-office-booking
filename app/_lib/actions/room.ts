"use server";

import prisma from "@/db/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export type RoomState = {
  errors?: {
    name?: string[];
    description?: string[];
    office_id?: string[];
    photo?: string[];
  };
  data?: Record<string, any>;
  message?: string | null;
  success?: boolean;
};

const RoomFormSchema = z.object({
  id: z.string(),
  name: z.string({ invalid_type_error: "Please enter the name" }),
  description: z.string({
    invalid_type_error: "Please enter the description.",
  }),
  office_id: z.string(),
  photo: z.string(),
});

export async function addRoom(
  _prevState: RoomState | undefined,
  formData: FormData
) {
  const validatedFields = RoomFormSchema.omit({ id: true }).safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    office_id: formData.get("office_id"),
    photo: formData.get("photo") || "",
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please fill out the form properly.",
    };
  }

  const data = validatedFields.data;
  const room = await prisma.room.create({ data });

  revalidatePath("/dashboard/settings/offices/edit?id=" + data.office_id);

  return {
    message: `Room succesfully created`,
    data: room,
    success: true,
  };
}

export async function editRoom(
  id: string,
  _prevState: RoomState | undefined,
  formData: FormData
) {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const validatedFields = RoomFormSchema.omit({ id: true }).safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    office_id: formData.get("office_id"),
    photo: formData.get("photo") || "",
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please fill out the form properly.",
    };
  }

  const newData = validatedFields.data;
  const oldRoom = await prisma.room.findFirst({ where: { id } });
  console.log({ data: { ...oldRoom, ...newData } });
  const office = await prisma.room.update({
    where: { id },
    data: { ...oldRoom, ...newData },
  });

  revalidatePath("/dashboard/settings/offices/edit?id=" + oldRoom?.office_id);

  return {
    message: `Room succesfully updated`,
    data: office,
    success: true,
  };
}

// export async function editOfficePhoto(
//   id: string,
//   _prevState: RoomState | undefined,
//   formData: FormData
// ) {
//   await new Promise((resolve) => setTimeout(resolve, 3000));
//   const validatedFields = RoomFormSchema.pick({photo: true}).safeParse({
//     photo: formData.get("photo"),
//   });

//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//       message: "Please fill out the form properly.",
//     };
//   }

//   const newData = validatedFields.data;
//   const oldOffice = await prisma.office.findFirst({where: {id}})
//   console.log({data: { ...oldOffice, ...newData }})
//   const office = await prisma.office.update({
//     where: { id },
//     data: { ...oldOffice, ...newData }
//   });

//   revalidatePath("/dashboard/settings/offices/edit?id=" + id);

//   return {
//     message: `Office succesfully updated`,
//     data: office,
//     success: true,
//   };
// }
