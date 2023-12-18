import { useParams, Link } from 'react-router-dom';
import { MoviesContext } from '../context/Context';
import { useContext, useEffect, useState } from 'react';
import ScrollToTop from '../components/ScrollToTop';

function Detailpage({
  favorites,
  fetchData,
  fetchFavorites,
  // addFavorite,
  // deleteFavorite,
}) {
  const { movies } = useContext(MoviesContext);
  // console.log('movies detailpage:', movies);

  const { id } = useParams();
  const movie = movies?.find((movie) => movie._id === id);
  console.log({ movie });

  const genres = movie?.movieGenre.map((genre) => genre.text);
  const [isFavorite, setIsFavorite] = useState(movie?.favorite);

  useEffect(() => {
    setIsFavorite(movie?.favorite);
    console.log('favorite staus wurde aktualisiert:', isFavorite);
  }, [isFavorite, favorites, movies]);
  // der useEffect muss von diesen drei states abhängig sein!

  console.log(
    'favorite status von ' + movie?.movieTitle + ' ist: ' + isFavorite
  );
  console.log({ genres });

  const duration = (s) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);

    const runtime = `${h.toString()}h ${m.toString().padStart(2, '0')}min`;

    return runtime;
  };

  const runtimeHours = duration(movie?.movieRuntime);

  async function addFavorite() {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKENDURL}/api/favorites`,
        {
          method: 'POST',
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
        console.log(movie.movieTitle, 'was added to favorites');
        fetchData();
        fetchFavorites();
      } else {
        console.log('error');
      }
    } catch (error) {
      console.log('fetch error:', error);
    }
  }

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
        fetchData();
        fetchFavorites();
      } else {
        console.log('error');
      }
    } catch (error) {
      console.log('fetch error:', error);
    }
  }

  // es gab beim aktualisieren der detailseite immer viele error weil nie auf movie.xxx zugegriffen werden konnte
  // lösung: bei jedem einzelnen aufruf movie?.xxx schreiben
  return (
    <>
      <main>
        <ScrollToTop />
        <section className='detailpage'>
          <h1>{movie?.movieTitle}</h1>
          <div>
            <p>{movie?.movieReleaseYear}</p>
          </div>
          <div className='button-wrapper'>
            {isFavorite ? (
              <div className='add-delete'>
                <img src='/img/remove-fav.svg' alt='delete logo' />
                <button className='fav remove-fav' onClick={deleteFavorite}>
                  Remove from Favorites
                </button>
              </div>
            ) : (
              <div className='add-delete'>
                <img src='/img/add-fav.svg' alt='add logo' />
                <button className='fav add-fav' onClick={addFavorite}>
                  Add to Favorites
                </button>
              </div>
            )}
            <button className='edit'>Edit movie</button>
          </div>
          <article>
            <div className='image'>
              <img src={movie?.movieImage} alt='movie poster' />
            </div>
            <div className='text'>
              <div className='genres'>
                {genres?.map((genre, key) => (
                  <p className='genre' key={key}>
                    {genre}
                  </p>
                ))}
              </div>
              <h2>Story</h2>
              <p className='plot'>{movie?.moviePlot}</p>

              <div className='stats'>
                <p>
                  Rating: <span>{movie?.movieRating}</span>
                </p>
                <p>
                  Runtime: <span>{runtimeHours}</span>
                </p>
              </div>
            </div>
          </article>
        </section>
      </main>
    </>
  );
}

export default Detailpage;
