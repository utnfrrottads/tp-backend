# TP Backend 2020

## 1 - Enunciado

### 1.1 - Desarrollo

Desarrollar un backend utilizando una API REST o GraphQL y un frontend parcial con las siguientes caracterísitcas:

  * El backend debe ser programado en JavaScript con NodeJS.
  * Debe utilizar un framework/middleware. Se dará soporte sobre Express pero podrán utilizarse alternativas si así se prefiere.
  * La persistencia debe realizarse utilizando un ODM/ORM con una base de datos persistente acorde a la tecnología que se utilice.
  * El frontend debe realizarse con un framework como Angular u otro seleccionado, html 5 y para CSS debe usarse un preprocessador o framework.
  * El tema y alcance del trabajo debe ser propuesto por los alumnos y aprobado por los docentes de la cátedra (o utilizar el del año 2017)

### 1.2 - Funcionalidad
Ver [checklist]
#### 1.2.1 - Backend por API REST o GraphQL

  * ABMC:
      * ABMC de entidad simple (no depende de otras entidades) por API. *Al menos 1 por integrante*

      * ABMC de una entidad que requiera de otra ya existente de la que se hizo ABMC en el item anterior. Ej: ABMC de articulos donde un atributo sea la categoría que a su vez es una entidad con ABMC.  *Grupos de 1 o 2 miembros: al menos 1. Grupos de 3 y 4 miembros: 2 o más*

      * Otros ABMC que exedan el mínimo requerido pueden hacerse manualmente por base de datos o por API. Si se hacen por API suman nota adicional. Sólo se considerarán el doble de ABMCs

  * Listados por API:
      * Listado simple: al menos uno de las entidades creadas por API. *Al menos 1 listado sin importar la cantidad de integrantes*
      * Listado complejo:

        *Grupos de hasta 2 integrantes: al menos 1 listado complejo. Grupos de 3 y 4 miembros: 2 listados complejos de cualquier opción.*
        * Opción 1: debe incluir datos de al menos dos entidades.
        * Opción 2: el listado debe permitir filtrar por al menos 1 atributo.

      * Sólo se considerarán listados complejos con filtros de uno o más atributos para nota adicional.

  * Detalle:
    * Presentar un detalle por API de alguno de los elementos en un listado
    * Al realizar el request se debe utilizar un ID u otro identificador obtenido de un elemento del listado, deberán devolverse más datos sobre el mismo que los que figuran en el listado.
    * El mismo debe proveer información de dos o más entidades relacionadas. La información adicional debe ser acorde al tipo de API (REST o GraphQL) utilizada.

    *Grupos de 1 o 2 integrates, al menos 1.
    Grupos de 3 y 4 integrantes al menos 2.
    Dos detalles básicos pueden ser reemplazados por 1 detalle parametrizable*

    * Sólo se considerarán para nota adicional detalles que no coincidan con ABMCs creados.


  * Otros: En caso de querer implementar otros elementos en reemplazo o adición a los requeridos pactar con los docentes primero.

#### 1.2.2 - Frontend

  * El frontend al menos deberá permitir invocar a la API y mostrar los resultados de uno de los listados. Haciendo click en un elemento del listado (o parte de él) debe mostrar el detalle correspondiente a un elemento de dicho listado invocando a una API del listado creada para el backend.

  * El resto de la funcionalidad puede utilizarse mediante una herramienta similar a postman, restclient, curl o wget.

  * No se considerará trabajo adicional en el frontend para sumar nota ya que hay un TP dedicado a ello.

## 2 - Alcance y Entregas
### 2.1 - Definición de Alcance

El equipo deberá definir el alcance del trabajo práctico con el equipo docente. Indicando los criterios de aceptación.

Las mismas podrán volverse a pactar con los profesores enviando las correcciones a la misma indicando, causas, acciones correctivas que se tomarán.

En caso de realizar cambios sobre el alcance deberá dejarse una copia de la versión pactada original dentro del repositorio.

### 2.2 - Entrega Inicial

Para iniciar el proyecto deberá crear un fork de este repositorio.
Editar el README.md para incluir:

En el readme de dicho repo debe figurar:
  * Enunciado general del tp.
  * Indicado una breve descripción para cada item requerido.
    * ABMC: nombre de la entidad y atributos.
    * Listado: breve descripción del listado (1 línea), tipo (simple, complejo)
    * Detalle: entidades involucradas y, si corresponde, los parámetros.
  * Miembros del equipo indicando, legajo, nombre y apellido.
  * Modelo de dominio o modelo de datos. Una imagen referenciada.

