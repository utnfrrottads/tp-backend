let DataTypes = require("sequelize").DataTypes;
let _ciudades = require("./ciudades");
let _contactos = require("./contactos");
let _direcciones = require("./direcciones");
let _empresas = require("./empresas");
let _entrevistas = require("./entrevistas");
let _especialidades = require("./especialidades");
let _evaluaciones = require("./evaluaciones");
let _evaluadores_a_cargo = require("./evaluadores_a_cargo");
let _experiencias = require("./experiencias");
let _modulos = require("./modulos");
let _operaciones = require("./operaciones");
let _paises = require("./paises");
let _permisos = require("./permisos");
let _personas = require("./personas");
let _provincias = require("./provincias");
let _requerimientos = require("./requerimientos");
let _resultados = require("./resultados");
let _roles = require("./roles");
let _sector = require("./sector");
let _usuarios = require("./usuarios");
let _vacantes = require("./vacantes");

function initModels(sequelize) {
  let ciudades = _ciudades(sequelize, DataTypes);
  let contactos = _contactos(sequelize, DataTypes);
  let direcciones = _direcciones(sequelize, DataTypes);
  let empresas = _empresas(sequelize, DataTypes);
  let entrevistas = _entrevistas(sequelize, DataTypes);
  let especialidades = _especialidades(sequelize, DataTypes);
  let evaluaciones = _evaluaciones(sequelize, DataTypes);
  let evaluadores_a_cargo = _evaluadores_a_cargo(sequelize, DataTypes);
  let experiencias = _experiencias(sequelize, DataTypes);
  let modulos = _modulos(sequelize, DataTypes);
  let operaciones = _operaciones(sequelize, DataTypes);
  let paises = _paises(sequelize, DataTypes);
  let permisos = _permisos(sequelize, DataTypes);
  let personas = _personas(sequelize, DataTypes);
  let provincias = _provincias(sequelize, DataTypes);
  let requerimientos = _requerimientos(sequelize, DataTypes);
  let resultados = _resultados(sequelize, DataTypes);
  let roles = _roles(sequelize, DataTypes);
  let sector = _sector(sequelize, DataTypes);
  let usuarios = _usuarios(sequelize, DataTypes);
  let vacantes = _vacantes(sequelize, DataTypes);

  entrevistas.belongsToMany(evaluaciones, { through: resultados, foreignKey: "entrevistas_id_entrevista", otherKey: "evaluaciones_id_evaluacion" });
  especialidades.belongsToMany(personas, { through: evaluadores_a_cargo, foreignKey: "especialidades_id_especialidad", otherKey: "personas_id_evaluador" });
  evaluaciones.belongsToMany(entrevistas, { through: resultados, foreignKey: "evaluaciones_id_evaluacion", otherKey: "entrevistas_id_entrevista" });
  operaciones.belongsToMany(roles, { through: permisos, foreignKey: "operaciones_id_operaciones", otherKey: "roles_id_roles" });
  personas.belongsToMany(especialidades, { through: evaluadores_a_cargo, foreignKey: "personas_id_evaluador", otherKey: "especialidades_id_especialidad" });
  roles.belongsToMany(operaciones, { through: permisos, foreignKey: "roles_id_roles", otherKey: "operaciones_id_operaciones" });
  direcciones.belongsTo(ciudades, { foreignKey: "ciudades_id_ciudad"});
  ciudades.hasMany(direcciones, { foreignKey: "ciudades_id_ciudad"});
  personas.belongsTo(direcciones, { foreignKey: "direcciones_id_direccion"});
  direcciones.hasMany(personas, { foreignKey: "direcciones_id_direccion"});
  contactos.belongsTo(empresas, { foreignKey: "empresas_id_empresa"});
  empresas.hasMany(contactos, { foreignKey: "empresas_id_empresa"});
  vacantes.belongsTo(empresas, { foreignKey: "id_empresa"});
  empresas.hasMany(vacantes, { foreignKey: "id_empresa"});
  resultados.belongsTo(entrevistas, { foreignKey: "entrevistas_id_entrevista"});
  entrevistas.hasMany(resultados, { foreignKey: "entrevistas_id_entrevista"});
  evaluadores_a_cargo.belongsTo(especialidades, { foreignKey: "especialidades_id_especialidad"});
  especialidades.hasMany(evaluadores_a_cargo, { foreignKey: "especialidades_id_especialidad"});
  resultados.belongsTo(evaluaciones, { foreignKey: "evaluaciones_id_evaluacion"});
  evaluaciones.hasMany(resultados, { foreignKey: "evaluaciones_id_evaluacion"});
  entrevistas.belongsTo(evaluadores_a_cargo, { foreignKey: "evaluadores_a_cargo_personas_id_evaluador"});
  evaluadores_a_cargo.hasMany(entrevistas, { foreignKey: "evaluadores_a_cargo_personas_id_evaluador"});
  entrevistas.belongsTo(evaluadores_a_cargo, { foreignKey: "evaluadores_a_cargo_especialidades_id_especialidad"});
  evaluadores_a_cargo.hasMany(entrevistas, { foreignKey: "evaluadores_a_cargo_especialidades_id_especialidad"});
  contactos.belongsTo(experiencias, { foreignKey: "experiencias_id_experiencia"});
  experiencias.hasMany(contactos, { foreignKey: "experiencias_id_experiencia"});
  operaciones.belongsTo(modulos, { foreignKey: "modulos_id_modulos"});
  modulos.hasMany(operaciones, { foreignKey: "modulos_id_modulos"});
  permisos.belongsTo(operaciones, { foreignKey: "operaciones_id_operaciones"});
  operaciones.hasMany(permisos, { foreignKey: "operaciones_id_operaciones"});
  provincias.belongsTo(paises, { foreignKey: "paises_id_pais"});
  paises.hasMany(provincias, { foreignKey: "paises_id_pais"});
  contactos.belongsTo(personas, {foreignKey: "personas_id_persona"});
  personas.hasMany(contactos, { foreignKey: "personas_id_persona"});
  entrevistas.belongsTo(personas, { foreignKey: "personas_id_candidato"});
  personas.hasMany(entrevistas, { foreignKey: "personas_id_candidato"});
  evaluadores_a_cargo.belongsTo(personas, { foreignKey: "personas_id_evaluador"});
  personas.hasMany(evaluadores_a_cargo, { foreignKey: "personas_id_evaluador"});
  experiencias.belongsTo(personas, { foreignKey: "personas_id_persona"});
  personas.hasMany(experiencias, { foreignKey: "personas_id_persona"});
  usuarios.belongsTo(personas, { foreignKey: "personas_id_evaluador"});
  personas.hasMany(usuarios, { foreignKey: "personas_id_evaluador"});
  ciudades.belongsTo(provincias, { foreignKey: "provincias_id_provincia"});
  provincias.hasMany(ciudades, { foreignKey: "provincias_id_provincia"});
  permisos.belongsTo(roles, { foreignKey: "roles_id_roles"});
  roles.hasMany(permisos, { foreignKey: "roles_id_roles"});
  usuarios.belongsTo(roles, { foreignKey: "roles_id_roles"});
  roles.hasMany(usuarios, { foreignKey: "roles_id_roles"});
  especialidades.belongsTo(sector, { foreignKey: "sector_id_sector"});
  sector.hasMany(especialidades, { foreignKey: "sector_id_sector"});
  entrevistas.belongsTo(vacantes, { foreignKey: "vacantes_id_vacante"});
  vacantes.hasMany(entrevistas, { foreignKey: "vacantes_id_vacante"});
  requerimientos.belongsTo(vacantes, { foreignKey: "id_vacante"});
  vacantes.hasMany(requerimientos, { foreignKey: "id_vacante"});

  return {
    ciudades,
    contactos,
    direcciones,
    empresas,
    entrevistas,
    especialidades,
    evaluaciones,
    evaluadores_a_cargo,
    experiencias,
    modulos,
    operaciones,
    paises,
    permisos,
    personas,
    provincias,
    requerimientos,
    resultados,
    roles,
    sector,
    usuarios,
    vacantes,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
