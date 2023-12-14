import MovieList from '../components/MovieList';

function Home() {
  return (
    <>
      <div className='bg-img'>
        <h1>
          MovieMagicDatabase has it all. But you can still <span>add</span> to
          it.
        </h1>
      </div>
      <MovieList />
    </>
  );
}

export default Home;
