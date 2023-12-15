import { ObjectId } from 'mongodb';
import { dbo } from '../utils/database.js';

export async function getFavorites(req, res) {
  try {
    const db_response = await dbo.collection('favoriteMovies').find().toArray();
    console.log(db_response);
    res.json(db_response);
  } catch (error) {
    console.log('entry not found', error);
    res.status(500).end();
  }
  res.end();
}

export async function setFavorite(req, res) {
  const query = { movieTitle: 'Ben Hur' };

  try {
    const db_response = await dbo.collection('movies').findOne(query);
    // findOne returnt entweder das gefundene doc oder null, deswegen kann man nicht prüfen ob acknowledged true ist!

    if (db_response) {
      const InsertOneResult = await dbo
        .collection('favoriteMovies')
        .insertOne(db_response);
      // insertOne returnt ein InserOneResult-object das die property acknowledged (boolean) besitzt.

      const UpdateResult1 = await dbo
        .collection('movies')
        .updateOne(query, { $set: { favorite: true } });

      const UpdateResult2 = await dbo
        .collection('favoriteMovies')
        .updateOne(query, { $set: { favorite: true } });

      // updateOne returnt ein UpdateResult-object das diverse properties besitzt, u.a. modifiedCount & auch acknowledged.

      if (!InsertOneResult.acknowledged) {
        console.log('Insertion failed');
        res.status(500).json({ error: 'Insertion failed' });
      } else if (UpdateResult1.modifiedCount <= 0) {
        console.log('Update in the first collection failed');
        res
          .status(500)
          .json({ error: 'Update in the first collection failed' });
      } else if (UpdateResult2.modifiedCount <= 0) {
        console.log('Update in the second collection failed');
        res
          .status(500)
          .json({ error: 'Update in the second collection failed' });
      } else {
        console.log(query, 'added to favorites');
        res.status(201).end();
      }
    } else {
      res.status(404).end();
    }
    // hier bekomme ich manchmal den status 500 und wusste nicht welche Bedingung das Problem war
    // deshalb prüfe ich alle results einzeln
  } catch (error) {
    console.log('error while adding favorite:', error);
    res.status(500).end();
  }
}

export async function deleteFavorite(req, res) {
  const query = { movieTitle: 'Hachi' };

  const UpdateResult = await dbo
    .collection('movies')
    .updateOne(query, { $set: { favorite: false } });

  try {
    const DeleteResult = await dbo
      .collection('favoriteMovies')
      .deleteOne(query);

    if (DeleteResult.acknowledged && UpdateResult.modifiedCount > 0) {
      console.log(query, 'deleted from favorites');
      res.status(204).end();
    }
  } catch (error) {
    console.log('entry not found', error);
    res.status(500).end();
  }
}
