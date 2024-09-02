import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";

import Auth from "../utils/auth";

const Login = (props) => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <main className="flex flex-row items-center justify-center px-6 py-8">
      <div className="w-full bg-white rounded-lg md:mt-0 sm:max-w-lg xl:p-0 dark:bg-black">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h4 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Sign in to your account</h4>
          <div>
            {data ? (
              <p>
                Success! You may now head{" "}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form className="items-center space-y-4 md:space-y-6" onSubmit={handleFormSubmit}>
                <div>
                  <label for="email" class="block my-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input
                  className="form-input"
                  placeholder="name@company.com"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                  class="rounded-lg w-full p-2 dark:bg-gray-800 dark:placeholder-gray-400 dark:text-white" 
                />
                <div className="mt-4">
                <label for="password" class="block my-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input
                  className="form-input"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                  class="bg-gray-50  text-gray-900 rounded-lg w-full p-2 dark:bg-gray-800 dark:placeholder-gray-400 dark:text-white mb-6"
                />
                </div>
                <button
                  className="bg-red-700 hover:bg-red-500 text-white py-2 px-4 rounded-lg w-full mt-4"
                  style={{ cursor: "pointer" }}
                  type="submit"
                >
                  Submit
                </button>
              </div>

              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don’t have an account yet? <a href="/signup" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                  </p>
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

export default Login;
