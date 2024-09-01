import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="bg-white flex shadow h-min text-light mb-4 flex-row align-center justify-center w-full">
      <div className="w-full px-10 flex flex-row justify-between align-center">
        <div className="flex flex-initial">
          <Link className="text-light" to="/">
            <img src={logo} width={350} />
          </Link>
        </div>
        <div className='flex flex-end items-center'>
          {Auth.loggedIn() ? (
            <>
              <Link className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" to="/me">
                {Auth.getProfile().data.username}'s profile
              </Link>
              <button className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" to="/login">
                Login
              </Link>
              <Link className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
