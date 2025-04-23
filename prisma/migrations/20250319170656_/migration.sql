-- AlterTable
ALTER TABLE `usuarios` MODIFY `permissao` ENUM('DEV', 'ADM', 'TEC', 'USR') NOT NULL DEFAULT 'USR';
