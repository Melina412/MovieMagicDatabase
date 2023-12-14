import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB);

// verbinden mit mongo shell (analog 'mongosh')
await client.connect();

// dbo database object
export const dbo = client.db(process.env.DBNAME);
