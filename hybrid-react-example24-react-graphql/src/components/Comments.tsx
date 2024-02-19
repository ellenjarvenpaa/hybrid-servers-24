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
      await postComment(inputs.comment_text, item.media_id, token);
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
      const comments = await getCommentsByMediaId(item.media_id);
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
       {comments.length > 0 && (
        <>
          <ul>
            {comments.map((comment) => (
              <li key={comment.comment_id}>
                <div className="rounded-md border border-slate-950 bg-slate-50 p-3 text-slate-950">
                  <span className="font-bold text-slate-950">
                    On{' '}
                    {new Date(comment.created_at!).toLocaleDateString('fi-FI')}{' '}
                  </span>
                  <span className="font-bold text-slate-950">
                    {comment.username} wrote:
                  </span>
                  <span className="ml-2">{comment.comment_text}</span>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
      {user && (
        <>
          <form onSubmit={handleSubmit} ref={formRef}>
            <div className="p-3 flex justify-start">
              <label className="p-6 text-slate-950" htmlFor="comment">
                Comment...
              </label>
              <input
                className="w-2/3 rounded-md border border-slate-950 p-3 text-slate-950"
                name="comment_text"
                type="text"
                id="comment"
                onChange={handleInputChange}
              />
              <button
                className="w-1/3 rounded-md p-3 hover:text-slate-950"
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
