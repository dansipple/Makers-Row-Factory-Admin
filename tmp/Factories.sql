# ************************************************************
# Sequel Pro SQL dump
# Version 4096
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 127.0.0.1 (MySQL 5.5.43-0ubuntu0.14.04.1)
# Database: Factories
# Generation Time: 2015-06-30 05:59:17 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table factory
# ------------------------------------------------------------

DROP TABLE IF EXISTS `factory`;

CREATE TABLE `factory` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(80) DEFAULT NULL,
  `email` varchar(120) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `lat` float(10,6) NOT NULL DEFAULT '0.000000',
  `long` float(10,6) NOT NULL DEFAULT '0.000000',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `factory` WRITE;
/*!40000 ALTER TABLE `factory` DISABLE KEYS */;

INSERT INTO `factory` (`id`, `name`, `email`, `address`, `lat`, `long`)
VALUES
	(11,'Dan\'s Fabrics','dan@fabricsbydan.com','20 Jay Street, Brooklyn, NY 11201, USA',40.7040072,-73.986759),
	(12,'Mark\'s Fabrics','mark@thefabrics.com','42 East 32nd Street, New York, NY 10016, USA',40.746052,-73.982903),
	(13,'Christine\'s Dress Shop','christine@chrstinesdresses.com','218 Madison Avenue, New York, NY 10016, USA',40.749283,-73.982155),
	(17,'Jersey City Goods','dan@jerseycitygoods.com','Jersey City, NJ, USA',40.728157,-74.077644);

/*!40000 ALTER TABLE `factory` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table tag
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tag`;

CREATE TABLE `tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `factory_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `factory_id` (`factory_id`),
  CONSTRAINT `tag_ibfk_1` FOREIGN KEY (`factory_id`) REFERENCES `factory` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `tag` WRITE;
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;

INSERT INTO `tag` (`id`, `name`, `factory_id`)
VALUES
	(7,'tshirts',11),
	(8,'tshirts',17),
	(9,'Streetwear',17),
	(10,'sweatpants',17),
	(11,'stickers',17),
	(17,'shoes',11),
	(18,'jeans',11),
	(19,'pants',11),
	(20,'Sweatshirts',12),
	(21,'Packaging',12),
	(22,'Dresses',13),
	(23,'Skirts',13),
	(24,'Prom',13),
	(25,'Wedding',13),
	(26,'Apparel',11);

/*!40000 ALTER TABLE `tag` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
