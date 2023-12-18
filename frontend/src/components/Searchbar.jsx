import { useState, useContext, useEffect } from 'react';
import { MoviesContext } from '../context/Context';

function Searchbar() {
  const { movies, movieOutput, setMovieOutput } = useContext(MoviesContext);
  const [searchTitle, setSearchTitle] = useState('');

  useEffect(() => {
    console.log({ searchTitle });
    setMovieOutput((prev) => {
      if (!searchTitle) {
        return [...movies];
      }
      console.log(prev);
      return [
        ...movies.filter((element) =>
          element.movieTitle.toLowerCase().includes(searchTitle.toLowerCase())
        ),
      ];
    });
  }, [searchTitle, movies]);
  console.log({ movieOutput });

  return (
    <section className='searchbar'>
      <input
        type='text'
        placeholder='search movie title'
        onChange={(e) => setSearchTitle(e.target.value)}
      />
      <button>Submit</button>
    </section>
  );
}

export default Searchbar;
