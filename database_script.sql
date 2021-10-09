

INSERT INTO public."Categorias" (descripcion, activa, "createdAt", "updatedAt") VALUES ('Informatica', TRUE, '2021-08-23 20:28:56.626-03', '2021-08-23 20:28:56.626-03');
INSERT INTO public."Categorias" (descripcion, activa, "createdAt", "updatedAt") VALUES ('HOGAR', TRUE, '2021-08-23 20:28:56.626-03', '2021-09-04 10:50:12.195-03');
INSERT INTO public."Categorias" (descripcion, activa, "createdAt", "updatedAt") VALUES ('Patio', TRUE, '2021-09-06 22:08:14.591-03', '2021-09-06 22:08:14.591-03');
INSERT INTO public."Categorias" (descripcion, activa, "createdAt", "updatedAt") VALUES ('Cocina', TRUE, '2021-09-06 22:08:25.167-03', '2021-09-06 22:08:25.167-03');
INSERT INTO public."Categorias" (descripcion, activa, "createdAt", "updatedAt") VALUES ('Vehiculo', TRUE, '2021-09-06 22:08:31.853-03', '2021-09-06 22:08:31.853-03');



INSERT INTO public."Productos" (descripcion, stock, "cantidadMinima", activo, "createdAt", "updatedAt", "CategoriaId") VALUES ('Perfume para auto', 24, 10, true, '2021-09-06 22:10:59.584-03', '2021-09-06 22:10:59.584-03', 4);
INSERT INTO public."Productos" (descripcion, stock, "cantidadMinima", activo, "createdAt", "updatedAt", "CategoriaId") VALUES ('Cubre volante', 24, 10, true, '2021-09-06 22:11:12.879-03', '2021-09-06 22:11:12.879-03', 4);
INSERT INTO public."Productos" (descripcion, stock, "cantidadMinima", activo, "createdAt", "updatedAt", "CategoriaId") VALUES ('Olla', 24, 10, false, '2021-09-06 22:11:41.169-03', '2021-09-06 22:11:41.169-03', 5);
INSERT INTO public."Productos" (descripcion, stock, "cantidadMinima", activo, "createdAt", "updatedAt", "CategoriaId") VALUES ('Estractor', 24, 10, true, '2021-09-06 22:12:00.102-03', '2021-09-06 22:12:00.102-03', 5);
INSERT INTO public."Productos" (descripcion, stock, "cantidadMinima", activo, "createdAt", "updatedAt", "CategoriaId") VALUES ('Sarten ', 24, 10, false, '2021-09-06 22:12:05.071-03', '2021-09-06 22:12:05.071-03', 5);
INSERT INTO public."Productos" (descripcion, stock, "cantidadMinima", activo, "createdAt", "updatedAt", "CategoriaId") VALUES ('Antorcha', 24, 10, true, '2021-09-06 22:12:20.589-03', '2021-09-06 22:12:20.589-03', 5);
INSERT INTO public."Productos" (descripcion, stock, "cantidadMinima", activo, "createdAt", "updatedAt", "CategoriaId") VALUES ('Mata Hormigas', 24, 10, false, '2021-09-06 22:12:27.25-03', '2021-09-06 22:12:27.25-03', 5);
INSERT INTO public."Productos" (descripcion, stock, "cantidadMinima", activo, "createdAt", "updatedAt", "CategoriaId") VALUES ('Termo pa mate', 24, 10, true, '2021-09-06 22:25:52.703-03', '2021-09-06 22:25:52.703-03', 5);
INSERT INTO public."Productos" (descripcion, stock, "cantidadMinima", activo, "createdAt", "updatedAt", "CategoriaId") VALUES ('Termo pa mate', 24, 10, true, '2021-09-06 22:26:00.892-03', '2021-09-06 22:26:00.892-03', 3);



INSERT INTO public."Clientes" (dni, nombre, apellido, telefono, direccion, "tipoCliente", activo) VALUES (37830335, 'juan', 'perez', '4987648', 'Tucuma 002', 'minorista', true);
INSERT INTO public."Clientes" (dni, nombre, apellido, telefono, direccion, "tipoCliente", activo) VALUES (40830336, 'juan', 'perez', '4982255', 'San Juan 222', 'minorista', true);
INSERT INTO public."Clientes" (dni, nombre, apellido, telefono, direccion, "tipoCliente", activo) VALUES (40830333, 'Pedro', 'Rabo', '4982255', 'San Juan 222', 'minorista', false);
INSERT INTO public."Clientes" (dni, nombre, apellido, telefono, direccion, "tipoCliente", activo) VALUES (40830993, 'Pepe', 'Ricardo', '4982255', 'San Juan 222', 'minorista', false);




