import MovieList from '../components/MovieList';

function Home({ movies, setMovies }) {
  return (
    <>
      <div className='bg-img'>
        <h1>
          MovieMagicDatabase has it all. But you can still <span>add</span> to
          it.
        </h1>
      </div>
      <h2>All Movies</h2>
      <MovieList movies={movies} setMovies={setMovies} />
    </>
  );
}

export default Home;
