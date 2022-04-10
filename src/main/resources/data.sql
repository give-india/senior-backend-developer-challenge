CREATE DATABASE IF NOT EXISTS `banking_app`;

USE `banking_app`;

DROP TABLE IF EXISTS `account`;

DROP TABLE IF EXISTS `customer`;

CREATE TABLE `customer` (
`customer_id` int(11) NOT NULL,
`customer_name` varchar(45) DEFAULT NULL,
`phone` varchar(45) DEFAULT NULL,
PRIMARY KEY (`customer_id`)
);

INSERT INTO
`customer`
VALUES
(1, 'Leslie', '8939443391'),
(2, 'Emma', '8939443391'),
(3, 'Avani', '8939443391'),
(4, 'Yuri', '8939443391'),
(5, 'Juan', '8939443391'),
(6, 'Give', '8939443391'),
(7, 'India', '8939443391'),
(8, 'Senthil', '8939443391'),
(9, 'Kumar', '8939443391'),
(10, 'Test', '8939443391');

CREATE TABLE `account` (
`account_id` int(11) NOT NULL,
`customer_id` varchar(45) NOT NULL,
`balance` int NOT NULL,
`account_type` varchar(20) NOT NULL,
PRIMARY KEY (`account_id`)
);

INSERT INTO
`account`
VALUES
(11, 1, 1000, 'SAVINGS'),
(12, 2, 2000, 'CURRENT'),
(13, 3, 50000, 'BASIC_SAVINGS'),
(14, 4, 5000, 'SAVINGS'),
(15, 5, 8000, 'BASIC_SAVINGS'),
(16, 6, 1000000, 'CURRENT'),
(17, 7, 8000, 'SAVINGS'),
(18, 8, 180000, 'CURRENT'),
(19, 9, 18000, 'BASIC_SAVINGS'),
(20, 10, 50000, 'SAVINGS'),
(21, 10, 60000, 'CURRENT'),
(22, 10, 70000, 'BASIC_SAVINGS');