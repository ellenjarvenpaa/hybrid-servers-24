import {NavigateFunction, useLocation, useNavigate} from 'react-router-dom';
import {MediaItemWithOwner} from '../types/DBTypes';
import Comments from '../components/Comments';

const Single = () => {
  const {state} = useLocation();
  const navigate: NavigateFunction = useNavigate();
  //console.log('single state', state);
  const item: MediaItemWithOwner = state;

  return (
    <>
    <div className='flex flex-col justify-center p-2 w-96'>
      {item.media_type.includes('video') ? (
        <video controls src={item.filename}></video>
        ) : (
          <img src={item.filename} alt={item.title} />
          )}
      <div className='p-3 text-slate-950 bg-slate-50 border rounded border-black grid'>
        <h3 className='p-2'>{item.title}</h3>
        <p className='p-2'>{item.description}</p>
      </div>
      </div>
      <Comments item={item} />
      <button className='p-3 hover:text-slate-950'
        onClick={() => {
          navigate(-1);
        }}
      >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
      stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
      </svg>

      </button>
    </>
  );
};

export default Single;
