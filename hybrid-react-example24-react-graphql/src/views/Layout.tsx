import {Link, Outlet} from 'react-router-dom';
import {useUserContext} from '../hooks/ContextHooks';

const Layout = () => {
  const {user, handleAutoLogin} = useUserContext();

  if (!user) {
    handleAutoLogin();
  }

  return (
    <>
      <nav className='grid grid-cols-3 grid-rows-1'>
        <p className="col-start-2 col-end-3 p-4 text-4xl text-center hover:scale-125 text-slate-950">
        <Link to="/">Rate <br/> My <br/> OOTD</Link>
          </p>
            {user ? (
              <>
                <p className="col-start-1 col-end-2 row-start-1 p-4 text-center
                 text-slate-50 hover:text-slate-950">
                  <Link to="/profile">
                    Profile
                  </Link>
                </p>
                <p className="col-start-3 col-end-4 row-start-1 p-4 text-center
                 text-slate-50 hover:text-slate-950">
                  <Link to="/upload">
                    Upload
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
    </>
  );
};

export default Layout;
