import {useState} from 'react';
// import {useUser} from '../hooks/apiHooks';
import {useUser} from '../hooks/graphQLHooks';
import {useForm} from '../hooks/formHooks';
import {NavigateFunction, useNavigate} from 'react-router-dom';

const RegisterForm = () => {
  const {postUser} = useUser();
  const [usernameAvailable, setUsernameAvailable] = useState<boolean>(true);
  const [emailAvailable, setEmailAvailable] = useState<boolean>(true);
  const navigate: NavigateFunction = useNavigate();

  const initValues = {username: '', password: '', email: ''};

  const doRegister = async () => {
    try {
      if (usernameAvailable && emailAvailable) {
        await postUser(inputs);
      }
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const {handleSubmit, handleInputChange, inputs} = useForm(
    doRegister,
    initValues,
  );
  const {getUsernameAvailable, getEmailAvailable} = useUser();

  const handleUsernameBlur = async (
    event: React.SyntheticEvent<HTMLInputElement>,
  ) => {
    const result = await getUsernameAvailable(event.currentTarget.value);
    setUsernameAvailable(result.available);
  };

  const handleEmailBlur = async () => {
    const result = await getEmailAvailable(inputs.email); // voidaan käyttää myös inputs objektia
    setEmailAvailable(result.available);
  };

  console.log(usernameAvailable, emailAvailable);
  return (
    <>
      <h3 className="text-3xl text-center font-bold p-3">Register</h3>
      <form onSubmit={handleSubmit} className="flex flex-col text-center">
        <div className="flex w-4/5">
          <label className="w-1/3 p-6 text-end" htmlFor="username">
            Username
          </label>
          <input
            className="m-3 w-2/3 rounded-md border border-slate-500 p-3 text-slate-950"
            name="username"
            type="text"
            id="username"
            onChange={handleInputChange}
            onBlur={handleUsernameBlur}
            autoComplete="username"
          />
        </div>
        {!usernameAvailable && (
          <div className="flex w-4/5 justify-end pr-4">
            <p className="text-red-500">Username not available</p>
          </div>
        )}
        <div className="flex w-4/5">
          <label className="w-1/3 p-6 text-end" htmlFor="password">
            Password
          </label>
          <input
            className="m-3 w-2/3 rounded-md border border-slate-500 p-3 text-slate-950"
            name="password"
            type="password"
            id="password"
            onChange={handleInputChange}
            autoComplete="current-password"
          />
        </div>
        <div className="flex w-4/5">
          <label className="w-1/3 p-6 text-end" htmlFor="email">
            Email
          </label>
          <input
            className="m-3 w-2/3 rounded-md border border-slate-500 p-3 text-slate-950"
            name="email"
            type="email"
            id="email"
            onChange={handleInputChange}
            onBlur={handleEmailBlur}
            autoComplete="email"
          />
        </div>
        {!emailAvailable && (
          <div className="flex w-4/5 justify-end pr-4">
            <p className="text-red-500">Email not available</p>
          </div>
        )}
        <div className="flex justify-center">
          <button
            className="m-3 text-slate-950 hover:bg-slate-50 font-bold p-3 border rounded border-black"
            type="submit"
          >
            Register
          </button>
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
      </form>
    </>
  );
};

export default RegisterForm;
