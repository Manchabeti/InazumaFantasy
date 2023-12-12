-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-12-2023 a las 01:18:32
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `inazuma_fantasy_v4`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equipos`
--

CREATE TABLE `equipos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `escudo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `equipos`
--

INSERT INTO `equipos` (`id`, `escudo`, `nombre`, `created_at`, `updated_at`) VALUES
(1, 'https://inazuma-eleven.fr/team-builder/images/emblems/ie1/Raimon.png', 'Raimon', NULL, NULL),
(3, 'https://inazuma-eleven.fr/team-builder/images/emblems/ie1/Teikoku_Gakuen_Emblem.png', 'Royal Academy', '2023-12-01 10:53:13', '2023-12-01 10:53:13'),
(4, 'https://vignette.wikia.nocookie.net/inazuma-eleven/images/8/89/Zanark_Domain_emblem.png', 'Zanark Domain', NULL, NULL),
(5, 'https://vignette.wikia.nocookie.net/inazuma-eleven/images/3/37/Earth_Eleven_Emblem.png', 'Earth Eleven', NULL, NULL),
(6, 'https://vignette.wikia.nocookie.net/inazuma-eleven/images/f/f6/El_Dorado_Team_01_emblem.png', 'El Dorado', NULL, NULL),
(7, 'https://vignette.wikia.nocookie.net/inazuma-eleven/images/9/93/LEVEL-GO_Emblem.png', 'Pachanga', NULL, NULL),
(8, 'https://inazuma-eleven.fr/team-builder/images/emblems/ie2/Robot_Guards.png', 'Robots Guardia', NULL, NULL),
(9, 'https://inazuma-eleven.fr/team-builder/images/emblems/ie1/Zeus.png', 'Zeus', NULL, NULL),
(10, 'https://vignette.wikia.nocookie.net/inazuma-eleven/images/6/6f/The_Genesis_emblem.png', 'Genesis', NULL, NULL),
(11, 'https://vignette.wikia.nocookie.net/inazuma-eleven/images/1/1c/Hakuren_emblem.png', 'Alpino', NULL, NULL),
(12, 'https://vignette.wikia.nocookie.net/inazuma-eleven/images/7/79/Chrono_Storm_emblem.png', 'Chrono Storm', NULL, NULL),
(13, 'https://vignette.wikia.nocookie.net/inazuma-eleven/images/c/c9/Raimon_%28GO%29_emblem.png', 'Raimon Go', NULL, NULL),
(14, 'https://inazuma-eleven.fr/team-builder/images/emblems/ie1/Occult.png', 'Occult', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jornadas`
--

CREATE TABLE `jornadas` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `fecha` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jugadores`
--

CREATE TABLE `jugadores` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `apodo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `media` int(11) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `posicion_id` bigint(20) UNSIGNED NOT NULL,
  `equipo_id` bigint(20) UNSIGNED NOT NULL,
  `foto` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `jugadores`
--

