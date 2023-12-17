import { useState, useEffect } from 'react';
import MovieList from '../components/MovieList';

function Favorites({
  favorites,
  setFavorites,
  addFavorite,
  deleteFavorite,
  fetchData,
  fetchFavorites,
}) {
  console.log('favorites from fav page:', favorites);
  return (
    <>
      <h2>My Favorites</h2>
      <MovieList
        movies={favorites}
        favorites={favorites}
        setFavorites={setFavorites}
        page='favorites'
        fetchFavorites={fetchFavorites}
        fetchData={fetchData}
      />
    </>
  );
}

export default Favorites;
