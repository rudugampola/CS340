-- MariaDB dump 10.19  Distrib 10.4.25-MariaDB, for Linux (x86_64)
--
-- Host: classmysql.engr.oregonstate.edu    Database: cs340_udugampr
-- ------------------------------------------------------
-- Server version	10.6.10-MariaDB-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Customers`
--

DROP TABLE IF EXISTS `Customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Customers` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fname` varchar(50) NOT NULL,
  `lname` varchar(50) NOT NULL,
  `phone` varchar(12) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `photo` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Customers`
--

LOCK TABLES `Customers` WRITE;
/*!40000 ALTER TABLE `Customers` DISABLE KEYS */;
INSERT INTO `Customers` VALUES (1,'Jonas','Schmedtmann','225-989-5588','jonas@example.com','user-1.jpg'),(2,'Lourdes','Browning','215-332-6699','loulou@example.com','user-2.jpg'),(3,'Sophie','Louise Hart','336-889-4455','sophie@example.com','user-3.jpg'),(4,'Ayla','Cornell','336-889-4455','ayls@example.com','user-4.jpg'),(5,'Leo','Gillespie','336-889-4455','leo@example.com','user-5.jpg'),(6,'Jennifer','Hardy','336-889-4455','jennifer@example.com','user-6.jpg');
/*!40000 ALTER TABLE `Customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Guides`
--

DROP TABLE IF EXISTS `Guides`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Guides` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fname` varchar(50) NOT NULL,
  `lname` varchar(50) NOT NULL,
  `phone` varchar(12) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `title` varchar(50) NOT NULL,
  `photo` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Guides`
--

