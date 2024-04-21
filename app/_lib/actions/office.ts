"use server";

import prisma from "@/db/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export type OfficeState = {
  errors?: {
    name?: string[];
    address?: string[];
    description?: string[];
    room_duration_min?: string[];
    room_duration_max?: string[];
    photo?: string[];
  };
  data?: Record<string, any>;
  message?: string | null;
  success?: boolean;
};

const OfficeFormSchema = z.object({
  id: z.string(),
  name: z.string({ invalid_type_error: "Please enter the office name." }),
  address: z.string({
    invalid_type_error: "Please enter the address of the office.",
  }),
  description: z.string(),
  room_duration_min: z.string(),
  room_duration_max: z.string(),
  photo: z.string(),
});

export async function addOffice(
  _prevState: OfficeState | undefined,
  formData: FormData
) {
  const validatedFields = OfficeFormSchema.omit({ id: true }).safeParse({
    name: formData.get("name"),
    address: formData.get("address"),
    description: formData.get("description"),
    room_duration_min: formData.get("room_duration_min") || "",
    room_duration_max: formData.get("room_duration_max") || "",
    photo: formData.get("photo"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please fill out the form properly.",
    };
  }

  const data = validatedFields.data;
  const office = await prisma.office.create({ data });

  revalidatePath("/dashboard/settings/offices");

  return {
    message: `Office succesfully created`,
    data: office,
    success: true,
  };
}
