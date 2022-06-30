DROP DATABASE IF EXISTS `articuloslimpiezattads`;
CREATE DATABASE `articuloslimpiezattads`;
USE `articuloslimpiezattads`;


--
-- Table structure for table `informacion_fiscal`
--
CREATE TABLE `informacion_fiscal` (
  `razon_social` varchar(100) NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `telefono` varchar(45) NOT NULL,
  `cuit` varchar(14) NOT NULL,
  PRIMARY KEY (`razon_social`)
);

--
-- Table structure for table `categoria`
--
CREATE TABLE `categoria` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(20) NOT NULL,
  `descripcion` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre_UNIQUE` (`nombre`)
);

--
-- Table structure for table `articulo`
--
CREATE TABLE `articulo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(1000) NOT NULL,
  `cant_a_pedir` int NOT NULL,
  `punto_pedido` int NOT NULL,
  `stock` int NOT NULL,
  `url_imagen` varchar(1000) NOT NULL,
  `id_categoria` int NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_articulo_categoria`
  FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id`)
  ON DELETE RESTRICT ON UPDATE CASCADE
);

--
-- Table structure for table `proveedor`
--
CREATE TABLE `proveedor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cuit` varchar(14) NOT NULL,
  `direccion` varchar(200) NOT NULL,
  `razon_social` varchar(250) NOT NULL,
  `telefono` varchar(45) NOT NULL,
  `mail` varchar(150) NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cuit_UNIQUE` (`cuit`)
);

--
-- Table structure for table `articulo_proveedor`
--
CREATE TABLE `articulo_proveedor` (
  `id_articulo` int NOT NULL,
  `id_proveedor` int NOT NULL,
  PRIMARY KEY (`id_articulo`,`id_proveedor`),
  CONSTRAINT `fk_articulo_proveedor_articulo`
  FOREIGN KEY (`id_articulo`) REFERENCES `articulo` (`id`)
  ON DELETE RESTRICT ON UPDATE CASCADE
);

--
-- Table structure for table `cliente`
--
CREATE TABLE `cliente` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `apellido` varchar(45) NOT NULL,
  `dni` varchar(10) NOT NULL,
  `password` varchar(1000) NOT NULL,
  `admin` tinyint NOT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
);

--
-- Table structure for table `carrito`
--
CREATE TABLE `carrito` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(20) NOT NULL,
  `id_cliente` int NOT NULL,
  `descripcion` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre_id_cliente_UNIQUE` (`nombre`,`id_cliente`),
  CONSTRAINT `fk_carrito_cliente`
  FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id`)
  ON DELETE RESTRICT ON UPDATE CASCADE
);

--
-- Table structure for table `linea_carrito`
--
CREATE TABLE `linea_carrito` (
  `id_carrito` int NOT NULL,
  `id_articulo` int NOT NULL,
  `id_proveedor` int NOT NULL,
  `cantidad` int NOT NULL,
  PRIMARY KEY (`id_carrito`,`id_articulo`,`id_proveedor`),
  CONSTRAINT `fk_linea_carrito_articulo_proveedor`
  FOREIGN KEY (`id_articulo`, `id_proveedor`) REFERENCES `articulo_proveedor` (`id_articulo`, `id_proveedor`)
  ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_linea_carrito_carrito`
  FOREIGN KEY (`id_carrito`) REFERENCES `carrito` (`id`)
  ON DELETE RESTRICT ON UPDATE CASCADE
);

--
-- Table structure for table `venta`
--
CREATE TABLE `venta` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nro_factura` int NULL,
  `f_emision` datetime NOT NULL,
  `f_cancelacion` datetime NULL,
  `f_pago` datetime  NULL,
  `importe` decimal(15,2) NULL,
  `f_retiro` datetime NULL,
  `id_cliente` int NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_venta_cliente`
  FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id`)
  ON DELETE RESTRICT ON UPDATE CASCADE
);

--
-- Table structure for table `linea_venta`
--
CREATE TABLE `linea_venta` (
  `id_venta` int NOT NULL,
  `id_articulo` int NOT NULL,
  `id_proveedor` int NOT NULL,
  `cantidad` int NOT NULL,
  PRIMARY KEY (`id_venta`,`id_articulo`,`id_proveedor`),
  CONSTRAINT `fk_linea_venta_articulo_proveedor`
  FOREIGN KEY (`id_articulo`, `id_proveedor`) REFERENCES `articulo_proveedor` (`id_articulo`, `id_proveedor`)
  ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_linea_venta_venta`
  FOREIGN KEY (`id_venta`) REFERENCES `venta` (`id`)
  ON DELETE RESTRICT ON UPDATE CASCADE
);

--
-- Table structure for table `precio`
--
CREATE TABLE `precio` (
  `id_articulo` int NOT NULL,
  `fecha_desde` date NOT NULL,
  `precio` decimal(15,2) NOT NULL,
  PRIMARY KEY (`id_articulo`,`fecha_desde`),
  CONSTRAINT `fk_precio_articulo`
  FOREIGN KEY (`id_articulo`) REFERENCES `articulo` (`id`)
  ON DELETE RESTRICT ON UPDATE CASCADE
);




