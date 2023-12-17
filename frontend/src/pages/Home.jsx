import MovieList from '../components/MovieList';
import { MoviesContext } from '../context/Context';
import { useContext, useEffect, useState } from 'react';

function Home({ setMovies }) {
  const { movies } = useContext(MoviesContext);
  return (
    <>
      <div className='bg-img'>
        <h1>
          MovieMagicDatabase has it all. But you can still <span>add</span> to
          it.
        </h1>
      </div>
      <h2>All Movies</h2>
      <MovieList movies={movies} setMovies={setMovies} page='home' />
    </>
  );
}

export default Home;
