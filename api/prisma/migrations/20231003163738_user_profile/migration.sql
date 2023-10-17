-- CreateTable
CREATE TABLE `ProfileImg` (
    `url` VARCHAR(191) NOT NULL,
    `userID` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ProfileImg_userID_key`(`userID`),
    PRIMARY KEY (`url`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProfileImg` ADD CONSTRAINT `ProfileImg_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
