import {Link} from 'react-router-dom';
import {MediaItemWithOwner} from '../types/DBTypes';
import {useUpdateContext, useUserContext} from '../hooks/ContextHooks';
import {useMedia} from '../hooks/graphQLHooks';

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
    <tr className='grid text-center'>
      <td className="items-center justify-center">
        <img
          className="h-60 w-72 object-cover"
          src={item.thumbnail}
          alt={item.title}
        />
      </td>
      <td className="p-3">{item.owner.username}</td>
      <td className="p-3">
        <div className="">
          <Link
            className="p-2 text-center hover:text-slate-950"
            to="/single"
            state={item}
          >
            View
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
        <p className='p-3'>Comments: {item.comments_count}</p>
      </td>
    </tr>
  );
};

export default MediaRow;
