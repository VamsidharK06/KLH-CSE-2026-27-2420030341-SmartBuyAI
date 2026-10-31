USE shopfront;
-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: shopfront
-- ------------------------------------------------------
-- Server version	8.0.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `category` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(38,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Electronic Gadgets','Ergonomic wireless mouse','https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=600&q=80','Wireless Mouse',599.00),(2,'Electronic Gadgets','RGB mechanical keyboard','https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=600&q=80','Mechanical Keyboard',2499.00),(3,'Electronic Gadgets','6-in-1 USB-C hub','https://images.unsplash.com/photo-1760376789487-994070337c76?auto=format&fit=crop&w=600&q=80','USB-C Hub',1299.00),(4,'Home Decor','Decorative ceramic vase','https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=600&q=80','Ceramic Vase',799.00),(7,'Electronic Gadgets','Wireless headphones for music and everyday use.','https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80','Wireless Headphones',1499.00),(8,'Electronic Gadgets','Smartwatch for daily activity and notifications.','https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80','Smartwatch',1999.00),(9,'Electronic Gadgets','Portable speaker for wireless audio playback.','https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80','Bluetooth Speaker',999.00),(10,'Electronic Gadgets','Portable power bank for charging compatible devices.','/images/power-bank.png','Power Bank',799.00),(11,'Electronic Gadgets','Webcam for online meetings and video calls.','/images/webcam.png','Webcam',1299.00),(12,'Home Decor','Decorative table lamp for a warm indoor atmosphere.','https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80','Table Lamp',1199.00),(13,'Home Decor','Wall clock for home or office decoration.','https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=600&q=80','Wall Clock',699.00),(14,'Home Decor','Decorative planter for indoor plants.','https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80','Decorative Planter',499.00),(15,'Home Decor','Photo frame for displaying memorable moments.','https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80','Photo Frame',399.00),(23,'Bags & Backpacks','Backpack designed to carry a laptop and daily essentials.','https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80','Laptop Backpack',1299.00),(24,'Bags & Backpacks','Spacious backpack for travel and everyday use.','https://images.unsplash.com/photo-1622560480654-d96214fdc887?auto=format&fit=crop&w=600&q=80','Travel Backpack',1799.00),(25,'Bags & Backpacks','Casual backpack for college and daily activities.','/images/casual-bag.png','Casual Backpack',899.00),(26,'Bags & Backpacks','Compact sling bag for carrying everyday essentials.','https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=600&q=80','Sling Bag',699.00),(27,'Everyday Essentials','Reusable water bottle for daily hydration.','https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80','Water Bottle',299.00),(28,'Everyday Essentials','Reusable lunch box for carrying meals.','https://images.unsplash.com/photo-1570649858840-bb7f10b363d6?auto=format&fit=crop&w=600&q=80','Lunch Box',399.00),(29,'Everyday Essentials','Desk organizer for stationery and small office supplies.','https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=600&q=80','Desk Organizer',349.00),(30,'Everyday Essentials','Reusable coffee mug for home or office use.','https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=600&q=80','Coffee Mug',199.00);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-10-24 15:10:39

