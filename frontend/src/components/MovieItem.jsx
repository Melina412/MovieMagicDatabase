import { Link } from 'react-router-dom';

function MovieItem({ movie }) {
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
    </article>
  );
}

export default MovieItem;
