import { useContext, useRef, useEffect, useState } from 'react';
import { MoviesContext } from '../context/Context';
import { useParams, Link } from 'react-router-dom';

function Edit({ movie, genres, fetchData, setEdited, setEditMode }) {
  //   const { movies } = useContext(MoviesContext);

  const titleRef = useRef();
  const yearRef = useRef();
  const genreRef = useRef();
  const ratingRef = useRef();
  const imgRef = useRef();
  const plotRef = useRef();

  async function editItem() {
    const item = {
      movieTitle: titleRef.current.value,
      movieReleaseYear: yearRef.current.value,
      movieGenre: genreRef.current.value
        .split(',')
        .map((genre) => ({ text: genre.trim() })),
      // .trim() entfernt Leerzeichen vor/nach dem string also ist es egal wie der user sie eingibt
      movieRating: ratingRef.current.value,
      movieImage: imgRef.current.value,
      moviePlot: plotRef.current.value,
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKENDURL}/api/movies`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ID: movie._id,
          ITEM: item,
        }),
      });
      if (res.ok) {
        console.log(titleRef.current.value, 'was edited and saved');
        console.log('test ok -------------------------');
        fetchData();
        setEdited(true);
        setEditMode(false);
      } else {
        console.log('res error');
      }
    } catch (error) {
      console.log('fetch error:', error);
    }
  }

  return (
    <section className='edit-movie'>
      <article>
        <input ref={titleRef} type='text' defaultValue={movie?.movieTitle} />
        <input
          ref={yearRef}
          type='number'
          defaultValue={movie?.movieReleaseYear}
        />
        <input ref={genreRef} type='text' defaultValue={genres?.join(', ')} />
        <input
          ref={ratingRef}
          type='number'
          defaultValue={movie?.movieRating}
        />
        <input ref={imgRef} type='url' defaultValue={movie?.movieImage} />
        <textarea
          ref={plotRef}
          name=''
          id=''
          cols='20'
          rows='5'
          defaultValue={movie?.moviePlot}
        ></textarea>
        <input
          type='button'
          id='submit-edit'
          value='Submit'
          onClick={editItem}
        />
      </article>
    </section>
  );
}

export default Edit;
