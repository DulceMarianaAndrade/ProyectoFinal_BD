-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-06-2026 a las 00:30:36
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
-- Base de datos: `miauladigital`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumno`
--

CREATE TABLE `alumno` (
  `Id_Alumno` tinyint(3) NOT NULL,
  `GrupoId_Grupo` tinyint(3) NOT NULL,
  `Nombre` varchar(50) NOT NULL,
  `Apellido_Paterno` varchar(20) NOT NULL,
  `Apellido_Materno` varchar(20) DEFAULT NULL,
  `Fecha_nacimiento` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `alumno`
--

INSERT INTO `alumno` (`Id_Alumno`, `GrupoId_Grupo`, `Nombre`, `Apellido_Paterno`, `Apellido_Materno`, `Fecha_nacimiento`) VALUES
(1, 1, 'Luis', 'García', 'López', '2012-03-15'),
(2, 1, 'Sofía', 'Martínez', 'Herrera', '2013-07-22'),
(3, 2, 'Diego', 'Ramírez', 'Torres', '2010-01-10');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `aviso`
--

CREATE TABLE `aviso` (
  `Id_Aviso` tinyint(3) NOT NULL,
  `DocenteId_Docente` tinyint(3) NOT NULL,
  `Titulo` varchar(20) NOT NULL,
  `Mensaje` varchar(200) NOT NULL,
  `Fecha` date NOT NULL,
  `Categoria` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `aviso`
--

INSERT INTO `aviso` (`Id_Aviso`, `DocenteId_Docente`, `Titulo`, `Mensaje`, `Fecha`, `Categoria`) VALUES
(1, 1, 'Reunión', 'Reunión de padres el viernes a las 9am', '2025-06-06', 'Evento'),
(2, 1, 'Tarea', 'Traer libro de matemáticas mañana', '2025-06-07', 'Evento'),
(3, 2, 'Examen', 'Examen de español el próximo lunes', '2025-06-09', 'Académico');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cita`
--

CREATE TABLE `cita` (
  `Id_Cita` tinyint(3) NOT NULL,
  `DocenteId_Docente` tinyint(3) NOT NULL,
  `TutorId_Tutor` tinyint(3) NOT NULL,
  `Hora` time NOT NULL,
  `Fecha` date NOT NULL,
  `Estado` varchar(20) NOT NULL DEFAULT 'No agendada'
) ;

--
-- Volcado de datos para la tabla `cita`
--

INSERT INTO `cita` (`Id_Cita`, `DocenteId_Docente`, `TutorId_Tutor`, `Hora`, `Fecha`, `Estado`) VALUES
(1, 1, 1, '09:00:00', '2025-06-10', 'Agendada'),
(2, 1, 2, '10:00:00', '2025-06-11', 'Agendada'),
(3, 2, 1, '08:30:00', '2025-06-12', 'No agendada');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cursar`
--

CREATE TABLE `cursar` (
  `AlumnoId_Alumno` tinyint(3) NOT NULL,
  `MateriaId_Materia` tinyint(3) NOT NULL,
  `Calificacion` float NOT NULL DEFAULT 0
) ;

--
-- Volcado de datos para la tabla `cursar`
--

INSERT INTO `cursar` (`AlumnoId_Alumno`, `MateriaId_Materia`, `Calificacion`) VALUES
(1, 1, 9.5),
(1, 2, 5),
(2, 1, 8.5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `docente`
--

CREATE TABLE `docente` (
  `Id_Docente` tinyint(3) NOT NULL,
  `Nombre` varchar(50) NOT NULL,
  `Apellido_Paterno` varchar(20) NOT NULL,
  `Apellido_Materno` varchar(20) NOT NULL,
  `Contrasena` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `docente`
--

INSERT INTO `docente` (`Id_Docente`, `Nombre`, `Apellido_Paterno`, `Apellido_Materno`, `Contrasena`) VALUES
(1, 'Héctor', 'Arteaga', 'Soto', 'docente123'),
(2, 'Laura', 'Martínez', 'Ramos', 'laura456'),
(3, 'Carlos', 'Pérez', 'Núñez', 'carlos789');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `grupo`
--

CREATE TABLE `grupo` (
  `Id_Grupo` tinyint(3) NOT NULL,
  `DocenteId_Docente` tinyint(3) NOT NULL,
  `Grado` int(11) NOT NULL,
  `Grupo` char(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `grupo`
--

INSERT INTO `grupo` (`Id_Grupo`, `DocenteId_Docente`, `Grado`, `Grupo`) VALUES
(1, 1, 3, 'B'),
(2, 2, 1, 'A'),
(3, 1, 2, 'C');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materia`
--