LOCK TABLES `Guides` WRITE;
/*!40000 ALTER TABLE `Guides` DISABLE KEYS */;
INSERT INTO `Guides` VALUES (1,'Ruby','Holcomb','000-000-0000','ruby@holcomb.rent','Beginner','cover.jpg'),(2,'Britt','Douglas','000-000-0000','britt@douglas.property','Beginner','cover.jpg'),(3,'Manuela','Holloway','000-000-0000','manuela@holloway.services','Beginner','cover.jpg'),(4,'Ada','House','000-000-0000','ada@house.fail','Expert','cover.jpg'),(5,'Eaton','Mosley','000-000-0000','eaton@mosley.gmail','Novice','cover.jpg'),(6,'Alexandra','Macdonald','000-000-0000','alexandra@macdonald.ltda','Expert','cover.jpg'),(7,'Gentry','Frank','000-000-0000','gentry@frank.ad','Elite','cover.jpg'),(8,'Joanna','Forbes','000-000-0000','joanna@forbes.ch','Master','cover.jpg'),(9,'Marcie','Beck','000-000-0000','marcie@beck.wtf','Novice','cover.jpg'),(10,'Baird','Hamilton','000-000-0000','baird@hamilton.flights','Beginner','cover.jpg'),(11,'Fulton','Moses','000-000-0000','fulton@moses.ne','Master','cover.jpg'),(12,'Buckner','Giles','000-000-0000','buckner@giles.chrome','Master','cover.jpg'),(13,'Skinner','Sawyer','000-000-0000','skinner@sawyer.sydney','Master','cover.jpg'),(14,'Weeks','Mcgee','000-000-0000','weeks@mcgee.coupons','Master','cover.jpg'),(15,'Mills','Page','000-000-0000','mills@page.io','Expert','cover.jpg'),(16,'Green','Garcia','000-000-0000','green@garcia.ss','Expert','cover.jpg');
/*!40000 ALTER TABLE `Guides` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Reviews`
--

DROP TABLE IF EXISTS `Reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Reviews` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `review` varchar(250) NOT NULL,
  `customer_id` bigint(20) NOT NULL,
  `tour_id` bigint(20) NOT NULL,
  `rating` tinyint(1) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `tour_id` (`tour_id`),
  KEY `FK_CustomersReviews_idx` (`customer_id`),
  CONSTRAINT `FK_CustomersReviews` FOREIGN KEY (`customer_id`) REFERENCES `Customers` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_ReviewsTours` FOREIGN KEY (`tour_id`) REFERENCES `Tours` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Reviews`
--

LOCK TABLES `Reviews` WRITE;
/*!40000 ALTER TABLE `Reviews` DISABLE KEYS */;
INSERT INTO `Reviews` VALUES (1,'2019-01-01','This is a review...because I must!',1,1,5),(2,'2019-01-01','I don\'t like this tour',2,2,1),(3,'2019-01-01','I loved this tour. It was great.',3,3,5),(4,'2019-01-01','Highly recommended!',4,4,5),(5,'2019-01-01','Greatest tour ever',5,5,5),(6,'2019-01-01','Best tour ever',6,6,5),(7,'2019-01-01','I don\'t like this tour',5,2,1),(8,'2019-01-01','This is was an OK Tour',4,5,5),(9,'2019-01-01','This is a good Tour',3,1,5);
/*!40000 ALTER TABLE `Reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Tours`
--

DROP TABLE IF EXISTS `Tours`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Tours` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `difficulty` varchar(50) NOT NULL,
  `price` decimal(19,2) NOT NULL,
  `description` varchar(250) NOT NULL,
  `location` varchar(50) NOT NULL,
  `cover_image` varchar(50) DEFAULT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Tours`
--

LOCK TABLES `Tours` WRITE;
/*!40000 ALTER TABLE `Tours` DISABLE KEYS */;
INSERT INTO `Tours` VALUES (1,'Dennard','Extreme',387.31,'Sint nulla ea culpa ad culpa id est deserunt. Non ipsum labore nulla eiusmod mollit esse consectetur.','Wells','cover.jpg','2004-06-27'),(2,'Guilford','Easy',655.34,'Aliquip qui et tempor veniam mollit qui incididunt minim voluptate excepteur cillum labore fugiat mollit. Exercitation adipisicing laborum veniam labore velit.','Henrietta','cover.jpg','1997-06-19'),(3,'Unionville','Medium',434.36,'Adipisicing incididunt elit irure nostrud. Adipisicing sunt do magna nostrud esse excepteur commodo pariatur excepteur consectetur.','Sterling','cover.jpg','2010-10-06'),(4,'Thatcher','Hard',721.15,'In veniam anim nostrud excepteur. Proident sint cupidatat mollit incididunt magna et aliqua magna et dolore.','Charco','cover.jpg','2000-03-02'),(5,'Wollochet','Extreme',151.44,'Ad adipisicing tempor esse incididunt do deserunt occaecat qui aliquip nostrud in aliqua. Non ea quis cupidatat amet cillum commodo veniam do.','Clayville','cover.jpg','2021-05-11'),(6,'Mammoth','Easy',907.39,'Proident exercitation ipsum consectetur amet sunt. Adipisicing consectetur officia minim ex quis et.','Edmund','cover.jpg','2016-05-22'),(7,'Cornucopia','Extreme',974.53,'Occaecat aute officia deserunt exercitation ad et dolor nulla pariatur enim. Pariatur et nulla id minim dolor Lorem elit in esse.','Eggertsville','cover.jpg','1989-12-29');
/*!40000 ALTER TABLE `Tours` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TripLogs`
--

DROP TABLE IF EXISTS `TripLogs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `TripLogs` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `customer_id` bigint(20) NOT NULL,
  `guide_id` bigint(20) NOT NULL,
  `tour_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `guide_id` (`guide_id`),
  KEY `tour_id` (`tour_id`),
  KEY `FK_TripLogsCustomers_idx` (`customer_id`),
  CONSTRAINT `FK_TripLogsCustomers` FOREIGN KEY (`customer_id`) REFERENCES `Customers` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_TripLogsGuides` FOREIGN KEY (`guide_id`) REFERENCES `Guides` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_TripLogsTours` FOREIGN KEY (`tour_id`) REFERENCES `Tours` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TripLogs`
--

LOCK TABLES `TripLogs` WRITE;
/*!40000 ALTER TABLE `TripLogs` DISABLE KEYS */;
INSERT INTO `TripLogs` VALUES (1,1,4,3),(2,2,4,3),(3,3,4,3),(4,4,2,3),(5,5,1,3),(6,6,4,3),(7,5,11,7),(8,2,16,5);
/*!40000 ALTER TABLE `TripLogs` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-03  9:31:01
