import { dbo } from '../utils/database.js';

export async function getMovies(req, res) {
  try {
    const db_response = await dbo
      .collection('movieDetails')
      .find({ director: 'Steven Spielberg' })
      .project({
        title: 1,
        year: 1,
        rated: 1,
        runtime: 1,
        countries: 1,
        director: 1,
        genres: 1,
        actors: 1,
        plot: 1,
        'imdb.rating': 1,
      })
      .toArray();
    console.log(db_response);
    res.json(db_response);
  } catch (error) {
    console.log('entry not found', error);
    res.status(500).end();
  }
  res.end();
}
