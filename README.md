# TP Backend TTADS

## Propuesta E-Commerce Perfumería.
### Enunciado General.

El sistema por desarrollar consiste en el e-commerce de una perfumería que se dedica a la venta de perfumes originales importados a través de distintas sucursales en el país. Las sucursales se identifican según el CUIT de esta y su ubicación está dada por el código postal de la ciudad en la que se encuentra, su calle y numero. Además de estos datos, también se tiene un usuario de contacto de esta y el teléfono del local.

De los perfumes se conocen los siguientes datos:
 * Nombre.
 * Descripción
 * Presentación.
 * Precio (General para todas las sucursales).
 * Notas.
 * Stock (Diferenciado por cada sucursal).
 
Los datos del perfume también son Marca y Tipo; Sin embargo, por una cuestión de complejidad estos se añadirán durante la etapa del trabajo práctico final.

Para los usuarios de la página tenemos dos perfiles diferenciados: Clientes (Público general) y Personal (Empleados, Gerentes, Administradores, etc. internos). Un usuario puede ocupar los dos perfiles.
El cliente, solo tiene acceso a un listado inicial y a la acción de venta. El personal posee un Rol que define el nivel de permisos que tiene el mismo (Alta, Baja y/o Modificación).

Para este trabajo consideramos el proceso de selección de artículos para la compra, y proceder con la misma sin considerar por el momento los medios de pago. Esta última función, junto con el seguimiento del envío, serán añadidas en la etapa final.

Para realizar una compra el cliente selecciona los artículos desde la ventana principal (pudiendo filtrar los mismos según sucursal, notas o rango de precios) y los agrega a un carro de compras. Los datos mostrados en este listado son reducidos, sin embargo, haciendo click en un artículo le permite ver el detalle extenso de este (datos extendidos y sucursales disponibles) y un detalle de otros artículos parecidos filtrados según las notas del perfume.

Una vez seleccionados todos los artículos se accede al "Carrito de compras", donde puede ver un resumen de esta diferenciando los artículos según sucursal y puede seleccionar la dirección de entrega del artículo en cuestión (Ingresando del mismo código postal, calle y numero). Una vez realizados estos pasos se confirma la venta.

También se cuenta con una sección para personal donde se permite consultar, modificar, crear o eliminar (dependiendo de los permisos concedidos) las siguientes entidades:
 * Usuarios.
 * Artículos.
 * Notas.
 * Sucursales.
 * Roles.
 * Stock.
 
Y por último, el sistema permite a los administradores y demás empleados emitir un listado con los artículos que estén en o por debajo del punto de pedido (2 unidades). Este punto es definido globalmente por el momento con la posibilidad de hacerlo dinámico en la etapa final del trabajo.

### Listado de Item's.

 1. **ABMC:**
     - *Usuario (Independiente):*
        - DNI.
        - Nombres.
        - Apellidos.
        - Email.
        - Código Postal.
        - Calle.
        - Número.
        - Teléfono.
        - Rol.
     - *Notas (Independiente):*
        - Descripción.
     - *Sucursales (Independiente):*
       - CUIT.
       - Código Postal.
       - Calle.
       - Número.
       - Teléfono.
       - Usuario de Contacto.
     - *Rol (Independiente)*
       - ID.
       - Nombre.
       - Descripción.
       - Permiso de Modificación.
       - Permiso de Creación.
       - Permiso de Eliminación.
     - *Artículo (Dependiente):*
       - ID.
       - Presentación.
       - Descripción.
       - Nombre.
       - Precio.
       - Notas.
       - Imagen.
     - *Stock/Reposición (Dependiente):*
       - Artículo.
       - Sucursal.
       - Cantidad a reponer.
  2. **Listados:**
     - Lista los artículos con las existencias en o por debajo de 2 para una determinada sucursal. _Tipo:_ Simple.
     - Lista los artículos disponibles para la venta (según cantidad en stock), permite filtrar por precio, notas y/o sucursal. _Tipo:_ Complejo.
     - Lista del carrito con los artículos seleccionados por el usuario (Según sucursal) y muestra un detalle total del precio. _Tipo:_ Complejo.
  3. **Detalle:**
       - *Detalle de Artículos:*
         - _Entidades:_ Artículo, Sucursal, Nota, Stock.
       - *Detalle de Artículos Sugeridos:*
         - _Entidades:_ Artículo, Nota.
         - _Parámetros:_ Notas. 

## Integrantes.
|Nombre y Apellido|Legajo|
|:-|-:|
|Corsetti, Ornela Milagros| 44034|
|Salazar, Analía| 40499|
|Peralta, Matías| 43693|
|Hernandez, Evelyn| 40538|

## Modelo de Datos.
El Diagrama Entidad Relación se encuentra en la siguiente imagen:<br>
https://drive.google.com/open?id=1bL78L7C9TJaMKfGNQMaZCDoeAO482uK1

## CheckList.

|Requerimiento funcional|cant. mín.<br>1 o 2 integ|cant. máx.<br>3 o 4 integ|Detalle/Listado de casos|Cumple|
|:-|-:|-:|:-|-|
|ABMC simple|1 x integ|1 x integ|Usuarios, Notas, Sucursal y Rol|
|ABMC dependiente|1|2|Artículo y Stock|
|Listado simple|1|1|Lista de Stock|
|Listado complejo obligatorio|1|2|Listado Principal y Carrito de Compras|
|Listado adicional con filtro|0|0|
|Detalle básico|1(*)|2(*)|Detalle Artículo Completo|
|Detalle parametrizable|0|0|Detalle de Artículos Sugeridos|
|Otros|0|0|

(\*) Los detalles básicos pueden ser reemplazado por un detalle parametrizados en los
