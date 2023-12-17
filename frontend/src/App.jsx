import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MoviesContext } from './context/Context';
import './App.scss';

import Home from './pages/Home';
import Detailpage from './pages/Detailpage';
import Favorites from './pages/Favorites';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const res = await fetch(`${import.meta.env.VITE_BACKENDURL}/api/movies`);
    if (res.ok) {
      const data = await res.json();
      setMovies(data);
    }
  }

  useEffect(() => {
    fetchFavorites();
  }, []);

  async function fetchFavorites() {
    const res = await fetch(`${import.meta.env.VITE_BACKENDURL}/api/favorites`);
    if (res.ok) {
      const data = await res.json();
      setFavorites(data);
    }
  }

  console.log({ favorites });
  console.log({ movies });

  return (
    <>
      <MoviesContext.Provider value={{ movies }}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/' element={<Home setMovies={setMovies} />} />
            <Route
              path='/movie/:id'
              element={
                <Detailpage
                  favorites={favorites}
                  setFavorites={setFavorites}
                  fetchFavorites={fetchFavorites}
                  fetchData={fetchData}
                  // addFavorite={addFavorite}
                  // deleteFavorite={deleteFavorite}
                />
              }
            />
            <Route
              path='/favorites'
              element={
                <Favorites
                  favorites={favorites}
                  setFavorites={setFavorites}
                  fetchFavorites={fetchFavorites}
                  // addFavorite={addFavorite}
                  // deleteFavorite={deleteFavorite}
                />
              }
            />
          </Routes>
          <Footer />
        </BrowserRouter>
      </MoviesContext.Provider>
    </>
  );
}

export default App;