INSERT INTO public."Ventas" (total, "nomTarjeta", "numTarjeta", "cantCuotas", "ClienteDni", "fechaVenta", activo) VALUES (100, 'VISA', '1234', 6, 37830335, '2021-08-22 21:00:00-03', true);
INSERT INTO public."Ventas" (total, "nomTarjeta", "numTarjeta", "cantCuotas", "ClienteDni", "fechaVenta", activo) VALUES (100, 'MASTERCARD', '1234', 6, 37830335, '2021-08-22 21:00:00-03', false);
INSERT INTO public."Ventas" (total, "nomTarjeta", "numTarjeta", "cantCuotas", "ClienteDni", "fechaVenta", activo) VALUES (500, 'NARANJA', '8888', 6, 37830335, '2021-08-31 21:00:00-03', true);
INSERT INTO public."Ventas" (total, "nomTarjeta", "numTarjeta", "cantCuotas", "ClienteDni", "fechaVenta", activo) VALUES (500, 'VISA', '8888', 18, 40830993, '2021-08-31 21:00:00-03', false);
INSERT INTO public."Ventas" (total, "nomTarjeta", "numTarjeta", "cantCuotas", "ClienteDni", "fechaVenta", activo) VALUES (0, 'MASTERCARD', '8888', 6, 40830993, '2021-08-31 21:00:00-03', true);
INSERT INTO public."Ventas" (total, "nomTarjeta", "numTarjeta", "cantCuotas", "ClienteDni", "fechaVenta", activo) VALUES (0, 'MASTERCARD', '7777', 1, 40830993, '2021-08-31 21:00:00-03', false);



INSERT INTO public."Items" ("cantPedida",  "VentaId", "ProductoId" ) VALUES (5, 1, 2);
INSERT INTO public."Items" ("cantPedida",  "VentaId", "ProductoId" ) VALUES (5, 2, 2);
INSERT INTO public."Items" ("cantPedida",  "VentaId", "ProductoId" ) VALUES (5, 1, 3);
INSERT INTO public."Items" ("cantPedida",  "VentaId", "ProductoId" ) VALUES (5, 2, 3);
INSERT INTO public."Items" ("cantPedida",  "VentaId", "ProductoId" ) VALUES (10, 2, 4);
INSERT INTO public."Items" ("cantPedida",  "VentaId", "ProductoId" ) VALUES (10, 1, 4);
INSERT INTO public."Items" ("cantPedida",  "VentaId", "ProductoId" ) VALUES (10, 3, 1);
INSERT INTO public."Items" ("cantPedida",  "VentaId", "ProductoId" ) VALUES (10, 3, 2);





INSERT INTO public."Proveedores" ("cuitDni", "razonSocial", telefono, direccion, activo ) VALUES ('2037687952', 'el Turco', '4978999', 'Maipu 201', true);
INSERT INTO public."Proveedores" ("cuitDni", "razonSocial", telefono, direccion, activo ) VALUES ('258787952','KIKI', '4974569', 'Maipu 501', true);
INSERT INTO public."Proveedores" ("cuitDni", "razonSocial", telefono, direccion, activo ) VALUES ('2025687952','QTAL', '4974569', 'Travesia 501', false);
INSERT INTO public."Proveedores" ("cuitDni", "razonSocial", telefono, direccion, activo ) VALUES ('2254687952', 'QeTAL', '4974569', 'Genova 501', false);



													--
													--	///////////////////////////////////

													-- FALTA VER QUE DECIDE HACER FACU

													-- /////////////////////////////////////
													--




