import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { REMOVE_HAIKU, UPDATE_HAIKU_LIKE } from '../../utils/mutations';
import { QUERY_HAIKUS, QUERY_ME } from '../../utils/queries';
import Auth from '../../utils/auth';

const HaikuList = ({
  haikus,
  title,
  showTitle = true,
  showUsername = true,
}) => {

  const [updateHaikuLike, { error }] = useMutation(UPDATE_HAIKU_LIKE);
  const [removeHaiku, { err }] = useMutation
    (REMOVE_HAIKU, {
      refetchQueries: [
        QUERY_HAIKUS,
        'getHaikus',
        QUERY_ME,
        'me'
      ]
    });

  const handleLikeClick = async (event) => {
    try {
      const { data } = await updateHaikuLike({
        variables: {
          haikuId: event.target.id,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemove = async (event) => {
    try {
      const { data } = await removeHaiku({
        variables: {
          haikuId: event.target.id,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (!haikus.length) {
    return <h3>No Haikus Yet</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {haikus &&
        haikus.map((haiku) => (
          <div key={haiku._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showUsername ? (
                <>
                  <Link
                    className="text-light"
                    to={`/profiles/${haiku.haikuAuthor}`}
                  >
                    {haiku.haikuAuthor} <br />
                  </Link>
                  <span style={{ fontSize: '1rem' }}>
                    created this haiku on {haiku.createdAt}
                  </span>
                </>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    created this haiku on {haiku.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{haiku.haikuText}</p>
            </div>
            <div>
              Likes: {haiku.likes != null ? haiku.likes.length : ""}
              {Auth.loggedIn() ? (<button id={haiku._id} type="button" onClick={handleLikeClick}>Like</button>) : ""}
              {Auth.loggedIn() && Auth.getProfile().data.username === haiku.haikuAuthor ? (<button id={haiku._id} type="button" onClick={handleRemove}>Remove</button>) : ""}
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/haikus/${haiku._id}`}
            >
              Join the discussion on this haiku.
            </Link>
          </div>
        ))
      }
    </div >
  );
};

export default HaikuList;
