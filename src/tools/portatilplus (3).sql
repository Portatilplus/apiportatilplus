-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-06-2024 a las 08:42:06
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `portatilplus`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE  PROCEDURE `sp_agregar_accesorios` (IN `_numero_accesorio` INT(10), IN `_nombre_accesorio` VARCHAR(100))   BEGIN
INSERT INTO accesorios(numero_accesorio,nombre_accesorio) VALUES
(_numero_accesorio,_nombre_accesorio);
END$$

CREATE  PROCEDURE `sp_agregar_registro_computador` (IN `_marca` VARCHAR(100), IN `_modelo` VARCHAR(200), IN `_area` ENUM('Diseño','Software','Administracion'), IN `_estado_computador` ENUM('Reservado','Disponible','Pendiente'), IN `_fecha` DATE)   BEGIN
INSERT INTO registro_computador(marca,modelo,area,estado_computador, fecha) VALUES
(_marca,_modelo,_area,_estado_computador, _fecha);
END$$

CREATE  PROCEDURE `sp_agregar_registro_usuario` (IN `_nombre` VARCHAR(100), IN `_apellido` VARCHAR(50), IN `_telefono` INT(10), IN `_correo` VARCHAR(20), IN `_contrasena` VARCHAR(100), IN `_rol` ENUM('Admin','Usuario','Instructor'))   BEGIN
INSERT INTO registros(nombre,apellido,telefono,correo,contrasena,rol) VALUES
(_nombre,_apellido,_telefono,_correo,_contrasena,_rol);
END$$

CREATE  PROCEDURE `sp_agregar_retiro` (IN `_id_registro` INT, IN `_fecha` DATE)   BEGIN
INSERT INTO retiros(id_registro, fecha) VALUES(_id_registro, _fecha);
END$$

CREATE  PROCEDURE `sp_agregar_sancion` (IN `_id_registro` INT, IN `_motivo` VARCHAR(1000))   BEGIN
INSERT INTO sanciones(id_registro, motivo) VALUES (_id_registro, _motivo);
END$$

CREATE  PROCEDURE `sp_editar_reservacion` (IN `_id_reserva` INT(10), IN `_nombre` VARCHAR(100), IN `_identificacion` INT(10), IN `_id_registro_computador` INT(10), IN `_fecha` TIMESTAMP)   BEGIN
UPDATE reservacion
SET nombre =
CASE
	WHEN _nombre = '' THEN nombre
    ELSE _nombre
END,
	identificacion =
CASE
	WHEN _identificacion = '' THEN identificacion
    ELSE _identificacion
END,
	id_registro_computador =
CASE
	WHEN _id_registro_computador = '' THEN id_registro_computador
    ELSE _id_registro_computador
END,
	fecha =
CASE
	WHEN _fecha = '' THEN fecha
    ELSE _fecha
END
WHERE id_reserva = _id_reserva;
END$$

CREATE  PROCEDURE `sp_eliminar_accesorio` (IN `_id_accesorio` INT(10))   BEGIN
DELETE FROM accesorios
WHERE id_accesorio = _id_accesorio;
END$$

CREATE  PROCEDURE `sp_eliminar_registro_computador` (IN `_idcomputador` INT)   BEGIN
 DELETE FROM registro_computador
 WHERE idcomputador = _idcomputador;
 END$$

CREATE  PROCEDURE `sp_eliminar_registro_usuario` (IN `_id_registro` INT(10))   BEGIN
DELETE FROM registros
WHERE id_registro = _id_registro;
END$$

CREATE  PROCEDURE `sp_eliminar_reservacion` (IN `_id_reserva` INT(10))   BEGIN 
DELETE FROM reservacion
WHERE id_reserva = _id_reserva;
END$$

CREATE  PROCEDURE `sp_eliminar_retiro` (IN `_id_retiro` INT)   BEGIN

DELETE FROM retiros
WHERE id_retiro = _id_retiro;
END$$

CREATE  PROCEDURE `sp_eliminar_sancion` (IN `_id_sancion` INT)   BEGIN
DELETE FROM sanciones
WHERE id_sancion = _id_sancion;
END$$

