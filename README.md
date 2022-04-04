# League Of Legends Tournaments

## Descripcion del proyecto

Aplicacion web orientada a la organización y gestión de torneos del juego League of Legends. Un usuario podrá dar de alta un torneo, definir alcance, si es privado o no, premios, cantidad de participantes, etc. Luego el creador del torneo agregará los usuarios que desee o abrirá el tornero para que otros usuarios puedan registrarse.

Un torneo va a poder crearse por un usuario premium, un usuario no premium pasa a ser premium al participar en X cantidad de torneos.

También se accederá a la api oficial del LOL para mostrar información sobre el meta del juego.

La idea es que el creador pueda añadir participantes con su nickname del juego (invocador), sin necesidad de que el participante esté registrado en la página, para esto se utlilizará la api oficial del lol.


## [CHECKLIST](/checklist/README.md)

- CRUD simple
  - Entidad: usuario
  - Atributos: id, username, password, email
- CRUD dependiente
  - Entidad: torneo
  - Atributos: nro_torneo, nombre_torneo, premio, cupo, clasificacion_necesaria
  - Entidad relacionada: usuario
- Listados
  - Simple: listado de todos los torneos.
  - Complejo: listado de los torneos filtrados por la clasificacion necesaria para participar
- Detalle
  - Basico: detalle del torneo con sus datos

## Modelo de Dominio

![modelo-de-dominio](/docs/modelo-de-dominio.drawio.png)

*NOTA: el modelo de dominio va a ser actualizado a medida que se desarrolle*

## Alumno

| Legajo | Nombres        | Apellidos        |
| :----- | :------------- | :--------------- |
| 43334  | Gonzalo Martin | Bermejo Zambrini |

TEST