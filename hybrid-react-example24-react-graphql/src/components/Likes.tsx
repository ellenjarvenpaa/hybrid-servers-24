import {useEffect, useReducer} from 'react';
import {Like, MediaItemWithOwner} from '../types/DBTypes';
// import {useLike} from '../hooks/apiHooks';
import {useLike} from '../hooks/graphQLHooks';

type LikeState = {
  count: number;
  userLike: Like | null;
};

type LikeAction = {
  type: 'setLikeCount' | 'like';
  count?: number;
  like?: Like | null;
};

const likeInitialState: LikeState = {
  count: 0,
  userLike: null,
};

const likeReducer = (state: LikeState, action: LikeAction): LikeState => {
  switch (action.type) {
    case 'setLikeCount':
      return {...state, count: action.count ?? 0};
    case 'like':
      if (action.like !== undefined) {
        return {...state, userLike: action.like};
      }
      return state; // no change if action.like is undefined
  }
  return state; // Return the unchanged state if the action type is not recognized
};

const Likes = ({item}: {item: MediaItemWithOwner}) => {
  const [likeState, likeDispatch] = useReducer(likeReducer, likeInitialState);
  const {getUserLike, getCountByMediaId, postLike, deleteLike} = useLike();

  // get user like
  const getLikes = async () => {
    const token = localStorage.getItem('token');
    if (!item || !token) {
      return;
    }
    try {
      const userLike = await getUserLike(parseInt(item.media_id), token);
      likeDispatch({type: 'like', like: userLike});
    } catch (e) {
      likeDispatch({type: 'like', like: null});
      // FAKE like object for testing only
      //likeDispatch({type: 'like', like: {like_id: 3, media_id: 5, user_id: 3, created_at: new Date()}});
      console.log('get user like error', (e as Error).message);
    }
  };

  // get like count
  const getLikeCount = async () => {
    try {
      const countResponse = await getCountByMediaId(parseInt(item.media_id)); // Convert item.media_id to a number
      likeDispatch({type: 'setLikeCount', count: countResponse.count});
    } catch (e) {
      likeDispatch({type: 'setLikeCount', count: 0});
      console.log('get user like error', (e as Error).message);
    }
  };

  useEffect(() => {
    getLikes();
    getLikeCount();
  }, [item]);

  const handleLike = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!item || !token) {
        return;
      }
      // If user has liked the media, delete the like. Otherwise, post the like.
      if (likeState.userLike) {
        // delete the like and dispatch the new like count to the state.
        await deleteLike(Number(likeState.userLike.like_id), token);
        // Dispatching is already done in the getLikes and getLikeCount functions.
        // other way, is to do update locally after succesfull api call
        // for deleting it's ok because there is no need to get any data from the api
        likeDispatch({type: 'setLikeCount', count: likeState.count - 1});
        likeDispatch({type: 'like', like: null});
      } else {
        // post the like and dispatch the new like count to the state. Dispatching is already done in the getLikes and getLikeCount functions.
        await postLike(parseInt(item.media_id), token); // Convert item.media_id to a number
        getLikes();
        getLikeCount();
      }
    } catch (e) {
      console.log('like error', (e as Error).message);
    }
  };

  console.log(likeState);

  return (
    <p className='text-slate-950' >
      <button
        className=" hover:text-slate-950 text-end text-slate-950 flex"
        onClick={handleLike}
        >
        {likeState.userLike ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
        </svg>
        :
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
        </svg>}
        {likeState.count}
      </button>
    </p>
  );
};

export default Likes;
