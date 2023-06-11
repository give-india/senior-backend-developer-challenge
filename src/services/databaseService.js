const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const dbName = 'bank';

const getDb = async () => {
  const client = new MongoClient(uri);
  await client.connect();
  return client.db(dbName);
};

module.exports = {
  getDb,
};
