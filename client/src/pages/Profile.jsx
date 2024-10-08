import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import HaikuForm from '../components/HaikuForm';
import HaikuList from '../components/HaikuList';

import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <div>
      <div className="flex flex-col justify-center mb-3">
        <h2 className="p-3 mb-5">
          Viewing {userParam ? `${user.username}'s` : 'your'} profile.
        </h2>

        <div className="mb-5">
          <HaikuList
            haikus={user.haikus}
            title={`${user.username}'s haikus...`}
            showTitle={false}
            showUsername={false}
          />
        </div>
        {!userParam && (
          <div
            className="mb-3 p-3 bg-slate-50 rounded-lg"
          >
            <HaikuForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
