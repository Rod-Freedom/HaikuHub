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
      if (!Auth.loggedIn()) return window.location.replace('/login');
      
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
    <section>
     {showTitle && <h3>{title}</h3>}
    <div class="flex flex-wrap ">
      {haikus &&
        haikus.map((haiku) => (
    <div class="p-4 w-full lg:w-1/2 flex-grow">
      
        <div key={haiku._id} class="flex rounded-lg h-full dark:bg-gray-200 bg-teal-400 p-8 flex-col relative">
        {Auth.loggedIn() && Auth.getProfile().data.username === haiku.haikuAuthor ? (<i id={haiku._id} type="button" onClick={handleRemove} class="fa-solid fa-circle-xmark absolute top-1 right-3"></i>) : ""}
            <div class="flex items-center mb-3">
                <p class="text-black font-base">{showUsername ? (
                <><Link
                  className="text-light"
                  to={`/profiles/${haiku.haikuAuthor}`}
                >
                  {haiku.haikuAuthor}
                  
                </Link><span style={{ fontSize: '1rem' }}>
                    &nbsp;shared this haiku on {haiku.createdAt}
                  </span></>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    You shared this haiku on {haiku.createdAt}
                  </span>
                </>
              )}</p>
            </div>
            <div class="flex flex-col justify-between flex-grow">
                <p class="leading-relaxed font-bold text-white dark:text-gray-900">
                {haiku.haikuText}
                </p>
                <div>
              {(<i id={haiku._id} type="button" onClick={handleLikeClick} class="fa-solid fa-thumbs-up mr-2"></i>)} {haiku.likes != null ? haiku.likes.length : ""}
             </div>

                <Link class="mt-3 font-bold hover:text-red-800 inline-flex items-center" to={`/haikus/${haiku._id}`}>Comment on this haiku
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                </Link>
            </div>
        </div>
    </div>
    ))}
    </div>
    </section>
  );
};

export default HaikuList;
