/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from 'react-router-dom';
import {useUserContext} from '../hooks/ContextHooks';

const Profile = () => {
  const {user} = useUserContext();

  return (
    <>
      {user && (
        <>
        <p className='text-left p-3 pl-0 text-slate-950'>About me...</p>
        <div className='bg-slate-50 border rounded border-black place-items-center'>
          <p className='text-left p-3 text-slate-950'>Username: {user.username}</p>
          <p className='text-left p-3 text-slate-950'>Email: {user.email}</p>
          <p className='text-left p-3 text-slate-950'>Created: {new Date(user.created_at).toLocaleString('fi-FI')}</p>
        </div>
          <button>
            <Link
              className="block p-4 pl-0 text-center text-slate-950 hover:text-slate-50 text-xl font-bold"
              to="/logout">
              Logout
            </Link></button>
        </>
      )}
    </>
  );
};

export default Profile;
