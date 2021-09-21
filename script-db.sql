--
-- PostgreSQL database dump
--

-- Dumped from database version 13.2
-- Dumped by pg_dump version 13.2

-- Started on 2021-09-06 23:10:08

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE ecommerce;
--
-- TOC entry 3063 (class 1262 OID 17060)
-- Name: ecommerce; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE ecommerce WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Spanish_Argentina.1252';


ALTER DATABASE ecommerce OWNER TO postgres;

\connect ecommerce

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 202 (class 1259 OID 17068)
-- Name: Categorias; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Categorias" (
    "idCategoria" integer NOT NULL,
    descripcion character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Categorias" OWNER TO postgres;

--
-- TOC entry 201 (class 1259 OID 17066)
-- Name: Categorias_idCategoria_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Categorias_idCategoria_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Categorias_idCategoria_seq" OWNER TO postgres;

--
-- TOC entry 3064 (class 0 OID 0)
-- Dependencies: 201
-- Name: Categorias_idCategoria_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Categorias_idCategoria_seq" OWNED BY public."Categorias"."idCategoria";


--
-- TOC entry 204 (class 1259 OID 17086)
-- Name: Clientes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Clientes" (
    dni integer NOT NULL,
    nombre character varying(255) NOT NULL,
    apellido character varying(255) NOT NULL,
    telefono character varying(255),
    direccion character varying(255),
    "tipoCliente" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Clientes" OWNER TO postgres;

--
-- TOC entry 205 (class 1259 OID 17173)
-- Name: Items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Items" (
    "cantPedida" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "VentaIdVenta" integer NOT NULL,
    "ProductoIdProd" integer NOT NULL,
    "idItem" integer NOT NULL
);


ALTER TABLE public."Items" OWNER TO postgres;

--
-- TOC entry 206 (class 1259 OID 17317)
-- Name: Items_idItem_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Items_idItem_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Items_idItem_seq" OWNER TO postgres;

--
-- TOC entry 3065 (class 0 OID 0)
-- Dependencies: 206
-- Name: Items_idItem_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Items_idItem_seq" OWNED BY public."Items"."idItem";


--
-- TOC entry 208 (class 1259 OID 19000)
-- Name: Productos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Productos" (
    "idProd" integer NOT NULL,
    descripcion character varying(255) NOT NULL,
    stock integer NOT NULL,
    "cantMinima" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "CategoriaIdCategoria" integer NOT NULL
);


ALTER TABLE public."Productos" OWNER TO postgres;

--
-- TOC entry 207 (class 1259 OID 18994)
-- Name: Productos_idProd_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Productos_idProd_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Productos_idProd_seq" OWNER TO postgres;

--
-- TOC entry 3066 (class 0 OID 0)
-- Dependencies: 207
-- Name: Productos_idProd_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Productos_idProd_seq" OWNED BY public."Productos"."idProd";


--
-- TOC entry 210 (class 1259 OID 19035)
-- Name: ProveedorProductos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ProveedorProductos" (
    id integer NOT NULL,
    "fechaPrecio" timestamp with time zone NOT NULL,
    precio real NOT NULL,
    "ProductoIdProd" integer,
    "ProveedoreIdProv" integer
);


ALTER TABLE public."ProveedorProductos" OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 19033)
-- Name: ProveedorProductos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ProveedorProductos_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ProveedorProductos_id_seq" OWNER TO postgres;

--
-- TOC entry 3067 (class 0 OID 0)
-- Dependencies: 209
-- Name: ProveedorProductos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ProveedorProductos_id_seq" OWNED BY public."ProveedorProductos".id;


--
-- TOC entry 212 (class 1259 OID 19114)
-- Name: Proveedores; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Proveedores" (
    "idProv" integer NOT NULL,
    "razonSocial" character varying(255) NOT NULL,
    telefono character varying(255) NOT NULL,
    direccion character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Proveedores" OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 19112)
-- Name: Proveedores_idProv_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Proveedores_idProv_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Proveedores_idProv_seq" OWNER TO postgres;

--
-- TOC entry 3068 (class 0 OID 0)
-- Dependencies: 211
-- Name: Proveedores_idProv_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Proveedores_idProv_seq" OWNED BY public."Proveedores"."idProv";


