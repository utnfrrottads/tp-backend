# TP Backend 2020

## Concepto General

Se propone desarrollar un Sistema de Puntos para comercios. Mediante él sus clientes recibirían puntos que pueden utilizar para intercambiar por premios como productos, descuentos, etc. A cambio el comercio recibe métricas de las compras de estos clientes.
Los clientes serían incentivados a registrarse y recibirían una tarjeta NFC. A la hora de abonar sus compras, el cliente presentará la tarjeta con la que el cajero lo identificará. Éste registra la compra y se le asignan puntos proporcionales al monto neto abonado.
El cliente puede consultar sus puntos mediante y canjearlos por premios mediante una aplicación web. Luego puede acercarse al comercio para recibirlo.

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
|Requerimiento funcional|Detalle/Listado de CU|Cumple|
|:-|:-|-|
|ABMC simple|Tarjetas, Productos, Premios|
|ABMC dependiente|Clientes, Vistas de Métrica|
|Listado simple|Email list de Clientes|
|Listado complejo|Lista de Premios disponibles, Lista de Premios A Retirar|
|Listado Filtrado|Métricas|
|Detalles|Premios, Clientes|
|Otros|Canje de premios, Registro de Compra|

## Frontend

|Requerimiento|Cumple|
|:-|-|
|Invocar API listado||
|Invocar API detalle||
|Mostrar detalle al hacer click <br>en elemento del listado||

## Requerimientos Técnicos

|Requerimiento técnico|Cumple|
|:-|-|
|Framework frontend||
|Framework CSS o preprocesador CSS||
|Framework backend||
|Uso de API REST o GraphQL||
|ORM/ODM||
|Base de datos persistente||

## Integrantes

|Nombre y Apellido|Legajo|
|:-|-:|
|Katzaroff, Federico| 44744|
|Listorti, Hernán| 44775|
|Giannassi, Franco| 44681|
