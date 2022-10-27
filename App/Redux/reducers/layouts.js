/** @format */

import { POST_TAG_FETCH_SUCCESS, INIT_POSTS, POST_TAG_FETCH_MORE } from '@redux/types'
import { flatten } from 'lodash'
import { Config, warn, AppConfig } from '@common'

const initialState = AppConfig.HorizonLayout

export default (state = initialState, action) => {
  const { extra, type, payload, finish } = action

  switch (type) {
    case POST_TAG_FETCH_SUCCESS:
      return state.map((item, index) => {
        if (index !== extra.index) {
          return item
        }
        return {
          ...item,
          list: flatten(payload),
        }
      })

    case POST_TAG_FETCH_MORE:
      return state.map((item, index) => {
        if (index !== extra.index) {
          return item
        }
        return {
          ...item,
          list: item.list.concat(flatten(payload)),
          finish,
        }
      })

    case INIT_POSTS: {
      return initialState
    }

    default:
      return state
  }
}
