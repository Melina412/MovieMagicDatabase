import Searchbar from './Searchbar';

function Header() {
  return (
    <header>
      <div className='logo-wrapper'>
        <p>MMDb</p>
        <img src='img/star.svg' alt='star' />
      </div>
      <Searchbar />
      <div>add your own</div>
    </header>
  );
}

export default Header;
