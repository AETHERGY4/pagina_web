-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-10-2025 a las 02:15:40
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `adoptafelizdb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pagos`
--

CREATE TABLE `pagos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `direccion` text DEFAULT NULL,
  `metodo_pago` varchar(50) DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `productos` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`productos`)),
  `fecha` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pagos`
--

INSERT INTO `pagos` (`id`, `nombre`, `email`, `direccion`, `metodo_pago`, `total`, `productos`, `fecha`) VALUES
(1, 'Jorge adan vazquez gomez', 'jv325867@gmail.com', 'calle jarrito', 'tarjeta', 89.96, '[{\"id\":\"1\",\"name\":\"Alimento Premium para Perros Adultos\",\"price\":45.99,\"image\":\"http:\\/\\/localhost\\/Final\\/Inicio_sesion\\/Inicio_sesion\\/Inicio%20(2)\\/Inicio\\/adoptafeliz_interfaces\\/images\\/productos_tienda.jpg\",\"quantity\":1},{\"id\":\"2\",\"name\":\"Collar Ajustable con Placa ID\",\"price\":18.99,\"image\":\"http:\\/\\/localhost\\/Final\\/Inicio_sesion\\/Inicio_sesion\\/Inicio%20(2)\\/Inicio\\/adoptafeliz_interfaces\\/images\\/accesorios_mascotas.webp\",\"quantity\":2}]', '2025-06-27 08:29:18'),
(2, 'Jorge adan vazquez gomez', 'jv325867@gmail.com', 'calle jarrito', 'tarjeta', 70.97, '[{\"id\":\"1\",\"name\":\"Alimento Premium para Perros Adultos\",\"price\":45.99,\"image\":\"http:\\/\\/localhost\\/Final\\/Inicio_sesion\\/Inicio_sesion\\/Inicio%20(2)\\/Inicio\\/adoptafeliz_interfaces\\/images\\/productos_tienda.jpg\",\"quantity\":1},{\"id\":\"2\",\"name\":\"Collar Ajustable con Placa ID\",\"price\":18.99,\"image\":\"http:\\/\\/localhost\\/Final\\/Inicio_sesion\\/Inicio_sesion\\/Inicio%20(2)\\/Inicio\\/adoptafeliz_interfaces\\/images\\/accesorios_mascotas.webp\",\"quantity\":1}]', '2025-06-27 09:00:35'),
(3, 'Jorge adan vazquez gomez', 'jv325867@gmail.com', 'calle jarrito', 'tarjeta', 120.97, '[{\"id\":\"4\",\"name\":\"Juguete Interactivo Dispensador\",\"price\":24.99,\"image\":\"http:\\/\\/localhost\\/Final\\/Inicio_sesion\\/Inicio_sesion\\/Inicio%20(2)\\/Inicio\\/adoptafeliz_interfaces\\/images\\/mascotas_adopcion_1.jpg\",\"quantity\":1},{\"id\":\"3\",\"name\":\"Cama Ortopédica Memory Foam\",\"price\":89.99,\"image\":\"http:\\/\\/localhost\\/Final\\/Inicio_sesion\\/Inicio_sesion\\/Inicio%20(2)\\/Inicio\\/adoptafeliz_interfaces\\/images\\/cama_mascota.jpg\",\"quantity\":1}]', '2025-06-27 09:02:47'),
(4, 'jose agripino', '2022452129@teschi.edu.mx', 'calle jarrito', 'tarjeta', 185.95, '[{\"id\":\"1\",\"name\":\"Alimento Premium para Perros Adultos\",\"price\":45.99,\"image\":\"http:\\/\\/localhost\\/Final\\/Inicio_sesion\\/Inicio_sesion\\/Inicio%20(2)\\/Inicio\\/adoptafeliz_interfaces\\/images\\/productos_tienda.jpg\",\"quantity\":1},{\"id\":\"2\",\"name\":\"Collar Ajustable con Placa ID\",\"price\":18.99,\"image\":\"http:\\/\\/localhost\\/Final\\/Inicio_sesion\\/Inicio_sesion\\/Inicio%20(2)\\/Inicio\\/adoptafeliz_interfaces\\/images\\/accesorios_mascotas.webp\",\"quantity\":1},{\"id\":\"4\",\"name\":\"Juguete Interactivo Dispensador\",\"price\":24.99,\"image\":\"http:\\/\\/localhost\\/Final\\/Inicio_sesion\\/Inicio_sesion\\/Inicio%20(2)\\/Inicio\\/adoptafeliz_interfaces\\/images\\/mascotas_adopcion_1.jpg\",\"quantity\":1},{\"id\":\"3\",\"name\":\"Cama Ortopédica Memory Foam\",\"price\":89.99,\"image\":\"http:\\/\\/localhost\\/Final\\/Inicio_sesion\\/Inicio_sesion\\/Inicio%20(2)\\/Inicio\\/adoptafeliz_interfaces\\/images\\/cama_mascota.jpg\",\"quantity\":1}]', '2025-06-27 13:13:27'),
(5, 'pablo joel', 'joseflorez@gmail.com', 'calle jarrito', 'tarjeta', 111.96, '[{\"id\":\"1\",\"name\":\"Alimento Premium para Perros Adultos\",\"price\":45.99,\"image\":\"http:\\/\\/localhost\\/Final\\/Inicio_sesion\\/Inicio_sesion\\/Inicio%20(2)\\/Inicio\\/adoptafeliz_interfaces\\/images\\/productos_tienda.jpg\",\"quantity\":1},{\"id\":\"4\",\"name\":\"Juguete Interactivo Dispensador\",\"price\":24.99,\"image\":\"http:\\/\\/localhost\\/Final\\/Inicio_sesion\\/Inicio_sesion\\/Inicio%20(2)\\/Inicio\\/adoptafeliz_interfaces\\/images\\/mascotas_adopcion_1.jpg\",\"quantity\":1},{\"id\":\"5\",\"name\":\"Kit Completo de Higiene\",\"price\":34.99,\"image\":\"http:\\/\\/localhost\\/Final\\/Inicio_sesion\\/Inicio_sesion\\/Inicio%20(2)\\/Inicio\\/adoptafeliz_interfaces\\/images\\/mascotas_adopcion_2.jpg\",\"quantity\":1}]', '2025-06-27 13:27:37'),
(6, 'Jorge adan vazquez gomez', 'jv325867@gmail.com', 'calle jarrito', 'tarjeta', 70.97, '[{\"id\":\"1\",\"name\":\"Alimento Premium para Perros Adultos\",\"price\":45.99,\"image\":\"http:\\/\\/localhost\\/Final\\/Inicio_sesion\\/Inicio_sesion\\/Inicio%20(2)\\/Inicio\\/adoptafeliz_interfaces\\/images\\/productos_tienda.jpg\",\"quantity\":1},{\"id\":\"2\",\"name\":\"Collar Ajustable con Placa ID\",\"price\":18.99,\"image\":\"http:\\/\\/localhost\\/Final\\/Inicio_sesion\\/Inicio_sesion\\/Inicio%20(2)\\/Inicio\\/adoptafeliz_interfaces\\/images\\/accesorios_mascotas.webp\",\"quantity\":1}]', '2025-06-27 15:03:48');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `correo` varchar(255) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `ubicacion` varchar(100) DEFAULT NULL,
  `bio` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `correo`, `contrasena`, `nombre`, `telefono`, `ubicacion`, `bio`) VALUES
