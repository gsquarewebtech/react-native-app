import wp from '@services/WPAPI';
import fetch from './fetch';

import {
  COMMENT_FETCH_SUCCESS,
} from '@redux/types';


export const fetchComments = (postId) => {
  const api = wp.comments().param('post', postId)
  return (dispatch) => fetch(dispatch, api, COMMENT_FETCH_SUCCESS, {postId});
};

