CREATE TABLE IF NOT EXISTS `Product` (
  `product_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `sizes` varchar(255) NOT NULL,
  `available_quantity` varchar(255) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `unit_price` int(255) NOT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP NULL,
  `updated_date` datetime ON UPDATE CURRENT_TIMESTAMP NULL,
  `created_by` varchar(1024)  NULL,
  `updated_by` varchar(1024)  NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

