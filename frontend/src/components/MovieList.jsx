import MovieItem from './MovieItem';
// die List darf nicht die movies aus dem context bekommen weil sie von Favorites andere props als movies bekommt als die Homepage

function MovieList({
  movies,
  setMovies,
  page,
  addFavorite,
  deleteFavorite,
  fetchData,
  fetchFavorites,
}) {
  return (
    <section className='movie-list'>
      {movies?.map((movie, key) => (
        <MovieItem
          movie={movie}
          setMovies={setMovies}
          key={movie._id}
          page={page}
          addFavorite={addFavorite}
          deleteFavorite={deleteFavorite}
          fetchFavorites={fetchFavorites}
          fetchData={fetchData}
        />
      ))}
    </section>
  );
}

export default MovieList;
