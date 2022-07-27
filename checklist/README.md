# Checklist

## Backend

| Requerimiento funcional      | cant. mín.<br>1 o 2 integ | cant. máx.<br>3 o 4 integ | Detalle/Listado de casos                                          | Cumple |
| :--------------------------- | ------------------------: | ------------------------: | :---------------------------------------------------------------- | :----: |
| ABMC simple                  |                 1 x integ |                 1 x integ | crud usuarios                                                     |   SI   |
| ABMC dependiente             |                         1 |                         2 | crud torneos                                                      |   SI   |
| Listado simple               |                         1 |                         1 | listado torneos                                                   |   SI   |
| Listado complejo obligatorio |                         1 |                         2 | listado de torneos filtrados por rango de clasificacion del juego |   SI   |
| Listado adicional con filtro |                         0 |                         0 |                                                                   |        |
| Detalle básico               |                      1(*) |                      2(*) | detalle de un torneo                                              |   SI   |
| Detalle parametrizable       |                         0 |                         0 | ??                                                                |        |
| Otros                        |                         0 |                         0 | ??                                                                |        |

(\*) Los detalles básicos pueden ser reemplazado por un detalle parametrizados en los

## Frontend

| Requerimiento                                              | Cumple |
| :--------------------------------------------------------- | ------ |
| Invocar API listado                                        | SI     |
| Invocar API detalle                                        | SI     |
| Mostrar detalle al hacer click <br>en elemento del listado | SI     |

## Requerimientos Técnicos

| Requerimiento técnico             | Cumple |
| :-------------------------------- | ------ |
| Framework frontend                | SI     |
| Framework CSS o preprocesador CSS | SI     |
| Framework backend                 | SI     |
| Uso de API REST o GraphQL         | SI     |
| ORM/ODM                           | SI     |
| Base de datos persistente         | SI     |
