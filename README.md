# Descripción del trabajo

### Enunciado
Realizar una aplicación web de selección de personal que centralice a los candidatos a un puesto de trabajo con el fin de facilitar la administración en la contratación de los mismos para la vacante.

### ABMC simples:
* Evaluador: (id_evaluador, nombre, apellido, contacto, especialidad)
* Candidato: (id_candidato, documento, nombre, apellido, contacto, localidad, fecha_nac, sexo)
* Evaluación: (id_evaluación, desc_evaluacion)
* Empresa: (id_empresa, cuit, razon_social, contacto)

### ABMC dependientes:
* Entrevista: (id_entrevista, desc_entrevista, fecha_hora_entrev, estado_entrevista, comentario)
* Vacante: (id_vacante, cargo, desc_vcante, estado_vacante, requerimientos)

### Listado simple:
Listado de la clase "Canditado"

### Listados complejos:
* Listado de vacantes por empresa.
* Listado de las entrevistas en las que participó un candidato.

### Listado adicional con filtro:
Listado de entrevistas filtradas por determinada fecha o semana.

### Detalles:
* Detalle de las vacantes del listado "vacantes por empresa". Se involucra las clases "Vacante" y "Empresa".
* Detalle de las entrevistas del listado "entrevistas con candidato". Se involucra las clases "Entrevista" y "Candidato".

## Miembros del equipo:

* 44989 - Bertone Andres
* 44987 - Cabanellas Ignacio
* 45091 - Cordoba Lucas
* 45090 - Nicola Francisco

## Modelo del Dominio
[Ver imagen](modelo-del-dominio/MD.jpg)
