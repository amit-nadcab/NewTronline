-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 01, 2022 at 01:37 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 7.3.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test`
--

-- --------------------------------------------------------

--
-- Table structure for table `eventBlock`
--

CREATE TABLE `eventBlock` (
  `id` int(11) NOT NULL,
  `latest_block` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `eventBlock`
--

INSERT INTO `eventBlock` (`id`, `latest_block`) VALUES
(1, 16372940);

-- --------------------------------------------------------

--
-- Table structure for table `Registration`
--

CREATE TABLE `Registration` (
  `id` int(11) NOT NULL,
  `user` varchar(50) NOT NULL,
  `referrer` varchar(50) NOT NULL,
  `userId` int(11) NOT NULL,
  `referrerId` int(11) NOT NULL,
  `block_number` int(11) NOT NULL,
  `block_timestamp` int(11) NOT NULL,
  `transaction_id` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Registration`
--

INSERT INTO `Registration` (`id`, `user`, `referrer`, `userId`, `referrerId`, `block_number`, `block_timestamp`, `transaction_id`) VALUES
(1, '0x6B63b63ce0c59D63a263B1B8cF9c52D912b9A608', '0x0000000000000000000000000000000000000000', 1, 0, 16367961, 1643702979, '0x546a534f27a5c88475d288331bca9ad9a5ffe485981999ab2abe70a09e73fd6a'),
(2, '0xF08E9f6c3178Ff470977c06164c8fa12182c9C27', '0x6B63b63ce0c59D63a263B1B8cF9c52D912b9A608', 2, 1, 16368015, 1643703141, '0x4da6c67541b256d01cad2665e44b42a69f29ce688a8120bc89adf0b7eafc3ffb'),
(3, '0xb41eD46A751bd200728d122149DC5e1d7Ea538fF', '0x6B63b63ce0c59D63a263B1B8cF9c52D912b9A608', 3, 1, 16371866, 1643714694, '0x1dac0a0afda2d1df8e2379179aa89de0ae83225ddfde6f02593d54019f461bca');

-- --------------------------------------------------------

--
-- Table structure for table `Upgrade`
--

CREATE TABLE `Upgrade` (
  `id` int(11) NOT NULL,
  `user` varchar(50) NOT NULL,
  `package` int(11) NOT NULL,
  `block_timestamp` int(11) NOT NULL,
  `block_number` int(11) NOT NULL,
  `transaction_id` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `UserIncome`
--

CREATE TABLE `UserIncome` (
  `id` int(11) NOT NULL,
  `sender` varchar(50) NOT NULL,
  `receiver` varchar(50) NOT NULL,
  `amount` varchar(50) NOT NULL,
  `level` int(11) NOT NULL,
  `_for` varchar(100) NOT NULL,
  `block_timestamp` int(11) NOT NULL,
  `block_number` int(11) NOT NULL,
  `transaction_id` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `UserIncome`
--

INSERT INTO `UserIncome` (`id`, `sender`, `receiver`, `amount`, `level`, `_for`, `block_timestamp`, `block_number`, `transaction_id`) VALUES
(1, '0xF08E9f6c3178Ff470977c06164c8fa12182c9C27', '0x6B63b63ce0c59D63a263B1B8cF9c52D912b9A608', '5000000000000000000', 1, 'direct_sponcer', 1643703141, 16368015, '0x4da6c67541b256d01cad2665e44b42a69f29ce688a8120bc89adf0b7eafc3ffb'),
(2, '0xb41eD46A751bd200728d122149DC5e1d7Ea538fF', '0x6B63b63ce0c59D63a263B1B8cF9c52D912b9A608', '5000000000000000000', 1, 'direct_sponcer', 1643714694, 16371866, '0x1dac0a0afda2d1df8e2379179aa89de0ae83225ddfde6f02593d54019f461bca'),
(3, '0xb41eD46A751bd200728d122149DC5e1d7Ea538fF', '0x6B63b63ce0c59D63a263B1B8cF9c52D912b9A608', '20000000000000000000', 1, 'level_income', 1643714694, 16371866, '0x1dac0a0afda2d1df8e2379179aa89de0ae83225ddfde6f02593d54019f461bca');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `eventBlock`
--
ALTER TABLE `eventBlock`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Registration`
--
ALTER TABLE `Registration`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Upgrade`
--
ALTER TABLE `Upgrade`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `UserIncome`
--
ALTER TABLE `UserIncome`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `eventBlock`
--
ALTER TABLE `eventBlock`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `Registration`
--
ALTER TABLE `Registration`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Upgrade`
--
ALTER TABLE `Upgrade`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `UserIncome`
--
ALTER TABLE `UserIncome`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
