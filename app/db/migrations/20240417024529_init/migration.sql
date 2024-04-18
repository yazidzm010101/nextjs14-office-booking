-- CreateTable
CREATE TABLE "User" (
    "id" VARCHAR(64) NOT NULL,
    "name" VARCHAR(64) NOT NULL,
    "username" VARCHAR(64) NOT NULL,
    "role" VARCHAR(32) NOT NULL,
    "password" VARCHAR NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Office" (
    "id" VARCHAR(64) NOT NULL,
    "name" VARCHAR NOT NULL,
    "address" TEXT NOT NULL,
    "description" VARCHAR NOT NULL,
    "room_duration_min" VARCHAR(16) NOT NULL,
    "room_duration_max" VARCHAR(16) NOT NULL,
    "photo" TEXT NOT NULL,

    CONSTRAINT "Office_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "id" VARCHAR(64) NOT NULL,
    "name" VARCHAR(64) NOT NULL,
    "description" VARCHAR NOT NULL,
    "photo" TEXT NOT NULL,
    "office_id" VARCHAR(64) NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "id" VARCHAR(64) NOT NULL,
    "office_id" VARCHAR(64) NOT NULL,
    "date_time_start" TIMESTAMP(3) NOT NULL,
    "date_time_end" TIMESTAMP(3) NOT NULL,
    "room_id" VARCHAR(64) NOT NULL,
    "status" VARCHAR(32) NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_office_id_fkey" FOREIGN KEY ("office_id") REFERENCES "Office"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_office_id_fkey" FOREIGN KEY ("office_id") REFERENCES "Office"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
