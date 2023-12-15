import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';

import Home from './pages/Home';
import Detailpage from './pages/Detailpage';
import Favorites from './pages/Favorites';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const res = await fetch(`${import.meta.env.VITE_BACKENDURL}/api/movies`);
    // const res = await fetch(`http://localhost:9999/api/movies`);
    if (res.ok) {
      const data = await res.json();
      setMovies(data);
    }
  }

  console.log({ movies });
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path='/'
            element={<Home movies={movies} setMovies={setMovies} />}
          />
          <Route path='/movie/:id' element={<Detailpage movies={movies} />} />
          <Route path='/favorites' element={<Favorites />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
