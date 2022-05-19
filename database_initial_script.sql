INSERT INTO categorias (descripcion, activa, created_at, updated_at) VALUES ('Informática', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO categorias (descripcion, activa, created_at, updated_at) VALUES ('Hogar', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO categorias (descripcion, activa, created_at, updated_at) VALUES ('Patio', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO categorias (descripcion, activa, created_at, updated_at) VALUES ('Cocina', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO categorias (descripcion, activa, created_at, updated_at) VALUES ('Vehículo', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO productos (descripcion, stock, cantidad_minima, activo, categoria_id, created_at, updated_at) VALUES ('Perfume para auto', 24, 10, true, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO productos (descripcion, stock, cantidad_minima, activo, categoria_id, created_at, updated_at) VALUES ('Cubre volante negro', 24, 10, true, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO productos (descripcion, stock, cantidad_minima, activo, categoria_id, created_at, updated_at) VALUES ('Olla Essen 30x30', 24, 10, false, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO productos (descripcion, stock, cantidad_minima, activo, categoria_id, created_at, updated_at) VALUES ('Estractor', 24, 10, true, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO productos (descripcion, stock, cantidad_minima, activo, categoria_id, created_at, updated_at) VALUES ('Sartén Essen 20', 24, 10, false, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO productos (descripcion, stock, cantidad_minima, activo, categoria_id, created_at, updated_at) VALUES ('Antorcha', 24, 10, true, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO productos (descripcion, stock, cantidad_minima, activo, categoria_id, created_at, updated_at) VALUES ('Mata Hormigas', 24, 10, false, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO productos (descripcion, stock, cantidad_minima, activo, categoria_id, created_at, updated_at) VALUES ('Termo Lumilagro 1L', 24, 10, true, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO productos (descripcion, stock, cantidad_minima, activo, categoria_id, created_at, updated_at) VALUES ('Termo Stanley 1L', 24, 10, true, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO precios_venta (fecha, precio, producto_id, created_at, updated_at) VALUES (CURRENT_TIMESTAMP, 350, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO precios_venta (fecha, precio, producto_id, created_at, updated_at) VALUES (CURRENT_TIMESTAMP, 700, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO precios_venta (fecha, precio, producto_id, created_at, updated_at) VALUES (CURRENT_TIMESTAMP, 45000, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO precios_venta (fecha, precio, producto_id, created_at, updated_at) VALUES (CURRENT_TIMESTAMP, 5200, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO precios_venta (fecha, precio, producto_id, created_at, updated_at) VALUES (CURRENT_TIMESTAMP, 37000, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO precios_venta (fecha, precio, producto_id, created_at, updated_at) VALUES (CURRENT_TIMESTAMP, 800, 6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO precios_venta (fecha, precio, producto_id, created_at, updated_at) VALUES (CURRENT_TIMESTAMP, 200, 7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO precios_venta (fecha, precio, producto_id, created_at, updated_at) VALUES (CURRENT_TIMESTAMP, 2900, 8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO precios_venta (fecha, precio, producto_id, created_at, updated_at) VALUES (CURRENT_TIMESTAMP, 16000, 9, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO clientes (dni, nombre, apellido, telefono, direccion, tipo, activo, created_at, updated_at) VALUES (37830335, 'Miguel', 'Torres', '4987648', 'Tucumán 127', 'MAYORISTA', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO clientes (dni, nombre, apellido, telefono, direccion, tipo, activo, created_at, updated_at) VALUES (40830336, 'Andrés', 'Coria', '4982255', 'San Juan 2290', 'MINORISTA', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO clientes (dni, nombre, apellido, telefono, direccion, tipo, activo, created_at, updated_at) VALUES (40830333, 'Pedro', 'Rabo', '4982255', 'Rioja 1322', 'MAYORISTA', false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO clientes (dni, nombre, apellido, telefono, direccion, tipo, activo, created_at, updated_at) VALUES (40830993, 'Luisina', 'Mendoza', '4982255', 'Mariano Moreno 1312', 'MINORISTA', false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO ventas (total, porcentaje_descuento, forma_pago, cliente_dni, fecha, created_at, updated_at) VALUES (100, 0, 'TRANSFERENCIA', 37830335, '2021-08-22 21:00:00-03', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO ventas (total, porcentaje_descuento, forma_pago, cliente_dni, fecha, created_at, updated_at) VALUES (100, 10, 'EFECTIVO', 37830335, '2021-08-22 21:00:00-03', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO ventas (total, porcentaje_descuento, forma_pago, cliente_dni, fecha, created_at, updated_at) VALUES (500, 0, 'TRANSFERENCIA', 37830335, '2021-08-31 21:00:00-03', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO ventas (total, porcentaje_descuento, forma_pago, cliente_dni, fecha, created_at, updated_at) VALUES (500, 0, 'TARJETA DE CREDITO', 40830993, '2021-08-31 21:00:00-03', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO ventas_items (cantidad, venta_id, producto_id, created_at, updated_at) VALUES (5, 1, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO ventas_items (cantidad, venta_id, producto_id, created_at, updated_at) VALUES (5, 1, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO ventas_items (cantidad, venta_id, producto_id, created_at, updated_at) VALUES (10, 1, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO ventas_items (cantidad, venta_id, producto_id, created_at, updated_at) VALUES (5, 2, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO ventas_items (cantidad, venta_id, producto_id, created_at, updated_at) VALUES (5, 2, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO ventas_items (cantidad, venta_id, producto_id, created_at, updated_at) VALUES (10, 2, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO ventas_items (cantidad, venta_id, producto_id, created_at, updated_at) VALUES (10, 3, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO ventas_items (cantidad, venta_id, producto_id, created_at, updated_at) VALUES (10, 4, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO proveedores (cuit_dni, razon_social, telefono, direccion, activo, created_at, updated_at) VALUES ('2037687952', 'El Turco', '4978999', 'Junín 401', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO proveedores (cuit_dni, razon_social, telefono, direccion, activo, created_at, updated_at) VALUES ('258787952','KIKI', '4974569', 'San Luis 1356', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO proveedores (cuit_dni, razon_social, telefono, direccion, activo, created_at, updated_at) VALUES ('2025687952','Coca Cola', '4974569', 'Mitre 2501', false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO proveedores (cuit_dni, razon_social, telefono, direccion, activo, created_at, updated_at) VALUES ('2254687952', 'Bagley', '4974569', 'Mendoza 4523', false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO usuarios (usuario, clave, rol, activo, created_at, updated_at) VALUES ('admin', '$2b$10$Zx9YzjhNR5IiHqicsUKIQ.8ZDRx/KVClDQjVANJWhoGMm2odbUzl2', 'Administrador', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
