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
-- Table structure for table `fotos`
--

DROP TABLE IF EXISTS `fotos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fotos` (
  `_id` int NOT NULL AUTO_INCREMENT,
  `_usersid` int NOT NULL,
  `originalImage` varchar(300) NOT NULL,
  `compressedImage` varchar(300) NOT NULL,
  `copyrightSource` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `mainTag` varchar(255) NOT NULL,
  `description` varchar(5000) DEFAULT NULL,
  `uploadDate` date NOT NULL,
  `creationDate` varchar(50) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `imageMaterial` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`_id`),
  UNIQUE KEY `originalImage_UNIQUE` (`originalImage`),
  UNIQUE KEY `compressedImage_UNIQUE` (`compressedImage`),
  KEY `_usersid_idx` (`_usersid`),
  CONSTRAINT `_usersid` FOREIGN KEY (`_usersid`) REFERENCES `users` (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fotos`
--

LOCK TABLES `fotos` WRITE;
/*!40000 ALTER TABLE `fotos` DISABLE KEYS */;
INSERT INTO `fotos` VALUES (46,16,'uploads/1622930169033_Album 1         0260.tif','uploads/1622930171137_Album 1         0260.jpg','Niederkofler Johann','Hofer Franz','human','Ein Soldat auf Heimaturlaub ließ sich ein Erinnerungsfoto anfertigen.','2021-06-03','1914-12-29T23:00:00.000Z','Soldat im Ersten Weltkrieg','fotografie'),(47,16,'uploads/1622930238219_0006- Notdurfter Niederhof.tif','uploads/1622930240962_0006- Notdurfter Niederhof.jpg','Niederkofler Johann','Hofer Franz','building','Die Vierte von links in der ersten Reihe ist Agnes Niederkofler, die Tochter des Fotografen. Es wurde jährlich ein Klassen- oder Schulfoto gemacht.','2021-06-03','1918-12-30T23:00:00.000Z','Klassenfoto der Volksschule St. Johann','fotografie'),(49,14,'uploads/1623573316399_0137-Kottersteg.tif','uploads/1623573341774_0137-Kottersteg.jpg','Niederkofler Johann','Hofer Franz','building','Jährlich im April wurden die Äcker gepflügt. Das Bild entstand beim Nachbarhof am \"Kottersteg\".','2021-06-13','1920-03-31T23:00:00.000Z','Pflügen beim \"Kottersteger\"','fotografie'),(50,14,'uploads/1623574601365_0176-Kottersteg.tif','uploads/1623574607852_0176-Kottersteg.jpg','Niederkofler Johann','Hofer Franz','human','Alle warteten ungeduldig darauf, dass die Prozession anlässlich der Primiz von Gottfried Gruber endlich losging.','2021-06-13','1930-05-29T23:00:00.000Z','Primiz in St Johann','fotografie'),(51,14,'uploads/1623576224831_Album 1         0017.tif','uploads/1623576235942_Album 1         0017.jpg','Niederkofler Johann','Hofer Franz','building','Die Hirten der umliegenden Almen trafen sich zu einem Sonntagsausflug zum Klaussee.','2021-06-13','1930-06-29T23:00:00.000Z','Beim Klaussee','fotografie'),(52,14,'uploads/1623576915995_Album 2         0349.tif','uploads/1623576925591_Album 2         0349.jpg','Niederkofler Johann','Hofer Franz','building','Im Bild sind die Eltern, die Geschwister,das Gesinde  und die Familie von Niederkofler Johann ','2021-06-13','1912-05-01','Familienfoto beim \"Bachmair\"','fotografie'),(53,16,'uploads/1624284120133_0027-Kottersteg.tif','uploads/1624284129407_0027-Kottersteg.jpg','Niederkofler Johann','Hofer Franz','human','Man sieht eine Reitergruppe der Schützen bei der Prozession, die anlässlich der Primiz von Gottfried Gruber \"Niederlechn\" stattfand.','2021-06-21','1930-06-28T23:00:00.000Z','Primiz in St Johann','fotografie'),(54,16,'uploads/1624284559982_0034-Kottersteg.tif','uploads/1624284566366_0034-Kottersteg.jpg','Niederkofler Johann','Hofer Franz','human','Es gab mehrere Prozessionen im Jahr (Christi Himmelfahrt, Fronleichnam, Herz Jesu und Hochunserfrauentag) und auch bei Primizen.','2021-06-21','1931-06-21','Prozession','fotografie'),(55,16,'uploads/1624284977704_Album 1         0013.tif','uploads/1624284986247_Album 1         0013.jpg','Niederkofler Johann','Hofer Franz','human','Da der Bräutigam vom \"Höüfa\" in St. Peter stammte, wurde dort gefeiert und auch das Foto entstand da.','2021-06-21','1930-04-01T23:00:00.000Z','Brautleute vom \"Tschingler\" in St.Peter','fotografie'),(56,16,'uploads/1624285185666_Album 1         0054.tif','uploads/1624285192880_Album 1         0054.jpg','Niederkofler Johann','Hofer Franz','human','Auf dem Bild sieht man  den \"Speck Lois\" (Duregger Alois) und seine Frau, die \"Egge Nanne\" (Anna Reichegger).','2021-06-21','1927-02-09','Hochzeit vom \"Speck\" Lois','fotografie'),(57,16,'uploads/1624285284149_Album 1         0182.tif','uploads/1624285291328_Album 1         0182.jpg','Niederkofler Johann','Hofer Franz','human','Das Porträt wurde für Ausweispapiere, Grenzscheine, als Erinnerungsbilder für Geliebte, aber auch als Sterbebild verwendet.','2021-06-21','1922-03-19','\"Hoschtl\" Franz','fotografie'),(58,16,'uploads/1624285779934_Album 2         0489.tif','uploads/1624285794944_Album 2         0489.jpg','Niederkofler Johann','Hofer Franz','human','Sie war verheiratet beim Bixner in St. Martin. ','2021-06-21','1921-03-19T23:00:00.000Z','Maria Ludwig','fotografie'),(59,16,'uploads/1624285929568_Album 2         0410.tif','uploads/1624285943464_Album 2         0410.jpg','Niederkofler Johann','Hofer Franz','human','Er wohnte als Bub etliche Jahre beim Bachmairhof, da er \"ausgibettlt\" wurde, d.h. arme Familien suchten für ihre Kinder einen Ort zum Wohnen, da es Zuhause nicht genug zum Essen/Leben für alle gab. Er wanderte später nach Österreich aus und war dort als Bäcker tätig.','2021-06-21','1929-03-06T23:00:00.000Z','\"Speckhaisl\" Zenz','fotografie'),(60,16,'uploads/1624286198253_Album Hans      010.tif','uploads/1624286217257_Album Hans      010.jpg','Niederkofler Johann','Hofer Franz','human','Auf dem Bild sieht man die Mutter von Johann Niederkofler bei einer ihren vielen Arbeiten am Hof, beim Hennen füttern.','2021-06-21','1912-04-16','Die Müito','fotografie'),(61,16,'uploads/1624286554876_Album Hans      011.tif','uploads/1624286565472_Album Hans      011.jpg','Niederkofler Johann','Hofer Franz','human','Der Bachmair-Vouto, der Vater des Fotografen, war ein passionierter Jäger. Man erzählt sich zu diesem Foto folgende Anekdote: Der Bachmair-Vouto fing das Tier in einer Falle. Er befreite den scheinbar toten Fuchs, trug ihn heim und legte ihn auf die Hausbank, während er zu Halbmittag aß. Als er wieder aus dem Haus kam, um den Fuchs das Fell abzuziehen, sah er ihn nur noch davonlaufen. \"Iz hotami wö ausgitrickst, dea lischtige Fuchs!\" soll er gesagt haben.','2021-06-21','1912-11-20','Do Vouto','fotografie'),(62,16,'uploads/1624290116958_Album 1         0016.tif','uploads/1624290137439_Album 1         0016.jpg','Niederkofler Johann','Hofer Franz','human','Man sieht im Vordergrund die Bäuerin mit ihren 5 Kindern, im Hintergrund die Mägde.','2021-06-21','1934-06-21','Zi Roschtbichl','fotografie'),(63,16,'uploads/1624290640959_Album 1         0047.tif','uploads/1624290652710_Album 1         0047.jpg','Niederkofler Johann','Hofer Franz','human','Auf dem Bild sind die Brautleute Johann Lechner und Maria Künig vom \"Höüfa\", die Trauzeugen mit weißem Tuch am Hut und die restliche Hochzeitsgesellschaft zu sehen. Geheiratet wurde oft im Winter.','2021-06-21','1929-01-15T23:00:00.000Z','Hochzeitsgesellschaft beim \"Ella\"','fotografie'),(64,16,'uploads/1624291471596_Album Hirner     006.tif','uploads/1624291488157_Album Hirner     006.jpg','Niederkofler Johann','Hofer Franz','human','Auf dem Bild sieht man die Kinder des Fotografen. Von links nach rechts sind das: Maria (1910), Johann(1914), Rosa (1911) und Agnes (1912).','2021-06-21','1915-05-09','Di Kindo van Bochma Fotografn','fotografie');
/*!40000 ALTER TABLE `fotos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-22 10:21:28
