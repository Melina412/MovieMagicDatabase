import { dbo } from '../utils/database.js';

export async function getMovies(req, res) {
  try {
    const db_response = await dbo.collection('movies').find().toArray();
    console.log(db_response);
    res.json(db_response);
  } catch (error) {
    console.log('entry not found', error);
    res.status(500).end();
  }
  res.end();
}
