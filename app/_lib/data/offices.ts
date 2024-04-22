'use server'

import prisma from "@/db/prisma";

export async function getOffices(
  currentPage: number = 1,
  itemPerPage: number = 10
) {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  const offices = await prisma.office.findMany({
    skip: (currentPage - 1) * itemPerPage,
    take: itemPerPage,
  });
  return offices;
}

export async function getOfficesPagesCount(itemPerPage: number = 10) {
  const count = await prisma.office.count();
  return Math.ceil(count / itemPerPage);
}

export async function getOfficeById(id?: string) {

  if (!id) {
    return null
  }

  const office = await prisma.office.findFirst({ where: { id: id } })
  return office
  
}