--
-- TOC entry 203 (class 1259 OID 17072)
-- Name: Ventas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Ventas" (
    "idVenta" integer NOT NULL,
    total real DEFAULT '0'::real,
    "nomTarjeta" character varying(255),
    "numTarjeta" character varying(255),
    "cantCuotas" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "ClienteDni" integer NOT NULL,
    "fechaVenta" timestamp with time zone
);


ALTER TABLE public."Ventas" OWNER TO postgres;

--
-- TOC entry 200 (class 1259 OID 17063)
-- Name: Ventas_idVenta_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Ventas_idVenta_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Ventas_idVenta_seq" OWNER TO postgres;

--
-- TOC entry 3069 (class 0 OID 0)
-- Dependencies: 200
-- Name: Ventas_idVenta_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Ventas_idVenta_seq" OWNED BY public."Ventas"."idVenta";


--
-- TOC entry 2887 (class 2604 OID 17076)
-- Name: Categorias idCategoria; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Categorias" ALTER COLUMN "idCategoria" SET DEFAULT nextval('public."Categorias_idCategoria_seq"'::regclass);


--
-- TOC entry 2890 (class 2604 OID 17319)
-- Name: Items idItem; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Items" ALTER COLUMN "idItem" SET DEFAULT nextval('public."Items_idItem_seq"'::regclass);


--
-- TOC entry 2891 (class 2604 OID 19003)
-- Name: Productos idProd; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Productos" ALTER COLUMN "idProd" SET DEFAULT nextval('public."Productos_idProd_seq"'::regclass);


--
-- TOC entry 2892 (class 2604 OID 19038)
-- Name: ProveedorProductos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProveedorProductos" ALTER COLUMN id SET DEFAULT nextval('public."ProveedorProductos_id_seq"'::regclass);


--
-- TOC entry 2893 (class 2604 OID 19117)
-- Name: Proveedores idProv; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Proveedores" ALTER COLUMN "idProv" SET DEFAULT nextval('public."Proveedores_idProv_seq"'::regclass);


--
-- TOC entry 2888 (class 2604 OID 17077)
-- Name: Ventas idVenta; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Ventas" ALTER COLUMN "idVenta" SET DEFAULT nextval('public."Ventas_idVenta_seq"'::regclass);


--
-- TOC entry 3047 (class 0 OID 17068)
-- Dependencies: 202
-- Data for Name: Categorias; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Categorias" ("idCategoria", descripcion, "createdAt", "updatedAt") VALUES (1, 'Informatica', '2021-08-23 20:28:56.626-03', '2021-08-23 20:28:56.626-03');
INSERT INTO public."Categorias" ("idCategoria", descripcion, "createdAt", "updatedAt") VALUES (3, 'HOGAR', '2021-08-23 20:28:56.626-03', '2021-09-04 10:50:12.195-03');
INSERT INTO public."Categorias" ("idCategoria", descripcion, "createdAt", "updatedAt") VALUES (4, 'Patio', '2021-09-06 22:08:14.591-03', '2021-09-06 22:08:14.591-03');
INSERT INTO public."Categorias" ("idCategoria", descripcion, "createdAt", "updatedAt") VALUES (5, 'Cocina', '2021-09-06 22:08:25.167-03', '2021-09-06 22:08:25.167-03');
INSERT INTO public."Categorias" ("idCategoria", descripcion, "createdAt", "updatedAt") VALUES (6, 'Vehiculo', '2021-09-06 22:08:31.853-03', '2021-09-06 22:08:31.853-03');


