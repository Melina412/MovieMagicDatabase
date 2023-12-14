import { ObjectId } from 'mongodb';
import { dbo } from '../utils/database.js';

export async function getFavorites(req, res) {
  try {
    const db_response = await dbo
      .collection('favoriteMovies')
      .find()
      .project({ title: 1, favorite: 1 })
      .toArray();
    console.log(db_response);
    res.json(db_response);
  } catch (error) {
    console.log('entry not found', error);
    res.status(500).end();
  }
  res.end();
}

export async function setFavorite(req, res) {
  const query = { title: 'Punch-Drunk Love' };

  try {
    const db_response = await dbo.collection('movieDetails').findOne(query);
    console.log(db_response);
    // findOne returnt entweder das gefundene doc oder null, deswegen kann man nicht prüfen ob acknowledged true ist!

    if (db_response) {
      const InsertOneResult = await dbo
        .collection('favoriteMovies')
        .insertOne(db_response);
      // insertOne returnt ein InserOneResult-object das die property acknowledged (boolean) besitzt.

      const UpdateResult = await dbo
        .collection('favoriteMovies')
        .updateOne(query, { $set: { favorite: true } });
      // updateOne returnt ein UpdateResult-object das diverse properties besitzt, u.a. modifiedCount & auch acknowledged.

      if (InsertOneResult.acknowledged && UpdateResult.modifiedCount > 0) {
        res.status(201).end();
      } else {
        console.log('db res not ok');
        res.status(500).end();
      }
    } else {
      res.status(404).end();
    }
  } catch (error) {
    console.log('error while adding favorite:', error);
    res.status(500).end();
  }
}

export async function deleteFavorite(req, res) {
  const query = { title: 'Star Trek' };

  try {
    const DeleteResult = await dbo
      .collection('favoriteMovies')
      .deleteOne(query);

    if (DeleteResult.acknowledged) {
      console.log(query, 'deleted from favorites');
      res.status(204).end();
    }
  } catch (error) {
    console.log('entry not found', error);
    res.status(500).end();
  }
}
