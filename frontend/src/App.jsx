import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';

import Home from './pages/Home';
import Detailpage from './pages/Detailpage';
import Favorites from './pages/Favorites';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/movie/:id' element={<Detailpage />} />
          <Route path='/favorites' element={<Favorites />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
