CREATE DATABASE  IF NOT EXISTS `shopList` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `shopList`;
-- MySQL dump 10.13  Distrib 8.0.32, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: shopList
-- ------------------------------------------------------
-- Server version	8.0.32-0ubuntu0.22.04.2

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
-- Table structure for table `ingredient`
--

DROP TABLE IF EXISTS `ingredient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ingredient` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `IngredientTypeId` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingredient`
--

LOCK TABLES `ingredient` WRITE;
/*!40000 ALTER TABLE `ingredient` DISABLE KEYS */;
INSERT INTO `ingredient` VALUES (1,'banane','2023-02-01 00:00:00','2023-02-01 00:00:00',1),(2,'fraise','2023-02-01 00:00:00','2023-02-01 00:00:00',1),(3,'poulet','2023-02-01 00:00:00','2023-02-01 00:00:00',2),(4,'oignon','2023-02-01 00:00:00','2023-02-01 00:00:00',1),(5,'boeuf haché','2023-02-02 08:32:13','2023-02-02 08:32:13',6),(6,'ail','2023-02-02 08:33:25','2023-02-02 08:33:25',1),(7,'persil','2023-02-02 08:33:41','2023-02-02 08:33:41',1),(8,'tomate','2023-02-02 08:35:08','2023-02-02 08:35:08',1),(9,'concombre','2023-02-02 08:35:29','2023-02-02 08:35:29',1),(10,'carotte','2023-02-02 08:35:46','2023-02-02 08:35:46',1),(11,'oeuf','2023-02-02 11:29:11','2023-02-02 11:29:11',7),(12,'lait','2023-02-02 11:29:53','2023-02-02 11:29:53',7),(13,'creme fraiche','2023-02-02 11:30:57','2023-02-02 11:30:57',7),(14,'comté','2023-02-02 11:31:17','2023-02-02 11:31:17',3),(15,'pâte','2023-02-02 11:32:27','2023-02-02 11:32:27',7),(16,'lardons','2023-02-02 17:33:35','2023-02-02 17:33:35',6);
/*!40000 ALTER TABLE `ingredient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ingredient_type`
--

DROP TABLE IF EXISTS `ingredient_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ingredient_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingredient_type`
--

LOCK TABLES `ingredient_type` WRITE;
/*!40000 ALTER TABLE `ingredient_type` DISABLE KEYS */;
INSERT INTO `ingredient_type` VALUES (1,'Fruits et Légumes','2023-02-02 00:00:00','2023-02-02 00:00:00'),(2,'Volaille','2023-02-02 00:00:00','2023-02-02 00:00:00'),(3,'Fromage','2023-02-02 00:00:00','2023-02-02 00:00:00'),(4,'Poissonnerie','2023-02-02 00:00:00','2023-02-02 00:00:00'),(5,'Charcuterie','2023-02-02 00:00:00','2023-02-02 00:00:00'),(6,'Boucherie','2023-02-02 00:00:00','2023-02-02 00:00:00'),(7,'Autre','2023-02-02 00:00:00','2023-02-02 00:00:00');
/*!40000 ALTER TABLE `ingredient_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `list`
--

DROP TABLE IF EXISTS `list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `list` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `list_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `list`
--

LOCK TABLES `list` WRITE;
/*!40000 ALTER TABLE `list` DISABLE KEYS */;
INSERT INTO `list` VALUES (1,'My list','2023-02-01 20:24:43','2023-02-01 20:24:43',NULL),(2,'My list','2023-02-02 12:23:02','2023-02-02 12:23:02',NULL);
/*!40000 ALTER TABLE `list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `list_has_ingredient`
--

DROP TABLE IF EXISTS `list_has_ingredient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `list_has_ingredient` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `ListId` int NOT NULL,
  `IngredientId` int NOT NULL,
  PRIMARY KEY (`ListId`,`IngredientId`),
  KEY `IngredientId` (`IngredientId`),
  CONSTRAINT `list_has_ingredient_ibfk_1` FOREIGN KEY (`ListId`) REFERENCES `list` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `list_has_ingredient_ibfk_2` FOREIGN KEY (`IngredientId`) REFERENCES `ingredient` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `list_has_ingredient`
--

LOCK TABLES `list_has_ingredient` WRITE;
/*!40000 ALTER TABLE `list_has_ingredient` DISABLE KEYS */;
/*!40000 ALTER TABLE `list_has_ingredient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recipe`
--

DROP TABLE IF EXISTS `recipe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recipe` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `recipe_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipe`
--

LOCK TABLES `recipe` WRITE;
/*!40000 ALTER TABLE `recipe` DISABLE KEYS */;
INSERT INTO `recipe` VALUES (1,'Salade de fruit',NULL,'2023-02-01 20:33:15','2023-02-01 20:33:15',NULL),(4,'Chicken Curry','/src/assets/curryCP4.jpg','2023-02-01 23:06:07','2023-02-01 23:06:07',6),(8,'Pâtes Carbonara',NULL,'2023-02-02 09:42:32','2023-02-02 09:42:32',6),(24,'test marchepas',NULL,'2023-02-02 15:03:22','2023-02-02 15:03:22',NULL);
/*!40000 ALTER TABLE `recipe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recipe_has_ingredient`
--

DROP TABLE IF EXISTS `recipe_has_ingredient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recipe_has_ingredient` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `RecipeId` int NOT NULL,
  `IngredientId` int NOT NULL,
  PRIMARY KEY (`RecipeId`,`IngredientId`),
  KEY `IngredientId` (`IngredientId`),
  CONSTRAINT `recipe_has_ingredient_ibfk_1` FOREIGN KEY (`RecipeId`) REFERENCES `recipe` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `recipe_has_ingredient_ibfk_2` FOREIGN KEY (`IngredientId`) REFERENCES `ingredient` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipe_has_ingredient`
--

LOCK TABLES `recipe_has_ingredient` WRITE;
/*!40000 ALTER TABLE `recipe_has_ingredient` DISABLE KEYS */;
INSERT INTO `recipe_has_ingredient` VALUES ('2023-02-01 00:00:00','2023-02-01 00:00:00',1,1),('2023-02-01 00:00:00','2023-02-01 00:00:00',1,2),('2023-02-02 00:00:00','2023-02-02 00:00:00',4,3),('2023-02-02 00:00:00','2023-02-02 00:00:00',4,4),('2023-02-02 00:00:00','2023-02-02 00:00:00',8,13),('2023-02-02 00:00:00','2023-02-02 00:00:00',8,15),('2023-02-02 00:00:00','2023-02-02 00:00:00',8,16);
/*!40000 ALTER TABLE `recipe_has_ingredient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (6,'argon','testArgon','mail.feru@mail.com','$argon2id$v=19$m=65536,t=2,p=1$Klo76B7p8KHzKX2IdRVQpA$LA98/N9sfSfaDbHZRBV9NLoGn/MlqqJVu3SsNch0VWo','2023-02-02 10:44:09','2023-02-02 10:44:09');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-03  8:45:33
