import { useQuery } from '@apollo/client';

import HaikuList from '../components/HaikuList';
import HaikuForm from '../components/HaikuForm';

import { QUERY_HAIKUS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_HAIKUS);
  const haikus = data?.haikus || [];

  return (
    <main className='relative'>
      <div className="flex flex-col justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3 bg-slate-50 rounded-lg"
        >
          <HaikuForm />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <HaikuList
              haikus={haikus}
              title="Get into the Haiku-verse"
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
