import { dbo } from '../utils/database.js';
import { ObjectId } from 'mongodb';

//$ getMovies - alle Filme fetchen

export async function getMovies(req, res) {
  try {
    const db_response = await dbo.collection('movies').find().toArray();
    // console.log(db_response[0]);
    res.json(db_response);
  } catch (error) {
    console.log('entry not found', error);
    res.status(500).end();
  }
  res.end();
}

//$ editMovie - einen Film bearbeiten

export async function editMovie(req, res) {
  console.log('req body:', req.body.ID, req.body.ITEM);
  const query = { _id: new ObjectId(req.body.ID) };
  const item = req.body.ITEM;

  try {
    const db_response = await dbo.collection('movies').findOne(query);

    if (db_response) {
      const UpdateResult = await dbo.collection('movies').updateOne(query, {
        $set: {
          movieTitle: item.movieTitle,
          movieReleaseYear: item.movieReleaseYear,
          movieGenre: item.movieGenre,
          movieRating: item.movieRating,
          movieImage: item.movieImage,
          moviePlot: item.moviePlot,
        },
      });

      if (UpdateResult.modifiedCount > 0) {
        console.log(item.movieTitle, ' was edited in database');
        res.status(201).end();
      }
    } else {
      res.status(404).end();
    }
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

//$ addMovie - einen Film hinzufügen

export async function addMovie(req, res) {
  console.log('req body:', req.body);
  const query = req.body;

  try {
    const db_response = await dbo.collection('movies').insertOne(query);

    if (db_response.acknowledged) {
      console.log(req.body.movieTitle, 'added to movies collection');
      res.status(201).end();
    } else {
      res.status(500).end();
    }
  } catch (error) {
    console.log('error while adding new movie:', error);
    res.status(500).end();
  }
}
