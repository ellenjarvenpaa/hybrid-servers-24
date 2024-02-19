import {NavigateFunction, useLocation, useNavigate} from 'react-router-dom';
import {MediaItemWithOwner} from '../types/DBTypes';
import Likes from '../components/Likes';
import Comments from '../components/Comments';

const Single = () => {
  const {state} = useLocation();
  const navigate: NavigateFunction = useNavigate();
  //console.log('single state', state);
  const item: MediaItemWithOwner = state;

  return (
    <>
      <p className='p-3 text-slate-950 bg-slate-50 border rounded border-black'>
        Uploaded at: {new Date(item.created_at).toLocaleString('fi-FI')}, by:{' '}
        {item.username}{' '}
      </p>
    <div className='flex justify-center'>
      {item.media_type.includes('video') ? (
        <video controls src={item.filename}></video>
        ) : (
          <img src={item.filename} alt={item.title} />
          )}
      </div>
      <div className='p-3 text-slate-950 bg-slate-50 border rounded border-black grid grid-cols-2'>
      <h3 className='p-2'>{item.title}</h3>
      <div className='p-2 text-end'>
      <Likes item={item} />
      </div>
      <p className='p-2'>{item.description}</p>
      </div>
      <Comments item={item} />
      <button className='p-3 hover:text-slate-950'
        onClick={() => {
          navigate(-1);
        }}
      >
      Back
      </button>
    </>
  );
};

export default Single;
