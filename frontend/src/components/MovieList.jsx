import MovieItem from './MovieItem';

function MovieList({ movies, setMovies }) {
  return (
    <section className='movie-list'>
      {movies?.map((movie, key) => (
        <MovieItem movie={movie} setMovies={setMovies} key={movie._id} />
      ))}
    </section>
  );
}

export default MovieList;
