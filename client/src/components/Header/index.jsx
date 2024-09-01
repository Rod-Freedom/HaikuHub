import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="bg-white flex shadow h-min text-light mb-4 flex-row align-center w-full">
      <div className="container flex flex-row justify-between align-center">
        <div className="flex flex-initial">
          <Link className="text-light" to="/">
            <img src="src/assets/logo.png" width={350} />
          </Link>
        </div>
        <div className='flex flex-end items-center'>
          {Auth.loggedIn() ? (
            <>
              <Link className="btn btn-lg btn-info m-2" to="/me">
                {Auth.getProfile().data.username}'s profile
              </Link>
              <button className="btn btn-lg btn-light m-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button className="bg-red-700 hover:bg-red-500 text-white font-bold py-2 px-4 mx-4 rounded" to="/login">
                Login
              </button>
              <button className="bg-red-700 hover:bg-red-500 text-white font-bold py-2 px-4 rounded" to="/signup">
                Signup
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
