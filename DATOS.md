# Datos

## Pendiente
 
- Problema con la fk de ventas, solo valida que no sea nulo, pero no valida que el dato exista previamente en la tabla solicitudes
- Probar con:
- - usar un id autogenerado como pk en solicitudes y ver si ahi hace la referencia(recordar poner unique: false en el modelo de solicitudes)
- - Revisar Asociation o  advance M:N asociation
- Ver como implementarlo con postgress


## Datos importantes
### Antes de probarlo hacer

- hacer `npm install` para que descargue lo necesario en node_module
- para correr el servidor hay que escribir el comando: `npm run dev`


## Las herramientas que se usan son:


```
 "devDependencies": {
    "@babel/cli": "^7.14.5",
    "@babel/core": "^7.14.6",
    "@babel/node": "^7.14.7",
    "@babel/preset-env": "^7.14.7",
    "nodemon": "^2.0.7"
  }

```