Enviar por mail y telegram al profesor la URL del repositorio git para validar el alcance. Esperar la autorización del enunciado. Una vez hecho esto puede comenzar el desarrollo del mismo.

Recuerde revisar el [checklist]

### 2.3 - Entrega Final

  Para realizar la entrega deberá en primer lugar crearse un tag en el repositori de git.

  La entrega final deberá hacerse enviando por email y telegram a los profesores la URL del tag de git.

  Pactar con el docente un fecha para la defensa.


## 3 - Criterio de correccion

### 3.1 - Código
  * Diseño adecuado de la API.
  * Diseño del modelo de datos adecuado.
  * Usabilidad del sitio: debe ser fácil de usar, elegante y no tener contenido oculto o difícil de acceder
  * Diseño adecuado de la interfaz: uso apropiado de los tags html y de los estilos, ya sea utilizando un FW CSS o un preprocesador.
  * Calidad del código: uso adecuado de las características del FW y de la API.
  * Completitud de los requerimientos.

### 3.2 - Repositorio
  * El desarrollo deberá realizarse en una plataforma de git gratuita. Se recomienda GitHub o GitLab.
  * Se evaluará el uso de git: Frecuencia y responsables de los commits, uso de branches y merge.

### 3.3 - Defensa

Todos los miembros del grupo deberán aprobar una defensa del código y funcionalidad del TP con los profesores.

Si algún miembro no puede realizar la defensa correspondiente la misma no se considerará aprobada.

Luego de la defensa el resultado puede ser:
* Desarrollo aprobado - Defensa aprobada: se considerará el TP aprobado y se definirá una nota.
* Desarrollo a revisión - Defensa aprobada: se considera aprobada la defensa y se indicarán cambios a realizar en el código. En este caso deberá corregirse el código y enviarse un nuevo tag con las correcciones indicadas en un plazo acordado con el docente. No deberá repetirse la defensa.
* Desarrollo aprobado - Defensa a repetir: se considera el código adecuado y aprobado. Deberá repetirse la defensa en un plazo acordado con el docente.
* Desarrollo a revisión - Defensa a repetir: se pactará una nueva fecha de entrega y defensa con el docente.

[checklist]: ./checklist/README.md

### TRABAJO PRACTICO

### Relevamiento “Cuando Llega Inter-urbano”

Integrantes:
Giuliano, Truant.

Email contacto: giulitruant.26@gmail.com

### Proceso de negocio


El proceso de negocio comienza cuando un viajero desea saber cuándo llegan los posibles colectivos para que lo lleven al destino.
Todos los choferes de colectivos de la empresa deberán tener la aplicación instalada para poder rastrear el coche o colectivo que se encuentran manejando.
Los viajeros al igual que los choferes también deberán tener la aplicación instalada en su celular.
Para consultar y estimar la llegada del colectivo, el usuario va a tener que ingresar la empresa de colectivo con la que desea viajar y la estación o parada de colectivos para poder saber la distancia que se encuentra dicho vehículo.
De ser que el vehículo o colectivo se haya roto a los usuarios que consulten sobre dicho colectivo, les notificara que se encuentra parado para que tomen medidas al respecto.

### User Story’s

### Pantalla principal:
Realizar módulo para consultar la estimación de los colectivos por empresa y así mostrar sugerencias de próximos colectivos.

### Registrar nueva empresa:
Dar de alta a una empresa con todos los datos correspondientes

### ABM de choferes para usuarios administrador:
Este menú solamente podrán visualizarlo los usuarios administrador en el cual podrán agregar, editar o eliminar choferes.
El mismo va a tener la lista de choferes filtrado las mismas por empresa y simplificar la búsqueda del usuario.

### Estimación de llegada de próximos  colectivos:
Se le notificara al usuario que consulte la llegada del colectivo

### Notificación al usuario por demora:
Se le notificara al usuario que consulte el estado o llegada del colectivo, la demora o detención del mismo y así mostrar otras sugerencias de próximos colectivos.

### Ranking de colectivos con menos demora (o mejor calificados):
Se emitirá un ranking de las empresa de colectivos con menos demora lo cual permitirá mostrar la eficiencia de las empresas de colectivos.

## Entidades de modelo de dominio

1- Empresa
2- Linea de colectivo
3- Recorridos
4- Paradas de colectivo "Paradas"
5- Horario o Calendario
6- Chofer
