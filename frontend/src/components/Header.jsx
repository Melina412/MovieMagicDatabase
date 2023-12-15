import Searchbar from './Searchbar';
import { Link } from 'react-router-dom';

function Header() {
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
      <Searchbar />
      <div>add your own</div>
    </header>
  );
}

export default Header;