CREATE  PROCEDURE `sp_historial_reserva` ()   BEGIN
SELECT * FROM reservacion;
END$$

CREATE  PROCEDURE `sp_insertar_reservacion` (IN `_nombre` VARCHAR(100), IN `_identificacion` INT(10), IN `_id_registro_computador` INT(10))   BEGIN
INSERT INTO reservacion(nombre,identificacion,id_registro_computador) VALUES
(_nombre,_identificacion,_id_registro_computador);
END$$

CREATE  PROCEDURE `sp_listar_accesorios` ()   BEGIN
SELECT * FROM accesorios;
END$$

CREATE  PROCEDURE `sp_listar_historial` (IN `_id_reserva` INT(10))   BEGIN
SELECT * FROM reservacion WHERE id_reserva = _id_reserva;
END$$

CREATE  PROCEDURE `sp_listar_registro_computador` ()   BEGIN
SELECT * FROM registro_computador;
END$$

CREATE  PROCEDURE `sp_listar_registro_usuario` ()   BEGIN
SELECT * FROM registros;
END$$

CREATE  PROCEDURE `sp_listar_retiro` ()   BEGIN
SELECT * FROM retiros;
END$$

CREATE  PROCEDURE `sp_listar_sanciones` ()   BEGIN
SELECT * FROM sanciones;
END$$

CREATE  PROCEDURE `sp_login` (IN `_correo` VARCHAR(200))   BEGIN
SELECT correo,contrasena FROM registros
WHERE correo = _correo
LIMIT 1;


END$$

CREATE  PROCEDURE `sp_modificar_accesorios` (IN `_id_accesorio` INT(10), IN `_numero_accesorio` INT(10), IN `_nombre_accesorio` VARCHAR(100))   BEGIN
UPDATE accesorios
SET numero_accesorio =
CASE
	WHEN _numero_accesorio = '' THEN numero_accesorio
    ELSE _numero_accesorio
END,
	nombre_accesorio =
CASE
	WHEN _nombre_accesorio = '' THEN nombre_accesorio
    ELSE _nombre_accesorio
END
WHERE id_accesorio = _id_accesorio;
END$$

CREATE  PROCEDURE `sp_modificar_disponibilidad` (IN `_idcomputador` INT(10))   BEGIN
UPDATE registro_computador
SET estado_computador= 'Reservado'

WHERE idcomputador = _idcomputador;
END$$

CREATE  PROCEDURE `sp_modificar_registro_computador` (IN `_idcomputador ` INT(10), IN `_marca` VARCHAR(100), IN `_modelo` VARCHAR(200), IN `_area` ENUM('Diseño','Sorftware','Administracion'), IN `_estado_computador` ENUM('Disponible','Pendiente','Reservado'), IN `_fecha` DATE)   BEGIN
  UPDATE registro_computador
  SET marca =
    CASE 
      WHEN _marca = '' THEN marca
      ELSE _marca
    END,
    modelo =
      CASE 
        WHEN _modelo = '' THEN modelo
        ELSE _modelo
      END,
    area =
      CASE 
        WHEN _area = '' THEN area
        ELSE _area
      END,
    estado_computador =
      CASE 
        WHEN _estado_computador = '' THEN estado_computador
        ELSE _estado_computador
      END,
      fecha =
      CASE
      WHEN _fecha = '' THEN fecha
      ELSE _fecha
      END
      
  WHERE idcomputador = _idcomputador;
END$$

CREATE  PROCEDURE `sp_modificar_registro_usuario` (IN `_id_registro` INT(10), IN `_nombre` VARCHAR(100), IN `_apellido` VARCHAR(50), IN `_telefono` INT(10), IN `_correo` VARCHAR(200), IN `_contrasena` VARCHAR(50), IN `_rol` ENUM('Usuario','Instructor'))   BEGIN
UPDATE registros
SET nombre =
CASE
	WHEN _nombre = '' THEN nombre
    ELSE _nombre
END,
	apellido = 
CASE
	WHEN _apellido = '' THEN apellido
    ELSE _apellido
END,
	telefono = 
CASE
	WHEN _telefono = '' THEN telefono
    ELSE _telefono
