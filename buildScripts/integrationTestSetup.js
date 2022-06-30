require('@babel/register'); // this file is not being transpiled
const { MongoClient } = require('mongodb');
const assert = require('assert');
const dataToInsert = require('../DB/MongoDB/cleanning_supplies_testing/importTestingDataBase_v1.01');

process.env.NODE_ENV = 'testing';

const url = 'mongodb://localhost:27017';
const dbName = 'cleanning_supplies_testing';

MongoClient.connect(url, (err, client) => {
  assert.strictEqual(null, err);

  const db = client.db(dbName);
  const articles = db.collection('articles');
  articles.deleteMany({});
  articles.insertMany(dataToInsert.articles);

  const customers = db.collection('customers');
  customers.deleteMany({});
  customers.insertMany(dataToInsert.customers);

  client.close();
});