INSERT INTO `jugadores` (`id`, `nombre`, `apodo`, `media`, `user_id`, `posicion_id`, `equipo_id`, `foto`, `created_at`, `updated_at`) VALUES
(2, 'Mark Evans', 'Mark', 99, 25, 1, 1, 'https://inazuma-eleven.fr/team-builder/images/players/ie1/raimon/MarkEvans.png', NULL, '2023-12-07 21:30:18'),
(3, 'Jack Wallside', 'Jack', 3, 26, 2, 1, 'https://inazuma-eleven.fr/team-builder/images/players/ie1/raimon/Kabeyama.png', '2023-11-19 16:24:40', '2023-12-07 21:30:46'),
(4, 'Kevin Dragonfly', 'Kevin', 6, 23, 2, 1, 'https://inazuma-eleven.fr/team-builder/images/players/ie1/raimon/Someoka.png', '2023-11-19 17:31:34', '2023-12-07 21:25:20'),
(5, 'Axel Blaze', 'Axel', 6, 5, 2, 1, 'https://inazuma-eleven.fr/team-builder/images/players/ie1/raimon/Axel.png', '2023-11-19 17:35:45', '2023-11-19 22:45:08'),
(6, 'Shawn Frost', 'Shawn', 80, 31, 4, 11, 'https://inazuma-eleven.fr/team-builder/images/players/ie2/Hakuren/(H)%20Fubuki%20Shirou%20sprite.png', '2023-11-20 21:11:14', '2023-12-07 21:46:18'),
(8, 'Sam Kinkaid', 'Sam', 6, 5, 2, 1, 'https://inazuma-eleven.fr/team-builder/images/players/ie1/raimon/Shishido_Raimon.png', '2023-11-20 21:12:20', '2023-12-07 21:23:01'),
(12, 'Zeus', 'Zeus', 98, 23, 2, 1, 'https://inazuma-eleven.fr/team-builder/images/players/fan/realzeus/Zeus.png', '2023-11-23 23:07:07', '2023-12-07 21:25:20'),
(13, 'Meca-Mark', 'MARK', 98, 26, 1, 6, 'https://vignette.wikia.nocookie.net/inazuma/images/d/d2/%28ED2%29_MARK.png/revision/latest?cb=20200610135610&path-prefix=es', '2023-11-23 23:09:08', '2023-12-07 21:30:46'),
(14, 'Xavier Foster', 'Xene', 88, 25, 1, 1, 'https://inazuma-eleven.fr/team-builder/images/players/ie2/The%20Genesis/Gran.png', '2023-11-23 23:10:14', '2023-12-07 21:29:24'),
(20, 'Tod Ironside', 'Tod', 56, 23, 2, 1, 'https://inazuma-eleven.fr/team-builder/images/players/ie1/raimon/Kurimatsu_Raimon.png', '2023-12-01 11:34:57', '2023-12-07 21:25:20'),
(21, 'Will Ramin', 'Ramin', 99, 5, 2, 7, 'https://vignette.wikia.nocookie.net/inazuma-eleven/images/d/dc/Shimizu.png/revision/latest?cb=20190731114047', '2023-12-01 14:20:10', '2023-12-07 21:23:04'),
(22, 'Jude Sharp', 'Jude', 87, 24, 3, 3, 'https://inazuma-eleven.fr/team-builder/images/players/ie1/Teikoku/Kidou_Yuuto.png', '2023-12-01 17:48:10', '2023-12-07 21:28:47'),
(23, 'Triceratops', 'Triceratops', 90, 5, 1, 3, 'https://inazuma-eleven.fr/team-builder/images/players/scouts/cs/Tricera.png', '2023-12-01 17:49:21', '2023-12-02 19:59:42'),
(24, 'Jim Mach', 'Mach', 78, 24, 4, 7, 'https://vignette.wikia.nocookie.net/inazuma-eleven/images/3/30/Mach.png/revision/latest?cb=20180518114903', '2023-12-01 17:50:10', '2023-12-07 21:27:50'),
(25, 'Daxgun Barvoyle', 'Barvoyle', 67, 31, 4, 1, 'https://inazuma-eleven.fr/team-builder/images/players/scouts/go3/Daxgun_Varview.png', '2023-12-01 17:51:21', '2023-12-07 21:46:18'),
(26, 'Zanark Avalonic', 'Zanark', 92, 5, 4, 4, 'https://inazuma-eleven.fr/team-builder/images/players/go2/Zanark%20Domain/(ZD)%20Zanark%20Avalonic%20sprite.png', '2023-12-01 17:54:09', '2023-12-07 21:14:19'),
(27, 'Zanark X Zeta', 'Zanark Ultra', 99, 5, 4, 12, 'https://inazuma-eleven.fr/team-builder/images/players/go/Raimon%20GO/Zanark%20MM%20Super.png', '2023-12-01 17:54:59', '2023-12-07 21:18:55'),
(28, 'Robot 1', 'Robot', 67, 27, 1, 1, 'https://vignette.wikia.nocookie.net/inazuma-eleven/images/d/d3/SR-101X_sprite.png/revision/latest?cb=20190614111514', '2023-12-01 17:55:32', '2023-12-07 21:36:34'),
(29, 'Soldado de Terracota', 'Soldado', 6, 25, 2, 1, 'https://vignette.wikia.nocookie.net/inazuma-eleven/images/8/8b/Karakuri_Heibayou_sprite.png/revision/latest?cb=20190712115219', '2023-12-01 17:56:42', '2023-12-07 21:29:24'),
(30, 'Wolfran Vulpeen', 'Vulpeen', 91, 23, 4, 3, 'https://inazuma-eleven.fr/team-builder/images/players/go2/Tsukigami%20no%20Ichizoku/Garsha.png', '2023-12-01 17:57:16', '2023-12-07 21:25:20'),
(31, 'Vulpeen Lobo', 'Vulpeen', 98, 25, 4, 3, 'https://inazuma-eleven.fr/team-builder/images/players/go2/Tsukigami%20no%20Ichizoku/Garsha%20MM.png', '2023-12-01 19:08:53', '2023-12-07 21:30:08'),
(33, 'Danger', 'Chelu', 99, 23, 2, 7, 'https://vignette.wikia.nocookie.net/inazuma-eleven/images/a/a4/Jii-san.png/revision/latest?cb=20190715121814', '2023-12-01 19:36:01', '2023-12-07 21:27:22'),
(43, 'Danger', 'Mar', 99, 27, 1, 5, 'https://inazuma-eleven.fr/team-builder/images/players/ie1/raimon/Kurimatsu_Raimon.png', '2023-12-07 12:00:49', '2023-12-07 21:36:34'),
(45, 'Jim W.', 'Jim', 78, 27, 2, 1, 'https://inazuma-eleven.fr/team-builder/images/players/ie1/raimon/Jin.png', '2023-12-07 13:16:06', '2023-12-07 21:36:34'),
(46, 'Nathan Swift', 'Nathan', 85, 26, 2, 1, 'https://inazuma-eleven.fr/team-builder/images/players/ie1/raimon/Kazemaru.png', '2023-12-07 13:17:55', '2023-12-07 21:30:46'),
(47, 'Erik Egle', 'Erik', 87, 26, 3, 1, 'https://inazuma-eleven.fr/team-builder/images/players/ie1/raimon/Ichinose.png', '2023-12-07 13:18:21', '2023-12-07 21:30:46'),
(48, 'Johan Tasman', 'Talisman', 82, 5, 4, 14, 'https://inazuma-eleven.fr/team-builder/images/players/ie1/occult/Talisman.png', '2023-12-07 13:20:08', '2023-12-07 15:25:49'),
(49, 'Mask', 'Mask', 72, 25, 1, 14, 'https://inazuma-eleven.fr/team-builder/images/players/ie1/occult/Mask.png', '2023-12-07 13:20:52', '2023-12-07 21:29:24'),
(50, 'Albert Rupert', 'Zombie', 58, 5, 1, 14, 'https://inazuma-eleven.fr/team-builder/images/players/ie1/occult/Zombie.png', '2023-12-07 13:21:19', '2023-12-07 21:18:59'),
(51, 'Javier Juegos', 'Ghost', 33, 26, 3, 14, 'https://inazuma-eleven.fr/team-builder/images/players/ie1/occult/Ghost.png', '2023-12-07 13:21:53', '2023-12-07 21:30:46'),
(52, 'Joseph King', 'King', 92, 31, 1, 3, 'https://inazuma-eleven.fr/team-builder/images/players/ie1/Teikoku/Genda_Koujirou.png', '2023-12-07 13:22:36', '2023-12-07 21:46:18'),
(53, 'David Samford', 'Samford', 89, 27, 4, 3, 'https://inazuma-eleven.fr/team-builder/images/players/ie1/Teikoku/Sakuma_Jirou.png', '2023-12-07 13:23:13', '2023-12-07 21:36:34'),
(54, 'JP X Liu Bei', 'JP', 95, 27, 1, 12, 'https://inazuma-eleven.fr/team-builder/images/players/go/Raimon%20GO/Nishizono%20Shinsuke%20-%20Mixi%20Max.png', '2023-12-07 13:24:15', '2023-12-07 21:36:34'),
(55, 'Sor X P.Sor', 'Sor', 96, 31, 2, 12, 'https://inazuma-eleven.fr/team-builder/images/players/go/Raimon%20GO/(R%20(CS))%20Torb%20sprite%20(MM).png', '2023-12-07 13:24:53', '2023-12-07 21:46:18'),
(56, 'Gabi X Juana', 'Gabi', 94, 24, 2, 12, 'https://inazuma-eleven.fr/team-builder/images/players/go/Raimon%20GO/(R%20(GO))%20Kirino%20Ranmaru%20sprite%20(MM).png', '2023-12-07 13:25:20', '2023-12-07 21:27:50'),
(57, 'Victor X Okita', 'Victor', 98, 24, 4, 12, 'https://inazuma-eleven.fr/team-builder/images/players/go/Raimon%20GO/(R%20(GO))%20Tsurugi%20Kyousuke%20sprite%20(MM).png', '2023-12-07 13:26:05', '2023-12-07 21:27:50'),
(58, 'Riccardo X Oda.', 'Riccardo', 97, 24, 3, 12, 'https://inazuma-eleven.fr/team-builder/images/players/go/Raimon%20GO/Shindou_Miximax.png', '2023-12-07 13:26:44', '2023-12-07 21:27:50'),
(59, 'Nero', 'Nero', 78, 24, 1, 10, 'https://inazuma-eleven.fr/team-builder/images/players/ie2/The%20Genesis/Nero.png', '2023-12-07 13:27:14', '2023-12-07 21:27:50'),
(60, 'Isabel', 'Bellatrix', 80, 5, 3, 10, 'https://inazuma-eleven.fr/team-builder/images/players/ie2/The%20Genesis/Ulvida.png', '2023-12-07 13:27:57', '2023-12-07 21:18:43'),
(61, 'Byron Love', 'Aphrodite', 92, 5, 3, 9, 'https://inazuma-eleven.fr/team-builder/images/players/ie1/Zeus/Afuro_Terumi.png', '2023-12-07 13:28:43', '2023-12-07 21:20:54'),
(62, 'Paul Sidon', 'Poseidon', 84, 31, 1, 9, 'https://inazuma-eleven.fr/team-builder/images/players/ie1/Zeus/Posei_Donichi.png', '2023-12-07 13:29:41', '2023-12-07 21:46:18'),
(63, 'Falco Flashman', 'Falco', 91, 27, 4, 5, 'https://inazuma-eleven.fr/team-builder/images/players/go3/eartheleven/Dark%20Matatagi%20Earth%20Eleven%20Uniform%20Avatar.png', '2023-12-07 13:31:42', '2023-12-07 21:36:34'),
(64, 'Zack Avalon', 'Zack', 98, 5, 4, 5, 'https://inazuma-eleven.fr/team-builder/images/players/go3/eartheleven/Zanakurou_s%20soccer%20uniform.png', '2023-12-07 13:32:08', '2023-12-07 21:21:00'),
(65, 'Terry Archibal', 'Terry', 92, 27, 1, 5, 'https://inazuma-eleven.fr/team-builder/images/players/go3/eartheleven/Ibuki%20Munemasa%20(Earth%20Eleven%20uniform).png', '2023-12-07 13:32:48', '2023-12-07 21:36:34'),
(66, 'Buddy Fury', 'Buddy', 85, 5, 3, 5, 'https://inazuma-eleven.fr/team-builder/images/players/go3/eartheleven/(EE)%20Kusaka%20Ryuuji%20sprite.png', '2023-12-07 13:33:11', '2023-12-07 15:25:49'),
(67, 'Reina de los Dragones', 'Reina', 78, 5, 2, 7, 'https://inazuma-eleven.fr/team-builder/images/players/scouts/go3/Master_Dragon.png', '2023-12-07 13:33:58', '2023-12-07 21:19:04'),
(68, 'Mark X Arion', 'Markion', 94, 5, 3, 7, 'https://vignette.wikia.nocookie.net/inazuma-eleven/images/9/93/Tendou.png/revision/latest?cb=20161013200742', '2023-12-07 13:34:44', '2023-12-07 21:14:27'),
(69, 'Tom Skipper', 'Skipper', 92, 27, 4, 7, 'https://vignette.wikia.nocookie.net/inazuma-eleven/images/a/a9/Captain.png/revision/latest?cb=20120702185803', '2023-12-07 13:35:20', '2023-12-07 21:36:34');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2022_11_15_225335_create_posiciones', 1),
(6, '2022_11_15_225404_create_equipos', 1),
(7, '2023_02_01_061544_create_articulos_table', 1),
(8, '2023_02_01_061736_create_comentarios_table', 1),
(9, '2023_10_15_225342_create_jornadas', 1),
(10, '2023_11_15_225231_create_jugadores', 1),
(11, '2023_11_15_225321_create_puntuaciones', 1),
(12, '2023_11_19_182145_add_role_to_users_table', 2),
(13, '2023_11_23_213641_add_foto_to_jugadores_table', 3),
(14, '2023_12_04_201810_add_jugadores_id_to_puntuaciones_table', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `password_resets`
--

CREATE TABLE `password_resets` (
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `posiciones`
--

CREATE TABLE `posiciones` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `posiciones`
--

INSERT INTO `posiciones` (`id`, `nombre`, `created_at`, `updated_at`) VALUES
(1, 'Portero', NULL, NULL),
(2, 'Defensa', NULL, NULL),
(3, 'Mediocentro', NULL, NULL),
(4, 'Delantero', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `puntuaciones`
--

CREATE TABLE `puntuaciones` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `jornada_id` bigint(20) UNSIGNED NOT NULL,
  `jugadores_id` bigint(20) UNSIGNED NOT NULL,
  `puntos` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username_verified_at` timestamp NULL DEFAULT NULL,
  `saldo` int(11) NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'usuario'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `username`, `username_verified_at`, `saldo`, `password`, `remember_token`, `created_at`, `updated_at`, `role`) VALUES
(5, 'administrador', NULL, 982, '$2y$10$h2dXYEDMf/lfq.7c7iOa0.N0Q.uxNq9AkaMavRnE7Vso8w6gyOYFe', NULL, '2023-11-19 17:34:20', '2023-11-20 21:13:42', 'admin'),
(23, 'AladoArchipegaso', NULL, 901, '$2y$10$kS.2MIE/gT5p/q.DXR31H.yc64lGCmkl2MYGQ8PWhAkQgR2F2hYL.', NULL, '2023-12-07 21:25:20', '2023-12-07 21:27:22', 'usuario'),
(24, 'ElDestructor556', NULL, 913, '$2y$10$Jbe830NM4JRpJS7zt8742.Q74cFWz2NVDI0Z8fJ2J3CGxg/J0hOVC', NULL, '2023-12-07 21:27:50', '2023-12-07 21:28:47', 'usuario'),
(25, 'xinzao', NULL, 803, '$2y$10$exEKn7Ugp5YYdecFXoBiCOg1Vs7I0nQvbT3hz6Ggk4b.QeYLxd7fe', NULL, '2023-12-07 21:29:24', '2023-12-07 21:30:18', 'usuario'),
(26, 'Goku', NULL, 1000, '$2y$10$Gg7AMxLgmL4pHGKKwZZxl.gKtekMVeJ22Z0rmTHWFLSSdfjQuVQQq', NULL, '2023-12-07 21:30:46', '2023-12-07 21:30:46', 'usuario'),
(27, 'AladoArchipegaso2', NULL, 1000, '$2y$10$QshxnKjjM8CMKJFlcCqkCedC.9n/3s/lB6/e9kIiOc0dviLnIOxEu', NULL, '2023-12-07 21:36:34', '2023-12-07 21:36:34', 'usuario'),
(31, 'JeffryGamessss', NULL, 1000, '$2y$10$P1711EOKCJLhY7yf8a0jZ.ohP0blXJwbaJ5H5u5FUc7CjIKMsFDuq', NULL, '2023-12-07 21:46:18', '2023-12-07 21:46:18', 'usuario');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `equipos`
--
ALTER TABLE `equipos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indices de la tabla `jornadas`
--
ALTER TABLE `jornadas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `jugadores`
--
ALTER TABLE `jugadores`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `jugadores_id_unique` (`id`),
  ADD KEY `jugadores_user_id_foreign` (`user_id`),
  ADD KEY `jugadores_posicion_id_foreign` (`posicion_id`),
  ADD KEY `jugadores_equipo_id_foreign` (`equipo_id`);

--
-- Indices de la tabla `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `password_resets`
--
ALTER TABLE `password_resets`
  ADD PRIMARY KEY (`username`);

--
-- Indices de la tabla `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indices de la tabla `posiciones`
--
ALTER TABLE `posiciones`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `puntuaciones`
--
ALTER TABLE `puntuaciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `puntuaciones_user_id_foreign` (`user_id`),
  ADD KEY `puntuaciones_jornada_id_foreign` (`jornada_id`),
  ADD KEY `puntuaciones_jugadores_id_foreign` (`jugadores_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_username_unique` (`username`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `equipos`
--
ALTER TABLE `equipos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `jornadas`
--
ALTER TABLE `jornadas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `jugadores`
--
ALTER TABLE `jugadores`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT de la tabla `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `posiciones`
--
ALTER TABLE `posiciones`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `puntuaciones`
--
ALTER TABLE `puntuaciones`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1052;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `jugadores`
--
ALTER TABLE `jugadores`
  ADD CONSTRAINT `jugadores_equipo_id_foreign` FOREIGN KEY (`equipo_id`) REFERENCES `equipos` (`id`),
  ADD CONSTRAINT `jugadores_posicion_id_foreign` FOREIGN KEY (`posicion_id`) REFERENCES `posiciones` (`id`),
  ADD CONSTRAINT `jugadores_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `puntuaciones`
--
ALTER TABLE `puntuaciones`
  ADD CONSTRAINT `puntuaciones_jornada_id_foreign` FOREIGN KEY (`jornada_id`) REFERENCES `jornadas` (`id`),
  ADD CONSTRAINT `puntuaciones_jugadores_id_foreign` FOREIGN KEY (`jugadores_id`) REFERENCES `jugadores` (`id`),
  ADD CONSTRAINT `puntuaciones_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
