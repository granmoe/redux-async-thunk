import 'babel-polyfill' // polyfill for regenerator runtime
import 'whatwg-fetch'   // polyfill for window.fetch

import { applyMiddleware, createStore } from 'redux'

const thunk = store => {
  const dispatch = store.dispatch
  const getState = store.getState

  return next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState)
    }

    console.log(action)
    return next(action)
  }
}

const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'fruit':
    case 'vegetable':
    case 'json':
    case 'error':
      return {
        ...state,
        [action.name]: action.value
      }
    default:
      return state
  }
}

const store = createStore(reducer, applyMiddleware(thunk))

const asyncThunkTest = () => {
  return async (dispatch, getState) => {
    dispatch({ type: 'fruit', name: 'banana', value: 'yellow' })

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts')
      const json = await response.json()
      dispatch({ type: 'json', name: 'posts', value: json })
    } catch (e) {
      dispatch({ type: 'error', name: 'error', value: e.message })
    }

    dispatch({ type: 'vegetable', name: 'carrot', value: 'orange' })
    console.log('state: ', getState())
  }
}

store.dispatch(asyncThunkTest())
