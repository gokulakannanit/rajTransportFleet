-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Apr 26, 2015 at 07:30 AM
-- Server version: 5.6.21
-- PHP Version: 5.6.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `logistics`
--

-- --------------------------------------------------------

--
-- Table structure for table `clientlist`
--

CREATE TABLE IF NOT EXISTS `clientlist` (
`id` int(255) NOT NULL,
  `companyName` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `contactPerson` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `clientlist`
--

INSERT INTO `clientlist` (`id`, `companyName`, `address`, `contactPerson`, `phone`, `email`) VALUES
(1, 'abc ', 'perungudi', 'xyz', '123456789', 'hjj@fvhg.com');

-- --------------------------------------------------------

--
-- Table structure for table `companylist`
--

CREATE TABLE IF NOT EXISTS `companylist` (
`id` int(255) NOT NULL,
  `companyName` varchar(255) NOT NULL,
  `tan` varchar(255) NOT NULL,
  `serviceTax` varchar(255) NOT NULL,
  `ssi` varchar(255) NOT NULL,
  `pan` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `typeOfCompany` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `companylist`
--

INSERT INTO `companylist` (`id`, `companyName`, `tan`, `serviceTax`, `ssi`, `pan`, `address`, `owner`, `typeOfCompany`, `email`, `phone`) VALUES
(1, 'RAJ TRANSPORT', 'ADGH223333', 'ADGH223333', 'DFGT12345', 'AMDFG1234F', '13, chettinadu green villa, perumbakkam, chennai', 'Raj', 'S', 'raj@gmail.com', '2147433644'),
(4, 'dsf', '', '', '', '', 'dsfdsf', 'Vignesh', 'S', '', ''),
(5, 'asd', '', '', 'fgfd', '', 'fdgdfh', 'Vignesh', 'S', 'fg@sd.fvgh', ''),
(9, 'df', '', '', '', '', 'df', 'Raj', 'S', '', ''),
(10, 'vidhya', '', '', 'dsfdf', '', 'medavakkam', 'Vignesh', 'S', '', ''),
(11, 'logistics', '', '', '', '', 'hjg', 'Raj', 'S', '', ''),
(12, 'dfgfd', '', '', '', '', 'dfg', '[object Object],[object Object]', 'P', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `owners`
--

CREATE TABLE IF NOT EXISTS `owners` (
`id` int(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `pan` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `owners`
--

INSERT INTO `owners` (`id`, `name`, `phone`, `address`, `email`, `pan`) VALUES
(2, 'raj', '9841667344', 'perumbakkam', 'raj@rajtransport.com', 'amypf1234D'),
(5, 'gokul', '1236547891', 'chennai', 'gokulakannanit@gmail.com', '');

-- --------------------------------------------------------

--
-- Table structure for table `vehiclelist`
--

CREATE TABLE IF NOT EXISTS `vehiclelist` (
`id` int(255) NOT NULL,
  `vehicleNo` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL,
  `amtPurchased` varchar(255) NOT NULL,
  `modelYear` varchar(255) NOT NULL,
  `make` varchar(255) NOT NULL,
  `typeOfVehicle` varchar(255) NOT NULL,
  `chasisNo` varchar(255) NOT NULL,
  `engineNo` varchar(255) NOT NULL,
  `ownership` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `odometer` varchar(255) NOT NULL,
  `fuelType` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `vehiclelist`
--

INSERT INTO `vehiclelist` (`id`, `vehicleNo`, `date`, `amtPurchased`, `modelYear`, `make`, `typeOfVehicle`, `chasisNo`, `engineNo`, `ownership`, `owner`, `odometer`, `fuelType`) VALUES
(1, 'TN 22 AB 1234', '12/12/12', '20125', '2005', '', '', '123456', 'ghj1325', 'own', '', '', 'Disel');

-- --------------------------------------------------------

--
-- Table structure for table `vendor`
--

CREATE TABLE IF NOT EXISTS `vendor` (
`id` int(255) NOT NULL,
  `companyName` varchar(255) NOT NULL,
  `typeOfGoods` varchar(255) NOT NULL,
  `contactPerson` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `vendor`
--

INSERT INTO `vendor` (`id`, `companyName`, `typeOfGoods`, `contactPerson`, `phone`, `address`, `email`) VALUES
(1, 'surya', 'Vignesh', 'perumal', '1234567890', 'df', ''),
(2, 'venkateshwara', 'Raj', 'venky', '1234567890', 'velachery', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `clientlist`
--
ALTER TABLE `clientlist`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `companylist`
--
ALTER TABLE `companylist`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `owners`
--
ALTER TABLE `owners`
 ADD PRIMARY KEY (`id`), ADD KEY `id` (`id`);

--
-- Indexes for table `vehiclelist`
--
ALTER TABLE `vehiclelist`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vendor`
--
ALTER TABLE `vendor`
 ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `clientlist`
--
ALTER TABLE `clientlist`
MODIFY `id` int(255) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `companylist`
--
ALTER TABLE `companylist`
MODIFY `id` int(255) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `owners`
--
ALTER TABLE `owners`
MODIFY `id` int(255) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `vehiclelist`
--
ALTER TABLE `vehiclelist`
MODIFY `id` int(255) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `vendor`
--
ALTER TABLE `vendor`
MODIFY `id` int(255) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
