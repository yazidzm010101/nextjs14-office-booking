import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { capitalize } from "../lib/utils/formatUtils";

const prisma = new PrismaClient();

const users = [
  {
    username: "yazidzm",
    role: "requestor",
    name: "Yazid",
    password: "12345678",
  },
  {
    username: "mujadid",
    role: "requestor",
    name: "Mujadid",
    password: "12345678",
  },
  { username: "admin", role: "admin", name: "Admin", password: "12345678" },
];

const offices = [
  {
    name: "Salt & Paper",
    address: "Jl. Perjuangan, Kedoya Center, Kebon Jeruk",
    description: "First & Second Floor",
    photo: "",
    room_duration_min: "1h",
    room_duration_max: "4h",
  },
  {
    name: "SALTY",
    address: "Jl. Perjuangan, Kedoya Center, Kebon Jeruk",
    description: "Fourth Floor",
    photo: "",
    room_duration_min: "1h",
    room_duration_max: "4h",
  },
];

async function main() {
  for (const { username, name, role, password } of users) {
    await prisma.user.upsert({
      where: { username },
      create: {
        username,
        name,
        role,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
      },
      update: {},
    });
  }

  await prisma.room.deleteMany();

  for (const j in offices) {
    const {
      name,
      address,
      description,
      photo,
      room_duration_min,
      room_duration_max,
    } = offices[j];
    const office = await prisma.office.upsert({
      where: { name },
      create: {
        name,
        address,
        description,
        photo,
        room_duration_min,
        room_duration_max,
      },
      update: {},
    });

    for (let i = 1; i <= 3; i++) {
      const officeName = capitalize(faker.hacker.adjective()) + " " + " Room";
      await prisma.room.create({
        data: {
          name: officeName,
          office_id: office.id,
          description: "",
          photo: "",
        },
      });
    }
  }
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
