# Checklist - Backend


## Aspectos del sistema.
Será una página web donde se registran empresas para vender sus productos. <br>
Los productos pertenecen a un rubro/categoría.  <br>
Las personas se registran en la página y acceden a ella para comprar productos de distinta categoría. <br>
Cada vez que un cliente compra productos se genera una venta. <br>



Requerimiento funcional|cant. mín.<br>1 o 2 integ|cant. máx.<br>3 o 4 integ|Detalle/Listado de casos|Cumple|
|:-|-:|-:|:-|-|
|ABMC simple|1 x integ|1 x integ| 1 - Empresa. <br> 2 - Persona. <br> 3 - Rubro. <br> 4 - Usuario.
|ABMC dependiente|1|2| 1 - Ventas.<br> 2 - Producto.
|Listado simple|1|1|  1 - Rubros <br> 2 - Empresas
|Listado complejo obligatorio|1|2| 1 - Productos: se filtran los productos por rubro. <br> (Filtro por atributo “rubro”). <br> 2 - Productos: se filtran todos los productos que <br> pertenecen a una Empresa. (Filtro por atributo “empresa”). 
|Listado adicional con filtro|0|0| -
|Detalle básico|1(*)|2(*)| 1 - Producto: el detalle de un producto se obtiene desde <br> el listado de productos. <br> 2 - Ventas: el detalle de una venta se obtiene desde <br> el listado de ventas.
|Detalle parametrizable|0|0| -
|Otros|0|0| -

(\*) Los detalles básicos pueden ser reemplazado por un detalle parametrizados en los

## Diagrama Entidad-Relación.

![Modelo de datos](https://github.com/danilobassi8/tp-backend-2020/blob/master/checklist/MODELO_DATOS.png)

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