(1, 'jv325867@gmail.com', '12345', 'Jorge Adan', '5551234567', 'Ciudad de México', 'Amante de los perros'),
(4, 'yoel@gmail.com', '12345', 'Yoel', '55665734', 'calle juarez', 'adoptante'),
(5, '2022452129@teschi.edu.mx', '123456789', 'Jorge vazquez gomez', '5531391379', 'calle mariano', 'me gustan los perro'),
(7, 'luis27@gmail.com', '12345678', 'Luis', '5583729379', 'calla serrada faipedro', 'me gustan los gatos'),
(8, 'andres17.tolentino@gmail.com', 'regina2418', 'Jose Andres', '5548324298', 'calle moneda', 'me gustan los perros'),
(10, '2022452121@teschi.edu.mx', '654321', 'agripino jose', '55823283', 'calle lomas', 'soy rescatista'),
(11, 'jorge4556@gmail.com', '4321', NULL, NULL, NULL, NULL),
(12, '2022453421@teschi.edu.mx', '12345', NULL, NULL, NULL, NULL),
(13, 'joseflorez@gmail.com', '123456', NULL, NULL, NULL, NULL),
(14, '4545@teschi.edu.mx', 'renegul', NULL, NULL, NULL, NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `pagos`
--
ALTER TABLE `pagos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `correo` (`correo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `pagos`
--
ALTER TABLE `pagos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
