// Import the `useParams()` hook
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

import { QUERY_SINGLE_HAIKU } from '../utils/queries';
import { useMutation } from '@apollo/client';
import { REMOVE_HAIKU, UPDATE_HAIKU_LIKE } from '../utils/mutations';
import Auth from '../utils/auth';

const SingleHaiku = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { haikuId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_HAIKU, {
    // pass URL parameter
    variables: { haikuId: haikuId },
  });

  const haiku = data?.haiku || {};

  const [updateHaikuLike, { error }] = useMutation(UPDATE_HAIKU_LIKE);

  const [removeHaiku, { err }] = useMutation(REMOVE_HAIKU);

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
      window.location.href = "../me";
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="my-3">
      <h3 className="card-header bg-dark text-light p-2 m-0">
        <Link to={`/profiles/${haiku.haikuAuthor}`}>{haiku.haikuAuthor}</Link> <br />
        <span style={{ fontSize: '1rem' }}>
          THIS IS A HAIKU {haiku.createdAt}
        </span>
      </h3>
      <div className="bg-light py-4">
        <blockquote
          className="p-4"
          style={{
            fontSize: '1.5rem',
            fontStyle: 'italic',
            border: '2px dotted #1a1a1a',
            lineHeight: '1.5',
          }}
        >
          {haiku.haikuText}
        </blockquote>
        <div>
          Likes: {haiku.likes.length}
          {Auth.loggedIn() ? (<button id={haiku._id} type="button" onClick={handleLikeClick}>Like</button>) : ""}
          {Auth.loggedIn() && Auth.getProfile().data.username === haiku.haikuAuthor ? (<button id={haiku._id} type="button" onClick={handleRemove}>Remove</button>) : ""}
        </div>
      </div>

      <div className="my-5">
        <CommentList comments={haiku.comments} haikuId={haiku._id} haikuAuthor={haiku.haikuAuthor} />
      </div>
      <div className="m-3 p-4" style={{ border: '1px dotted #1a1a1a' }}>
        <CommentForm haikuId={haiku._id} />
      </div>
    </div>
  );
};

export default SingleHaiku;
