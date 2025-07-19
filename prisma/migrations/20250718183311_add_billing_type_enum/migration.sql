/*
  Warnings:

  - The `billingType` column on the `plans` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "BillingType" AS ENUM ('MONTHLY', 'YEARLY');

-- AlterTable
ALTER TABLE "plans" DROP COLUMN "billingType",
ADD COLUMN     "billingType" "BillingType" NOT NULL DEFAULT 'YEARLY';
