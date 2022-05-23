const client = require('./elasticsearch');
const { Servicio } = require('../models/index');

const onCreateServicios = async () => {
  try {
    await client.indices.delete({ index: 'servicios' });
  } finally {
    await client.indices.create({ 
      index: 'servicios',
      body: {
        settings: {
          analysis: {
            filter: {
              my_stop: {
                type: 'stop',
                stopwords: ['_spanish_']
              },
              my_stemmer: {
                type: 'stemmer',
                language: 'light_spanish'
              },
              my_synonyms: {
                type: 'synonym_graph',
                synonyms: [
                  'perro, dog',
                  'mascota, animal',
                ]
              },
            },
            analyzer: {
              my_analyzer: {
                type: 'custom',
                tokenizer: 'standard',
                language: 'spanish',
                filter: ['lowercase', 'my_stop', 'my_stemmer', 'my_synonyms'],
              }
            }
          }
        },
        mappings: {
          properties: {
            titulo: {
              type: 'text',
              analyzer: 'my_analyzer',
              search_analyzer: 'my_analyzer'
            },
            descripcion: {
              type: 'text',
              analyzer: 'my_analyzer',
              search_analyzer: 'my_analyzer'
            },
          }
        }
      }
    });
  
    const servicios = await Servicio.find();
    servicios.forEach(servicio => {
      client.index({
        index: 'servicios',
        id: servicio._id.toString(),
        body: {
          titulo: servicio.titulo,
          descripcion: servicio.descripcion,
          precio: {
            valor: Number.isInteger(servicio.precio.valor) ? servicio.precio.valor + ".0" : servicio.precio.valor.toString(),
            idMoneda: servicio.precio.idMoneda,
          },
          ubicacion: servicio.ubicacion,
          fechaHoraPublicacion: servicio.fechaHoraPublicacion,
          idCategoria: servicio.idCategoria,
          idUsuario: servicio.idUsuario,
        },
      });
    });
  }
}

onCreateServicios();
