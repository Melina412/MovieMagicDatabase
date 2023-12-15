import MovieItem from './MovieItem';

function MovieList({ movies, setMovies, page }) {
  return (
    <section className='movie-list'>
      {movies?.map((movie, key) => (
        <MovieItem
          movie={movie}
          setMovies={setMovies}
          key={movie._id}
          page={page}
        />
      ))}
    </section>
  );
}

export default MovieList;
