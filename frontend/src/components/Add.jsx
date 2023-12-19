import { useRef } from 'react';

function Add({ fetchData, setAdded }) {
  const titleRef = useRef();
  const yearRef = useRef();
  const genreRef = useRef();
  const ratingRef = useRef();
  const imgRef = useRef();
  const plotRef = useRef();

  async function addItem() {
    const item = {
      movieTitle: titleRef.current.value,
      movieReleaseYear: yearRef.current.value,
      movieGenre: genreRef.current.value
        .split(',')
        .map((genre) => ({ text: genre.trim() })),
      // .trim() entfernt spaces vor/nach dem string also ist es egal ob der user welche eingibt
      movieRating: ratingRef.current.value,
      movieImage: imgRef.current.value,
      moviePlot: plotRef.current.value,
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKENDURL}/api/movies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });
      if (res.ok) {
        console.log(titleRef.current.value, 'was created and saved');
        console.log('test ok -------------------------');
        fetchData();
        setAdded(true);
      } else {
        console.log('res error');
      }
    } catch (error) {
      console.log('fetch error:', error);
    }
  }
  // * input von runtime fehlt noch
  return (
    <section className='add-movie'>
      <article>
        <input ref={titleRef} type='text' placeholder='Title' />
        <input ref={yearRef} type='number' placeholder='Year' />
        <input
          ref={genreRef}
          type='text'
          placeholder='Genres (Drama, Thriller, etc.)'
        />
        <input ref={ratingRef} type='number' placeholder='Rate' />
        <input ref={imgRef} type='url' placeholder='URL for movie poster' />
        <textarea
          ref={plotRef}
          name=''
          id=''
          cols='20'
          rows='5'
          placeholder='Description & Plot'
        ></textarea>
        <input type='button' id='add-btn' value='Add' onClick={addItem} />
      </article>
    </section>
  );
}

export default Add;
