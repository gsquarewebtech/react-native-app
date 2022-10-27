import {
  CATEGORY_FETCH_SUCCESS,
  CATEGORY_ON_SELECT,
  CATEGORIES_ON_FAILURE,
  CATEGORY_FETCH_PENDING,
  CATEGORY_SELECT_LAYOUT,
  GET_PARENT_CATEGORIES_SUCCESS,
  GET_SUB_CATEGORIES_SUCCESS,
} from '@redux/types';
import {Config, Constants} from "@common"

const initialState = {
  isFetching: false,
  error: null,
  list: [],
  selectedCategory: null,
  selectedLayout: true,
  parentCategories: [],
  subCategories: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CATEGORY_FETCH_SUCCESS:
      return {
        ...state,
        error: null,
        isFetching: false,
        list: action.payload || [],
      }

    case CATEGORY_ON_SELECT:
      return {
        ...state,
        selectedCategory: action.payload || null
      }

    case CATEGORY_SELECT_LAYOUT:
      return {
        ...state,
        selectedLayout: action.payload || false
      }
    case GET_PARENT_CATEGORIES_SUCCESS:
      return {
        ...state,
        error: null,
        isFetching: false,
        parentCategories: action.payload || [],
      }
    case GET_SUB_CATEGORIES_SUCCESS:
      console.log(action);

      return {
        ...state,
        error: null,
        isFetching: false,
        subCategories: action.payload || [],
      }
    default:
      return state;
  }
};
