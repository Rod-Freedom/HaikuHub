import { useQuery } from '@apollo/client';

import HaikuList from '../components/HaikuList';
import HaikuForm from '../components/HaikuForm';

import { QUERY_HAIKUS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_HAIKUS);
  const haikus = data?.haikus || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <HaikuForm />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <HaikuList
              haikus={haikus}
              title="UN TITULO QUE DIGA ALGO DE HAIKUS"
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
