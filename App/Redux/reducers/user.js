/** @format */

import {
  FETCH_USER_SUCCESS,
  CLEAR_USER_SUCCESS,
  FETCH_POST_BY_USER_SUCCESS,
  FETCH_POSTS_USER_MORE,
  FINISH_INTRO
} from '@redux/types'

const initialState = { posts: [] }

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_SUCCESS:
      return { ...state, data: action.payload }
    case CLEAR_USER_SUCCESS:
      return { ...state, data: undefined, posts: [] }
    case FETCH_POSTS_USER_MORE:
      return {
        ...state,
        error: null,
        isFetching: false,
        posts: state.posts.concat(action.payload),
      }
    case FETCH_POST_BY_USER_SUCCESS:
      return { ...state, posts: action.payload }
    case FINISH_INTRO:
      return { ...state, isFinishedIntro: true }
    default:
      return state
  }
}
