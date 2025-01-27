/*
  Warnings:

  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mobile` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SeatType" AS ENUM ('Punjab_85', 'Other_15');

-- CreateEnum
CREATE TYPE "CounsellingMode" AS ENUM ('Offline', 'Online');

-- CreateEnum
CREATE TYPE "SecondaryQualificationType" AS ENUM ('NonMedical', 'Medical', 'Vocational_Technical', 'Vocational_Non_Technical', 'ITI', 'DiplomaAny');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('onRoll', 'ex', 'dropped');

-- CreateEnum
CREATE TYPE "MatricBoardName" AS ENUM ('PSEB', 'CBSE', 'ICSE', 'OpenSchool', 'Other');

-- CreateEnum
CREATE TYPE "Branch" AS ENUM ('Architecture Assistantship', 'Civil Engineering', 'Computer Science and Engineering', 'Electronics and Communication Engg.', 'Electrical Engineering', 'Information Technology', 'Mechanical Engineering', 'Mechanical Engineering (Production)', 'Pharmacy');

-- CreateEnum
CREATE TYPE "Course" AS ENUM ('B.Tech.', 'M.Tech.', 'Diploma');

-- CreateEnum
CREATE TYPE "ScholarshipType" AS ENUM ('Full_Fee', 'CMS_100', 'CMS_90', 'CMS_80', 'CMS_70', 'FWS', 'PMS');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('General', 'O.B.C.', 'S.C./ S.T.', 'Other');

-- AlterEnum
ALTER TYPE "Roles" ADD VALUE 'Student';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "mobile" BIGINT NOT NULL;

-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "classRoll" TEXT NOT NULL,
    "boardRegNo" BIGINT NOT NULL DEFAULT 0,
    "batch" INTEGER NOT NULL,
    "course" "Course" NOT NULL,
    "branch" "Branch" NOT NULL,
    "leet" BOOLEAN NOT NULL DEFAULT false,
    "semester" INTEGER NOT NULL,
    "admission_date" DATE NOT NULL,
    "counsellingMode" "CounsellingMode" NOT NULL,
    "onlineCounsellingNo" INTEGER,
    "seat_type" "SeatType" NOT NULL,
    "name" TEXT NOT NULL,
    "fatherName" TEXT NOT NULL,
    "motherName" TEXT NOT NULL,
    "dob" DATE NOT NULL,
    "mobile" BIGINT NOT NULL,
    "email" TEXT NOT NULL,
    "parentMobile" BIGINT NOT NULL,
    "bloodGroup" TEXT NOT NULL,
    "studentCategory" "Category" NOT NULL,
    "scholarshipType" "ScholarshipType" NOT NULL,
    "adhaarNo" BIGINT NOT NULL,
    "isEligibleVoter" BOOLEAN NOT NULL,
    "epicNo" TEXT,
    "address" TEXT NOT NULL,
    "familyOccupation" TEXT NOT NULL,
    "familyIncome" INTEGER NOT NULL,
    "onRollStatus" "Status" NOT NULL,
    "dataInsertAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataValidated" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Qualification" (
    "id" SERIAL NOT NULL,
    "matricBoardName" "MatricBoardName" NOT NULL,
    "matricSchoolName" TEXT NOT NULL,
    "matricRegNo" TEXT NOT NULL,
    "matricTotalMarks" INTEGER NOT NULL,
    "matricObtainedMarks" INTEGER NOT NULL,
    "matricPercentage" INTEGER NOT NULL,
    "secondaryQualificationType" "SecondaryQualificationType",
    "secondaryQualificationBoardName" TEXT,
    "secondaryQualificationRegNo" TEXT,
    "secondaryQualificationTotalMarks" INTEGER,
    "secondaryQualificationObtainedMarks" INTEGER,
    "secondaryQualificationPercentage" INTEGER DEFAULT 0,

    CONSTRAINT "Qualification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_boardRegNo_key" ON "Student"("boardRegNo");

-- CreateIndex
CREATE UNIQUE INDEX "Student_adhaarNo_key" ON "Student"("adhaarNo");

-- CreateIndex
CREATE UNIQUE INDEX "Qualification_matricRegNo_key" ON "Qualification"("matricRegNo");

-- CreateIndex
CREATE UNIQUE INDEX "Qualification_secondaryQualificationRegNo_key" ON "Qualification"("secondaryQualificationRegNo");
