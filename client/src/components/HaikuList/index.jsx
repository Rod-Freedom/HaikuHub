import { Link } from 'react-router-dom';

const HaikuList = ({
  haikus,
  title,
  showTitle = true,
  showUsername = true,
}) => {
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
                <Link
                  className="text-light"
                  to={`/profiles/${haiku.haikuAuthor}`}
                >
                  {haiku.haikuAuthor} <br />
                  <span style={{ fontSize: '1rem' }}>
                    had this haiku on {haiku.createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    You had this haiku on {haiku.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{haiku.haikuText}</p>
            </div>
            <div>
              Likes: {haiku.likes != null ? haiku.likes.length : ""}
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/haikus/${haiku._id}`}
            >
              Join the discussion on this haiku.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default HaikuList;