--
-- TOC entry 3049 (class 0 OID 17086)
-- Dependencies: 204
-- Data for Name: Clientes; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Clientes" (dni, nombre, apellido, telefono, direccion, "tipoCliente", "createdAt", "updatedAt") VALUES (37830335, 'juan', 'perez', '4987648', 'Tucuma 002', 'minorista', '2021-08-24 22:21:22.61-03', '2021-08-24 22:21:22.61-03');
INSERT INTO public."Clientes" (dni, nombre, apellido, telefono, direccion, "tipoCliente", "createdAt", "updatedAt") VALUES (40830336, 'juan', 'perez', '4982255', 'San Juan 222', 'minorista', '2021-09-06 22:06:34.104-03', '2021-09-06 22:06:34.104-03');
INSERT INTO public."Clientes" (dni, nombre, apellido, telefono, direccion, "tipoCliente", "createdAt", "updatedAt") VALUES (40830333, 'Pedro', 'Rabo', '4982255', 'San Juan 222', 'minorista', '2021-09-06 22:06:50.164-03', '2021-09-06 22:06:50.164-03');
INSERT INTO public."Clientes" (dni, nombre, apellido, telefono, direccion, "tipoCliente", "createdAt", "updatedAt") VALUES (40830993, 'Pepe', 'Ricardo', '4982255', 'San Juan 222', 'minorista', '2021-09-06 22:07:04.572-03', '2021-09-06 22:07:04.572-03');


--
-- TOC entry 3050 (class 0 OID 17173)
-- Dependencies: 205
-- Data for Name: Items; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Items" ("cantPedida", "createdAt", "updatedAt", "VentaIdVenta", "ProductoIdProd", "idItem") VALUES (5, '2021-08-24 22:59:34.263-03', '2021-08-24 22:59:34.263-03', 1, 1, 1);
INSERT INTO public."Items" ("cantPedida", "createdAt", "updatedAt", "VentaIdVenta", "ProductoIdProd", "idItem") VALUES (5, '2021-08-24 23:13:05.021-03', '2021-08-24 23:13:05.021-03', 1, 2, 5);
INSERT INTO public."Items" ("cantPedida", "createdAt", "updatedAt", "VentaIdVenta", "ProductoIdProd", "idItem") VALUES (5, '2021-08-24 23:00:02.299-03', '2021-08-24 23:20:50.139-03', 1, 1, 3);
INSERT INTO public."Items" ("cantPedida", "createdAt", "updatedAt", "VentaIdVenta", "ProductoIdProd", "idItem") VALUES (5, '2021-08-24 23:02:53.411-03', '2021-08-24 23:21:46.705-03', 1, 2, 4);
INSERT INTO public."Items" ("cantPedida", "createdAt", "updatedAt", "VentaIdVenta", "ProductoIdProd", "idItem") VALUES (10, '2021-08-24 23:24:42.773-03', '2021-08-24 23:24:42.773-03', 1, 2, 7);
INSERT INTO public."Items" ("cantPedida", "createdAt", "updatedAt", "VentaIdVenta", "ProductoIdProd", "idItem") VALUES (10, '2021-08-24 23:29:15.916-03', '2021-08-24 23:29:15.916-03', 2, 1, 8);
INSERT INTO public."Items" ("cantPedida", "createdAt", "updatedAt", "VentaIdVenta", "ProductoIdProd", "idItem") VALUES (10, '2021-08-24 23:29:24.082-03', '2021-08-24 23:29:24.082-03', 2, 2, 9);
INSERT INTO public."Items" ("cantPedida", "createdAt", "updatedAt", "VentaIdVenta", "ProductoIdProd", "idItem") VALUES (10, '2021-09-04 11:12:14.212-03', '2021-09-04 11:12:14.212-03', 3, 3, 12);
INSERT INTO public."Items" ("cantPedida", "createdAt", "updatedAt", "VentaIdVenta", "ProductoIdProd", "idItem") VALUES (1, '2021-09-06 22:39:12.454-03', '2021-09-06 22:39:12.454-03', 4, 5, 13);
INSERT INTO public."Items" ("cantPedida", "createdAt", "updatedAt", "VentaIdVenta", "ProductoIdProd", "idItem") VALUES (1, '2021-09-06 22:39:17.044-03', '2021-09-06 22:39:17.044-03', 4, 6, 14);
INSERT INTO public."Items" ("cantPedida", "createdAt", "updatedAt", "VentaIdVenta", "ProductoIdProd", "idItem") VALUES (8, '2021-09-06 22:39:22.87-03', '2021-09-06 22:39:22.87-03', 4, 7, 15);
INSERT INTO public."Items" ("cantPedida", "createdAt", "updatedAt", "VentaIdVenta", "ProductoIdProd", "idItem") VALUES (8, '2021-09-06 22:39:29.619-03', '2021-09-06 22:39:29.619-03', 5, 8, 16);
INSERT INTO public."Items" ("cantPedida", "createdAt", "updatedAt", "VentaIdVenta", "ProductoIdProd", "idItem") VALUES (7, '2021-09-06 22:39:33.505-03', '2021-09-06 22:39:33.505-03', 5, 7, 17);
INSERT INTO public."Items" ("cantPedida", "createdAt", "updatedAt", "VentaIdVenta", "ProductoIdProd", "idItem") VALUES (6, '2021-09-06 22:39:37.493-03', '2021-09-06 22:39:37.493-03', 5, 6, 18);


