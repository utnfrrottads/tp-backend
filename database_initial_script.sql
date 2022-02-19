INSERT INTO categorias (descripcion, activa, created_at, updated_at) VALUES ('Informática', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO categorias (descripcion, activa, created_at, updated_at) VALUES ('Hogar', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO categorias (descripcion, activa, created_at, updated_at) VALUES ('Patio', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO categorias (descripcion, activa, created_at, updated_at) VALUES ('Cocina', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO categorias (descripcion, activa, created_at, updated_at) VALUES ('Vehículo', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO productos (descripcion, stock, cantidad_minima, precio_venta, activo, categoria_id, created_at, updated_at) VALUES ('Perfume para auto', 24, 10, 450, true, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO productos (descripcion, stock, cantidad_minima, precio_venta, activo, categoria_id, created_at, updated_at) VALUES ('Cubre volante', 24, 10, 1800, true, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO productos (descripcion, stock, cantidad_minima, precio_venta, activo, categoria_id, created_at, updated_at) VALUES ('Olla', 24, 10, 3499, false, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO productos (descripcion, stock, cantidad_minima, precio_venta, activo, categoria_id, created_at, updated_at) VALUES ('Estractor', 24, 10, 4300, true, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO productos (descripcion, stock, cantidad_minima, precio_venta, activo, categoria_id, created_at, updated_at) VALUES ('Sartén ', 24, 10, 3999, false, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO productos (descripcion, stock, cantidad_minima, precio_venta, activo, categoria_id, created_at, updated_at) VALUES ('Antorcha', 24, 10, 400, true, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO productos (descripcion, stock, cantidad_minima, precio_venta, activo, categoria_id, created_at, updated_at) VALUES ('Mata Hormigas', 24, 10, 120, false, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO productos (descripcion, stock, cantidad_minima, precio_venta, activo, categoria_id, created_at, updated_at) VALUES ('Termo para mate', 24, 10, 3200, true, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO productos (descripcion, stock, cantidad_minima, precio_venta, activo, categoria_id, created_at, updated_at) VALUES ('Termo para mate', 24, 10, 4500, true, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO clientes (dni, nombre, apellido, telefono, direccion, tipo_cliente, activo, created_at, updated_at) VALUES (37830335, 'Juan', 'Perez', '4987648', 'Tucuma 002', 'MAYORISTA', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO clientes (dni, nombre, apellido, telefono, direccion, tipo_cliente, activo, created_at, updated_at) VALUES (40830336, 'Juan', 'Perez', '4982255', 'San Juan 222', 'MINORISTA', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO clientes (dni, nombre, apellido, telefono, direccion, tipo_cliente, activo, created_at, updated_at) VALUES (40830333, 'Pedro', 'Rabo', '4982255', 'San Juan 222', 'MAYORISTA', false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO clientes (dni, nombre, apellido, telefono, direccion, tipo_cliente, activo, created_at, updated_at) VALUES (40830993, 'Pepe', 'Ricardo', '4982255', 'San Juan 222', 'MINORISTA', false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO ventas (total, nom_tarjeta, num_tarjeta, cant_cuotas, cliente_dni, fecha, created_at, updated_at) VALUES (100, 'VISA', '1234', 6, 37830335, '2021-08-22 21:00:00-03', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO ventas (total, nom_tarjeta, num_tarjeta, cant_cuotas, cliente_dni, fecha, created_at, updated_at) VALUES (100, 'MASTERCARD', '1234', 6, 37830335, '2021-08-22 21:00:00-03', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO ventas (total, nom_tarjeta, num_tarjeta, cant_cuotas, cliente_dni, fecha, created_at, updated_at) VALUES (500, 'NARANJA', '8888', 6, 37830335, '2021-08-31 21:00:00-03', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO ventas (total, nom_tarjeta, num_tarjeta, cant_cuotas, cliente_dni, fecha, created_at, updated_at) VALUES (500, 'VISA', '8888', 18, 40830993, '2021-08-31 21:00:00-03', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO ventas_items (cantidad, venta_id, producto_id, created_at, updated_at) VALUES (5, 1, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO ventas_items (cantidad, venta_id, producto_id, created_at, updated_at) VALUES (5, 1, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO ventas_items (cantidad, venta_id, producto_id, created_at, updated_at) VALUES (10, 1, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO ventas_items (cantidad, venta_id, producto_id, created_at, updated_at) VALUES (5, 2, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO ventas_items (cantidad, venta_id, producto_id, created_at, updated_at) VALUES (5, 2, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO ventas_items (cantidad, venta_id, producto_id, created_at, updated_at) VALUES (10, 2, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO ventas_items (cantidad, venta_id, producto_id, created_at, updated_at) VALUES (10, 3, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO ventas_items (cantidad, venta_id, producto_id, created_at, updated_at) VALUES (10, 4, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO proveedores (cuit_dni, razon_social, telefono, direccion, activo, created_at, updated_at) VALUES ('2037687952', 'El Turco', '4978999', 'Maipu 201', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO proveedores (cuit_dni, razon_social, telefono, direccion, activo, created_at, updated_at) VALUES ('258787952','KIKI', '4974569', 'Maipu 501', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO proveedores (cuit_dni, razon_social, telefono, direccion, activo, created_at, updated_at) VALUES ('2025687952','QTAL', '4974569', 'Travesía 501', false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO proveedores (cuit_dni, razon_social, telefono, direccion, activo, created_at, updated_at) VALUES ('2254687952', 'QeTAL', '4974569', 'Genova 501', false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO precios (id, fecha, precio, producto_id, proveedor_id, created_at, updated_at) VALUES (10, '2021-09-02 21:00:00-03', 870, 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO precios (id, fecha, precio, producto_id, proveedor_id, created_at, updated_at) VALUES (12, '2021-09-03 21:00:00-03', 870, 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO precios (id, fecha, precio, producto_id, proveedor_id, created_at, updated_at) VALUES (13, '2021-09-03 21:00:00-03', 870, 3, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO precios (id, fecha, precio, producto_id, proveedor_id, created_at, updated_at) VALUES (14, '2021-09-03 21:00:00-03', 870, 5, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO precios (id, fecha, precio, producto_id, proveedor_id, created_at, updated_at) VALUES (15, '2021-09-03 21:00:00-03', 870, 7, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO precios (id, fecha, precio, producto_id, proveedor_id, created_at, updated_at) VALUES (17, '2021-09-04 21:00:00-03', 950, 7, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO precios (id, fecha, precio, producto_id, proveedor_id, created_at, updated_at) VALUES (18, '2021-09-05 21:00:00-03', 1050, 3, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO precios (id, fecha, precio, producto_id, proveedor_id, created_at, updated_at) VALUES (19, '2021-09-05 21:00:00-03', 2050, 3, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO precios (id, fecha, precio, producto_id, proveedor_id, created_at, updated_at) VALUES (20, '2021-07-05 21:00:00-03', 1050, 3, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO precios (id, fecha, precio, producto_id, proveedor_id, created_at, updated_at) VALUES (21, '2021-05-05 21:00:00-03', 750, 3, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO precios (id, fecha, precio, producto_id, proveedor_id, created_at, updated_at) VALUES (22, '2021-05-05 21:00:00-03', 750, 5, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO precios (id, fecha, precio, producto_id, proveedor_id, created_at, updated_at) VALUES (23, '2021-01-05 21:00:00-03', 650, 5, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO precios (id, fecha, precio, producto_id, proveedor_id, created_at, updated_at) VALUES (24, '2021-01-05 21:00:00-03', 650, 2, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO precios (id, fecha, precio, producto_id, proveedor_id, created_at, updated_at) VALUES (25, '2021-01-05 21:00:00-03', 650, 4, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO precios (id, fecha, precio, producto_id, proveedor_id, created_at, updated_at) VALUES (26, '2021-01-05 21:00:00-03', 650, 6, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO precios (id, fecha, precio, producto_id, proveedor_id, created_at, updated_at) VALUES (27, '2021-01-05 21:00:00-03', 650, 8, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO precios (id, fecha, precio, producto_id, proveedor_id, created_at, updated_at) VALUES (28, '2021-05-05 21:00:00-03', 800, 2, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO precios (id, fecha, precio, producto_id, proveedor_id, created_at, updated_at) VALUES (29, '2021-05-05 21:00:00-03', 800, 4, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO precios (id, fecha, precio, producto_id, proveedor_id, created_at, updated_at) VALUES (30, '2021-05-05 21:00:00-03', 800, 6, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO precios (id, fecha, precio, producto_id, proveedor_id, created_at, updated_at) VALUES (31, '2021-05-05 21:00:00-03', 800, 8, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO usuarios (us    uario, clave, rol, activo, created_at, updated_at) VALUES ('admin', '$2b$10$Zx9YzjhNR5IiHqicsUKIQ.8ZDRx/KVClDQjVANJWhoGMm2odbUzl2', 'Administrador', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
