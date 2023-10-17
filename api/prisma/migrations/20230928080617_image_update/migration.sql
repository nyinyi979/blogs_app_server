-- CreateTable
CREATE TABLE `_ImageToPost` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ImageToPost_AB_unique`(`A`, `B`),
    INDEX `_ImageToPost_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ImageToPost` ADD CONSTRAINT `_ImageToPost_A_fkey` FOREIGN KEY (`A`) REFERENCES `Image`(`url`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ImageToPost` ADD CONSTRAINT `_ImageToPost_B_fkey` FOREIGN KEY (`B`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
