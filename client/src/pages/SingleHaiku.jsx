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
          THIS HAIKU WAS CREATED ON {haiku.createdAt}
        </span>
      </h3>
      <div className="bg-light py-4">
        <blockquote
          className="p-4 relative flex items-center bg-gray-200 rounded-lg"
          style={{
            fontSize: '1.5rem',
            fontStyle: 'italic',
            lineHeight: '1.5',
          }}
        >
          
          {haiku.haikuText}
          {Auth.loggedIn() && Auth.getProfile().data.username === haiku.haikuAuthor ? (<i id={haiku._id} type="button" onClick={handleRemove} class="fa-solid fa-circle-xmark absolute right-6 "></i>) : ""}
        </blockquote>
        <div>
        {Auth.loggedIn() ? (<i id={haiku._id} type="button" onClick={handleLikeClick} class="fa-solid fa-thumbs-up mr-2"></i>) : ""}
         {haiku.likes.length}
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
