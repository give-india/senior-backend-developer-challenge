-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 10, 2023 at 06:22 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.1.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: `givedo`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `type` enum('Savings','Current','BasicSavings') NOT NULL,
  `balance` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`id`, `userId`, `type`, `balance`) VALUES
(1, 1, 'Savings', 480),
(3, 2, 'Savings', 1520);

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `txn_id` varchar(20) NOT NULL,
  `userId` int(11) NOT NULL,
  `amount` int(11) NOT NULL DEFAULT 0,
  `openBalance` int(11) NOT NULL DEFAULT 0,
  `closeBalance` int(11) NOT NULL DEFAULT 0,
  `type` enum('cr','dr') NOT NULL,
  `transferedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `txn_id`, `userId`, `amount`, `openBalance`, `closeBalance`, `type`, `transferedAt`) VALUES
(16, 'TXN8466779820', 1, -200, 2000, 1800, 'dr', NULL),
(17, 'TXN8466779820', 2, 200, 0, 200, 'cr', NULL),
(18, 'TXN8466848316', 1, -200, 1800, 1600, 'dr', NULL),
(19, 'TXN8466848317', 2, 200, 200, 400, 'cr', NULL),
(20, 'TXN8466933877', 1, -200, 1600, 1400, 'dr', NULL),
(21, 'TXN8466933877', 2, 200, 400, 600, 'cr', NULL),
(22, 'TXN8466949418', 1, -200, 1400, 1200, 'dr', NULL),
(23, 'TXN8466949418', 2, 200, 600, 800, 'cr', NULL),
(24, 'TXN8466996799', 1, -200, 1200, 1000, 'dr', NULL),
(25, 'TXN8466996799', 2, 200, 800, 1000, 'cr', NULL),
(26, 'TXN8467006445', 1, -200, 1000, 800, 'dr', NULL),
(27, 'TXN8467006445', 2, 200, 1000, 1200, 'cr', NULL),
(28, 'TXN8467502798', 1, -200, 800, 600, 'dr', NULL),
(29, 'TXN8467502798', 2, 200, 1200, 1400, 'cr', NULL),
(30, 'TXN8467773207', 1, -20, 600, 580, 'dr', NULL),
(31, 'TXN8467773207', 2, 20, 1400, 1420, 'cr', NULL),
(32, 'TXN8467784778', 1, -20, 580, 560, 'dr', NULL),
(33, 'TXN8467784778', 2, 20, 1420, 1440, 'cr', NULL),
(34, 'TXN8467788413', 1, -20, 560, 540, 'dr', NULL),
(35, 'TXN8467788413', 2, 20, 1440, 1460, 'cr', NULL),
(36, 'TXN8467789320', 1, -20, 540, 520, 'dr', NULL),
(37, 'TXN8467789321', 2, 20, 1460, 1480, 'cr', NULL),
(38, 'TXN8467790123', 1, -20, 520, 500, 'dr', NULL),
(39, 'TXN8467790123', 2, 20, 1480, 1500, 'cr', NULL),
(40, 'TXN8468256058', 1, -20, 500, 480, 'dr', NULL),
(41, 'TXN8468256059', 2, 20, 1500, 1520, 'cr', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;
COMMIT;
