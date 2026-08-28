/*
  Warnings:

  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[public_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - The required column `public_id` was added to the `users` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
ADD COLUMN     "public_id" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_public_id_key" ON "users"("public_id");