--
-- TOC entry 3053 (class 0 OID 19000)
-- Dependencies: 208
-- Data for Name: Productos; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Productos" ("idProd", descripcion, stock, "cantMinima", "createdAt", "updatedAt", "CategoriaIdCategoria") VALUES (1, 'vasos termicos', 10, 2, '2021-09-06 18:15:40.471-03', '2021-09-06 18:15:40.471-03', 3);
INSERT INTO public."Productos" ("idProd", descripcion, stock, "cantMinima", "createdAt", "updatedAt", "CategoriaIdCategoria") VALUES (2, 'Perfume para auto', 24, 10, '2021-09-06 22:10:59.584-03', '2021-09-06 22:10:59.584-03', 6);
INSERT INTO public."Productos" ("idProd", descripcion, stock, "cantMinima", "createdAt", "updatedAt", "CategoriaIdCategoria") VALUES (3, 'Cubre volante', 24, 10, '2021-09-06 22:11:12.879-03', '2021-09-06 22:11:12.879-03', 6);
INSERT INTO public."Productos" ("idProd", descripcion, stock, "cantMinima", "createdAt", "updatedAt", "CategoriaIdCategoria") VALUES (4, 'Olla', 24, 10, '2021-09-06 22:11:41.169-03', '2021-09-06 22:11:41.169-03', 5);
INSERT INTO public."Productos" ("idProd", descripcion, stock, "cantMinima", "createdAt", "updatedAt", "CategoriaIdCategoria") VALUES (5, 'Estractor', 24, 10, '2021-09-06 22:12:00.102-03', '2021-09-06 22:12:00.102-03', 5);
INSERT INTO public."Productos" ("idProd", descripcion, stock, "cantMinima", "createdAt", "updatedAt", "CategoriaIdCategoria") VALUES (6, 'Sarten ', 24, 10, '2021-09-06 22:12:05.071-03', '2021-09-06 22:12:05.071-03', 5);
INSERT INTO public."Productos" ("idProd", descripcion, stock, "cantMinima", "createdAt", "updatedAt", "CategoriaIdCategoria") VALUES (7, 'Antorcha', 24, 10, '2021-09-06 22:12:20.589-03', '2021-09-06 22:12:20.589-03', 5);
INSERT INTO public."Productos" ("idProd", descripcion, stock, "cantMinima", "createdAt", "updatedAt", "CategoriaIdCategoria") VALUES (8, 'Mata Hormigas', 24, 10, '2021-09-06 22:12:27.25-03', '2021-09-06 22:12:27.25-03', 5);
INSERT INTO public."Productos" ("idProd", descripcion, stock, "cantMinima", "createdAt", "updatedAt", "CategoriaIdCategoria") VALUES (9, 'Termo pa mate', 24, 10, '2021-09-06 22:25:52.703-03', '2021-09-06 22:25:52.703-03', 5);
INSERT INTO public."Productos" ("idProd", descripcion, stock, "cantMinima", "createdAt", "updatedAt", "CategoriaIdCategoria") VALUES (10, 'Termo pa mate', 24, 10, '2021-09-06 22:26:00.892-03', '2021-09-06 22:26:00.892-03', 3);


