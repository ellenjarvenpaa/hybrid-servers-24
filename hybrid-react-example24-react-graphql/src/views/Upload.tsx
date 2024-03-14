import {useState} from 'react';
import {useForm} from '../hooks/formHooks';
// import {useFile, useMedia} from '../hooks/apiHooks';
import {useFile, useMedia} from '../hooks/graphQLHooks';
import {useNavigate} from 'react-router-dom';

// Upload.tsx
const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const {postFile} = useFile();
  const {postMedia} = useMedia();
  const navigate = useNavigate();

  const initValues = {
    title: '',
    description: '',
  };

  const doUpload = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token || !file) {
        return;
      }
      // TODO: call postFile function (see below)
      const fileResult = await postFile(file, token);
      // TODO: call postMedia function (see below)
      const mediaResult = await postMedia(fileResult, inputs, token);
      alert(mediaResult.message);
      // TODO: redirect to Home
      navigate('/');
    } catch (e) {
      console.log((e as Error).message);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const {handleSubmit, handleInputChange, inputs} = useForm(
    doUpload,
    initValues,
  );

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center">
          <label className="p-6 text-slate-950" htmlFor="file">
            Your OOTD picture...
          </label>
          <input
            className="m-3 w-2/4 rounded-md border border-slate-950 p-3 text-slate-950 bg-slate-50"
            name="file"
            type="file"
            id="file"
            accept="image/*, video/*"
            onChange={handleFileChange}
          />
        </div>
        <div className="flex justify-center">
          <img
            className="p-6 w-2/6"
            src={
              file
                ? URL.createObjectURL(file)
                : 'https://via.placeholder.com/200?text=Choose+image'
            }
            alt="preview"
            width="200"
          />
        </div>
        <div className="flex justify-center">
          <label className="text-slate-950 p-6" htmlFor="title">
            Outfit title...
          </label>
          <input
            className="m-3 w-2/4 rounded-md border border-slate-950 p-3 text-slate-950"
            name="title"
            type="text"
            id="title"
            onChange={handleInputChange}
          />
        </div>
        <div className="flex justify-center">
          <label className="text-slate-950 p-6" htmlFor="description">
            Outfit details...
          </label>
          <textarea
            className="m-3 w-2/4 rounded-md border border-slate-950 p-3 text-slate-950"
            name="description"
            rows={5}
            id="description"
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="flex justify-center">
          <button
            className="p-3 text-slate-950 hover:text-slate-50 text-xl font-bold"
            type="submit"
            disabled={file && inputs.title.length > 3 ? false : true}
          >
            Upload
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

export default Upload;
