# TP Backend 2020

## Concepto General

Se propone desarrollar un Sistema de Puntos para comercios. Mediante él sus clientes recibirían puntos que pueden utilizar para intercambiar por premios como productos, descuentos, etc. A cambio el comercio recibe métricas de las compras de estos clientes.
Los clientes serían incentivados a registrarse y recibirían una tarjeta NFC. A la hora de abonar sus compras, el cliente presentará la tarjeta con la que el cajero lo identificará. Éste registra la compra y se le asignan puntos proporcionales al monto neto abonado.
El cliente puede consultar sus puntos y canjearlos por premios mediante una aplicación web. Luego puede acercarse al comercio para retirarlo.

## Propuesta de Implementación

Se utilizará NodeJS en TypeScript como lenguaje de backend. Para persistencia se utilizará MongoDB, mediante TypeORM. El ABM de usuarios del sistema, la asignación de roles y la autenticación se realizará mediante Auth0.

El sistema tendría 4 roles con vistas independientes:
|Rol|Vista|
|:-|:-|
|Cliente|Consulta de puntos y del listado de premios, canjeo de premios y vista de sus premios sin retirar|
|Cajero|Registro de compras para clientes|
|Administrador|Acceso a los ABM de productos, premios, clientes, y tarjetas|
|Ejecutivo|Acceso al ABM de Vistas de Métrica (filtros predefinidos para Métricas), Métricas y al Email list de Clientes|

El sistema contaría entonces con las siguientes funcionalidades:
|Requerimiento funcional|Detalle/Listado de CU|
|:-|:-|-|
|ABMC simple|Tarjetas, Productos, Premios|
|ABMC dependiente|Clientes, Vistas de Métrica|
|Listado simple|Email list de Clientes|
|Listado complejo|Lista de Premios disponibles, Lista de Premios A Retirar|
|Listado Filtrado|Métricas|
|Detalles|Premios, Clientes|
|Otros|Canje de premios, Registro de Compra|

## Integrantes

|Nombre y Apellido|Legajo|
|:-|-:|
|Katzaroff, Federico| 44744|
|Listorti, Hernán| 44775|
|Giannassi, Franco| 44681|

## Modelo de Datos
El modelo de dominio se encuentra en el siguiente enlace:
https://drive.google.com/file/d/1j1KXTcTJCSWFpp7mGSsiBoKyN1PE7dQ6/view

## CheckList

|Requerimiento funcional|cant. mín.<br>1 o 2 integ|cant. máx.<br>3 o 4 integ|Detalle/Listado de casos|Cumple|
|:-|-:|-:|:-|-|
|ABMC simple|1 x integ|1 x integ|Tarjetas, Productos, Premios|
|ABMC dependiente|1|2|Clientes, Vistas de Métrica, Compras, Premios Canjeados|
|Listado simple|1|1|Todas las entidades|
|Listado complejo obligatorio|1|2|Lista de Premios disponibles, Lista de Premios A Retirar|
|Listado adicional con filtro|0|0|Todas las entidades|
|Detalle básico|1(*)|2(*)|Premios, Clientes|
|Detalle parametrizable|0|0|-|
|Otros|0|0|Canje de premios, Registro de Compra|

(\*) Los detalles básicos pueden ser reemplazado por un detalle parametrizados en los
