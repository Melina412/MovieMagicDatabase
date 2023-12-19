import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer>
      <div className='wrapper'>
        <p>Imprint</p>

        <div className='slogan'>
          <p>Made with love in heart and popcorn in tummy. </p>
          <img src='img/heart.svg' alt='heart logo' />
        </div>
        <div className='logos'>
          <Link to={'https://www.youtube.com'} title='youtube'>
            <img src='img/youtube.svg' alt='youtube logo' />
          </Link>
          <Link to={''} title='lol du boomer'>
            <img src='img/facebook.svg' alt='facebook logo' />
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
