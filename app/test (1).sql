-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 02, 2022 at 01:41 PM
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
(1, 2224755);

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
  `package` int(11) NOT NULL,
  `amount` varchar(50) NOT NULL,
  `block_number` int(11) NOT NULL,
  `block_timestamp` int(11) NOT NULL,
  `transaction_id` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Registration`
--

INSERT INTO `Registration` (`id`, `user`, `referrer`, `userId`, `referrerId`, `package`, `amount`, `block_number`, `block_timestamp`, `transaction_id`) VALUES
(1, '0x6B63b63ce0c59D63a263B1B8cF9c52D912b9A608', '0x0000000000000000000000000000000000000000', 1, 0, 1, '0', 2224880, 1643804985, '0x06d18b810b5c82d07bf473da4d45cd54e8e2cff37bff13a87aba7172bbcff9c3');

-- --------------------------------------------------------

--
-- Table structure for table `RoyaltyDeduction`
--

CREATE TABLE `RoyaltyDeduction` (
  `id` int(11) NOT NULL,
  `user` varchar(50) NOT NULL,
  `amount` varchar(50) NOT NULL,
  `block_timestamp` varchar(30) NOT NULL,
  `block_number` varchar(20) NOT NULL,
  `transaction_id` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `Upgrade`
--

CREATE TABLE `Upgrade` (
  `id` int(11) NOT NULL,
  `user` varchar(50) NOT NULL,
  `package` int(11) NOT NULL,
  `amount` varchar(50) NOT NULL,
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

-- --------------------------------------------------------

--
-- Table structure for table `Withdrawn`
--

CREATE TABLE `Withdrawn` (
  `id` int(11) NOT NULL,
  `user` varchar(50) NOT NULL,
  `amount` varchar(50) NOT NULL,
  `block_timestamp` varchar(30) NOT NULL,
  `block_number` varchar(20) NOT NULL,
  `transaction_id` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
-- Indexes for table `RoyaltyDeduction`
--
ALTER TABLE `RoyaltyDeduction`
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
-- Indexes for table `Withdrawn`
--
ALTER TABLE `Withdrawn`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `RoyaltyDeduction`
--
ALTER TABLE `RoyaltyDeduction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Upgrade`
--
ALTER TABLE `Upgrade`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `UserIncome`
--
ALTER TABLE `UserIncome`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Withdrawn`
--
ALTER TABLE `Withdrawn`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
