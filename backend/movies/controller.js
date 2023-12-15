import { dbo } from '../utils/database.js';

export async function getMovies(req, res) {
  try {
    const db_response = await dbo
      .collection('movies')
      .find()
      .project({
        movieTitle: 1,
        movieReleaseYear: 1,
        movieImage: 1,
        moviePlot: 1,
        movieRating: 1,
        movieRuntime: 1,
        movieGenre: 1,
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
