import {
  RECEIVE_CREATE_ACCOUNT
}
from 'constants/actionTypes'

const initialState = {

}

export default function account(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_CREATE_ACCOUNT:
      return [...action.res]

    default:
      return state
  }
}
