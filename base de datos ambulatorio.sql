-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: ambulatorio
-- ------------------------------------------------------
-- Server version	8.0.22

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
-- Table structure for table `accidente_enfermedad`
--

DROP TABLE IF EXISTS `accidente_enfermedad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accidente_enfermedad` (
  `id_accidente_enfermedad` int NOT NULL,
  `descripcion` varchar(45) DEFAULT NULL,
  `id_nivel_atencion` int DEFAULT NULL,
  PRIMARY KEY (`id_accidente_enfermedad`),
  KEY `fknivelatencion_idx` (`id_nivel_atencion`),
  CONSTRAINT `fknivelatencion2` FOREIGN KEY (`id_nivel_atencion`) REFERENCES `nivel_atencion` (`id_nivel_atencion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accidente_enfermedad`
--

LOCK TABLES `accidente_enfermedad` WRITE;
/*!40000 ALTER TABLE `accidente_enfermedad` DISABLE KEYS */;
/*!40000 ALTER TABLE `accidente_enfermedad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ambulancia`
--

DROP TABLE IF EXISTS `ambulancia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ambulancia` (
  `patente` varchar(45) NOT NULL,
  PRIMARY KEY (`patente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ambulancia`
--

LOCK TABLES `ambulancia` WRITE;
/*!40000 ALTER TABLE `ambulancia` DISABLE KEYS */;
/*!40000 ALTER TABLE `ambulancia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cama`
--

DROP TABLE IF EXISTS `cama`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cama` (
  `idCama` int NOT NULL,
  `estado` tinyint DEFAULT NULL,
  `tipo` int DEFAULT NULL,
  `id_nivel_atencion` int DEFAULT NULL,
  PRIMARY KEY (`idCama`),
  KEY `fk_nivelAtencion_idx` (`id_nivel_atencion`),
  CONSTRAINT `fk_nivelAtencion` FOREIGN KEY (`id_nivel_atencion`) REFERENCES `nivel_atencion` (`id_nivel_atencion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cama`
--

LOCK TABLES `cama` WRITE;
/*!40000 ALTER TABLE `cama` DISABLE KEYS */;
/*!40000 ALTER TABLE `cama` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `efector`
--

DROP TABLE IF EXISTS `efector`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `efector` (
  `idEfector` int NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `domicilio` varchar(80) DEFAULT NULL,
  `localidad` varchar(45) DEFAULT NULL,
  `telefono` varchar(45) DEFAULT NULL,
  `latitud` varchar(45) DEFAULT NULL,
  `longitud` varchar(45) DEFAULT NULL,
  `id_nivel_atencion` int DEFAULT NULL,
  PRIMARY KEY (`idEfector`),
  KEY `fknivelatencion_idx` (`id_nivel_atencion`),
  CONSTRAINT `fknivelatencion` FOREIGN KEY (`id_nivel_atencion`) REFERENCES `nivel_atencion` (`id_nivel_atencion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `efector`
--

LOCK TABLES `efector` WRITE;
/*!40000 ALTER TABLE `efector` DISABLE KEYS */;
/*!40000 ALTER TABLE `efector` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `emergencia`
--

DROP TABLE IF EXISTS `emergencia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emergencia` (
  `id_emergencia` int NOT NULL,
  `fecha_hora_ingreso` datetime DEFAULT NULL,
  `fecha_hora_alta` datetime DEFAULT NULL,
  `latitud` varchar(45) DEFAULT NULL,
  `longitud` varchar(45) DEFAULT NULL,
  `localidad` varchar(45) DEFAULT NULL,
  `id_accidente_enfermedad` int DEFAULT NULL,
  `id_cama` int DEFAULT NULL,
  `id_tipo_auxilio` int DEFAULT NULL,
  `patente_ambulancia` varchar(45) DEFAULT NULL,
  `id_paciente` int DEFAULT NULL,
  `id_efector` int DEFAULT NULL,
  PRIMARY KEY (`id_emergencia`),
  KEY `fkpaciente_idx` (`id_paciente`),
  KEY `fkaccidenteenfermedad_idx` (`id_accidente_enfermedad`),
  KEY `fkcama_idx` (`id_cama`),
  KEY `fktipoauxilio_idx` (`id_tipo_auxilio`),
  KEY `fkambulancia_idx` (`patente_ambulancia`),
  KEY `fkefector_idx` (`id_efector`),
  CONSTRAINT `fkaccidenteenfermedad` FOREIGN KEY (`id_accidente_enfermedad`) REFERENCES `accidente_enfermedad` (`id_accidente_enfermedad`),
  CONSTRAINT `fkambulancia` FOREIGN KEY (`patente_ambulancia`) REFERENCES `ambulancia` (`patente`),
  CONSTRAINT `fkcama` FOREIGN KEY (`id_cama`) REFERENCES `cama` (`idCama`),
  CONSTRAINT `fkefector2` FOREIGN KEY (`id_efector`) REFERENCES `efector` (`idEfector`),
  CONSTRAINT `fkpaciente` FOREIGN KEY (`id_paciente`) REFERENCES `paciente` (`id_paciente`),
  CONSTRAINT `fktipoauxilio` FOREIGN KEY (`id_tipo_auxilio`) REFERENCES `tipo_auxilio` (`id_tipo_auxilio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emergencia`
--

LOCK TABLES `emergencia` WRITE;
/*!40000 ALTER TABLE `emergencia` DISABLE KEYS */;
/*!40000 ALTER TABLE `emergencia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enfermero`
--

DROP TABLE IF EXISTS `enfermero`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enfermero` (
  `id_enfermero` int NOT NULL,
  `legajo` varchar(45) DEFAULT NULL,
  `usuario` varchar(45) DEFAULT NULL,
  `contrasenia` varchar(45) DEFAULT NULL,
  `id_persona` int DEFAULT NULL,
  PRIMARY KEY (`id_enfermero`),
  KEY `fkpersona2_idx` (`id_persona`),
  CONSTRAINT `fkpersona2` FOREIGN KEY (`id_persona`) REFERENCES `persona` (`id_persona`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enfermero`
--

LOCK TABLES `enfermero` WRITE;
/*!40000 ALTER TABLE `enfermero` DISABLE KEYS */;
/*!40000 ALTER TABLE `enfermero` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nivel_atencion`
--

DROP TABLE IF EXISTS `nivel_atencion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nivel_atencion` (
  `id_nivel_atencion` int NOT NULL,
  `descripcion` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_nivel_atencion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nivel_atencion`
--

LOCK TABLES `nivel_atencion` WRITE;
/*!40000 ALTER TABLE `nivel_atencion` DISABLE KEYS */;
/*!40000 ALTER TABLE `nivel_atencion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `obra_social`
--

DROP TABLE IF EXISTS `obra_social`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `obra_social` (
  `id_obra_social` int NOT NULL,
  `razon_social` varchar(45) DEFAULT NULL,
  `nombre_fantasia` varchar(45) DEFAULT NULL,
  `telefono` varchar(45) DEFAULT NULL,
  `id_efector` int DEFAULT NULL,
  PRIMARY KEY (`id_obra_social`),
  KEY `fkefector_idx` (`id_efector`),
  CONSTRAINT `fkefector` FOREIGN KEY (`id_efector`) REFERENCES `efector` (`idEfector`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `obra_social`
--

LOCK TABLES `obra_social` WRITE;
/*!40000 ALTER TABLE `obra_social` DISABLE KEYS */;
/*!40000 ALTER TABLE `obra_social` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paciente`
--

DROP TABLE IF EXISTS `paciente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paciente` (
  `id_paciente` int NOT NULL,
  `grupo_sanguineo` varchar(45) DEFAULT NULL,
  `id_obra_social` int DEFAULT NULL,
  `nombre_contacto` varchar(45) DEFAULT NULL,
  `id_persona` int DEFAULT NULL,
  PRIMARY KEY (`id_paciente`),
  KEY `fkobrasocial_idx` (`id_obra_social`),
  KEY `fkpersona1_idx` (`id_persona`),
  CONSTRAINT `fkobrasocial` FOREIGN KEY (`id_obra_social`) REFERENCES `obra_social` (`id_obra_social`),
  CONSTRAINT `fkpersona1` FOREIGN KEY (`id_persona`) REFERENCES `persona` (`id_persona`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paciente`
--

LOCK TABLES `paciente` WRITE;
/*!40000 ALTER TABLE `paciente` DISABLE KEYS */;
/*!40000 ALTER TABLE `paciente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `persona`
--

DROP TABLE IF EXISTS `persona`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `persona` (
  `id_persona` int NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `apellido` varchar(45) DEFAULT NULL,
  `fecha_nacimiento` varchar(45) DEFAULT NULL,
  `genero` varchar(45) DEFAULT NULL,
  `telefono` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_persona`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `persona`
--

LOCK TABLES `persona` WRITE;
/*!40000 ALTER TABLE `persona` DISABLE KEYS */;
/*!40000 ALTER TABLE `persona` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_auxilio`
--

DROP TABLE IF EXISTS `tipo_auxilio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_auxilio` (
  `id_tipo_auxilio` int NOT NULL,
  `descripcion` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_tipo_auxilio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_auxilio`
--

LOCK TABLES `tipo_auxilio` WRITE;
/*!40000 ALTER TABLE `tipo_auxilio` DISABLE KEYS */;
/*!40000 ALTER TABLE `tipo_auxilio` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-01-06 18:46:08
