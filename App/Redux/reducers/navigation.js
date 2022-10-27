/** @format */

import { AppNavigator } from '@navigation'

const initialState = {}

const navigation = (state = initialState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state)
  return nextState || state
}

export default navigation
