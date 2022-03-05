const { Client } = require('elasticsearch');

const client = new Client({
  host: 'es-conteiner:9200'
});

module.exports = client;