END,
	correo = 
CASE
	WHEN _correo = '' THEN correo
    ELSE _correo
END,
	contrasena = 
CASE
	WHEN _contrasena = '' THEN contrasena
    ELSE _contrasena
END,
	rol = 
CASE
	WHEN _rol = '' THEN rol
    ELSE _rol
END
WHERE id_registro = _id_registro;
END$$

CREATE  PROCEDURE `sp_modificar_retiro` (IN `_id_retiro` INT, IN `_id_registro` INT, IN `_fecha` DATE)   BEGIN
UPDATE retiros
SET id_registro =
CASE
	WHEN _id_registro = '' THEN id_registro
    ELSE _id_registro
END,
	fecha =
CASE
	WHEN _fecha = '' THEN fecha
    ELSE _fecha
END
WHERE id_retiro = _id_retiro;
END$$

CREATE  PROCEDURE `sp_modificar_sancion` (IN `_id_sancion` INT, IN `_id_registro` INT, IN `_motivo` VARCHAR(1000))   BEGIN
UPDATE sanciones
SET id_registro =
CASE
	WHEN _id_registro = '' THEN id_registro
    ELSE _id_registro
END,
	motivo =
CASE
	WHEN _motivo = '' THEN motivo
    ELSE _motivo
END
WHERE id_sancion = _id_sancion;
END$$

CREATE  PROCEDURE `sp_mostrar_computadores` ()   BEGIN
SELECT * FROM registro_computador 
WHERE estado_computador LIKE '%Disponible%';
END$$

CREATE  PROCEDURE `sp_mostrar_registro_usuario` (IN `_idregistro` INT)   BEGIN
SELECT id_registro,nombre,apellido,telefono,correo,contrasena,rol FROM registros
WHERE id_registro = _idregistro;
END$$

CREATE  PROCEDURE `sp_realizar_reserva` (IN `_nombre` VARCHAR(100), IN `_id_registro_computador` INT(10), IN `_fecha` DATE)   BEGIN
INSERT INTO reservacion (nombre, id_registro_computador, fecha)
VALUES (_nombre, _id_registro_computador, _fecha);
END$$

CREATE  PROCEDURE `sp_roles` (IN `_correo` VARCHAR(200))   BEGIN
SELECT rol FROM registros WHERE correo = _correo
LIMIT 1;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `accesorios`
--

