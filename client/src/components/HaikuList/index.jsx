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
    <section>
     {showTitle && <h3>{title}</h3>}
    <div class="flex flex-wrap ">
      {haikus &&
        haikus.map((haiku) => (
    <div class="p-4 w-full lg:w-1/2 flex-grow">
        <div key={haiku._id} class="flex rounded-lg h-full dark:bg-gray-200 bg-teal-400 p-8 flex-col">
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
              Likes: {haiku.likes != null ? haiku.likes.length : ""}
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
    // -----
    // <div>
    //   {showTitle && <h3>{title}</h3>}
    //   {haikus &&
    //     haikus.map((haiku) => (
    //       <div key={haiku._id} className="card mb-3">
    //         <h4 className="card-header bg-primary text-light p-2 m-0">
    //           {showUsername ? (
    //             <Link
    //               className="text-light"
    //               to={`/profiles/${haiku.haikuAuthor}`}
    //             >
    //               {haiku.haikuAuthor}
    //               <span style={{ fontSize: '1rem' }}>
    //                 shared this haiku on {haiku.createdAt}
    //               </span>
    //             </Link>
    //           ) : (
    //             <>
    //               <span style={{ fontSize: '1rem' }}>
    //                 You shared this haiku on {haiku.createdAt}
    //               </span>
    //             </>
    //           )}
    //         </h4>
    //         <div className="card-body bg-light p-2">
    //           <p>{haiku.haikuText}</p>
    //         </div>
    //         <div>
    //           Likes: {haiku.likes != null ? haiku.likes.length : ""}
    //         </div> 
    //         <Link
    //           className="btn btn-primary btn-block btn-squared"
    //           to={`/haikus/${haiku._id}`}
    //         >
    //           Join the discussion on this haiku.
    //         </Link>
    //       </div>
    //     ))}
    // </div>
  );
};

export default HaikuList;
