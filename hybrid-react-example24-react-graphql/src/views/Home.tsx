import MediaRow from '../components/MediaRow';
import {useMedia} from '../hooks/graphQLHooks';
// import {useMedia} from '../hooks/apiHooks';

const Home = () => {
  const {mediaArray} = useMedia();

  return (
    <>
      <table className='grid justify-center' >
        <tbody className='' >
          {mediaArray.map((item) => (
            <MediaRow
              key={item.media_id}
              item={item}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Home;
