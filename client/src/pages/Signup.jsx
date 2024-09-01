import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="flex-row items-center justify-center  px-6 py-8">
      <div className="w-full bg-white rounded-lg md:mt-0 sm:max-w-lg xl:p-0 dark:bg-black">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h4 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Sign Up</h4>
          <div>
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form className="space-y-4 md:space-y-6" onSubmit={handleFormSubmit}>
                <div>
                  <label for="email" class="block my-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
                  <input
                    className="form-input"
                    placeholder="CherryBlossom1"
                    name="username"
                    type="text"
                    value={formState.name}
                    onChange={handleChange}
                    class="rounded-lg block w-full p-2.5 dark:bg-gray-800 dark:placeholder-gray-400 dark:text-white" 
                  />
                </div>
                <div className="mt-4">
                <label for="password" class="block my-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input
                  className="form-input"
                  placeholder="name@company.com"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                  class="rounded-lg block w-full p-2.5 dark:bg-gray-800 dark:placeholder-gray-400 dark:text-white" 
                />
                </div>
                <div className="mt-4">
                <label for="password" class="block my-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                <input
                  className="form-input"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                  class="rounded-lg block w-full p-2.5 dark:bg-gray-800 dark:placeholder-gray-400 dark:text-white" 
                />
                </div>
                <button
                  className="bg-red-700 hover:bg-red-500 text-white py-2 px-4 rounded w-full"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Submit
                </button>
              </form>
            )}

            {error && (
              <div className="my-3 p-3 bg-gray-500 rounded-lg text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;
