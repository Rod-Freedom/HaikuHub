// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

import { QUERY_SINGLE_HAIKU } from '../utils/queries';

const SingleHaiku = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { haikuId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_HAIKU, {
    // pass URL parameter
    variables: { haikuId: haikuId },
  });

  const haiku = data?.haiku || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="my-3">
      <h3 className="card-header bg-dark text-light p-2 m-0">
        {haiku.haikuAuthor} <br />
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
      </div>

      <div className="my-5">
        <CommentList comments={haiku.comments} />
      </div>
      <div className="m-3 p-4" style={{ border: '1px dotted #1a1a1a' }}>
        <CommentForm haikuId={haiku._id} />
      </div>
    </div>
  );
};

export default SingleHaiku;
