/*
  Warnings:

  - Added the required column `roleId` to the `Menu` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Menu" ADD COLUMN     "roleId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Menu" ADD CONSTRAINT "Menu_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