CREATE TABLE `accesorios` (
  `id_accesorio` int(10) NOT NULL,
  `numero_accesorio` int(10) NOT NULL,
  `nombre_accesorio` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `accesorios`
--

INSERT INTO `accesorios` (`id_accesorio`, `numero_accesorio`, `nombre_accesorio`) VALUES
(5, 3212, 'teclado'),
(6, 6, '3/06/2023'),
(7, 4, '3/06/2023'),
(8, 123, 'cable'),
(9, 123, 'cable'),
(10, 123, 'cables');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registros`
--

CREATE TABLE `registros` (
  `id_registro` int(10) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `telefono` int(10) NOT NULL,
  `correo` varchar(200) NOT NULL,
  `contrasena` varchar(100) NOT NULL,
  `rol` enum('Admin','Usuario','Instructor') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `registros`
--

INSERT INTO `registros` (`id_registro`, `nombre`, `apellido`, `telefono`, `correo`, `contrasena`, `rol`) VALUES
(1, 'a', 'd', 13, 'xxtghgfg', '$2a$08$W0ogyZQ2/JM7.ULDgSDeGOa6GfpLTw1DpSfaQf4umzO', 'Usuario'),
(2, 'a', 'd', 13, 'a', '$2a$08$vk6OdRr7ekCOkdXyZGldhumeNOMvpMpfmgf3.oWTUqM', 'Usuario'),
(3, 'a', 'd', 13, 'b', '$2b$05$8gVuu73u973pmYhD0MmOseJl8eBb7qjUsmGufqHMj.z', 'Usuario'),
(4, 'a', 'd', 13, 'b', '$2b$05$H06rbsuSMYayu57ELG7bH.Tu5CznRx8WQcMrk4IIH5N', 'Usuario'),
(5, 'a', 'd', 13, 'b', '$2b$05$Q72K1HJyIQh7accZm9VNFuSticDY.rpW8ozY/EdSIF4', 'Usuario'),
(6, 'a', 'd', 13, 'm', '$2b$05$X20TeC2AZVLbsI.BkhbjTOAtJWelAWVIHwgcN.ZLBKO', 'Usuario'),
(7, 'a', 'd', 13, 'md', '$2b$05$.s.Wl0eYIxiTYai1WUI5qOtNn1l9EEPhEaDK99H0mcc', 'Usuario'),
(8, 'a', 'd', 13, 'md', '$2b$05$0h/FMo720y1R6zhEf8LQQOXPEO8retNXoyb8uxmYMPc', 'Usuario'),
(9, 'a', 'd', 13, 'md', '$2b$05$0cis0dfVUETJ6L.twIz3DeMBGZP0ver1gETpq3lcJvk', 'Usuario'),
(10, 'a', 'd', 13, 'x', '$2b$05$1pbVcdFkU0EO9XOlB9q05OFQuSAv0TMbJm8BHMCnd.v', 'Usuario'),
(11, 'a', 'd', 13, 'x', '$2a$05$7nWjndsuBlUvsM4UT/4QYOzUOSUQCaL7SffSaYMhlz5', 'Usuario'),
(12, 'a', 'd', 13, 'v', '$2b$05$ojPW3oTdRNmkFnjPiPfMi.5jM14e8yKXtbw0pltj7H6', 'Usuario'),
(13, 'a', 'd', 13, 'v', '$2b$05$pGSCnj.mUW0u0o7y7W6cPOwbq9GmdHCUypf0ePkeVUg', 'Usuario'),
(14, 'a', 'd', 13, 'v', '$2b$05$m1XwuQr8IHBUEy7QqHxGrOB5wXEpJiDT0h7MU.4wuhc', 'Usuario'),
(15, 'a', 'd', 13, 'vy', '$2b$05$sq2bFIt1PbbhU.DQInI37.o/l7rpcQ2JCv0OkB59Wfg', 'Usuario'),
(16, 'a', 'd', 13, 'vy', '$2b$05$sUmQczHW1H4RHi9LNUVSYu9FWWLyQHxrj9JwXIvS2v2', 'Usuario'),
(17, 'a', 'd', 13, 'vy', '$2b$05$eLf4IRAwS8na0Mnh7pvezu5yctvF5ayL/npXVvnQbov', 'Usuario'),
(18, 'a', 'd', 13, 'aa', '$2b$05$ejsXrM/1vsXJZPJpV1Z48O.hWg/IUIGvXZxWnBJ/TfEwW5N12rxdK', 'Usuario'),
(19, 'a', 'd', 13, 'as', '$2b$05$3xYxE6WrO7EcPIjxAtKvVu7YpJPgeW2aALMClRycmRhMf19wf0E2m', 'Usuario'),
(20, 'a', 'd', 13, 'ass', '$2b$05$ilz8F1HdTSZLr8y2krHxR.Aig9b3AVHvvNOjLKELyHx/T0zmaoOOS', 'Usuario'),
(21, 'a', 'd', 13, 'ass', '$2b$05$dBeBhnfZvZT4ggi7S/mk4udaDwyPssd/tcnIfccvN3TI4VDgS5NZ.', 'Usuario'),
(22, 'a', 'd', 13, 'z', '$2b$05$Pi3uos1rmx8uoWGRGhYzZuyvdq4genIYVonj3FqoNIQiSndKGu9A2', 'Usuario'),
(23, 'a', 'd', 13, 'z', '$2b$05$iDky126Znvpr6iZ.u0oySOJxtAcBkNltbVhex4Jys//F34uLDoar.', 'Usuario'),
(24, 'a', 'd', 13, 'j', '$2b$05$nrGSha6wddnmgJngcgWno.ZYf5IszH0e5DFbbePS6slw6wKwaT6c2', 'Usuario');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registro_computador`
--

CREATE TABLE `registro_computador` (
  `idcomputador` int(10) NOT NULL,
  `marca` varchar(100) NOT NULL,
  `modelo` varchar(200) NOT NULL,
  `estado_computador` varchar(40) NOT NULL,
  `area` enum('Diseño','Sorftware','Administracion') NOT NULL,
  `fecha` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `registro_computador`
--

INSERT INTO `registro_computador` (`idcomputador`, `marca`, `modelo`, `estado_computador`, `area`, `fecha`) VALUES
(2, 'microsoft', 'mkd3', 'Disponible', '', '2024-06-15'),
(3, 'lenovo', 'mkd3', 'Disponible', '', '2024-06-15'),
(9, 's', 'mkd3', 'Disponible', '', '2024-06-15');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservacion`
--

CREATE TABLE `reservacion` (
  `id_reserva` int(10) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `id_accesorio` int(10) NOT NULL,
  `id_registro_computador` int(10) NOT NULL,
  `fecha` date DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `retiros`
--

CREATE TABLE `retiros` (
  `id_retiro` int(10) NOT NULL,
  `id_registro` int(10) NOT NULL,
  `fecha` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `retiros`
--

INSERT INTO `retiros` (`id_retiro`, `id_registro`, `fecha`) VALUES
(3, 4, '2023-06-03'),
(4, 4, '2024-03-02');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sanciones`
--

CREATE TABLE `sanciones` (
  `id_sancion` int(10) NOT NULL,
  `id_registro` int(10) NOT NULL,
  `motivo` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sanciones`
--

INSERT INTO `sanciones` (`id_sancion`, `id_registro`, `motivo`) VALUES
(3, 3, 'daño el cragador');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `accesorios`
--
ALTER TABLE `accesorios`
  ADD PRIMARY KEY (`id_accesorio`);

--
-- Indices de la tabla `registros`
--
ALTER TABLE `registros`
  ADD PRIMARY KEY (`id_registro`),
  ADD UNIQUE KEY `contrasena` (`contrasena`);

--
-- Indices de la tabla `registro_computador`
--
ALTER TABLE `registro_computador`
  ADD PRIMARY KEY (`idcomputador`);

--
-- Indices de la tabla `reservacion`
--
ALTER TABLE `reservacion`
  ADD PRIMARY KEY (`id_reserva`),
  ADD KEY `id_registro_computador` (`id_registro_computador`),
  ADD KEY `id_accesorio` (`id_accesorio`);

--
-- Indices de la tabla `retiros`
--
ALTER TABLE `retiros`
  ADD PRIMARY KEY (`id_retiro`),
  ADD KEY `id_registro` (`id_registro`);

--
-- Indices de la tabla `sanciones`
--
ALTER TABLE `sanciones`
  ADD PRIMARY KEY (`id_sancion`),
  ADD KEY `id_registro` (`id_registro`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `accesorios`
--
ALTER TABLE `accesorios`
  MODIFY `id_accesorio` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `registros`
--
ALTER TABLE `registros`
  MODIFY `id_registro` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `registro_computador`
--
ALTER TABLE `registro_computador`
  MODIFY `idcomputador` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `reservacion`
--
ALTER TABLE `reservacion`
  MODIFY `id_reserva` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `retiros`
--
ALTER TABLE `retiros`
  MODIFY `id_retiro` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `sanciones`
--
ALTER TABLE `sanciones`
  MODIFY `id_sancion` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `reservacion`
--
ALTER TABLE `reservacion`
  ADD CONSTRAINT `reservacion_ibfk_1` FOREIGN KEY (`id_registro_computador`) REFERENCES `registro_computador` (`idcomputador`),
  ADD CONSTRAINT `reservacion_ibfk_2` FOREIGN KEY (`id_accesorio`) REFERENCES `accesorios` (`id_accesorio`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `retiros`
--
ALTER TABLE `retiros`
  ADD CONSTRAINT `retiros_ibfk_1` FOREIGN KEY (`id_registro`) REFERENCES `registros` (`id_registro`);

--
-- Filtros para la tabla `sanciones`
--
ALTER TABLE `sanciones`
  ADD CONSTRAINT `sanciones_ibfk_1` FOREIGN KEY (`id_registro`) REFERENCES `registros` (`id_registro`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
