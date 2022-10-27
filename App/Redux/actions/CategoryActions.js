/** @format */

import wp from '@services/WPAPI'
import { Constants } from '@common'
import {
  CATEGORY_FETCH_SUCCESS,
  CATEGORY_ON_SELECT,
  CATEGORY_SELECT_LAYOUT,
  GET_PARENT_CATEGORIES_SUCCESS,
  GET_SUB_CATEGORIES_SUCCESS,
} from '@redux/types'
import fetch from './fetch'

export const fetchCategories = () => {
  const api = wp
    .categories()
    .param('exclude', Constants.excludeCategories)
    .param('include', Constants.includeCategories)
    .perPage(50)
  return (dispatch) => fetch(dispatch, api, CATEGORY_FETCH_SUCCESS)
}

export const setActiveCategory = (id) => {
  return (dispatch) => {
    dispatch({ type: CATEGORY_ON_SELECT, payload: id })
  }
}

export const setActiveLayout = (id) => {
  return (dispatch) => {
    dispatch({ type: CATEGORY_SELECT_LAYOUT, payload: id })
  }
}

export const fetchParentCategories = () => {
  const api = wp
    .categories()
    .param('exclude', Constants.excludeCategories)
    .param('include', Constants.includeCategories)
    .param('parent', 0)
    .perPage(50)
  return (dispatch) => fetch(dispatch, api, GET_PARENT_CATEGORIES_SUCCESS)
}

export const fetchSubCategories = (parentId) => {
  const api = wp
    .categories()
    .param('exclude', Constants.excludeCategories)
    .param('include', Constants.includeCategories)
    .param('parent', parentId)
    .perPage(50)
  return (dispatch) => fetch(dispatch, api, GET_SUB_CATEGORIES_SUCCESS)
}
