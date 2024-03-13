CREATE DATABASE  IF NOT EXISTS `taller-mecanico` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `taller-mecanico`;
-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: taller-mecanico
-- ------------------------------------------------------
-- Server version	8.0.25

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `configuration`
--

DROP TABLE IF EXISTS `configuration`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `configuration` (
  `maximumShiftsPerDay` int unsigned DEFAULT NULL,
  `lowStock` int unsigned DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `configuration`
--

LOCK TABLES `configuration` WRITE;
/*!40000 ALTER TABLE `configuration` DISABLE KEYS */;
INSERT INTO `configuration` VALUES (3,5);
/*!40000 ALTER TABLE `configuration` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `customerId` int unsigned NOT NULL AUTO_INCREMENT,
  `dni` varchar(45) NOT NULL,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `street` varchar(45) NOT NULL,
  `streetNumber` varchar(45) NOT NULL,
  `floor` varchar(45) DEFAULT NULL,
  `apartment` varchar(45) DEFAULT NULL,
  `city` varchar(45) NOT NULL,
  `province` varchar(45) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phoneNumber` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`customerId`),
  UNIQUE KEY `dni_UNIQUE` (`dni`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,'36363636','Manuel','Martinez','French','987','','','Firmat','Santa Fe','manuelmartinez@gmail.com','3465598745'),(2,'37373737','Mateo','Gonzales','San Lorenzo','2000','','','Firmat','Santa Fe','mateogonzales@gmail.com',''),(3,'38383838','Lautaro','Diaz','Lisandro de la Torre','1302','','','Firmat','Santa Fe','lautarodiaz@gmail.com','');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mechanic`
--

DROP TABLE IF EXISTS `mechanic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mechanic` (
  `mechanicId` int unsigned NOT NULL AUTO_INCREMENT,
  `registrationNumber` varchar(45) NOT NULL,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `street` varchar(45) NOT NULL,
  `streetNumber` varchar(45) NOT NULL,
  `floor` varchar(45) DEFAULT NULL,
  `apartment` varchar(45) DEFAULT NULL,
  `city` varchar(45) NOT NULL,
  `province` varchar(45) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phoneNumber` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`mechanicId`),
  UNIQUE KEY `registrationNumber_UNIQUE` (`registrationNumber`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mechanic`
--

LOCK TABLES `mechanic` WRITE;
/*!40000 ALTER TABLE `mechanic` DISABLE KEYS */;
INSERT INTO `mechanic` VALUES (1,'1111','Ricardo','Gimenez','Quilmes','200','','','Firmat','Santa Fe','ricardogimenez@gmail.com','3465568569'),(2,'2222','Juan Cruz','Rodriguez','Jujuy','1400','2','A','Firmat','Santa Fe','juanrodriguez@gmail.com','3465521003');
/*!40000 ALTER TABLE `mechanic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `repair`
--

DROP TABLE IF EXISTS `repair`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `repair` (
  `repairId` int unsigned NOT NULL AUTO_INCREMENT,
  `entryDateTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `startDateTime` timestamp NULL DEFAULT NULL,
  `endDateTime` timestamp NULL DEFAULT NULL,
  `deliveryDateTime` timestamp NULL DEFAULT NULL,
  `status` enum('Entered','In progress','Completed','Delivered') DEFAULT 'Entered',
  `initialDetail` varchar(1000) DEFAULT NULL,
  `comments` varchar(1000) DEFAULT NULL,
  `finalDescription` varchar(1000) DEFAULT NULL,
  `laborPrice` float unsigned DEFAULT NULL,
  `vehicleId` int unsigned NOT NULL,
  `mechanicId` int unsigned DEFAULT NULL,
  PRIMARY KEY (`repairId`),
  KEY `fk_repair_vehicle_idx_idx` (`vehicleId`),
  KEY `fk_repair_mechanic_idx` (`mechanicId`),
  CONSTRAINT `fk_repair_mechanic` FOREIGN KEY (`mechanicId`) REFERENCES `mechanic` (`mechanicId`) ON DELETE SET NULL ON UPDATE SET NULL,
  CONSTRAINT `fk_repair_vehicle` FOREIGN KEY (`vehicleId`) REFERENCES `vehicle` (`vehicleId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `repair`
--

LOCK TABLES `repair` WRITE;
/*!40000 ALTER TABLE `repair` DISABLE KEYS */;
INSERT INTO `repair` VALUES (1,'2023-04-29 12:51:29','2023-04-29 12:55:15',NULL,NULL,'In progress','Cambio de aceite',NULL,'Se colocan 5 litros de aceite 15W40.',5000,1,1),(2,'2023-04-29 12:52:53','2023-04-29 12:55:28',NULL,NULL,'In progress','Reemplazar ópticas delanteras','Rayadura en la puerta delantera y trasera derecha',NULL,6500,3,1),(3,'2023-04-29 12:55:03','2023-04-29 12:58:35','2023-04-29 13:02:44','2023-04-29 13:03:04','Delivered','Service completo',NULL,'Service completo',10000,4,2);
/*!40000 ALTER TABLE `repair` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `repair_spare`
--

DROP TABLE IF EXISTS `repair_spare`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `repair_spare` (
  `repairId` int unsigned NOT NULL,
  `sparePartId` int unsigned NOT NULL,
  `numberOfSpareParts` int unsigned NOT NULL,
  PRIMARY KEY (`repairId`,`sparePartId`),
  KEY `fk_repairSpare_spare_idx` (`sparePartId`),
  KEY `fk_repairSpare_repair_idx` (`repairId`),
  CONSTRAINT `fk_repairSpare_repair` FOREIGN KEY (`repairId`) REFERENCES `repair` (`repairId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_repairSpare_spare` FOREIGN KEY (`sparePartId`) REFERENCES `spare_part` (`sparePartId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `repair_spare`
--

LOCK TABLES `repair_spare` WRITE;
/*!40000 ALTER TABLE `repair_spare` DISABLE KEYS */;
INSERT INTO `repair_spare` VALUES (1,1,5),(2,2,2),(3,1,6),(3,7,1),(3,8,1),(3,9,1),(3,10,1),(3,11,1);
/*!40000 ALTER TABLE `repair_spare` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `roleId` int unsigned NOT NULL AUTO_INCREMENT,
  `roleDescription` varchar(45) NOT NULL,
  PRIMARY KEY (`roleId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'admin'),(2,'mechanic');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shift`
--

DROP TABLE IF EXISTS `shift`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shift` (
  `shiftId` int unsigned NOT NULL AUTO_INCREMENT,
  `shiftDate` date NOT NULL,
  `shiftCancellationDate` date DEFAULT NULL,
  `status` enum('Stand by','Entered','Cancelled') NOT NULL DEFAULT 'Stand by',
  `customerId` int unsigned NOT NULL,
  PRIMARY KEY (`shiftId`),
  KEY `fk_shift_customer_idx` (`customerId`),
  CONSTRAINT `fk_shift_customer` FOREIGN KEY (`customerId`) REFERENCES `customer` (`customerId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shift`
--

LOCK TABLES `shift` WRITE;
/*!40000 ALTER TABLE `shift` DISABLE KEYS */;
INSERT INTO `shift` VALUES (1,'2023-04-29',NULL,'Entered',3),(2,'2023-04-29',NULL,'Entered',2),(3,'2023-04-29',NULL,'Entered',1);
/*!40000 ALTER TABLE `shift` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `spare_part`
--

DROP TABLE IF EXISTS `spare_part`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `spare_part` (
  `sparePartId` int unsigned NOT NULL AUTO_INCREMENT,
  `sparePartCode` varchar(45) NOT NULL,
  `sparePartDescription` varchar(100) NOT NULL,
  `sparePartPrice` float unsigned NOT NULL,
  `stock` int unsigned NOT NULL,
  `sparePartSupplier` varchar(45) NOT NULL,
  PRIMARY KEY (`sparePartId`),
  UNIQUE KEY `sparePartCode_UNIQUE` (`sparePartCode`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `spare_part`
--

LOCK TABLES `spare_part` WRITE;
/*!40000 ALTER TABLE `spare_part` DISABLE KEYS */;
INSERT INTO `spare_part` VALUES (1,'11111','Aceite 15W40 (litro)',1500,39,'Elaion'),(2,'11112','Óptica delantera - Renault',10000,13,'Renault Oficial'),(3,'11113','Óptica trasera - Renault',10000,15,'Renault Oficial'),(4,'11114','Kit distribución Peugeot',80000,7,'Renault Oficial'),(5,'11115','Espejo retrovisor derecho - Kangoo',13000,5,'Renault Oficial'),(6,'11116','Espejo retrovisor izquierdo - Kangoo',13000,5,'Renault Oficial'),(7,'11117','Filtro de nafta',2500,15,'Survey'),(8,'11118','Filtro de aceite',3000,13,'Survey'),(9,'11119','Filtro de aire motor',3000,13,'Survey'),(10,'11120','Filtro de aire habitáculo',2000,8,'Survey'),(11,'111120','Kit distribución - Volkswagen',85000,3,'Volkswagen oficial');
/*!40000 ALTER TABLE `spare_part` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `userId` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `mechanicId` int unsigned DEFAULT NULL,
  `roleId` int unsigned NOT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  KEY `fk_user_mechanic_idx` (`mechanicId`),
  KEY `fk_user_role_idx` (`roleId`),
  CONSTRAINT `fk_user_mechanic` FOREIGN KEY (`mechanicId`) REFERENCES `mechanic` (`mechanicId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_user_role` FOREIGN KEY (`roleId`) REFERENCES `role` (`roleId`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin','admin',NULL,1),(2,'m1','m1',1,2),(3,'m2','m2',2,2);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehicle`
--

DROP TABLE IF EXISTS `vehicle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vehicle` (
  `vehicleId` int unsigned NOT NULL AUTO_INCREMENT,
  `licensePlate` varchar(45) NOT NULL,
  `make` varchar(45) NOT NULL,
  `model` varchar(45) NOT NULL,
  `year` int unsigned NOT NULL,
  `currentNumberOfKilometers` float unsigned NOT NULL,
  `customerId` int unsigned NOT NULL,
  PRIMARY KEY (`vehicleId`),
  UNIQUE KEY `licensePlate_UNIQUE` (`licensePlate`),
  KEY `fk_vehicle_customer_idx` (`customerId`),
  CONSTRAINT `fk_vehicle_customer` FOREIGN KEY (`customerId`) REFERENCES `customer` (`customerId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicle`
--

LOCK TABLES `vehicle` WRITE;
/*!40000 ALTER TABLE `vehicle` DISABLE KEYS */;
INSERT INTO `vehicle` VALUES (1,'EXG201','Fiat','Palio',2005,102000,3),(2,'AE201BG','Honda','Civic',2020,8955,2),(3,'FFL390','Renault','Sandero',2010,100000,2),(4,'CL100DV','Volkswagen','Amarok',2022,2020,1);
/*!40000 ALTER TABLE `vehicle` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-29 10:08:11
