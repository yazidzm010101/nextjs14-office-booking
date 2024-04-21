import prisma from "@/db/prisma";

export async function getAvailability(dateInput: Date) {
  const offsetStart = new Date(dateInput);
  const offsetEnd = new Date(dateInput);
  offsetStart.setHours(0, 0, 0, 0);
  offsetStart.setHours(24, 0, 0, 0);

  // await new Promise((resolve) => setTimeout(resolve, 5000));

  const rooms = await prisma.room.findMany();

  const roomsAvailability = await Promise.all(
    rooms.map(async (item) => {
      const reservations = await prisma.reservation.findMany({
        where: {
          date_time_start: { gte: offsetStart },
          date_time_end: { lt: offsetEnd },
          status: "reserved",
          room_id: item.id,
        },
      });
      const total_hours = reservations.reduce((store, item) => {
        const duration =
          (item.date_time_end.getTime() - item.date_time_start.getTime()) /
          (3600 * 1000);
        store += duration;
        return duration;
      }, 0);
      const populated_percentage = (total_hours / 9) * 100;
      return { ...item, populated_percentage: populated_percentage };
    })
  );
  return roomsAvailability;
}
