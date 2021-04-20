# Checklist

## Backend

|Requerimiento funcional|cant. mín.<br>1 o 2 integ|cant. máx.<br>3 o 4 integ|Detalle/Listado de casos|Cumple|
|:-|-:|-:|:-|-|
|ABMC simple|1 x integ|1 x integ|- ABMC Clientes - ABMC Proveedores - ABMC Categorias o|
|ABMC dependiente|1|2|- ABMC Productos - ¿ABMC Pedidos?
|Listado simple|1|1|- Listados de facturas
|Listado complejo obligatorio|1|2|- Productos - Pedidos(filtrado por fecha de factura)|
|Listado adicional con filtro|0|0|
|Detalle básico|1(*)|2(*)|- Detalle de pedido - Detalle de factura
|Detalle parametrizable|0|0|
|Otros|0|0|

(\*) Los detalles básicos pueden ser reemplazado por un detalle parametrizados en los

## Frontend

|Requerimiento|Cumple|
|:-|-|
|Invocar API listado||
|Invocar API detalle||
|Mostrar detalle al hacer click <br>en elemento del listado||

## Requerimientos Técnicos

|Requerimiento técnico|Cumple|
|:-|-|
|Framework frontend|Angular|
|Framework CSS o preprocesador CSS|Boostrap|
|Framework backend|Express|
|Uso de API REST o GraphQL|API REST|
|ORM/ODM||
|Base de datos persistente|¿Mongo? sino algo relacional|
