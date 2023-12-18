import MovieList from '../components/MovieList';
import { MoviesContext } from '../context/Context';
import { useContext, useEffect, useState } from 'react';

function Home({ setMovies, searchTitle, setSearchTitle }) {
  const { movies, movieOutput, setMovieOutput } = useContext(MoviesContext);
  return (
    <>
      <div className='bg-img'>
        <h1>
          MovieMagicDatabase has it all. But you can still <span>add</span> to
          it.
        </h1>
      </div>
      <h2 className='home-h2'>All Movies</h2>
      <MovieList
        movies={movieOutput}
        setMovies={setMovies}
        page='home'
        searchTitle={searchTitle}
        setSearchTitle={setSearchTitle}
      />
    </>
  );
}

export default Home;
