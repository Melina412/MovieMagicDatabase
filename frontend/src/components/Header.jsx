import Searchbar from './Searchbar';
import { Link } from 'react-router-dom';

function Header({ searchTitle, setSearchTitle }) {
  return (
    <header>
      <div className='logo-wrapper'>
        <Link to={'/'} title='Home'>
          <p>MMDb</p>
        </Link>
        <Link to={'/favorites'} title='My Favorites'>
          <img src='img/star.svg' alt='star' />
        </Link>
      </div>
      <Searchbar searchTitle={searchTitle} setSearchTitle={setSearchTitle} />

      <Link to={'/add-movie'} title='Add your own Movie'>
        <p className='add'>Add your own</p>
      </Link>
    </header>
  );
}

export default Header;
