CREATE TABLE IF NOT EXISTS `users` (

  `id` int(11) NOT NULL AUTO_INCREMENT,

  `username` varchar(50) DEFAULT NULL,

  `email` varchar(50) DEFAULT '0',

  `password` varchar(50) DEFAULT '0',

  `acctype` varchar(50) DEFAULT '0',

  `address` varchar(50) DEFAULT '0',

  PRIMARY KEY (`id`)

) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;



-- Dumping data for table test.users: ~6 rows (approximately)

/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `username`, `email`, `password`, `acctype`, `address`) VALUES

	(1, 'customer', 'customer@domain.com', '1', 'customer', '0'),

	(2, 'driver', 'driver@domain.com', '1', 'driver', '0'),

	(3, 'manager', 'manager@domain.com', '1', 'manager', '0');test



