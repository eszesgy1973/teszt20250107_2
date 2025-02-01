-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Jan 15. 19:32
-- Kiszolgáló verziója: 10.4.20-MariaDB
-- PHP verzió: 8.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `fullstack_api_a2_webshop`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `gyartok`
--

CREATE TABLE `gyartok` (
  `id` int(5) NOT NULL,
  `megnevezes` varchar(200) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `gyartok`
--

INSERT INTO `gyartok` (`id`, `megnevezes`) VALUES
(1, 'Toys KFT.'),
(2, 'Xiaomi');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kategoriak`
--

CREATE TABLE `kategoriak` (
  `id` int(3) NOT NULL,
  `megnevezes` varchar(30) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `ikon` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `kategoriak`
--

INSERT INTO `kategoriak` (`id`, `megnevezes`, `ikon`) VALUES
(1, 'Glamour napok', 'images/glamour.webp'),
(2, 'Játék', 'images/jatek.svg'),
(3, 'Telefon,tablet', 'images/telefon.svg'),
(4, 'Gaming,szórakozás', 'images/gaming.svg'),
(5, 'Háztartási gépek', 'images/haztartas.svg');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `megrendelesek`
--

CREATE TABLE `megrendelesek` (
  `megrend_id` int(9) NOT NULL,
  `idopont` datetime NOT NULL,
  `vasarlo_id` int(9) NOT NULL,
  `fizetesi_mod` int(3) NOT NULL,
  `szallitasi_mod` int(3) NOT NULL,
  `statusz` int(2) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `megrendelesek`
--

INSERT INTO `megrendelesek` (`megrend_id`, `idopont`, `vasarlo_id`, `fizetesi_mod`, `szallitasi_mod`, `statusz`) VALUES
(1, '2025-01-15 19:20:36', 5, 1, 2, 1),
(2, '2025-01-15 19:22:03', 3, 2, 2, 1),
(3, '2025-01-15 19:28:07', 5, 2, 2, 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `megrendelesi_tetelek`
--

CREATE TABLE `megrendelesi_tetelek` (
  `id` int(11) NOT NULL,
  `cikkszam` int(11) NOT NULL,
  `db` int(6) NOT NULL,
  `ar` int(11) NOT NULL,
  `megrend_id` int(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `megrendelesi_tetelek`
--

INSERT INTO `megrendelesi_tetelek` (`id`, `cikkszam`, `db`, `ar`, `megrend_id`) VALUES
(1, 2, 2, 16900, 1),
(2, 1, 1, 13790, 1),
(3, 1, 2, 13790, 2),
(4, 1, 3, 13790, 3);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `termekek`
--

CREATE TABLE `termekek` (
  `cikkszam` int(11) NOT NULL,
  `termeknev` varchar(200) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `leiras` text CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `ar` int(9) NOT NULL,
  `gyarto` int(5) NOT NULL,
  `kep` varchar(100) NOT NULL,
  `kiemelt` int(1) NOT NULL,
  `kategoria_id` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `termekek`
--

INSERT INTO `termekek` (`cikkszam`, `termeknev`, `leiras`, `ar`, `gyarto`, `kep`, `kiemelt`, `kategoria_id`) VALUES
(1, 'Igaz vagy Hamis', 'Társasjáték - családi játék, 2 - 5 játékos számára, nehézségi foka közepes, játék hossza 30 perc magyar nyelvű, ajánlott 8 éves kortól', 13790, 1, 'jatek1.webp', 1, 2),
(2, 'Xiaomi Smart Band 9 - Midnight Black', 'Okoskarkötő - uniszex, AMOLED kijelző, érintőkijelző, alvásfigyelés, lépésszámláló, véroxigénszint mérő, telefon zenelejátszó vezérlése és alvás / Ne zavarjanak mód, vízállóság 50 m (5 ATM), max. akkumulátor üzemidő 504 óra', 16900, 2, 'ora1.webp', 1, 3),
(3, 'Xiaomi Robot Vacuum E10', 'Robotporszívó - alkalmas linóleum, úszó padló és sima padlók tisztítására, funkciói felszívás, mosható szűrő, automata feltöltés, ütközésérzékelő, több helyiségbeni porszívózás, lépcsőről való leesés elleni érzékelő és időzíthető takarítás, töltöttségjelző és megtelt tartály kijelzés, vezérlés mobilalkalmazással, a készüléken, műanyag gyűjtőtartály űrtartalma 1 l, giroszkópos navigáció, Li-ion akkumulátor, működési idő 110 perc, töltési idő 6 óra, zajszint 55 dB, automata szűrőlerázó rendszer, kompatibilitás Bluetooth, 35 W teljesítmény, mérete 8 × 32,5 × 32,5 cm (Ma×Sz×Mé), tömege 3 kg, töltőállomás a csomag része, fehér kivitel', 52000, 2, 'robot1.webp', 1, 5);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `vasarlok`
--

CREATE TABLE `vasarlok` (
  `id` int(6) NOT NULL,
  `nev` varchar(40) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `jelszo` varchar(32) NOT NULL,
  `email` varchar(100) NOT NULL,
  `cim` varchar(100) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `mobilszam` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `vasarlok`
--

INSERT INTO `vasarlok` (`id`, `nev`, `jelszo`, `email`, `cim`, `mobilszam`) VALUES
(1, 'Nagy Béla', '827ccb0eea8a706c4c34a16891f84e7b', 'eszesgy1973@gmail.com', 'Tiszavárkony Alkotmány u. 13', '06302480057'),
(2, 'Eszes György', '827ccb0eea8a706c4c34a16891f84e7b', 'eszesgy2@gmail.com', '', ''),
(3, 'Nagy Géza', '827ccb0eea8a706c4c34a16891f84e7b', 'eszesgy@gmail.com', 'Vecsés', '06302480058'),
(4, 'Eszes György', 'bda3bfdfa868d04f4003838f5776f25e', 'eszesgy73@gmail.com', '', '36302480058'),
(5, 'Eszes Gyuri', 'bda3bfdfa868d04f4003838f5776f25e', 'gyorgy.eszes@mil.hu', '', '36302480058');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `gyartok`
--
ALTER TABLE `gyartok`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `kategoriak`
--
ALTER TABLE `kategoriak`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `megrendelesek`
--
ALTER TABLE `megrendelesek`
  ADD PRIMARY KEY (`megrend_id`);

--
-- A tábla indexei `megrendelesi_tetelek`
--
ALTER TABLE `megrendelesi_tetelek`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `termekek`
--
ALTER TABLE `termekek`
  ADD PRIMARY KEY (`cikkszam`);

--
-- A tábla indexei `vasarlok`
--
ALTER TABLE `vasarlok`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `gyartok`
--
ALTER TABLE `gyartok`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `kategoriak`
--
ALTER TABLE `kategoriak`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT a táblához `megrendelesek`
--
ALTER TABLE `megrendelesek`
  MODIFY `megrend_id` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `megrendelesi_tetelek`
--
ALTER TABLE `megrendelesi_tetelek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT a táblához `termekek`
--
ALTER TABLE `termekek`
  MODIFY `cikkszam` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `vasarlok`
--
ALTER TABLE `vasarlok`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
