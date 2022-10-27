/** @format */

import { persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/es/storage'

import posts from './posts'
import categories from './categories'
import tags from './tags'
import bookmark from './bookmark'
import user from './user'
import comments from './comments'
import layouts from './layouts'
import notification from './notification'

const config = {
  key: 'root',
  storage,
}

export default persistCombineReducers(config, {
  posts,
  categories,
  tags,
  bookmark,
  user,
  comments,
  layouts,
  notification,
})
