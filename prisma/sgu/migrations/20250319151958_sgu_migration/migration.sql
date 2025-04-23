-- CreateTable
CREATE TABLE `tblUsuarios` (
    `cpID` BIGINT NOT NULL AUTO_INCREMENT,
    `cpRF` VARCHAR(7) NULL,
    `cpNome` VARCHAR(250) NULL,
    `cpVinculo` VARCHAR(1) NULL,
    `cpnomecargo2` VARCHAR(150) NULL,
    `cpRef` VARCHAR(6) NULL,
    `cpUnid` VARCHAR(15) NULL,
    `cpnomesetor2` VARCHAR(250) NULL,
    `cpPermissao` VARCHAR(3) NULL,
    `cpImprimir` VARCHAR(5) NULL,
    `cpUltimaCarga` VARCHAR(3) NULL,
    `cpOBS` VARCHAR(300) NULL,

    PRIMARY KEY (`cpID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
