import { useState, useEffect } from 'react';
import MovieList from '../components/MovieList';

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  async function fetchFavorites() {
    const res = await fetch(`${import.meta.env.VITE_BACKENDURL}/api/favorites`);
    if (res.ok) {
      const data = await res.json();
      setFavorites(data);
    }
  }

  console.log({ favorites });
  return (
    <>
      <h2>My Favorites</h2>
      <MovieList movies={favorites} page='favorites' />
    </>
  );
}

export default Favorites;
