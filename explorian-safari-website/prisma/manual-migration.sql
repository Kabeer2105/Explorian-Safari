-- Manual migration to fix Inquiry and Faq tables
-- Run this SQL directly on your MySQL database

-- Add missing columns to Inquiry table
ALTER TABLE `Inquiry`
  ADD COLUMN IF NOT EXISTS `country` VARCHAR(191) NULL,
  ADD COLUMN IF NOT EXISTS `number_of_guests` INT NULL;

-- No schema changes needed for updated_at columns
-- They already exist, we just added @updatedAt directive in Prisma
-- which tells Prisma to automatically update them (no DB change required)

-- Note: The @updatedAt directive is a Prisma feature that doesn't change the database schema
-- It just tells Prisma to automatically set the value when updating records
