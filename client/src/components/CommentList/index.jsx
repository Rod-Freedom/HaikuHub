import { useMutation } from '@apollo/client';
import { REMOVE_COMMENT, UPDATE_COMMENT_LIKE } from '../../utils/mutations';
import { QUERY_SINGLE_HAIKU } from '../../utils/queries';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';

const CommentList = ({ comments = [], haikuId, haikuAuthor }) => {

  const [updateCommentLike, { error }] = useMutation(UPDATE_COMMENT_LIKE);

  const [removeComment, { err }] = useMutation
    (REMOVE_COMMENT, {
      refetchQueries: [
        QUERY_SINGLE_HAIKU,
        'getSingleHaiku'
      ]
    });

  const handleLikeClick = async (event) => {
    try {
      const { data } = await updateCommentLike({
        variables: {
          haikuId,
          commentId: event.target.id,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemove = async (event) => {
    try {
      const { data } = await removeComment({
        variables: {
          haikuId,
          commentId: event.target.id
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (!comments.length) {
    return <h3>No Comments Yet</h3>;
  }

  return (
    <>
      <h3
        className="p-5 display-inline-block"
        style={{ borderBottom: '1px dotted #1a1a1a' }}
      >
        Comments
      </h3>
      <div className="flex-row my-4">
        {comments &&
          comments.map((comment) => (
            <div key={comment._id} className="col-12 mb-3 pb-3">
              <div className="p-3 bg-dark text-light">
                <h5 className="card-header">
                  <Link to={`/profiles/${comment.commentAuthor}`}>{comment.commentAuthor}</Link> commented{' '}
                  <span style={{ fontSize: '0.825rem' }}>
                    on {comment.createdAt}
                  </span>
                </h5>
                <p className="card-body">{comment.commentText}</p>
                <div>
                  Likes: {comment.likes.length}
                  {Auth.loggedIn() ? (<button id={comment._id} type="button" onClick={handleLikeClick}>Like</button>) : ""}
                  {Auth.loggedIn() && Auth.getProfile().data.username === comment.commentAuthor ? (<button id={comment._id} type="button" onClick={handleRemove}>Remove</button>) : ""}
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default CommentList;
