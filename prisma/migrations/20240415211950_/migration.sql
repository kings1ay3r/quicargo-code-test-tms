-- CreateTable
CREATE TABLE "trucks" (
    "id" SERIAL NOT NULL,
    "uid" UUID NOT NULL,
    "licence_plate" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "make" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL CHECK (year >= 1900 AND year <= 2100),
    "capacity" INTEGER NOT NULL,
    "createdBy" VARCHAR(21) NOT NULL,
    "deletedBy" VARCHAR(21),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),
    "location_id" INTEGER NOT NULL,

    CONSTRAINT "trucks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "locations" (
    "id" SERIAL NOT NULL,
    "uid" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "address" VARCHAR(255),
    "lattitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "createdBy" VARCHAR(21) NOT NULL,
    "deletedBy" VARCHAR(21),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "locations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "trucks_uid_key" ON "trucks"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "locations_uid_key" ON "locations"("uid");

-- AddForeignKey
ALTER TABLE "trucks" ADD CONSTRAINT "trucks_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
