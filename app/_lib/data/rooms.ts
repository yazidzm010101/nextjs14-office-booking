"use server";

import prisma from "@/db/prisma";

export async function getRoomsByOfficeId(
  officeId?: string,
  currentPage: number = 1,
  itemPerPage: number = 10
) {
  if (!officeId) {
    return [];
  }

  // await new Promise((resolve) => setTimeout(resolve, 5000));
  const rooms = await prisma.room.findMany({
    where: {
      office_id: officeId,
    },
    skip: (currentPage - 1) * itemPerPage,
    take: itemPerPage,
  });
  return rooms;
}

export async function getRoomsByOfficeIdPagesCount(
  officeId?: string,
  itemPerPage: number = 10
) {
  if (!officeId) {
    return null;
  }
  const count = await prisma.room.count({
    where: { office_id: officeId },
  });
  return Math.ceil(count / itemPerPage);
}
