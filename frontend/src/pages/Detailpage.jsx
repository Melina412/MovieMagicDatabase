import { useParams, Link } from 'react-router-dom';

function Detailpage({ movies }) {
  const { id } = useParams();
  const movie = movies.find((movie) => movie._id === id);
  const genres = movie.movieGenre.map((genre) => genre.text);
  console.log({ genres });

  const duration = (s) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);

    const runtime = `${h.toString()}h ${m.toString().padStart(2, '0')}min`;

    return runtime;
  };

  const runtimeHours = duration(movie.movieRuntime);

  return (
    <>
      <main>
        <section className='detailpage'>
          <Link to={'/'}>back home</Link>
          <h1>{movie.movieTitle}</h1>
          <div>
            <p>{movie.movieReleaseYear}</p>
          </div>
          <div>
            <button>Add to Favorites</button>
            <button>Edit movie</button>
          </div>
          <article>
            <div className='image'>
              <img src={movie.movieImage} alt='movie poster' />
            </div>
            <div className='text'>
              <div className='genres'>
                {genres?.map((genre) => (
                  <p className='genre'>{genre}</p>
                ))}
              </div>
              <h2>Story</h2>
              <p className='plot'>{movie.moviePlot}</p>

              <div className='stats'>
                <p>
                  Rating: <span>{movie.movieRating}</span>
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
