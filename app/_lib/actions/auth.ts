"use server";

import prisma from "@/db/prisma";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { z } from "zod";

const secret = process.env.JWT_SECRET || "";

export type SigninState = {
  errors?: {
    username?: string[];
    password?: string[];
  };
  message: string | null;
  data?: {
    refreshToken: string;
  };
};

const SigninFormSchema = z.object({
  username: z.string({ invalid_type_error: "Please enter your username." }),
  password: z.string({ invalid_type_error: "Please enter your password." }),
});

export async function signIn(
  _prevState: SigninState | undefined,
  formData: FormData
) {
  const validatedFields = SigninFormSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please fill out your username or password first.  ",
    };
  }

  const { username, password } = validatedFields.data;

  const user = await prisma.user.findUnique({ where: { username: username } });
  console.log({ user });
  if (!user) {
    return {
      errors: {
        username: ["Invalid username"],
      },
      message: "Invalid username",
    };
  }

  const match = bcryptjs.compareSync(password, user.password);
  if (!match) {
    return {
      errors: {
        username: ["Invalid password"],
      },
      message: "Invalid password",
    };
  }

  const token = jwt.sign(
    {
      data: {
        name: user.name,
        username: user.username,
      },
    },
    secret,
    {
      expiresIn: "1h",
    }
  );

  cookies().set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV == "production",
    maxAge: 60 * 60,
    path: "/",
  });

  return {
    message: `Welcome back ${user.name}`,
  };
}