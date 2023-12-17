import { Link } from 'react-router-dom';
import { MoviesContext } from '../context/Context';
import { useContext, useEffect, useState } from 'react';

function MovieItem({ movie, favorites, page, deleteFavorite, fetchFavorites }) {
  const { movies } = useContext(MoviesContext);
  const [isFavorite, setIsFavorite] = useState(movie?.favorite);

  useEffect(() => {
    setIsFavorite(movie?.favorite);
    console.log('favorite staus wurde aktualisiert:', isFavorite);
  }, [isFavorite, favorites, movies]);
  // der useEffect muss von diesen drei states abhängig sein!

  async function deleteFavorite() {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKENDURL}/api/favorites`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ID: movie._id,
            title: movie.movieTitle,
          }),
        }
      );
      if (res.ok) {
        console.log(movie.movieTitle, 'was deleted from favorites');
        fetchFavorites();
      } else {
        console.log('error');
      }
    } catch (error) {
      console.log('fetch error:', error);
    }
  }

  return (
    <article className='movie-item'>
      <Link to={`/movie/${movie._id}`} title='show movie details'>
        <div className='img-container'>
          <img src={movie.movieImage} alt='movie poster' />
        </div>
        <div className='text'>
          <p className='title'>{movie.movieTitle}</p>
        </div>
      </Link>
      <button
        style={{ display: page === 'favorites' ? 'block' : 'none' }}
        onClick={deleteFavorite}
      >
        Remove from Favorites
      </button>
    </article>
  );
}

export default MovieItem;
