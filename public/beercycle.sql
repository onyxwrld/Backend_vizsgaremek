-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Ápr 26. 21:50
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `beercycle`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `basket`
--

CREATE TABLE `basket` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT 0,
  `deletedAt` datetime(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `basket`
--

INSERT INTO `basket` (`id`, `userId`, `deleted`, `deletedAt`) VALUES
(1, 2, 1, '2024-04-24 16:19:48.231'),
(2, 2, 1, '2024-04-26 19:32:13.273'),
(3, 2, 1, '2024-04-26 19:38:38.256');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `bicycle`
--

CREATE TABLE `bicycle` (
  `id` int(11) NOT NULL,
  `type` enum('Small','Medium','Large') NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `bicycle`
--

INSERT INTO `bicycle` (`id`, `type`, `price`) VALUES
(1, 'Small', 299990),
(2, 'Medium', 320990),
(3, 'Large', 800);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `menu`
--

CREATE TABLE `menu` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `type` enum('Drink','Snack') NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `menu`
--

INSERT INTO `menu` (`id`, `name`, `type`, `price`) VALUES
(1, 'Pilsner', 'Drink', 17769),
(2, 'IPA (India Pale Ale)', 'Drink', 19469),
(3, 'Stout', 'Drink', 17059),
(4, 'Porter', 'Drink', 18557),
(5, 'Pizza Diavola', 'Drink', 50000),
(6, 'Lager', 'Drink', 16154),
(7, 'Bock', 'Drink', 15286),
(9, 'Belga Dubbel', 'Drink', 19332),
(10, 'Amber Ale', 'Drink', 13735),
(11, 'Mizse Szénsavmentes', 'Drink', 0),
(12, 'Chio paprikás', 'Snack', 7500),
(13, 'Chio intense', 'Snack', 8500),
(14, 'Pizza Margherita', 'Drink', 1000);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `opening`
--

CREATE TABLE `opening` (
  `id` int(11) NOT NULL,
  `monday` varchar(191) NOT NULL,
  `tuesday` varchar(191) NOT NULL,
  `wednesday` varchar(191) NOT NULL,
  `thursday` varchar(191) NOT NULL,
  `friday` varchar(191) NOT NULL,
  `saturday` varchar(191) NOT NULL,
  `sunday` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `opening`
--

INSERT INTO `opening` (`id`, `monday`, `tuesday`, `wednesday`, `thursday`, `friday`, `saturday`, `sunday`) VALUES
(1, '08:00-17:00', '08:00-17:00', '08:00-17:00', '08:00-17:00', '08:00-17:00', '08:00-17:00', 'Closed');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `reservation`
--

CREATE TABLE `reservation` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `bicycle_id` int(11) NOT NULL,
  `start_time` varchar(191) NOT NULL,
  `location` varchar(191) NOT NULL,
  `reservation_time` enum('One','Three','Five') NOT NULL,
  `state` enum('Cancelled','Pending','Done') NOT NULL,
  `basket_id` int(11) NOT NULL,
  `total_amount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `reservation`
--

INSERT INTO `reservation` (`id`, `user_id`, `bicycle_id`, `start_time`, `location`, `reservation_time`, `state`, `basket_id`, `total_amount`) VALUES
(2, 2, 1, '2024-04-25T10:00:00Z', 'Example Location', 'One', 'Cancelled', 2, 0),
(3, 2, 1, '2024-04-25T10:00:00Z', 'Example Location', 'One', 'Pending', 3, 0);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `review`
--

CREATE TABLE `review` (
  `id` int(11) NOT NULL,
  `rate` int(11) NOT NULL,
  `content` varchar(191) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `review`
--

INSERT INTO `review` (`id`, `rate`, `content`, `userId`) VALUES
(1, 4, 'Great service!', 2),
(5, 4, 'Great service!', 2),
(6, 5, 'wao!', 4);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `token`
--

CREATE TABLE `token` (
  `token` varchar(191) NOT NULL,
  `userId` int(11) NOT NULL,
  `expiresAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `token`
--

INSERT INTO `token` (`token`, `userId`, `expiresAt`) VALUES
('08aa5e75f3496c7f9062a4c37789a05e22442eacf716ccf44dfd526f89e7a6f5', 2, '2024-04-27 00:30:42.864'),
('1161aadde53064539b019ac0f5532c849a1acb8c1653691f18cff6e83b42e3cb', 2, '2024-04-27 00:29:13.298'),
('dc18c7588527716c60f2ce51f28c7ca99012235b821af4f6bba1a24d1cbd7e18', 2, '2024-04-27 00:34:26.311');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `torzsadatok`
--

CREATE TABLE `torzsadatok` (
  `id` int(11) NOT NULL,
  `phone_number` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `opening_hours_id` int(11) NOT NULL,
  `location` varchar(191) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `first_name` varchar(191) NOT NULL,
  `last_name` varchar(191) NOT NULL,
  `role` enum('Admin','User') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `user`
--

INSERT INTO `user` (`id`, `username`, `email`, `password`, `first_name`, `last_name`, `role`) VALUES
(1, 'Béci', 'szabo.beci@petrik.hu', '$argon2id$v=19$m=65536,t=3,p=4$t5EtGQ3BTEIgYL2uFPWkCQ$p5Zl6GchCjtlJhIwCMpSdWpmmM6kEG861KvXWXCAGuE', 'Béla', 'Szabó', 'Admin'),
(2, 'Csonti', 'csontos.tibor@petrik.hu', '$argon2id$v=19$m=65536,t=3,p=4$QZ9SlZYW7eM+/ccb4aoOwQ$HAW3fgWICBOx8yz41JlynTLzokXDq5Bvt3q5qwSkey0', 'Tibike', 'Csontos', 'Admin'),
(3, 'Ricsi', 'szupkai.ricsi@petrik.hu', '$argon2id$v=19$m=65536,t=3,p=4$xoJnepiqKvklAkcyYBkOew$2n1JrWPS6MPP7SQC0S+mLw2FUWqHdkeZmBdhujNw1vU', 'Richárd', 'Szupkai', 'Admin'),
(4, 'tesztuser', 'teszt@teszt.com', '$argon2id$v=19$m=65536,t=3,p=4$ERhfZUNa02Zc/rvkWWrVKQ$rt1VOa0MwBoH+7+eUWTpr9A6+ObVakvTFO1p/OkacbE', 'Teszt', 'User', 'User'),
(6, 'TesztElek', 'example@petrik.hu', '$argon2id$v=19$m=65536,t=3,p=4$fdsZKSZWPWUmOFgn9eJb7w$B8xYIk7xvRZ9AjszvhrJtP7CAAFTlnMvHom2s9WRp+U', 'Elek', 'Teszt', 'Admin');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `_baskettomenu`
--

CREATE TABLE `_baskettomenu` (
  `A` int(11) NOT NULL,
  `B` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `_baskettomenu`
--

INSERT INTO `_baskettomenu` (`A`, `B`) VALUES
(1, 3),
(2, 3),
(3, 5);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `basket`
--
ALTER TABLE `basket`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Basket_userId_fkey` (`userId`);

--
-- A tábla indexei `bicycle`
--
ALTER TABLE `bicycle`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `opening`
--
ALTER TABLE `opening`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `reservation`
--
ALTER TABLE `reservation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Reservation_user_id_fkey` (`user_id`),
  ADD KEY `Reservation_bicycle_id_fkey` (`bicycle_id`),
  ADD KEY `Reservation_basket_id_fkey` (`basket_id`);

--
-- A tábla indexei `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Review_userId_fkey` (`userId`);

--
-- A tábla indexei `token`
--
ALTER TABLE `token`
  ADD PRIMARY KEY (`token`),
  ADD KEY `Token_userId_fkey` (`userId`);

--
-- A tábla indexei `torzsadatok`
--
ALTER TABLE `torzsadatok`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `TorzsAdatok_opening_hours_id_key` (`opening_hours_id`),
  ADD KEY `TorzsAdatok_user_id_fkey` (`user_id`);

--
-- A tábla indexei `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_username_key` (`username`),
  ADD UNIQUE KEY `User_email_key` (`email`),
  ADD UNIQUE KEY `User_password_key` (`password`);

--
-- A tábla indexei `_baskettomenu`
--
ALTER TABLE `_baskettomenu`
  ADD UNIQUE KEY `_BasketToMenu_AB_unique` (`A`,`B`),
  ADD KEY `_BasketToMenu_B_index` (`B`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `basket`
--
ALTER TABLE `basket`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `bicycle`
--
ALTER TABLE `bicycle`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT a táblához `menu`
--
ALTER TABLE `menu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT a táblához `opening`
--
ALTER TABLE `opening`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `reservation`
--
ALTER TABLE `reservation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `review`
--
ALTER TABLE `review`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT a táblához `torzsadatok`
--
ALTER TABLE `torzsadatok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `basket`
--
ALTER TABLE `basket`
  ADD CONSTRAINT `Basket_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON UPDATE CASCADE;

--
-- Megkötések a táblához `reservation`
--
ALTER TABLE `reservation`
  ADD CONSTRAINT `Reservation_basket_id_fkey` FOREIGN KEY (`basket_id`) REFERENCES `basket` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Reservation_bicycle_id_fkey` FOREIGN KEY (`bicycle_id`) REFERENCES `bicycle` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Reservation_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON UPDATE CASCADE;

--
-- Megkötések a táblához `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `Review_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `token`
--
ALTER TABLE `token`
  ADD CONSTRAINT `Token_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `torzsadatok`
--
ALTER TABLE `torzsadatok`
  ADD CONSTRAINT `TorzsAdatok_opening_hours_id_fkey` FOREIGN KEY (`opening_hours_id`) REFERENCES `opening` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `TorzsAdatok_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON UPDATE CASCADE;

--
-- Megkötések a táblához `_baskettomenu`
--
ALTER TABLE `_baskettomenu`
  ADD CONSTRAINT `_BasketToMenu_A_fkey` FOREIGN KEY (`A`) REFERENCES `basket` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `_BasketToMenu_B_fkey` FOREIGN KEY (`B`) REFERENCES `menu` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
