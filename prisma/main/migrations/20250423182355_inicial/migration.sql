-- CreateTable
CREATE TABLE `usuarios` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `nomeSocial` VARCHAR(191) NULL,
    `login` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `permissao` ENUM('DEV', 'ADM', 'USR') NOT NULL DEFAULT 'USR',
    `status` BOOLEAN NOT NULL DEFAULT true,
    `avatar` TEXT NULL,
    `ultimoLogin` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `atualizadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `usuarios_login_key`(`login`),
    UNIQUE INDEX `usuarios_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
