-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: fotoarchiv
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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `_id` int NOT NULL AUTO_INCREMENT,
  `role` int NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `image` varchar(400) NOT NULL,
  `token` varchar(500) DEFAULT NULL,
  `tokenExp` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`_id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (14,1,'roedhannes@gmail.com','$2b$10$knJqMlmi/NcantSY3/vyLeNEi8Fvr5TfqG2yn331EFDI5i1u6NaSq','Hannes Röd','1','http://gravatar.com/avatar/1621168379?d=identicon','eyJhbGciOiJIUzI1NiJ9.MTQ.HGFG7pwhEFRprU3cCVhNZgjiuJ_AcFFYUrvdU0EPrxM','1624286610932'),(15,1,'s@e.pp','$2b$10$VQMxoWPJ0CHDJm/GFVb4hOy5CM3wYxkNmPpYCkL0lZohm4rJ07HXW','sepp','hirte','http://gravatar.com/avatar/1621501664?d=identicon','',''),(16,1,'hoferfranz51@hotmail.com','$2b$10$ZdNSlcNl2ZLYcoh16RUHyOkEdgk.We5pqC3orkFdppNbo9fJm6SKu','Franz','Hofer','http://gravatar.com/avatar/1621673950?d=identicon','eyJhbGciOiJIUzI1NiJ9.MTY.YebqSkBjPaLEJ2nnH4fZnnT5K-tlW56g3cNHzk7O2-M','1624287676811'),(17,1,'hoferuli@gmail.com','$2b$10$wIIrYWDUSsv1exAsQOTMyeQTzgYPOH3t6ZWJWzFpHTbXz2rrNUIh6','Uli','Hofer','http://gravatar.com/avatar/1621703138?d=identicon','eyJhbGciOiJIUzI1NiJ9.MTc.7EI9ihyTs65VTPZa2DruCUmCf5uTM3y5rhAnQOmHn7Y','1621706782231'),(18,1,'maggihofer@gmail.com','$2b$10$VVzrWBOuGUmRiwXmWNN/ZOnBDh9RrSyfQ3eGmt5N4PSjAbk.yPrB.','Margareth','Hofer','http://gravatar.com/avatar/1621876611?d=identicon','eyJhbGciOiJIUzI1NiJ9.MTg.0FQQmHx3ewfe7Ggwvt_Ic3Zprtgvab6o2pqAkGevu3k','1621880227188'),(19,1,'bernigartner1@gmail.com','$2b$10$n7rM.g.ZDJIgbmzuYyhFY..y4gxgtgk9PbJf/qr0.rEj0GLyMbPiW','Bernadetta ','Gartner','http://gravatar.com/avatar/1622133028?d=identicon','',''),(21,1,'roedhnnes@gmail.com','$2b$10$cI7h4eJ19OLfOQGgwdpZguM9sgkUXYk9xaXs7QQHMhc7U.KKLW/cu','Hannes','Röd','http://gravatar.com/avatar/1623255474?d=identicon','',''),(22,0,'sebi.hofer2001@gmail.com','$2b$10$HylV8xsnCEQL8i93rhwqPu/d9J/X0jvkEeQujDBy0gKOU2vRW7Umi','siba','Hofer','http://gravatar.com/avatar/1624116973?d=identicon','eyJhbGciOiJIUzI1NiJ9.MjI.Z4ntjWm54QnXO9sDnKC53-TpQu7EM3NhpN1LD3SgHV4','1624120706244');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-22 10:21:27