--
-- TOC entry 3055 (class 0 OID 19035)
-- Dependencies: 210
-- Data for Name: ProveedorProductos; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."ProveedorProductos" (id, "fechaPrecio", precio, "ProductoIdProd", "ProveedoreIdProv") VALUES (10, '2021-09-02 21:00:00-03', 870, 1, 1);
INSERT INTO public."ProveedorProductos" (id, "fechaPrecio", precio, "ProductoIdProd", "ProveedoreIdProv") VALUES (12, '2021-09-03 21:00:00-03', 870, 1, 1);
INSERT INTO public."ProveedorProductos" (id, "fechaPrecio", precio, "ProductoIdProd", "ProveedoreIdProv") VALUES (13, '2021-09-03 21:00:00-03', 870, 3, 1);
INSERT INTO public."ProveedorProductos" (id, "fechaPrecio", precio, "ProductoIdProd", "ProveedoreIdProv") VALUES (14, '2021-09-03 21:00:00-03', 870, 5, 1);
INSERT INTO public."ProveedorProductos" (id, "fechaPrecio", precio, "ProductoIdProd", "ProveedoreIdProv") VALUES (15, '2021-09-03 21:00:00-03', 870, 7, 1);
INSERT INTO public."ProveedorProductos" (id, "fechaPrecio", precio, "ProductoIdProd", "ProveedoreIdProv") VALUES (17, '2021-09-04 21:00:00-03', 950, 7, 1);
INSERT INTO public."ProveedorProductos" (id, "fechaPrecio", precio, "ProductoIdProd", "ProveedoreIdProv") VALUES (18, '2021-09-05 21:00:00-03', 1050, 3, 1);
INSERT INTO public."ProveedorProductos" (id, "fechaPrecio", precio, "ProductoIdProd", "ProveedoreIdProv") VALUES (19, '2021-09-05 21:00:00-03', 2050, 3, 3);
INSERT INTO public."ProveedorProductos" (id, "fechaPrecio", precio, "ProductoIdProd", "ProveedoreIdProv") VALUES (20, '2021-07-05 21:00:00-03', 1050, 3, 3);
INSERT INTO public."ProveedorProductos" (id, "fechaPrecio", precio, "ProductoIdProd", "ProveedoreIdProv") VALUES (21, '2021-05-05 21:00:00-03', 750, 3, 3);
INSERT INTO public."ProveedorProductos" (id, "fechaPrecio", precio, "ProductoIdProd", "ProveedoreIdProv") VALUES (22, '2021-05-05 21:00:00-03', 750, 5, 3);
INSERT INTO public."ProveedorProductos" (id, "fechaPrecio", precio, "ProductoIdProd", "ProveedoreIdProv") VALUES (23, '2021-01-05 21:00:00-03', 650, 5, 3);
INSERT INTO public."ProveedorProductos" (id, "fechaPrecio", precio, "ProductoIdProd", "ProveedoreIdProv") VALUES (24, '2021-01-05 21:00:00-03', 650, 2, 4);
INSERT INTO public."ProveedorProductos" (id, "fechaPrecio", precio, "ProductoIdProd", "ProveedoreIdProv") VALUES (25, '2021-01-05 21:00:00-03', 650, 4, 4);
INSERT INTO public."ProveedorProductos" (id, "fechaPrecio", precio, "ProductoIdProd", "ProveedoreIdProv") VALUES (26, '2021-01-05 21:00:00-03', 650, 6, 4);
INSERT INTO public."ProveedorProductos" (id, "fechaPrecio", precio, "ProductoIdProd", "ProveedoreIdProv") VALUES (27, '2021-01-05 21:00:00-03', 650, 8, 4);
INSERT INTO public."ProveedorProductos" (id, "fechaPrecio", precio, "ProductoIdProd", "ProveedoreIdProv") VALUES (28, '2021-05-05 21:00:00-03', 800, 2, 4);
INSERT INTO public."ProveedorProductos" (id, "fechaPrecio", precio, "ProductoIdProd", "ProveedoreIdProv") VALUES (29, '2021-05-05 21:00:00-03', 800, 4, 4);
INSERT INTO public."ProveedorProductos" (id, "fechaPrecio", precio, "ProductoIdProd", "ProveedoreIdProv") VALUES (30, '2021-05-05 21:00:00-03', 800, 6, 4);
INSERT INTO public."ProveedorProductos" (id, "fechaPrecio", precio, "ProductoIdProd", "ProveedoreIdProv") VALUES (31, '2021-05-05 21:00:00-03', 800, 8, 4);


