import {Link, Outlet} from 'react-router-dom';
import {useUserContext} from '../hooks/ContextHooks';


const Layout = () => {
  const {user, handleAutoLogin} = useUserContext();

  if (!user) {
    handleAutoLogin();
  }

  return (
    <div className='border-2 border-black rounded m-5' >
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Ojuju:wght@200..800&display=swap');
          body {
            font-family: 'Ojuju', sans-serif;
          }
        `}
      </style>
      <nav className='grid grid-cols-3 grid-rows-1 justify-items-center items-center'>
        <p style={{ fontFamily: 'Ojuju', fontWeight: 700}} className="col-start-2 col-end-3 p-4 text-4xl text-center hover:scale-125 text-slate-950">
        <Link to="/">Rate <br/> My <br/> OOTD</Link>
          </p>
            {user ? (
              <>
                <p className="col-start-1 col-end-2 row-start-1 text-center
                 text-slate-50 hover:text-slate-950 w-10 h-10">
                  <Link to="/profile">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  stroke-width="1.5" stroke="currentColor" className="w-10 h-10">
                  <path stroke-linecap="round" stroke-linejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488
                  0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966
                  8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                  </Link>
                </p>
                <p className="col-start-3 col-end-4 row-start-1 text-center
                 text-slate-50 hover:text-slate-950 w-10 h-10">
                  <Link to="/upload">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  stroke-width="1.5" stroke="currentColor" className="w-10 h-10">
                  <path stroke-linecap="round" stroke-linejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  </Link>
                </p>
              </>
            ) : (
              <p>
                <Link
                  className="text-center text-slate-50 hover:text-slate-950"
                  to="/login"
                >
                  Login
                </Link>
              </p>
            )}
      </nav>
      <main className='p-10'>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
