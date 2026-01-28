/*
  Warnings:

  - You are about to drop the column `published_at` on the `Publicacion` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Publicacion" DROP COLUMN "published_at",
ADD COLUMN     "published_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
