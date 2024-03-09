import {useEffect, useRef} from 'react';
import {useUserContext} from '../hooks/ContextHooks';
import {useForm} from '../hooks/formHooks';
import {useCommentStore} from '../store';
import {MediaItemWithOwner} from '../types/DBTypes';
import {useComment} from '../hooks/graphQLHooks';
// import {useComment} from '../hooks/apiHooks';

const Comments = ({item}: {item: MediaItemWithOwner}) => {
  const {comments, setComments} = useCommentStore();
  const {user} = useUserContext();
  const formRef = useRef<HTMLFormElement>(null);
  const {getCommentsByMediaId, postComment} = useComment();

  const initValues = {comment_text: ''};

  const doComment = async () => {
    const token = localStorage.getItem('token');
    if (!user || !token) {
      return;
    }
    try {
      await postComment(inputs.comment_text, parseInt(item.media_id), token);
      await getComments();
      // resetoi lomake
      if (formRef.current) {
        formRef.current.reset();
      }
    } catch (error) {
      console.error('postComment failed', error);
    }
  };

  const {handleSubmit, handleInputChange, inputs} = useForm(
    doComment,
    initValues,
  );

  const getComments = async () => {
    try {
      const comments = await getCommentsByMediaId(parseInt(item.media_id)); // Convert item.media_id to a number
      setComments(comments);
    } catch (error) {
      console.error('getComments failed', error);
      setComments([]);
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <>
      {user && (
        <>
              {comments.length > 0 && (
                <>
                  <h3 className="text-xl p-2 text-slate-950">Comments...</h3>
                  <ul>
                    {comments.map((comment) => (
                      <li key={comment.comment_id}>
                        <div className="rounded-md border border-slate-950 bg-slate-50 p-3 text-slate-950">
                          <span className=" text-slate-950">
                            On{' '}
                            {new Date(comment.created_at!).toLocaleDateString('fi-FI')}{' '}
                          </span>
                          <span className=" text-slate-950">
                            {comment.username} wrote:
                          </span>
                          <span className="ml-2">{comment.comment_text}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </>
              )}
          <form onSubmit={handleSubmit} ref={formRef}>
            <div className="flex w-4/5">
              <label className="w-1/3 p-6 text-end text-slate-950" htmlFor="comment">
                Comment...
              </label>
              <input
                className="m-3 w-2/3 rounded-md border border-slate-500 p-3 text-slate-950"
                name="comment_text"
                type="text"
                id="comment"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex justify-center text-slate-950 hover:text-slate-50 text-xl font-bold">
              <button
                className=""
                type="submit"
              >
                Post
              </button>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default Comments;