CREATE TABLE `materia` (
  `Id_Materia` tinyint(3) NOT NULL,
  `Nombre_Materia` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `materia`
--

INSERT INTO `materia` (`Id_Materia`, `Nombre_Materia`) VALUES
(1, 'Matemáticas'),
(2, 'Español'),
(3, 'Ciencias Naturales');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registro_diario`
--

CREATE TABLE `registro_diario` (
  `Id_Registro` tinyint(3) NOT NULL,
  `AlumnoId_Alumno` tinyint(3) NOT NULL,
  `Comportamiento` varchar(50) DEFAULT NULL,
  `Asistencia` varchar(20) NOT NULL,
  `Fecha` date NOT NULL,
  `Observacion` varchar(50) DEFAULT NULL
) ;

--
-- Volcado de datos para la tabla `registro_diario`
--

INSERT INTO `registro_diario` (`Id_Registro`, `AlumnoId_Alumno`, `Comportamiento`, `Asistencia`, `Fecha`, `Observacion`) VALUES
(1, 1, 'Participativo', 'Presente', '2025-06-02', 'Entregó tarea a tiempo'),
(2, 2, 'Tranquila', 'Ausente', '2025-06-03', 'Sin aviso del tutor'),
(3, 1, 'Inquieto', 'Justificado', '2025-06-04', 'Presentó justificante médico');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `representar`
--

CREATE TABLE `representar` (
  `TutorId_Tutor` tinyint(3) NOT NULL,
  `AlumnoId_Alumno` tinyint(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `representar`
--

INSERT INTO `representar` (`TutorId_Tutor`, `AlumnoId_Alumno`) VALUES
(1, 1),
(1, 2),
(2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tutor`
--

CREATE TABLE `tutor` (
  `Id_Tutor` tinyint(3) NOT NULL,
  `Nombre` varchar(20) NOT NULL,
  `Telefono` varchar(10) NOT NULL,
  `Direccion` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tutor`
--

INSERT INTO `tutor` (`Id_Tutor`, `Nombre`, `Telefono`, `Direccion`) VALUES
(1, 'María López', '4921234567', 'Calle Morelos 45, Loreto'),
(2, 'Juan Ramírez', '4929876543', 'Av. Hidalgo 12, Loreto'),
(3, 'Patricia Soto', '4921122334', 'Blvd. Guerrero 78, Loreto');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alumno`
--
ALTER TABLE `alumno`
  ADD PRIMARY KEY (`Id_Alumno`),
  ADD KEY `GrupoId_Grupo` (`GrupoId_Grupo`);

--
-- Indices de la tabla `aviso`
--
ALTER TABLE `aviso`
  ADD PRIMARY KEY (`Id_Aviso`),
  ADD KEY `DocenteId_Docente` (`DocenteId_Docente`);

--
-- Indices de la tabla `cita`
--
ALTER TABLE `cita`
  ADD PRIMARY KEY (`Id_Cita`),
  ADD KEY `DocenteId_Docente` (`DocenteId_Docente`),
  ADD KEY `TutorId_Tutor` (`TutorId_Tutor`);

--
-- Indices de la tabla `cursar`
--
ALTER TABLE `cursar`
  ADD PRIMARY KEY (`AlumnoId_Alumno`,`MateriaId_Materia`),
  ADD KEY `MateriaId_Materia` (`MateriaId_Materia`);

--
-- Indices de la tabla `docente`
--
ALTER TABLE `docente`
  ADD PRIMARY KEY (`Id_Docente`);

--
-- Indices de la tabla `grupo`
--
ALTER TABLE `grupo`
  ADD PRIMARY KEY (`Id_Grupo`),
  ADD KEY `DocenteId_Docente` (`DocenteId_Docente`);

--
-- Indices de la tabla `materia`
--
ALTER TABLE `materia`
  ADD PRIMARY KEY (`Id_Materia`);

--
-- Indices de la tabla `registro_diario`
--
ALTER TABLE `registro_diario`
  ADD PRIMARY KEY (`Id_Registro`),
  ADD KEY `AlumnoId_Alumno` (`AlumnoId_Alumno`);

--
-- Indices de la tabla `representar`
--
ALTER TABLE `representar`
  ADD PRIMARY KEY (`TutorId_Tutor`,`AlumnoId_Alumno`),
  ADD KEY `AlumnoId_Alumno` (`AlumnoId_Alumno`);

--
-- Indices de la tabla `tutor`
--
ALTER TABLE `tutor`
  ADD PRIMARY KEY (`Id_Tutor`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alumno`
--
ALTER TABLE `alumno`
  MODIFY `Id_Alumno` tinyint(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `aviso`
--
ALTER TABLE `aviso`
  MODIFY `Id_Aviso` tinyint(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `cita`
--
ALTER TABLE `cita`
  MODIFY `Id_Cita` tinyint(3) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `docente`
--
ALTER TABLE `docente`
  MODIFY `Id_Docente` tinyint(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `grupo`
--
ALTER TABLE `grupo`
  MODIFY `Id_Grupo` tinyint(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `materia`
--
ALTER TABLE `materia`
  MODIFY `Id_Materia` tinyint(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `registro_diario`
--
ALTER TABLE `registro_diario`
  MODIFY `Id_Registro` tinyint(3) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tutor`
--
ALTER TABLE `tutor`
  MODIFY `Id_Tutor` tinyint(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `alumno`
--
ALTER TABLE `alumno`
  ADD CONSTRAINT `alumno_ibfk_1` FOREIGN KEY (`GrupoId_Grupo`) REFERENCES `grupo` (`Id_Grupo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `aviso`
--
ALTER TABLE `aviso`
  ADD CONSTRAINT `aviso_ibfk_1` FOREIGN KEY (`DocenteId_Docente`) REFERENCES `docente` (`Id_Docente`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `cita`
--
ALTER TABLE `cita`
  ADD CONSTRAINT `cita_ibfk_1` FOREIGN KEY (`DocenteId_Docente`) REFERENCES `docente` (`Id_Docente`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cita_ibfk_2` FOREIGN KEY (`TutorId_Tutor`) REFERENCES `tutor` (`Id_Tutor`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `cursar`
--
ALTER TABLE `cursar`
  ADD CONSTRAINT `cursar_ibfk_1` FOREIGN KEY (`AlumnoId_Alumno`) REFERENCES `alumno` (`Id_Alumno`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cursar_ibfk_2` FOREIGN KEY (`MateriaId_Materia`) REFERENCES `materia` (`Id_Materia`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `grupo`
--
ALTER TABLE `grupo`
  ADD CONSTRAINT `grupo_ibfk_1` FOREIGN KEY (`DocenteId_Docente`) REFERENCES `docente` (`Id_Docente`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `registro_diario`
--
ALTER TABLE `registro_diario`
  ADD CONSTRAINT `registro_diario_ibfk_1` FOREIGN KEY (`AlumnoId_Alumno`) REFERENCES `alumno` (`Id_Alumno`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `representar`
--
ALTER TABLE `representar`
  ADD CONSTRAINT `representar_ibfk_1` FOREIGN KEY (`TutorId_Tutor`) REFERENCES `tutor` (`Id_Tutor`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `representar_ibfk_2` FOREIGN KEY (`AlumnoId_Alumno`) REFERENCES `alumno` (`Id_Alumno`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
