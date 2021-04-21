# Sistema para contratación de diferentes servicios

El sistema que desarrollaremos se encargará de ser un intermediario entre prestadores de servicios y consumidores.

Los prestadores de servicios particulares (ej. de comida, de limpieza, de clases particulares, etc.) podrán cargar los servicios que desean ofrecer. Para ello deberá registrarse en la app cargando sus datos personales y luego los datos del servicio a prestar (categoría, descripción, habilidades, horarios disponibles, precio, etc.).

Además, cualquier persona puede buscar distintos servicios para consumir, de acuerdo a las distintas categorías que existan. Si está interesado en algún servicio deberá registrarse en el sistema para contactar al prestador de dicho servicio.

# Checklist

## Backend

|Requerimiento funcional|cant. mín.<br>1 o 2 integ|cant. máx.<br>3 o 4 integ|Detalle/Listado de casos|Cumple|
|:-|-:|-:|:-|-|
|ABMC simple|1 x integ|1 x integ|
|ABMC dependiente|1|2|
|Listado simple|1|1|
|Listado complejo obligatorio|1|2|
|Listado adicional con filtro|0|0|
|Detalle básico|1(*)|2(*)|
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
|Framework frontend||
|Framework CSS o preprocesador CSS||
|Framework backend||
|Uso de API REST o GraphQL||
|ORM/ODM||
|Base de datos persistente||
