var DataTypes = require("sequelize").DataTypes;
var _ciudades = require("./ciudades");
var _contactos = require("./contactos");
var _direcciones = require("./direcciones");
var _empresas = require("./empresas");
var _entrevistas = require("./entrevistas");
var _especialidades = require("./especialidades");
var _evaluaciones = require("./evaluaciones");
var _evaluadores_a_cargo = require("./evaluadores_a_cargo");
var _experiencias = require("./experiencias");
var _modulos = require("./modulos");
var _operaciones = require("./operaciones");
var _paises = require("./paises");
var _permisos = require("./permisos");
var _personas = require("./personas");
var _provincias = require("./provincias");
var _requerimientos = require("./requerimientos");
var _resultados = require("./resultados");
var _roles = require("./roles");
var _sector = require("./sector");
var _usuarios = require("./usuarios");
var _vacantes = require("./vacantes");

function initModels(sequelize) {
  var ciudades = _ciudades(sequelize, DataTypes);
  var contactos = _contactos(sequelize, DataTypes);
  var direcciones = _direcciones(sequelize, DataTypes);
  var empresas = _empresas(sequelize, DataTypes);
  var entrevistas = _entrevistas(sequelize, DataTypes);
  var especialidades = _especialidades(sequelize, DataTypes);
  var evaluaciones = _evaluaciones(sequelize, DataTypes);
  var evaluadores_a_cargo = _evaluadores_a_cargo(sequelize, DataTypes);
  var experiencias = _experiencias(sequelize, DataTypes);
  var modulos = _modulos(sequelize, DataTypes);
  var operaciones = _operaciones(sequelize, DataTypes);
  var paises = _paises(sequelize, DataTypes);
  var permisos = _permisos(sequelize, DataTypes);
  var personas = _personas(sequelize, DataTypes);
  var provincias = _provincias(sequelize, DataTypes);
  var requerimientos = _requerimientos(sequelize, DataTypes);
  var resultados = _resultados(sequelize, DataTypes);
  var roles = _roles(sequelize, DataTypes);
  var sector = _sector(sequelize, DataTypes);
  var usuarios = _usuarios(sequelize, DataTypes);
  var vacantes = _vacantes(sequelize, DataTypes);

  entrevistas.belongsToMany(evaluaciones, { as: 'evaluaciones_id_evaluacion_evaluaciones', through: resultados, foreignKey: "entrevistas_id_entrevista", otherKey: "evaluaciones_id_evaluacion" });
  especialidades.belongsToMany(personas, { as: 'personas_id_evaluador_personas', through: evaluadores_a_cargo, foreignKey: "especialidades_id_especialidad", otherKey: "personas_id_evaluador" });
  evaluaciones.belongsToMany(entrevistas, { as: 'entrevistas_id_entrevista_entrevista', through: resultados, foreignKey: "evaluaciones_id_evaluacion", otherKey: "entrevistas_id_entrevista" });
  operaciones.belongsToMany(roles, { as: 'roles_id_roles_roles', through: permisos, foreignKey: "operaciones_id_operaciones", otherKey: "roles_id_roles" });
  personas.belongsToMany(especialidades, { as: 'especialidades_id_especialidad_especialidades', through: evaluadores_a_cargo, foreignKey: "personas_id_evaluador", otherKey: "especialidades_id_especialidad" });
  roles.belongsToMany(operaciones, { as: 'operaciones_id_operaciones_operaciones', through: permisos, foreignKey: "roles_id_roles", otherKey: "operaciones_id_operaciones" });
  direcciones.belongsTo(ciudades, { as: "ciudades_id_ciudad_ciudade", foreignKey: "ciudades_id_ciudad"});
  ciudades.hasMany(direcciones, { as: "direcciones", foreignKey: "ciudades_id_ciudad"});
  personas.belongsTo(direcciones, { as: "direcciones_id_direccion_direccione", foreignKey: "direcciones_id_direccion"});
  direcciones.hasMany(personas, { as: "personas", foreignKey: "direcciones_id_direccion"});
  contactos.belongsTo(empresas, { as: "empresas_id_empresa_empresa", foreignKey: "empresas_id_empresa"});
  empresas.hasMany(contactos, { as: "contactos", foreignKey: "empresas_id_empresa"});
  vacantes.belongsTo(empresas, { as: "id_empresa_empresa", foreignKey: "id_empresa"});
  empresas.hasMany(vacantes, { as: "vacantes", foreignKey: "id_empresa"});
  resultados.belongsTo(entrevistas, { as: "entrevistas_id_entrevista_entrevista", foreignKey: "entrevistas_id_entrevista"});
  entrevistas.hasMany(resultados, { as: "resultados", foreignKey: "entrevistas_id_entrevista"});
  evaluadores_a_cargo.belongsTo(especialidades, { as: "especialidades_id_especialidad_especialidade", foreignKey: "especialidades_id_especialidad"});
  especialidades.hasMany(evaluadores_a_cargo, { as: "evaluadores_a_cargos", foreignKey: "especialidades_id_especialidad"});
  resultados.belongsTo(evaluaciones, { as: "evaluaciones_id_evaluacion_evaluacione", foreignKey: "evaluaciones_id_evaluacion"});
  evaluaciones.hasMany(resultados, { as: "resultados", foreignKey: "evaluaciones_id_evaluacion"});
  entrevistas.belongsTo(evaluadores_a_cargo, { as: "evaluadores_a_cargo_personas_id_evaluador_evaluadores_a_cargo", foreignKey: "evaluadores_a_cargo_personas_id_evaluador"});
  evaluadores_a_cargo.hasMany(entrevistas, { as: "entrevista", foreignKey: "evaluadores_a_cargo_personas_id_evaluador"});
  entrevistas.belongsTo(evaluadores_a_cargo, { as: "evaluadores_a_cargo_especialidades_id_especialidad_evaluadores_a_cargo", foreignKey: "evaluadores_a_cargo_especialidades_id_especialidad"});
  evaluadores_a_cargo.hasMany(entrevistas, { as: "evaluadores_a_cargo_especialidades_id_especialidad_entrevista", foreignKey: "evaluadores_a_cargo_especialidades_id_especialidad"});
  contactos.belongsTo(experiencias, { as: "experiencias_id_experiencia_experiencia", foreignKey: "experiencias_id_experiencia"});
  experiencias.hasMany(contactos, { as: "contactos", foreignKey: "experiencias_id_experiencia"});
  operaciones.belongsTo(modulos, { as: "modulos_id_modulos_modulo", foreignKey: "modulos_id_modulos"});
  modulos.hasMany(operaciones, { as: "operaciones", foreignKey: "modulos_id_modulos"});
  permisos.belongsTo(operaciones, { as: "operaciones_id_operaciones_operacione", foreignKey: "operaciones_id_operaciones"});
  operaciones.hasMany(permisos, { as: "permisos", foreignKey: "operaciones_id_operaciones"});
  provincias.belongsTo(paises, { as: "paises_id_pais_paise", foreignKey: "paises_id_pais"});
  paises.hasMany(provincias, { as: "provincia", foreignKey: "paises_id_pais"});
  contactos.belongsTo(personas, { as: "personas_id_persona_persona", foreignKey: "personas_id_persona"});
  personas.hasMany(contactos, { as: "contactos", foreignKey: "personas_id_persona"});
  entrevistas.belongsTo(personas, { as: "personas_id_candidato_persona", foreignKey: "personas_id_candidato"});
  personas.hasMany(entrevistas, { as: "entrevista", foreignKey: "personas_id_candidato"});
  evaluadores_a_cargo.belongsTo(personas, { as: "personas_id_evaluador_persona", foreignKey: "personas_id_evaluador"});
  personas.hasMany(evaluadores_a_cargo, { as: "evaluadores_a_cargos", foreignKey: "personas_id_evaluador"});
  experiencias.belongsTo(personas, { as: "personas_id_persona_persona", foreignKey: "personas_id_persona"});
  personas.hasMany(experiencias, { as: "experiencia", foreignKey: "personas_id_persona"});
  usuarios.belongsTo(personas, { as: "personas_id_evaluador_persona", foreignKey: "personas_id_evaluador"});
  personas.hasMany(usuarios, { as: "usuarios", foreignKey: "personas_id_evaluador"});
  ciudades.belongsTo(provincias, { as: "provincias_id_provincia_provincia", foreignKey: "provincias_id_provincia"});
  provincias.hasMany(ciudades, { as: "ciudades", foreignKey: "provincias_id_provincia"});
  permisos.belongsTo(roles, { as: "roles_id_roles_role", foreignKey: "roles_id_roles"});
  roles.hasMany(permisos, { as: "permisos", foreignKey: "roles_id_roles"});
  usuarios.belongsTo(roles, { as: "roles_id_roles_role", foreignKey: "roles_id_roles"});
  roles.hasMany(usuarios, { as: "usuarios", foreignKey: "roles_id_roles"});
  especialidades.belongsTo(sector, { as: "sector_id_sector_sector", foreignKey: "sector_id_sector"});
  sector.hasMany(especialidades, { as: "especialidades", foreignKey: "sector_id_sector"});
  entrevistas.belongsTo(vacantes, { as: "vacantes_id_vacante_vacante", foreignKey: "vacantes_id_vacante"});
  vacantes.hasMany(entrevistas, { as: "entrevista", foreignKey: "vacantes_id_vacante"});
  requerimientos.belongsTo(vacantes, { as: "id_vacante_vacante", foreignKey: "id_vacante"});
  vacantes.hasMany(requerimientos, { as: "requerimientos", foreignKey: "id_vacante"});

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
