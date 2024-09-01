import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_HAIKU } from '../../utils/mutations';
import { QUERY_HAIKUS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const HaikuForm = () => {
  const [haikuText, setHaikuText] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

  const [addHaiku, { error }] = useMutation
  (ADD_HAIKU, {
    refetchQueries: [
      QUERY_HAIKUS,
      'getHaikus',
      QUERY_ME,
      'me'
    ]
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addHaiku({
        variables: {
          haikuText,
          haikuAuthor: Auth.getProfile().data.username,
        },
      });

      setHaikuText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'haikuText' && value.length <= 280) {
      setHaikuText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h2>GO AHEAD, SHARE A HAIKU WITH US!</h2>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
          </p>
          <form
            className="flex-row justify-center"
            onSubmit={handleFormSubmit}
          >
            <div className="w-full">
              <textarea
                name="haikuText"
                placeholder="Here's a new haiku..."
                value={haikuText}
                className="w-full"
                onChange={handleChange}
              ></textarea>
            </div>

            <div>
              <button className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" type="submit">
                Add Haiku
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your haikus. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default HaikuForm;