--
-- TOC entry 3057 (class 0 OID 19114)
-- Dependencies: 212
-- Data for Name: Proveedores; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Proveedores" ("idProv", "razonSocial", telefono, direccion, "createdAt", "updatedAt") VALUES (1, 'el Turco', '4978999', 'Maipu 201', '2021-09-06 18:58:50-03', '2021-09-06 18:58:50-03');
INSERT INTO public."Proveedores" ("idProv", "razonSocial", telefono, direccion, "createdAt", "updatedAt") VALUES (2, 'KIKI', '4974569', 'Maipu 501', '2021-09-06 22:09:38.531-03', '2021-09-06 22:09:38.531-03');
INSERT INTO public."Proveedores" ("idProv", "razonSocial", telefono, direccion, "createdAt", "updatedAt") VALUES (3, 'QTAL', '4974569', 'Travesia 501', '2021-09-06 22:10:04.202-03', '2021-09-06 22:10:04.202-03');
INSERT INTO public."Proveedores" ("idProv", "razonSocial", telefono, direccion, "createdAt", "updatedAt") VALUES (4, 'QqTAL', '4974569', 'Genova 501', '2021-09-06 22:10:18.145-03', '2021-09-06 22:10:18.145-03');


--
-- TOC entry 3048 (class 0 OID 17072)
-- Dependencies: 203
-- Data for Name: Ventas; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Ventas" ("idVenta", total, "nomTarjeta", "numTarjeta", "cantCuotas", "createdAt", "updatedAt", "ClienteDni", "fechaVenta") VALUES (1, 100, 'VISA', '1234', 6, '2021-08-24 21:13:41.684-03', '2021-08-24 21:23:34.809-03', 37830335, '2021-08-22 21:00:00-03');
INSERT INTO public."Ventas" ("idVenta", total, "nomTarjeta", "numTarjeta", "cantCuotas", "createdAt", "updatedAt", "ClienteDni", "fechaVenta") VALUES (2, 100, 'MASTERCARD', '1234', 6, '2021-08-24 23:28:28.138-03', '2021-08-24 23:28:28.138-03', 37830335, '2021-08-22 21:00:00-03');
INSERT INTO public."Ventas" ("idVenta", total, "nomTarjeta", "numTarjeta", "cantCuotas", "createdAt", "updatedAt", "ClienteDni", "fechaVenta") VALUES (3, 500, 'NARANJA', '8888', 6, '2021-09-04 11:10:52.864-03', '2021-09-04 11:10:52.864-03', 37830335, '2021-08-31 21:00:00-03');
INSERT INTO public."Ventas" ("idVenta", total, "nomTarjeta", "numTarjeta", "cantCuotas", "createdAt", "updatedAt", "ClienteDni", "fechaVenta") VALUES (4, 500, 'VISA', '8888', 18, '2021-09-06 22:37:24.028-03', '2021-09-06 22:37:24.028-03', 40830993, '2021-08-31 21:00:00-03');
INSERT INTO public."Ventas" ("idVenta", total, "nomTarjeta", "numTarjeta", "cantCuotas", "createdAt", "updatedAt", "ClienteDni", "fechaVenta") VALUES (5, 0, 'MASTERCARD', '8888', 6, '2021-09-06 22:38:10.858-03', '2021-09-06 22:38:10.858-03', 40830993, '2021-08-31 21:00:00-03');
INSERT INTO public."Ventas" ("idVenta", total, "nomTarjeta", "numTarjeta", "cantCuotas", "createdAt", "updatedAt", "ClienteDni", "fechaVenta") VALUES (6, 0, 'MASTERCARD', '7777', 1, '2021-09-06 22:38:29.348-03', '2021-09-06 22:38:29.348-03', 40830993, '2021-08-31 21:00:00-03');


--
-- TOC entry 3070 (class 0 OID 0)
-- Dependencies: 201
-- Name: Categorias_idCategoria_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Categorias_idCategoria_seq"', 6, true);


--
-- TOC entry 3071 (class 0 OID 0)
-- Dependencies: 206
-- Name: Items_idItem_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Items_idItem_seq"', 18, true);


