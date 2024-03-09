import {Link} from 'react-router-dom';
import {MediaItemWithOwner} from '../types/DBTypes';
import {useUpdateContext, useUserContext} from '../hooks/ContextHooks';
import {useMedia} from '../hooks/graphQLHooks';
import Likes from './Likes';

const MediaRow = (props: {item: MediaItemWithOwner}) => {
  const {item} = props;
  const {user} = useUserContext();
  const {deleteMedia} = useMedia();
  const {update, setUpdate} = useUpdateContext();

  const deleteHandler = async () => {
    const cnf = confirm('Are you sure you want to delete this media?');
    if (!cnf) {
      return;
    }
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      const result = await deleteMedia(item.media_id, token);
      alert(result.message);
      setUpdate(!update);
    } catch (e) {
      console.error('delete failed', (e as Error).message);
    }
  };

  return (
    <tr className='grid text-center bg-stone-50 p-5 m-5 rounded'>
        <td className="p-3 text-slate-950 text-left">{item.owner.username}</td>
      <td className="items-center justify-center">
        <img
          className="h-60 w-72 object-cover"
          src={item.thumbnail}
          alt={item.title}
        />
      </td>
      <td className="p-3">
        <div className="text-slate-950 flex justify-between">
          <Likes item={item} />
          <Link
            className=""
            to="/single"
            state={item}
          >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          </Link>
          {user &&
            (user.user_id === item.user_id || user.level_name === 'Admin') && (
              <>
                <button
                  className=" p-2 hover:text-slate-950"
                  onClick={() => console.log('modify', item)}
                >
                  Modify
                </button>
                <button
                  className="p-2 hover:text-slate-950"
                  onClick={deleteHandler}
                >
                  Delete
                </button>
              </>
            )}
        </div>
        <p className='text-slate-950 text-left pt-2'>Comments: {item.comments_count}</p>
      </td>
    </tr>
  );
};

export default MediaRow;
