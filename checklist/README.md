# Checklist

## Backend
|Requerimiento funcional|cant. mín.<br>1 o 2 integ|cant. máx.<br>3 o 4 integ|Detalle/Listado de casos|Cumple|
|:-|-:|-:|:-|-|
|ABMC simple|1 x integ|1 x integ|- de Categorias - de Usuarios - de Niveles
|ABMC dependiente|1|2|- Servicios (dependiente de categoria) - Contratos (dependiente de usuario cliente y servicio)
|Listado simple|1|1| - Listado de categorias
| Listado complejo obligatorio | 1 | 2 | - Listado de servicios por categorias - Listado de prestadores por nivel
| Listado adicional con filtro | 0 | 0 | (- Listado que permita filtrar los servicios segun la categoria) Para AD
|Detalle básico|1(*)|2(*)|Detalle del usuario que presta el servicio con su nivel, cantidad de contratos y su biografia/descripcion - Detalle del servico que contiene la descripcion, y cantidad de veces que fue realizado (cantidad de contratos sin fecha de cancelación).
|Detalle parametrizable|0|0| -
|Otros|0|0| -

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
|Framework frontend||
|Framework CSS o preprocesador CSS||
|Framework backend||
|Uso de API REST o GraphQL||
|ORM/ODM||
|Base de datos persistente||