--
-- TOC entry 3072 (class 0 OID 0)
-- Dependencies: 207
-- Name: Productos_idProd_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Productos_idProd_seq"', 10, true);


--
-- TOC entry 3073 (class 0 OID 0)
-- Dependencies: 209
-- Name: ProveedorProductos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ProveedorProductos_id_seq"', 31, true);


--
-- TOC entry 3074 (class 0 OID 0)
-- Dependencies: 211
-- Name: Proveedores_idProv_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Proveedores_idProv_seq"', 4, true);


--
-- TOC entry 3075 (class 0 OID 0)
-- Dependencies: 200
-- Name: Ventas_idVenta_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Ventas_idVenta_seq"', 6, true);


--
-- TOC entry 2895 (class 2606 OID 17081)
-- Name: Categorias Categorias_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Categorias"
    ADD CONSTRAINT "Categorias_pkey" PRIMARY KEY ("idCategoria");


--
-- TOC entry 2899 (class 2606 OID 17093)
-- Name: Clientes Clientes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Clientes"
    ADD CONSTRAINT "Clientes_pkey" PRIMARY KEY (dni);


--
-- TOC entry 2901 (class 2606 OID 17345)
-- Name: Items Items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Items"
    ADD CONSTRAINT "Items_pkey" PRIMARY KEY ("idItem");


--
-- TOC entry 2903 (class 2606 OID 19013)
-- Name: Productos Productos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Productos"
    ADD CONSTRAINT "Productos_pkey" PRIMARY KEY ("idProd");


--
-- TOC entry 2905 (class 2606 OID 19040)
-- Name: ProveedorProductos ProveedorProductos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProveedorProductos"
    ADD CONSTRAINT "ProveedorProductos_pkey" PRIMARY KEY (id);


--
-- TOC entry 2909 (class 2606 OID 19124)
-- Name: Proveedores Proveedores_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Proveedores"
    ADD CONSTRAINT "Proveedores_pkey" PRIMARY KEY ("idProv");


--
-- TOC entry 2897 (class 2606 OID 17085)
-- Name: Ventas Ventas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Ventas"
    ADD CONSTRAINT "Ventas_pkey" PRIMARY KEY ("idVenta");


--
-- TOC entry 2907 (class 2606 OID 19150)
-- Name: ProveedorProductos precio_fecha_constraints; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProveedorProductos"
    ADD CONSTRAINT precio_fecha_constraints UNIQUE ("fechaPrecio", "ProductoIdProd", "ProveedoreIdProv");


--
-- TOC entry 2911 (class 2606 OID 17674)
-- Name: Items Items_VentaIdVenta_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Items"
    ADD CONSTRAINT "Items_VentaIdVenta_fkey" FOREIGN KEY ("VentaIdVenta") REFERENCES public."Ventas"("idVenta") ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 2912 (class 2606 OID 19130)
-- Name: Productos Productos_CategoriaIdCategoria_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Productos"
    ADD CONSTRAINT "Productos_CategoriaIdCategoria_fkey" FOREIGN KEY ("CategoriaIdCategoria") REFERENCES public."Categorias"("idCategoria") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2913 (class 2606 OID 19151)
-- Name: ProveedorProductos ProveedorProductos_ProductoIdProd_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProveedorProductos"
    ADD CONSTRAINT "ProveedorProductos_ProductoIdProd_fkey" FOREIGN KEY ("ProductoIdProd") REFERENCES public."Productos"("idProd") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2914 (class 2606 OID 19156)
-- Name: ProveedorProductos ProveedorProductos_ProveedoreIdProv_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProveedorProductos"
    ADD CONSTRAINT "ProveedorProductos_ProveedoreIdProv_fkey" FOREIGN KEY ("ProveedoreIdProv") REFERENCES public."Proveedores"("idProv") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2910 (class 2606 OID 17664)
-- Name: Ventas Ventas_ClienteDni_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Ventas"
    ADD CONSTRAINT "Ventas_ClienteDni_fkey" FOREIGN KEY ("ClienteDni") REFERENCES public."Clientes"(dni) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2021-09-06 23:10:09

--
-- PostgreSQL database dump complete
--

