-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `password` VARCHAR(64) NOT NULL DEFAULT '',
    `email` VARCHAR(64) NOT NULL DEFAULT '',
    `verified` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_roles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(64) NOT NULL DEFAULT '',

    UNIQUE INDEX `user_roles_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `roles` (
    `userEntityId` INTEGER NOT NULL,
    `roleEntityId` INTEGER NOT NULL,

    PRIMARY KEY (`userEntityId`, `roleEntityId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `roles` ADD CONSTRAINT `roles_userEntityId_fkey` FOREIGN KEY (`userEntityId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `roles` ADD CONSTRAINT `roles_roleEntityId_fkey` FOREIGN KEY (`roleEntityId`) REFERENCES `user_roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
