import {
    FETCH_POST_BOOKMARK_SUCCESS,
} from '@redux/types';

const initialState = {
  isFetching: true,
  error: null,
  posts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {

    case FETCH_POST_BOOKMARK_SUCCESS:
      return {
        ...state,
        isFetching: false,
        posts: action.payload,
        error: null,
      }
    default:
      return state;
  }
};
