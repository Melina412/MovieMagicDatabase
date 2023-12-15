import { Link } from 'react-router-dom';

function MovieItem({ movie, page }) {
  return (
    <article className='movie-item'>
      <Link to={`/movie/${movie._id}`}>
        <div className='img-container'>
          <img src={movie.movieImage} alt='movie poster' />
        </div>
        <div className='text'>
          <p className='title'>{movie.movieTitle}</p>
        </div>
      </Link>
      <button style={{ display: page === 'favorites' ? 'block' : 'none' }}>
        Remove from Favorites
      </button>
    </article>
  );
}

export default MovieItem;
