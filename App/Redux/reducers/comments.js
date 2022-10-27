/** @format */

import { COMMENT_FETCH_SUCCESS } from '@redux/types'

import { flatten } from 'lodash'

const initialState = {
  isFetching: false,
  error: null,
  list: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case COMMENT_FETCH_SUCCESS:
      const postComment = {}
      if (typeof action.extra.postId != 'undefined') {
        postComment[action.extra.postId] = action.payload
      }
      return {
        ...state,
        error: null,
        isFetching: false,
        list: state.list.concat(postComment),
      }
    default:
      return state
  }
}
