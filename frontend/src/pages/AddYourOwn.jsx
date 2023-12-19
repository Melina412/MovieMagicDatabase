import Add from '../components/Add';
import { useState } from 'react';

function AddYourOwn({ fetchData }) {
  const [added, setAdded] = useState(false);
  return (
    <>
      <main className='add-your-own'>
        <h1>Add your own movies</h1>
        <Add setAdded={setAdded} fetchData={fetchData} />
        {added && (
          <div className='edit-message'>
            <p>Movie was successfully edited!</p>
          </div>
        )}
      </main>
    </>
  );
}

export default AddYourOwn;
