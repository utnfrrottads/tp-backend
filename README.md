# TP Backend 2020

## Concepto General

Se propone desarrollar un Sistema de Puntos para comercios. Mediante él sus clientes recibirían puntos que pueden utilizar para intercambiar por premios como productos, descuentos, etc. A cambio el comercio recibe métricas de las compras de estos clientes.
Los clientes serían incentivados a registrarse y recibirían una tarjeta NFC. A la hora de abonar sus compras, el cliente presentará la tarjeta con la que el cajero lo identificará. Éste registra la compra y se le asignan puntos proporcionales al monto neto abonado.
El cliente puede consultar sus puntos mediante y canjearlos por premios mediante una aplicación web. Luego puede acercarse al comercio para recibirlo.

## Propuesta de Implementación

Se utilizará NodeJS en TypeScript como lenguaje de backend. Para persistencia se utilizará MongoDB, mediante TypeORM. El ABM de usuarios del sistema, la asignación de roles y la autenticación se realizará mediante Auth0.

El sistema tendría 4 roles con vistas independientes:
- Un cliente puede ver sus puntos, ver el listado de premios, canjear premios y ver sus premios sin retirar.
- Un cajero sólo puede registrar compras para clientes.
- Un administrador puede acceder a los ABM de productos, premios, clientes, y tarjetas.
- Un ejecutivo puede acceder al ABM de Vistas de Métrica (filtros predefinidos para Métricas), Métricas y al Email list de Clientes.

El sistema contaría entonces con las siguientes funcionalidades:
- ABMC Independientes: Tarjetas, Productos, Premios
- ABMC Dependientes: Clientes, Vistas de Métrica
- Listado Simple: Email list de Clientes
- Listado Complejo: Lista de Premios disponibles, Lista de Premios A Retirar
- Lista Filtrada: Métricas
- Detalles: Premios, Clientes
- Otros: Canje de premios, Registro de Compra


## Integrantes

|Nombre y Apellido|Legajo|
|:-|-:|
|Katzaroff, Federico| 44744|
|Listorti, Hernán| 44775|
|Giannassi, Franco| 44681|
