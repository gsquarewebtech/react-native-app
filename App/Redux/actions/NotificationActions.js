/** @format */

import wp from '@services/WPAPI'
import fetch from './fetch'
import { Config, Constants, AppConfig } from '@common'

import { INITIAL_NOTIFICATION, GET_TOKENS, GOT_TOKENS } from '@redux/types'

import ApiClient from "@services/apiClient";
const Api = new ApiClient({
  baseUrl: AppConfig.URL.root
});


/**
 * @param
 * use plugin onesignal of wordpress ==> they do not support payload.additionalData
 * so we will use payload.body which is title post
 */
export const setInitialNotification = (openResult) => {
  return (dispatch) => {
    dispatch({
      type: INITIAL_NOTIFICATION,
      payload: openResult.notification.payload.additionalData,
      //   payload: openResult.notification.payload.body,
    })
  }
}


export const saveDeviceToken = (data) => {
  return (dispatch) => {
		Api.post(
			"/post_api",
			data
		  )
		.then(function(response) {
			
		})
  }
}

export const getDeviceTokens = (data) => {
  return (dispatch) => {
	  dispatch({ type: GET_TOKENS, payload: ['sdsdsd'] });
	  
	  Api.post(
			"/post_api",
			data
		  )
		.then(function(response) {
			  dispatch({ type: GOT_TOKENS, payload: response });
		})
	
  }
}

