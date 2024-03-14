/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from 'react-router-dom';
import {useUserContext} from '../hooks/ContextHooks';
import {NavigateFunction, useNavigate} from 'react-router-dom';

const Profile = () => {
  const {user} = useUserContext();
  const navigate: NavigateFunction = useNavigate();

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
      <div className='flex justify-center'>
      <button>
        <Link
          className="p-4 justify-center text-slate-950 hover:text-slate-50 text-xl font-bold"
          to="/logout">
          Logout
        </Link>
      </button>
      </div>
      </>
      )}
    </>
  );
};

export default Profile;