INSERT INTO public."ProveedorProductos" (id, "fechaPrecio", precio, "ProductoId", "ProveedoreIdProv") VALUES (10, '2021-09-02 21:00:00-03', 870, 1, 1);
INSERT INTO public."ProveedorProductos" (id, "fechaPrecio", precio, "ProductoId", "ProveedoreIdProv") VALUES (12, '2021-09-03 21:00:00-03', 870, 1, 1);
INSERT INTO public."ProveedorProductos" (id, "fechaPrecio", precio, "ProductoId", "ProveedoreIdProv") VALUES (13, '2021-09-03 21:00:00-03', 870, 3, 1);
INSERT INTO public."ProveedorProductos" (id, "fechaPrecio", precio, "ProductoId", "ProveedoreIdProv") VALUES (14, '2021-09-03 21:00:00-03', 870, 5, 1);
INSERT INTO public."ProveedorProductos" (id, "fechaPrecio", precio, "ProductoId", "ProveedoreIdProv") VALUES (15, '2021-09-03 21:00:00-03', 870, 7, 1);
INSERT INTO public."ProveedorProductos" (id, "fechaPrecio", precio, "ProductoId", "ProveedoreIdProv") VALUES (17, '2021-09-04 21:00:00-03', 950, 7, 1);
INSERT INTO public."ProveedorProductos" (id, "fechaPrecio", precio, "ProductoId", "ProveedoreIdProv") VALUES (18, '2021-09-05 21:00:00-03', 1050, 3, 1);
INSERT INTO public."ProveedorProductos" (id, "fechaPrecio", precio, "ProductoId", "ProveedoreIdProv") VALUES (19, '2021-09-05 21:00:00-03', 2050, 3, 3);
INSERT INTO public."ProveedorProductos" (id, "fechaPrecio", precio, "ProductoId", "ProveedoreIdProv") VALUES (20, '2021-07-05 21:00:00-03', 1050, 3, 3);
INSERT INTO public."ProveedorProductos" (id, "fechaPrecio", precio, "ProductoId", "ProveedoreIdProv") VALUES (21, '2021-05-05 21:00:00-03', 750, 3, 3);
INSERT INTO public."ProveedorProductos" (id, "fechaPrecio", precio, "ProductoId", "ProveedoreIdProv") VALUES (22, '2021-05-05 21:00:00-03', 750, 5, 3);
INSERT INTO public."ProveedorProductos" (id, "fechaPrecio", precio, "ProductoId", "ProveedoreIdProv") VALUES (23, '2021-01-05 21:00:00-03', 650, 5, 3);
INSERT INTO public."ProveedorProductos" (id, "fechaPrecio", precio, "ProductoId", "ProveedoreIdProv") VALUES (24, '2021-01-05 21:00:00-03', 650, 2, 4);
INSERT INTO public."ProveedorProductos" (id, "fechaPrecio", precio, "ProductoId", "ProveedoreIdProv") VALUES (25, '2021-01-05 21:00:00-03', 650, 4, 4);
INSERT INTO public."ProveedorProductos" (id, "fechaPrecio", precio, "ProductoId", "ProveedoreIdProv") VALUES (26, '2021-01-05 21:00:00-03', 650, 6, 4);
INSERT INTO public."ProveedorProductos" (id, "fechaPrecio", precio, "ProductoId", "ProveedoreIdProv") VALUES (27, '2021-01-05 21:00:00-03', 650, 8, 4);
INSERT INTO public."ProveedorProductos" (id, "fechaPrecio", precio, "ProductoId", "ProveedoreIdProv") VALUES (28, '2021-05-05 21:00:00-03', 800, 2, 4);
INSERT INTO public."ProveedorProductos" (id, "fechaPrecio", precio, "ProductoId", "ProveedoreIdProv") VALUES (29, '2021-05-05 21:00:00-03', 800, 4, 4);
INSERT INTO public."ProveedorProductos" (id, "fechaPrecio", precio, "ProductoId", "ProveedoreIdProv") VALUES (30, '2021-05-05 21:00:00-03', 800, 6, 4);
INSERT INTO public."ProveedorProductos" (id, "fechaPrecio", precio, "ProductoId", "ProveedoreIdProv") VALUES (31, '2021-05-05 21:00:00-03', 800, 8, 4);



--
-- TOC entry 3048 (class 0 OID 17072)
-- Dependencies: 203
-- Data for Name: Ventas; Type: TABLE DATA; Schema: public; Owner: postgres
--



CREATE TABLE public."ProveedorProductos" (
    id integer NOT NULL,
    "fechaPrecio" timestamp with time zone NOT NULL,
    precio real NOT NULL,
    "ProductoIdProd" integer,
    "ProveedoreIdProv" integer
);



ALTER TABLE public."ProveedorProductos" OWNER TO postgres;


CREATE SEQUENCE public."ProveedorProductos_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ProveedorProductos_id_seq" OWNER TO postgres;



ALTER SEQUENCE public."ProveedorProductos_id_seq" OWNED BY public."ProveedorProductos".id;



ALTER TABLE ONLY public."ProveedorProductos" ALTER COLUMN id SET DEFAULT nextval('public."ProveedorProductos_id_seq"'::regclass);


SELECT pg_catalog.setval('public."ProveedorProductos_id_seq"', 31, true);


ALTER TABLE ONLY public."ProveedorProductos"
    ADD CONSTRAINT "ProveedorProductos_pkey" PRIMARY KEY (id);



ALTER TABLE ONLY public."ProveedorProductos"
    ADD CONSTRAINT precio_fecha_constraints UNIQUE ("fechaPrecio", "ProductoIdProd", "ProveedoreIdProv");



ALTER TABLE ONLY public."ProveedorProductos"
    ADD CONSTRAINT "ProveedorProductos_ProductoIdProd_fkey" FOREIGN KEY ("ProductoIdProd") REFERENCES public."Productos"("idProd") ON UPDATE CASCADE ON DELETE CASCADE;


ALTER TABLE ONLY public."ProveedorProductos"
    ADD CONSTRAINT "ProveedorProductos_ProveedoreIdProv_fkey" FOREIGN KEY ("ProveedoreIdProv") REFERENCES public."Proveedores"("idProv") ON UPDATE CASCADE ON DELETE CASCADE;
