import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MoviesContext } from './context/Context';
import './App.scss';

import Home from './pages/Home';
import Detailpage from './pages/Detailpage';
import Favorites from './pages/Favorites';
import Header from './components/Header';
import Footer from './components/Footer';
import AddYourOwn from './pages/AddYourOwn';

function App() {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchTitle, setSearchTitle] = useState('');
  const [movieOutput, setMovieOutput] = useState([...movies]);

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
      <MoviesContext.Provider
        value={{ movies, setMovies, movieOutput, setMovieOutput }}
      >
        <BrowserRouter>
          <Header searchTitle={searchTitle} setSearchTitle={setSearchTitle} />
          <Routes>
            <Route
              path='/'
              element={
                <Home
                  searchTitle={searchTitle}
                  setSearchTitle={setSearchTitle}
                />
              }
            />
            <Route
              path='/movie/:id'
              element={
                <Detailpage
                  favorites={favorites}
                  setFavorites={setFavorites}
                  fetchFavorites={fetchFavorites}
                  fetchData={fetchData}
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
                />
              }
            />
            <Route
              path='/add-movie'
              element={<AddYourOwn fetchData={fetchData} />}
            />
          </Routes>
          <Footer />
        </BrowserRouter>
      </MoviesContext.Provider>
    </>
  );
}

export default App;
